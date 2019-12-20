import bodyParser from 'body-parser';
import pgp from 'pg-promise';
import db from './db';

const jsonParser = bodyParser.json();

const calcOffset = (off, max) => {
  if (+off > 1) return (off - 1) * max;
  return 0;
};

const searchingId = async (req, res, next) => {
  if (req.query.q) {
    db.task(async (t) => {
      const lookingForId = await t.any(`SELECT id FROM books 
      WHERE to_tsvector(title) @@ plainto_tsquery($1)
      OR  to_tsvector(author) @@ plainto_tsquery($1)`,
      [req.query.q]);

      if (lookingForId.length > 0) {
        const searchId = lookingForId.map((item) => item.id);
        const checkId = await t.any('SELECT id FROM books WHERE id IN ($1:csv)', [searchId]);
        const data = checkId.map((item) => item.id);
        // eslint-disable-next-line require-atomic-updates
        req.searchId = data;
      }
    })
      .then(() => {
        next();
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  } else next();
};
// Filters => by Category, Cost, Sale
const makeProductFilter = (category, cost) => {
  let filterQuery = 'books';

  if (category) {
    filterQuery = pgp.as.format(`
     (SELECT * FROM books
      WHERE to_tsvector(category)
      @@ plainto_tsquery($1)) AS filter `,
    [category]);
  }
  if (cost.min && cost.max) {
    filterQuery = pgp.as.format(`
    (SELECT * FROM books
      WHERE price BETWEEN ($1::float8::numeric::money) 
      AND ($2::float8::numeric::money)) AS filter `,
    [cost.min, cost.max]);
  }
  if (category && (cost.min && cost.max)) {
    filterQuery = pgp.as.format(`
    (SELECT * FROM books WHERE
    to_tsvector(category) @@ plainto_tsquery($1)
    AND (price BETWEEN ($2::float8::numeric::money) 
    AND ($3::float8::numeric::money))) AS filter `,
    [category, cost.min, cost.max]);
  }
  return filterQuery;
};

const getsResult = async (req, res, next) => {
  const offset = calcOffset(req.body.pageNum, req.body.limit);
  const values = {
    limit: req.body.limit,
    offset,
    sort: req.body.sort,
    incDec: req.body.incDec,
    search: req.body.question,
    category: req.body.category,
    cost: req.body.cost,
  };

  try {
    const where = pgp.as.format('WHERE id IN ($1:csv)', [req.searchId]);

    const isSearchingText = () => {
      if (req.searchId) return where;
      return '';
    };

    const product = await db.any(`SELECT * FROM ${makeProductFilter(values.category, values.cost)} 
      ${isSearchingText()}
      ORDER BY $[sort:name] ${values.incDec}
      LIMIT $[limit] OFFSET $[offset] `, values);

    const { count } = await db.one(`SELECT count(*) FROM 
    ${makeProductFilter(values.category, values.cost)}
     ${isSearchingText()}`);
    const data = {
      product,
      count,
    };
    // eslint-disable-next-line require-atomic-updates
    req.data = data;
    next();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
  }
};

export default (app) => {
  app.get('/product/headers', async (req, res) => {
    try {
      // this two for experimet with quick search
      const titles = await db.any('SELECT DISTINCT (title) FROM books');
      const authors = await db.any('SELECT DISTINCT (author) FROM books');

      const headers = [...titles.map((item) => item.title), ...authors.map((item) => item.author)];

      res.status(200).json(headers);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.get('/product/max/price', async (req, res) => {
    try {
      const data = await db.one(`
      SELECT price::money::numeric::float8 FROM books
       WHERE price = (SELECT max(price) FROM books )`);
      res.status(200).json(data);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.post('/products/all', jsonParser, searchingId, getsResult, (req, res) => {
    if (req.body.question && !req.searchId) {
      res.status(200).json([]);
    } else {
      res.status(200).json(req.data);
    }
  });
};

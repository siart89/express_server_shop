import db from './db';
import pgp from 'pg-promise';

const calcOffset = (off, max) => {
  if (+off > 1) return (off - 1) * max;
  return 0;
};

export default (app) => {
  app.get('/products/all', async (req, res) => {
    try {
      const offset = calcOffset(req.query.pagenum, req.query.limit);
      const values = {
        limit: req.query.limit,
        offset,
        sort: req.query.sort,
        inc_dec: req.query.inc_dec,
        search: req.query.q,
      };
      let findId;

      if (values.search) {
        const idTitle = await db.any('SELECT id FROM books WHERE to_tsvector(title) @@ to_tsquery($1)', [values.search]);
        const idAuthor = await db.any('SELECT id FROM books WHERE to_tsvector(author) @@ to_tsquery($1)', [values.search]);
        const searchId = [...idTitle.map((item) => item.id), ...idAuthor.map((item) => item.id)];
        const checkId = await db.any('SELECT id FROM books WHERE id IN ($1:csv)', [searchId]);
        findId = checkId.map((item) => item.id);
      }
      const where = pgp.as.format('WHERE id IN ($1:csv)', [findId]);

      const product = await db.any(`SELECT * FROM books 
        ${findId && where}
        ORDER BY $[sort:name] ${values.inc_dec}
        LIMIT $[limit] OFFSET $[offset]`, values);

      const { count } = await db.one(`SELECT count(*) FROM books ${findId && where}`);
      // this two for experimet with quick search
      const titles = await db.any('SELECT DISTINCT (title) FROM books');
      const authors = await db.any('SELECT DISTINCT (author) FROM books');
      const data = {
        product,
        count,
        headers: [...titles.map((item) => item.title), ...authors.map((item) => item.author)],
      };
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });
};

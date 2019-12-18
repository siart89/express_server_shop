import db from './db';

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
      };
      const product = await db.any(`SELECT * FROM books 
        ORDER BY $[sort:name] ${values.inc_dec}
        LIMIT $[limit] OFFSET $[offset]`, values);
      const { count } = await db.one('SELECT count(*) FROM books');
      const data = {
        product,
        count,
      };
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });
};

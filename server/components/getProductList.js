import db from './db';

const calcOffset = (off, max) => {
  if (+off > 1) return (off - 1) * max;
  return 1;
};

export default (app) => {
  app.get('/products/all', async (req, res) => {
    try {
      const offset = calcOffset(req.query.pagenum, req.query.limit);
      const product = await db.any(`SELECT * FROM books 
        ORDER BY created_at
        LIMIT $1 OFFSET $2`, [+req.query.limit, offset]);
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

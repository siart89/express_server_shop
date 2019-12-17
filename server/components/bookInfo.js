import db from './db';

export default (app) => {
  app.get('/book/card/:id', async (req, res) => {
    try {
      const data = await db.one('SELECT * FROM books WHERE id = $1', [req.params.id]);
      res.status(200).json(data);
    } catch (e) {
      res.sendStatus(500)
    }
  });
};

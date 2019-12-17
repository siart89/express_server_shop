import db from './db';

export default (app) => {
  app.get('/products/all', async (req, res) => {
    try {
      const data = await db.any('SELECT * FROM books');
      res.status(200).json(data);
    } catch (e) {
      res.sendStatus(500);
    }
  });
};

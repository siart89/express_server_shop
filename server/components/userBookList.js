import db from './db';


export default (app) => {
  app.get('/api/user/:id/booklist', async (req, res) => {
    const { id } = req.params;
    try {
      const data = await db.any('SELECT * FROM books WHERE user_id = $1', [id]);
      res.json(data);
    } catch (e) {
      res.sendStatus(500);
    }
  });
};

import db from './db';

export default (app) => {
  app.get('/api/user/:id/booklist', (req, res) => {
    const { id } = req.params;
    db.any('SELECT * FROM books WHERE user_id = $1', [id])
      .then((data) => {
        res.json(data);
      })
      .catch(() => {
        res.sendStatus(403);
      });
  });
};

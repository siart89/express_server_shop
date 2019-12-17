import db from './db';


export default (app) => {
  app.use('/profile/user:id/book:bookId/favorites/remove', async (req, res) => {
    const { id, bookId } = req.params;
    try {
      await db.none('DELETE FROM favorites WHERE user_id = $1 AND book_id = $2', [id, bookId]);
      await res.status(200).json({ isFavor: false });
    } catch (e) {
      console.log(e)
      res.sendStatus(500);
    }
  });

  app.use('/profile/user:id/book:bookId/favorites', async (req, res) => {
    const { id, bookId } = req.params;
    try {
      await db.one(`SELECT * FROM favorites 
      INNER JOIN books ON favorites.book_id = books.id
      WHERE favorites.user_id = $1 AND favorites.book_id=$2;`, [id, bookId]);
      res.status(200).json({ isFavor: true });
    } catch (e) {
      res.json({ isFavor: false });
    }
  });

  const checkInDb = async (req, res, next) => {
    try {
      await db.none('SELECT * FROM favorites WHERE book_id = $1 AND user_id = $2;', [req.params.bookId, req.params.userId]);
      next();
    } catch (e) {
      res.sendStatus(500);
    }
  };

  app.use('/favorites/user:userId/book:bookId', checkInDb, async (req, res) => {
    try {
      await db.none('INSERT INTO favorites (book_id, user_id) VALUES ($1, $2);', [req.params.bookId, req.params.userId]);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(500)
    }
  });

  app.use('/profile/user/:id/favorites', async (req, res) => {
    try {
      const data = await db.any(`SELECT * FROM (SELECT * FROM favorites WHERE user_id = $1) AS favor
      INNER JOIN books ON favor.book_id = books.id;`, [req.params.id]);
      res.json(data);
    } catch (err) {
      res.json({});
    }
  });
};

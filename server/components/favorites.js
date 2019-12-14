import db from './db';


export default (app) => {
  app.use('/profile/user:id/book:bookId/favorites/remove', (req, res) => {
    const { id, bookId } = req.params;

    db.none('DELETE FROM favorites WHERE user_id = $1 AND book_id = $2', [id, bookId])
      .then(() => {
        res.status(200).json({ isFavor: false });
      })
      .catch(() => {
        res.sendStatus(500);
      });
  });

  app.use('/profile/user:id/book:bookId/favorites', (req, res) => {
    const { id, bookId } = req.params;
    db.one(`SELECT * FROM favorites 
            INNER JOIN books ON favorites.book_id = books.id
            WHERE favorites.user_id = $1 AND favorites.book_id=$2;`, [id, bookId])
      .then(() => {
        res.status(200).json({ isFavor: true });
      })
      .catch(() => {
        res.json({ isFavor: false });
      });
  });

  const checkInDb = (req, res, next) => {
    db.none('SELECT * FROM favorites WHERE book_id = $1 AND user_id = $2;', [req.params.bookId, req.params.userId])
      .then(() => {
        next();
      })
      .catch(() => {
        res.sendStatus(500);
      });
  };

  app.use('/favorites/user:userId/book:bookId', checkInDb, (req, res) => {
    db.none('INSERT INTO favorites (book_id, user_id) VALUES ($1, $2);', [req.params.bookId, req.params.userId])
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => res.sendStatus(500));
  });
};

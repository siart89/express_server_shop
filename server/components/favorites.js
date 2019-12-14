import db from './db';
import { checkToken } from './authorization';

export default (app) => {
  app.use('/profile/user:id/book:bookId/favorites/remove', checkToken, (req, res) => {

    const { id, bookId } = req.params;

    db.none('DELETE FROM favorites WHERE user_id = $1 AND book_id = $2', [id, bookId])
      .then(() => {
        if (res.userInfo) {
          res.status(200).json({
            token: req.userInfo.token,
            refreshToken: req.userInfo.refreshToken,
            isFavor: true
          });
        } else {
          res.status(200).json({ isFavor: true });
        }

      })
      .catch(() => {
        res.sendStatus(500);
      });
  });

  app.use('/profile/user:id/book:bookId/favorites', checkToken, (req, res) => {
    const { id, bookId } = req.params;
    db.one(`SELECT * FROM favorites 
            INNER JOIN books ON favorites.book_id = books.id
            WHERE favorites.user_id = $1 AND favorites.book_id=$2;`, [id, bookId])
      .then(() => {
        if (res.userInfo) {
          res.status(200).json({
            token: req.userInfo.token,
            refreshToken: req.userInfo.refreshToken,
            isFavor: true
          });
        } else {
          res.status(200).json({ isFavor: true });
        }
      })
      .catch(() => {
        if (res.userInfo) {
          res.status(200).json({
            token: req.userInfo.token,
            refreshToken: req.userInfo.refreshToken,
            isFavor: false
          });
        } else {
          res.json({ isFavor: false });
        }

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

  app.use('/favorites/user:userId/book:bookId', checkToken, checkInDb, (req, res) => {
    db.none('INSERT INTO favorites (book_id, user_id) VALUES ($1, $2);', [req.params.bookId, req.params.userId])
      .then(() => {
        if (res.userInfo) {
          res.status(200).json({
            token: req.userInfo.token,
            refreshToken: req.userInfo.refreshToken,
            isFavor: false
          });
        } else {
          res.sendStatus(200);
        }

      })
      .catch(() => res.sendStatus(500));
  });
};

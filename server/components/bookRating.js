import db from './db';

// Calculate and set book rating
const calcBookRating = (arr) => {
  const ratingSum = arr.reduce((sum, cur) => sum + cur.rating, 0);
  return ratingSum / arr.length;
};

export default (app) => {
  app.use((req, res, next) => {
    db.any('SELECT rating FROM comments WHERE book_id = $1 AND rating <> $2', [req.bookId, 0])
      .then((data) => {
        const bookRating = Math.floor(calcBookRating(data) * 10) / 10;
        req.rating = bookRating;
        next();
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  });

  app.use((req, res) => {
    db.none('UPDATE books SET rating = $1 WHERE id = $2', [req.rating, req.bookId])
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  });
};

import db from './db';

// Calculate and set book rating
const calcBookRating = (arr) => {
  const ratingSum = arr.reduce((sum, cur) => sum + cur.rating, 0);
  return ratingSum / arr.length;
};

export default (app) => {
  app.use(async (req, res) => {
    try {
      const data = await db.any('SELECT rating FROM comments WHERE book_id = $1 AND rating <> $2', [req.bookId, 0]);
      const bookRating = Math.floor(calcBookRating(data) * 10) / 10;
      await db.none('UPDATE books SET rating = $1 WHERE id = $2', [bookRating, req.bookId]);
      await res.sendStatus(200);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      res.sendStatus(500);
    }
  });
};

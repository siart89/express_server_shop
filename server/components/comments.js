import bodyParser from 'body-parser';
import db from './db';

const jsonParser = bodyParser.json();

export default (app) => {
  app.get('/book/comment/book/:id', async (req, res) => {
    try {
      const data = await db.any('SELECT * FROM comments WHERE book_id = $1 ORDER BY created_at DESC', [req.params.id]);
      res.status(200).json(data);
    } catch (e) {
      res.sendStatus(500)
    }
  });


  // ADD Comment to DB

  app.use('/book/comment', jsonParser, async (req, res, next) => {
    req.bookId = req.body.bookId;
    try {
      await db.none('INSERT INTO comments (book_id, text, author_name, rating) VALUES ($1, $2, $3, $4);',
        [req.body.bookId, req.body.text, req.body.author, req.body.rating]);
      next()
    } catch (e) {
      res.sendStatus(500);
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
  // Set that new comment was read
  app.use('/profile/notifications/check/book:bookId', async (req, res) => {
    const { bookId } = req.params;
    try {
      await db.none(`UPDATE comments SET is_read = true WHERE book_id = $1;`, [bookId]);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  });

  // Geting a comments wich have status is_read = false
  app.use('/profile/notifications/user:id', async (req, res) => {
    const { id } = req.params;
    try {
      const data = await db.any(`SELECT id, title, count(*) FROM 
      (SELECT book_id AS id, title, text FROM comments
      INNER JOIN books ON
      books.id = comments.book_id
      WHERE books.user_id = $1 AND comments.is_read = false) AS note
      GROUP BY id, title
      ;`, [id]);
      res.status(200).json(data);
    } catch (e) {
      console.log(err);
      res.sendStatus(500);
    }
  });
};

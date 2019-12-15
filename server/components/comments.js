import bodyParser from 'body-parser';
import db from './db';

const jsonParser = bodyParser.json();

export default (app) => {
  app.get('/book/comment/book/:id', (req, res) => {
    db.any('SELECT * FROM comments WHERE book_id = $1 ORDER BY created_at DESC', [req.params.id])
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => res.sendStatus(500));
  });


  // ADD Comment to DB

  app.use('/book/comment', jsonParser, (req, res, next) => {
    req.bookId = req.body.bookId;
    db.none('INSERT INTO comments (book_id, text, author_name, rating) VALUES ($1, $2, $3, $4);',
      [req.body.bookId, req.body.text, req.body.author, req.body.rating])
      .then(() => {
        next();
      })
      .catch((err) => {
        res.sendStatus(500);
        // eslint-disable-next-line no-console
        console.log(err);
      });
  });
  // Set that new comment was read
  app.use('/profile/notifications/check/book:bookId', (req, res) => {
    const { bookId } = req.params;
    db.none(`UPDATE comments SET is_read = true
      WHERE book_id = $1;`, [bookId])
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // Geting a comments wich have status is_read = false
  app.use('/profile/notifications/user:id', (req, res) => {
    const { id } = req.params;
    db.any(`SELECT id, title, count(*) FROM 
      (SELECT book_id AS id, title, text FROM comments
      INNER JOIN books ON
      books.id = comments.book_id
      WHERE books.user_id = $1 AND comments.is_read = false) AS note
      GROUP BY id, title
      ;`, [id])
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });
};

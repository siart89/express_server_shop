import db from './db';
import bodyParser from 'body-parser';

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
};
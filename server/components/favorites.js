import db from './db';

export default (app) => {

    app.use('/profile/user/:id/favorites', (req, res) => {
        const userId = req.params.id;
        db.any(`SELECT * FROM favorites 
            INNER JOIN books ON favorites.book_id = books.id
            WHERE favorites.user_id = $1;`, [userId])
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
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
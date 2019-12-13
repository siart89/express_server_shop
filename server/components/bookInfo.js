import db from './db';

export default (app) => {
    app.get('/book/card/:id', (req, res) => {
        db.one('SELECT * FROM books WHERE id = $1', [req.params.id])
            .then((data) => {
                res.status(200).json(data);
            })
            .catch(() => res.sendStatus(403));
    });
};

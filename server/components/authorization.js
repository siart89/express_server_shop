import db from './db';
import fs from 'fs';
import jwt from 'jsonwebtoken';

const secretKey = fs.readFileSync('./server/secret/secret.key', 'utf8');

const checkToken = (req, res, next) => {
    if (typeof req.headers.authorization !== 'undefined') {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, secretKey, { algorithm: 'HS256' }, (err, encoded) => {
            if (err) {
                res.sendStatus(403);
                throw new Error(' User has not auth');
            } else {
                req.id = encoded.id;
                next();
            }
        });
    } else {
        res.sendStatus(500);
    }
};

const authorization = (app) => {
    app.use('/user/verify', checkToken, (req, res) => {
        db.one('SELECT * FROM users WHERE id = $1', [req.id])
            .then((data) => {
                res.status(200).json({
                    name: data.name,
                    mail: data.mail,
                    avatar: data.avatar,
                    phone: data.phone,
                    id: data.id,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

export {
    authorization,
    checkToken
  }
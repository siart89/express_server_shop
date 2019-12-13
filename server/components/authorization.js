import fs from 'fs';
import jwt from 'jsonwebtoken';
import db from './db';
import { makeNewSession } from './authentication';

const secretKey = fs.readFileSync('./server/secret/secret.key', 'utf8');

const checkToken = async (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    const token = req.headers.authorization.split(' ')[1];
    const refreshToken = req.headers.authorization.split(' ')[2];
    jwt.verify(token, secretKey, { algorithm: 'HS256' }, (err, encoded) => {
      if (err) {
        db.one('SELECT * FROM sessions WHERE refresh_token = $1', [refreshToken])
          .then((data) => {
            if (data.expired_at <= (Math.floor(Date.now() / 1000))) {
              throw new Error('Refresh token was expire');
            }
            console.log(data);
            makeNewSession(req, data, next, data.user_id);
            next();
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
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
    db.one('SELECT avatar FROM users WHERE id = $1', [req.id])
      .then(({ avatar }) => {
        if (req.userInfo) {
          res.status(200).json({
            token: req.userInfo.token,
            refreshToken: req.userInfo.refreshToken,
            avatar,
          });
        } else {
          res.status(200).json({ avatar });
        }
      });
  });
};

export {
  authorization,
  checkToken,
};

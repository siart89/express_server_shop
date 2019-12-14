import fs from 'fs';
import jwt from 'jsonwebtoken';
import db from './db';
import { makeNewSession } from './authentication';


const secretKey = fs.readFileSync('./server/secret/secret.key', 'utf8');

const chekInSessions = async (id, token) => {
  const isExist = await db.one(`SELECT (user_id, refresh_token) FROM sessions
   WHERE user_id = $1 AND refresh_token = $2;`, [id, token]);
   if (isExist) return true;
   return false;
}

const checkToken = async (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    const token = req.headers.authorization.split(' ')[1];
    const refreshToken = req.headers.authorization.split(' ')[2];
    jwt.verify(token, secretKey, { algorithm: 'HS256' }, (err, encoded) => {
      if (err) {
        
        jwt.verify(refreshToken, secretKey, { algorithm: 'HS256' }, async (err, encoded) => {
          const { ip, id, name, os } = encoded;
          if (await chekInSessions(id, refreshToken)) {
            req.id = encoded.id;
            if (ip === req.ip && os === req.useragent.os) {
              makeNewSession(req, next, name, id)
            }
          } else {
            res.sendStatus(403);
          }     
        })
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
      })
      .catch(err => {
        console.log(err)
      })
  });
};

export {
  authorization,
  checkToken,
};

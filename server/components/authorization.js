import fs from 'fs';
import jwt from 'jsonwebtoken';
import db from './db';
import { makeNewSession } from './authentication';


const secretKey = fs.readFileSync('./server/secret/secret.key', 'utf8');


const checkToken = async (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    const token = req.headers.authorization.split(' ')[1];
    const refreshToken = req.headers.authorization.split(' ')[2];
    try {
      const encoded = await jwt.verify(token, secretKey, { algorithm: 'HS256' });
      req.id = encoded.id;
      next();
    } catch (e) {
      try {
        const encod = await jwt.verify(refreshToken, secretKey, { algorithm: 'HS256' });
        const {
          ip,
          id,
          name,
          os,
        } = encod;
        await db.one(`SELECT (user_id, refresh_token) FROM sessions
        WHERE user_id = $1 AND refresh_token = $2;`, [id, refreshToken]);

        if (ip === req.ip && os === req.useragent.os) {
          makeNewSession(req, next, name, id);
          req.id = encod.id;
        }
      } catch (er) {
        console.log(er)
        res.sendStatus(403);
      }
    }
  }
};

const authorization = (app) => {
  app.use('/user/verify', checkToken, async (req, res) => {
    try {
      const { avatar } = await db.one('SELECT avatar FROM users WHERE id = $1', [req.id]);
      if (req.userInfo) {
        res.status(200).json({
          token: req.userInfo.token,
          refreshToken: req.userInfo.refreshToken,
          avatar,
        });
      } else {
        res.status(200).json({ avatar });
      }
    } catch (e) {
      console.log(e)
    }
  });
};

export {
  authorization,
  checkToken,
};

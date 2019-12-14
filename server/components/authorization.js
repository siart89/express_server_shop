import fs from 'fs';
import jwt from 'jsonwebtoken';
import db from './db';
import { makeNewSession } from './authentication';
import { resolve } from 'dns';

const secretKey = fs.readFileSync('./server/secret/secret.key', 'utf8');

const checkToken = async (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    let info = [];
    const token = req.headers.authorization.split(' ')[1];
    const refreshToken = req.headers.authorization.split(' ')[2];
    jwt.verify(token, secretKey, { algorithm: 'HS256' }, (err, encoded) => {
      if (err) {
        jwt.verify(refreshToken, secretKey, { algorithm: 'HS256' }, (err, encoded) => {
          const { ip, id, name, os } = encoded;
          req.id = encoded.id;
          if (ip === req.ip && os === req.useragent.os) {
            makeNewSession(req, next, name, id)
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

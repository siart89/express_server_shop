import fs from 'fs';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import db from './db';

const jsonParser = bodyParser.json();
const secretKey = fs.readFileSync('./server/secret/secret.key', 'utf8');


const makeNewSession = async (req, next, name, id) => {
  const createdTime = Date.now();
  const expiredTime = new Date(createdTime + (24 * 60 * 60 * 1000));
  jwt.sign({
    id,
    name,
    ip: req.ip,
    os: req.useragent.os,
  },
  secretKey,
  { algorithm: 'HS256', expiresIn: '72h' }, (err, token) => {
    req.refreshToken = token;
  });

  // clear user session , expect 1 user session for each
  db.none('DELETE FROM sessions WHERE user_id = $1', [id])
    .then(() => {
      //     // Create user session
      db.none(`INSERT INTO sessions (user_id, ip, os, user_agent, refresh_token, expired_at, created_at, name)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, req.ip, req.useragent.os, req.useragent.source,
        req.refreshToken, expiredTime, new Date(createdTime), name])
        .then(() => {
          jwt.sign({
            id,
            ip: req.ip,
            os: req.useragent.os,
          },
          secretKey,
          { algorithm: 'HS256', expiresIn: '4h' }, (err, token) => {
            if (err) {
              console.log(err);
            }
            req.userInfo = {
              token,
              name,
              refreshToken: req.refreshToken,
              id,
            };
            next();
          });
        });
    })
    .catch((err) => console.log(err));
};

const authenticationUser = (req, res, next) => {
  db.one('SELECT * FROM users WHERE mail = $1 AND password = $2', [req.body.mail, req.body.password])
    .then((data) => {
      makeNewSession(req, next, data.name, data.id);
    })
    .catch(() => {
      res.sendStatus(403);
    });
};
const authentication = (app) => {
  app.post('/user/login', jsonParser, authenticationUser, (req, res) => {
    res.json(req.userInfo);
  });
};

export {
  authentication,
  makeNewSession,
};

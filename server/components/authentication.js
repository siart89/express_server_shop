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
  try {
    db.task(async (t) => {
    // clear user session , expect 1 user session for each
      await t.none('DELETE FROM sessions WHERE user_id = $1', [id]);
      // Create user session
      await t.none(`INSERT INTO sessions (user_id, ip, os, user_agent,
         refresh_token, expired_at, created_at, name)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, req.ip, req.useragent.os, req.useragent.source,
        req.refreshToken, expiredTime, new Date(createdTime), name]);
    })
      .then(() => {
        const token = jwt.sign({
          id,
          ip: req.ip,
          os: req.useragent.os,
        },
        secretKey,
        { algorithm: 'HS256', expiresIn: '1s' });

        req.userInfo = {
          token,
          name,
          refreshToken: req.refreshToken,
          id,
        };
        next();
      });
  } catch (e) {
    console.log(e);
  }
};

const authenticationUser = async (req, res, next) => {
  try {
    const data = await db.one('SELECT * FROM users WHERE mail = $1 AND password = $2', [req.body.mail, req.body.password]);
    makeNewSession(req, next, data.name, data.id);
  } catch (e) {
    console.log(e);
    res.sendStatus(403);
  }
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

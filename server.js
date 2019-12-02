const express = require('express');
const pgp = require('pg-promise')({
  promiseLib: Promise,
});
const useragent = require('express-useragent');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');

// for parse json's request

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

// set options for database
const cn = {
  host: 'localhost',
  port: 5432,
  database: 'mydb',
  user: 'postgres',
  password: 'drevnieslezi2012',
};

const db = pgp(cn);

// create server
const app = express();
const port = (process.env.PORT || 8080);

app.listen(port, (err) => {
  if (err) {
    console.log('Server is not started, error : ', err);
  } else {
    console.log('Server is started');
  }
});

// check for user with same mail
const chekUser = (req, res, next) => {
  db.none('SELECT mail FROM users WHERE mail = $1', [req.body.mail])
    .then(() => next())
    .catch((err) => {
      res.json({ message: 'Пользователь с такой почтой уже зарегистрирован' });
      console.log(err.message);
    });
};
// use information of client os / browser ..etc
app.use(useragent.express());

// New User Registration
app.post('/users/signin', jsonParser, chekUser, (req, res) => {
  const user = {
    name: req.body.name,
    mail: req.body.mail,
    phone: req.body.phone,
    password: req.body.password,
  };

  db.none(`INSERT INTO users (name, mail, password, phone)
    VALUES ($1, $2, $3, $4)`, [user.name, user.mail, user.password, user.phone])
    .then(() => {
      res.json({ message: 'Успешно зарегистрирован' });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(403);
    });
});

// User Auth
const secretKey = fs.readFileSync('./secret/secret.key', 'utf8');
app.set('trust proxy', true);


const makeNewSession = (req, data, next) => {
  const createdTime = Date.now();
  const expiredTime = new Date(createdTime + (24 * 60 * 60 * 1000));
  const refreshToken = uniqid();
  // clear user session , expected 1 user session for each
  db.none('DELETE FROM sessions WHERE user_id = $1', [data.id])
    .then(() => {
      // Create user session
      db.none(`INSERT INTO sessions (user_id, ip, os, user_agent, refresh_token, expired_at, created_at, name)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [data.id, req.ip, req.useragent.os, req.useragent.source,
        refreshToken, expiredTime, new Date(createdTime), data.name])
        .then(() => {
          jwt.sign({ id: data.id, ip: req.ip, os: req.useragent.os },
            secretKey,
            { algorithm: 'HS256', expiresIn: '30s' }, (err, token) => {
              req.userInfo = { token, name: data.name, refreshToken };
              next();
            });
        });
    });
};

const authenticationUser = (req, res, next) => {
  db.one('SELECT * FROM users WHERE mail = $1 AND password = $2', [req.body.mail, req.body.password])
    .then((data) => {
      makeNewSession(req, data, next);
    })
    .catch(() => {
      res.sendStatus(403);
    });
};

app.post('/user/login', jsonParser, authenticationUser, (req, res) => {
  res.json(req.userInfo);
});

// Authorization
const authorizationUser = (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secretKey, { algorithm: 'HS256' }, (err, encoded) => {
      if (err) {
        res.sendStatus(403);
        throw new Error(' User has not auth');
      } else {
        console.log(encoded);
        next();
      }
    });
  } else {
    res.sendStatus(500);
  }
};

app.use('/secret', authorizationUser, (req, res) => {
  res.json({ status: 'ok' });
});

// Refresh token
const useRefreshToken = (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    const refToken = req.headers.authorization.split(' ')[1];
    db.one('SELECT * FROM sessions WHERE refresh_token = $1',
      [refToken])
      .then((data) => {
        if (data.expired_at <= (Math.floor(Date.now() / 1000))) {
          console.log('err');
          throw new Error('Refresh token was expire');
        }
        makeNewSession(req, data, next);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(403);
      });
  }
};

app.get('/refresh', useRefreshToken, (req, res) => {
  res.json({ token: req.userInfo.token, refreshToken: req.userInfo.refreshToken });
});

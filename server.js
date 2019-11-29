const express = require('express');
const pgp = require('pg-promise')({
  promiseLib: Promise,
});
const useragent = require('express-useragent');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// const QueruResultError = pgp.errors.QueryResultError;

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

app.use(useragent.express());

app.post('/users/signin', jsonParser, chekUser, (req, res) => {
  const user = {
    name: req.body.name,
    mail: req.body.mail,
    phone: req.body.phone,
    password: req.body.password,
    agent: req.headers['user-agent'],
    os: req.useragent.os,
  };

  const secret = fs.readFileSync('./secret/secret.key', 'utf8');

  db.none(`INSERT INTO users (name, mail, password, agent, phone, os)
    VALUES ($1, $2, $3, $4, $5, $6)`, [user.name, user.mail, user.password, user.agent, user.phone, user.os])
    .then(() => {
      const token = jwt.sign({
        name: user.name,
        mail: user.mail,
        password: user.password,
      }, secret, { algorithm: 'HS256' });

      res.json({ message: 'Успешно зарегистрирован', token });
    })
    .catch(() => {
      res.sendStatus(403);
    });
});

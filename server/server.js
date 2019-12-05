import express from 'express';
import useragent from 'express-useragent';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import uniqid from 'uniqid';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';

const jsonParser = bodyParser.json();

// set options for database
const pgp = require('pg-promise')({
  promiseLib: Promise,
});

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
app.set('trust proxy', true);

const port = (process.env.PORT || 8080);

app.listen(port, (err) => {
  if (err) {
    console.log('Server is not started, error : ', err);
  } else {
    console.log('Server is started');
  }
});


// use information of client os / browser ..etc
app.use(useragent.express());


// -------------REGISTRATION--------------

// check for user with same mail
const chekUser = (req, res, next) => {
  db.none('SELECT mail FROM users WHERE mail = $1', [req.body.mail])
    .then(() => next())
    .catch(() => {
      res.json({ message: 'Пользователь с такой почтой уже зарегистрирован' });
    });
};

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
    .catch(() => {
      res.sendStatus(403);
    });
});


// -------------------AUTHETICATION-----------------

// User Auth
const secretKey = fs.readFileSync('./server/secret/secret.key', 'utf8');

const makeNewSession = (req, data, next, id) => {
  const createdTime = Date.now();
  const expiredTime = new Date(createdTime + (24 * 60 * 60 * 1000));
  const refreshToken = uniqid();
  // clear user session , expected 1 user session for each
  db.none('DELETE FROM sessions WHERE user_id = $1', [id])
    .then(() => {
      // Create user session
      db.none(`INSERT INTO sessions (user_id, ip, os, user_agent, refresh_token, expired_at, created_at, name)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, req.ip, req.useragent.os, req.useragent.source,
        refreshToken, expiredTime, new Date(createdTime), data.name])
        .then(() => {
          jwt.sign({
            id,
            ip: req.ip,
            os: req.useragent.os,
          },
          secretKey,
          { algorithm: 'HS256', expiresIn: '1h' }, (err, token) => {
            req.userInfo = { token, name: data.name, refreshToken };
            next();
          });
        });
    });
};

const authenticationUser = (req, res, next) => {
  db.one('SELECT * FROM users WHERE mail = $1 AND password = $2', [req.body.mail, req.body.password])
    .then((data) => {
      makeNewSession(req, data, next, data.id);
    })
    .catch(() => {
      res.sendStatus(403);
    });
};

app.post('/user/login', jsonParser, authenticationUser, (req, res) => {
  res.json(req.userInfo);
});


// -----------------AUTHORIZATION--------------------

const authorizationUser = (req, res, next) => {
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

app.use('/secret', authorizationUser, (req, res) => {
  db.one('SELECT * FROM users WHERE id = $1', [req.id])
    .then((data) => {
      res.status(200).json({
        name: data.name,
        mail: data.mail,
        avatar: data.avatar,
        phone: data.phone,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


// --------------------REFRESH TOKEN ------------------

const useRefreshToken = (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    const refToken = req.headers.authorization.split(' ')[1];
    db.one('SELECT * FROM sessions WHERE refresh_token = $1',
      [refToken])
      .then((data) => {
        if (data.expired_at <= (Math.floor(Date.now() / 1000))) {
          throw new Error('Refresh token was expire');
        }
        makeNewSession(req, data, next, data.user_id);
      })
      .catch(() => {
        res.sendStatus(403);
      });
  }
};

app.get('/refresh', useRefreshToken, (req, res) => {
  res.json({ token: req.userInfo.token, refreshToken: req.userInfo.refreshToken });
});


// Add Avatar picture
app.use(express.static('server/uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './server/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uniqid()}${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

// Set avatar path to db
const setUrl = (req, res, next) => {
  // path for local server
  const mypath = `http://localhost:3000/${req.file.filename}`;
  db.none('UPDATE users SET avatar = $1 WHERE id = $2 ', [mypath, req.id])
    .then(() => {
      next();
    })
    .catch(() => {
      res.sendStatus(403);
    });
};

app.post('/profile/avatar', upload.single('avatar'), authorizationUser, setUrl, (req, res) => {
  res.status(200).json({ url: req.file.filename });
});


app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

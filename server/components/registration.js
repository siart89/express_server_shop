import bodyParser from 'body-parser';
import db from './db';


const jsonParser = bodyParser.json();
// check for user with same mail
const chekUser = (req, res, next) => {
  db.none('SELECT mail FROM users WHERE mail = $1', [req.body.mail])
    .then(() => next())
    .catch(() => {
      res.json({ message: 'Пользователь с такой почтой уже зарегистрирован' });
    });
};

export default (app) => {
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
};

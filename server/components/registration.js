import bodyParser from 'body-parser';
import db from './db';


const jsonParser = bodyParser.json();
// check for user with same mail
const chekUser = async (req, res, next) => {
  try {
    await db.none('SELECT mail FROM users WHERE mail = $1', [req.body.mail]);
    console.log('here')
    await next();
  } catch (e) {
    console.log(e)
    res.status(403).json({ message: 'Пользователь с такой почтой уже зарегистрирован' });
  }
};

export default (app) => {
  // New User Registration
  app.post('/users/signin', jsonParser, chekUser, async (req, res) => {
    const user = {
      name: req.body.name,
      mail: req.body.mail,
      phone: req.body.phone,
      password: req.body.password,
    };
    try {
      await db.none(`INSERT INTO users (name, mail, password, phone)
      VALUES ($1, $2, $3, $4)`, [user.name, user.mail, user.password, user.phone]);
      res.json({ message: 'Успешно зарегистрирован' });
    } catch (e) {
      res.sendStatus(500);
    }
  });
};

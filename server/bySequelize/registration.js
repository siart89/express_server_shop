import bodyParser from 'body-parser';
import User from './dbTables/User';


const jsonParser = bodyParser.json();
// check for user with same mail

const chekUser = async (req, res, next) => {
  try {
    const match = await User.findOne({
      where: {
        mail: req.body.mail,
      },
    });
    if (!match.dataValues) {
      next();
    } else {
      res.status(403).send('Пользователь с такой почтой уже зарегистрирован');
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export default (app) => {
  // New User Registration
  app.post('/users/signin', jsonParser, chekUser, async (req, res) => {
    try {
      await User.create({
        name: req.body.name,
        mail: req.body.mail,
        phone: req.body.phone,
        password: req.body.password,
      });
      res.json({ message: 'Успешно зарегистрирован' });
    } catch (e) {
      res.sendStatus(500);
    }
  });
};

import bodyParser from 'body-parser';
import db from './db';
import { checkToken } from './authorization';

const jsonParser = bodyParser.json();
// path for local server
const setBooksInfo = async (req, res, next) => {
  try {
    await db.none(`INSERT INTO books (user_id, title, author, description, cover, price, category)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [req.id, req.body.title, req.body.author,
      req.body.description, req.body.url, req.body.price, req.body.category]);
    await next();
  } catch (e) {
    res.sendStatus(500);
  }
};

export default (app, upload) => {
  // add and get immediately book cover
  app.post('/api/book/cover', upload.single('cover'), (req, res) => {
    const mypath = `http://localhost:3000/resources/${req.file.filename}`;
    res.status(200).json({ path: mypath });
  });

  app.post('/api/user/books', checkToken, jsonParser, setBooksInfo, (req, res) => {
    if (req.userInfo) {
      res.status(200).json({
        token: req.userInfo.token,
        refreshToken: req.userInfo.refreshToken,
      });
    } else {
      res.sendStatus(200);
    }
  });
};

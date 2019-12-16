import bodyParser from 'body-parser';
import { as } from 'pg-promise';
import db from './db';

const jsonParser = bodyParser.json();

export default (app) => {
  app.get('/products/all', async (req, res) => {
    try {
      const data = await db.any('SELECT * FROM books');
      res.status(200).json(data);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.post('/live/search/', jsonParser, async (req, res) => {
    db.task(async (t) => {
      const text = as.value(req.body.find);
      const titles = await t.any(`SELECT title FROM books 
        WHERE title ILIKE '$1:value%'`, [text]);
      const authors = await t.any(`SELECT author FROM books 
        WHERE author ILIKE '$1:value%'`, [text]);
      return {
        titles,
        authors,
      };
    })
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  });
};

import db from './db';

const newProd = (app) => {
  app.use('/product/news', async (req, res) => {
    const maxDate = new Date();
    const minDate = new Date(maxDate - (60 * 60 * 24 * 1000));
    try {
      const data = await db.any(`SELECT * FROM books 
        WHERE (created_at < $1 AND created_at >= $2);`, [maxDate, minDate]);
      res.status(200).json(data);
    } catch (e) {
      res.sendStatus(500);
      console.log(e);
    }
  });
};

export default newProd;

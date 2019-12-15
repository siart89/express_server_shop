import db from './db';
import { checkToken } from './authorization';


const setUrl = (req, res, next) => {
// path for local server
  const mypath = `http://localhost:3000/resources/${req.file.filename}`;
  db.none('UPDATE users SET avatar = $1 WHERE id = $2 ', [mypath, req.id])
    .then(() => {
      req.avaterPath = mypath;
      next();
    })
    .catch(() => {
      res.sendStatus(403);
    });
};

export default (app, upload) => {
  app.post('/profile/avatar', upload.single('avatar'), checkToken, setUrl, (req, res) => {
    if (req.userInfo) {
      res.status(200).json({
        token: req.userInfo.token,
        refreshToken: req.userInfo.refreshToken,
        url: req.avaterPath,
      });
    } else {
      res.status(200).json({ url: req.avaterPath });
    }
  });
};

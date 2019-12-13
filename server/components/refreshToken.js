import db from './db';
import { makeNewSession } from './authentication';

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

export default (app) => {
  app.get('/refresh', useRefreshToken, (req, res) => {
    res.json({ token: req.userInfo.token, refreshToken: req.userInfo.refreshToken });
  });
};

import { sequelize } from './sequelize';
import User from './dbTables/User';
import Book from './dbTables/Book';
import Favorite from './dbTables/Favorite';
import Session from './dbTables/Session';
import Comment from './dbTables/Comment';

User.hasMany(Book);
Book.hasMany(Comment);
Favorite.belongsTo(User);
Favorite.belongsTo(Book);
Session.belongsTo(User);

export default () => {
  sequelize.sync()
    .then(async () => {
      console.log('started');
    })
    .catch((err) => console.log(err));
};

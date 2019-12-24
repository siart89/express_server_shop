import { sequelize, Sequelize } from '../sequelize';

export default sequelize.define('comment', {
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  isRead: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  authorName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
});

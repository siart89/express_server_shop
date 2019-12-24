import { sequelize, Sequelize } from '../sequelize';

export default sequelize.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descriprion: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  cover: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.REAL,
    allowNull: false,
  },
  rating: {
    type: Sequelize.REAL,
    defaultValue: null,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sale: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

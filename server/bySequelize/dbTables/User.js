import { sequelize, Sequelize } from '../sequelize';

export default sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mail: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  avatar: {
    type: Sequelize.TEXT,
  },
  phone: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

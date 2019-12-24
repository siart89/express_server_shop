import { sequelize, Sequelize } from '../sequelize';

export default sequelize.define('session', {
  name: {
    type: Sequelize.STRING,
  },
  ip: {
    type: Sequelize.CIDR,
  },
  os: {
    type: Sequelize.TEXT,
  },
  browser: {
    type: Sequelize.TEXT,
  },
  userAgent: {
    type: Sequelize.TEXT,
  },
  refreshToken: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

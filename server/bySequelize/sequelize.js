import Sequelize from 'sequelize';

const sequelize = new Sequelize('shopdb', 'postgres', 'drevnieslezi2012', {
  dialect: 'postgres',
});


export {
  Sequelize,
  sequelize,
};

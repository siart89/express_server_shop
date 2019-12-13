const pgp = require('pg-promise')({
    promiseLib: Promise,
  });
  
  const cn = {
    host: 'localhost',
    port: 5432,
    database: 'mydb',
    user: 'postgres',
    password: 'drevnieslezi2012',
  };
const db = pgp(cn);

module.exports = db;
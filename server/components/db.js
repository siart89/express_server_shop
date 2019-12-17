import pgp from 'pg-promise';

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'mydb',
  user: 'postgres',
  password: 'drevnieslezi2012',
};
const db = pgp()(cn);

export default db;

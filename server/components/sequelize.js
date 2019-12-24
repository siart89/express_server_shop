import Sequelize from 'sequelize';

const sequelize = new Sequelize('shopdb', 'postgres', 'drevnieslezi2012', {
  dialect: 'postgres',
});

const User = sequelize.define('user', {
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

const Session = sequelize.define('session', {
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

const Book = sequelize.define('book', {
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

const Comment = sequelize.define('comment', {
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

const Favorite = sequelize.define('favorite');

User.hasMany(Book);
Book.hasMany(Comment);
Favorite.belongsTo(User);
Favorite.belongsTo(Book);
Session.belongsTo(User);

export default sequelize;

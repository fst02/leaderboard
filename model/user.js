const Sequelize = require('sequelize');

const sequelize = new Sequelize('leaderboard', 'student', 'braininghub', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('users', {
  nickname: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  introduction: {
    type: Sequelize.STRING,
  },
});

module.exports = User;

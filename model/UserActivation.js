const Sequelize = require('sequelize');
const User = require('./User');

const sequelize = new Sequelize('leaderboard', 'student', 'braininghub', {
  host: 'localhost',
  dialect: 'mysql',
});

const UserActivation = sequelize.define('user_activations', {
  token: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  expiredAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

User.hasOne(UserActivation);

module.exports = UserActivation;

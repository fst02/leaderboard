const Sequelize = require('sequelize');
const Scoreboard = require('./Scoreboard');

const sequelize = new Sequelize('leaderboard', 'student', 'braininghub', {
  host: 'localhost',
  dialect: 'mysql',
});
const Games = sequelize.define('games', {
  game: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 255],
    },
  },
});

module.exports = Games;

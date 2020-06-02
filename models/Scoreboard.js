const Sequelize = require('sequelize');

const sequelize = new Sequelize('leaderboard', 'student', 'braininghub', {
  host: 'localhost',
  dialect: 'mysql',
});

const Scoreboard = sequelize.define('scoreboard', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 255],
    },
  },
  game: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 255],
    },
  },
  topScore: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      isNumeric: true,
    },
  },
  numberOfRounds: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      isNumeric: true,
    },
  },
});

module.exports = Scoreboard;

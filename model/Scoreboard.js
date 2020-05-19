const Sequelize = require('sequelize');

const sequelize = new Sequelize('leaderboard', 'student', 'braininghub', {
  host: 'localhost',
  dialect: 'mysql',
});

const Scoreboard = sequelize.define('scoreboard', {
  name: {
    type: Sequelize.STRING,
  },
  game: {
    type: Sequelize.STRING,
  },
  topScore: {
    type: Sequelize.INTEGER,
  },
  numberOfRounds: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Scoreboard;

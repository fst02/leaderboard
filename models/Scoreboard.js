const Sequelize = require('sequelize');
const User = require('./User');
const Game = require('./Game');

const sequelize = new Sequelize('leaderboard', 'student', 'braininghub', {
  host: 'localhost',
  dialect: 'mysql',
});

const Scoreboard = sequelize.define('scoreboard', {
  topScore: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      isNumeric: true,
    },
  },
  numberOfWins: {
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
  country: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      len: [1, 255],
    },
  },
  city: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      len: [1, 255],
    },
  },
});

User.hasMany(Scoreboard);
Scoreboard.belongsTo(User);
Game.hasMany(Scoreboard);
Scoreboard.belongsTo(Game);

module.exports = Scoreboard;

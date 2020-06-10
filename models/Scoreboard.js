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
  },
  numberOfWins: {
    type: Sequelize.INTEGER,
  },
  numberOfRounds: {
    type: Sequelize.INTEGER,
  },
  country: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false,
      len: [1, 255],
    },
  },
  city: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false,
      len: [1, 255],
    },
  },
});

User.hasMany(Scoreboard);
Scoreboard.belongsTo(User);
Game.hasMany(Scoreboard);
Scoreboard.belongsTo(Game);

module.exports = Scoreboard;

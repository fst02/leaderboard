const Sequelize = require('sequelize');
const importData = require('./data.json');

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

const seedScoreboard = async () => {
  await Scoreboard.sync({ force: true });
  importData.forEach((data) => {
    Scoreboard.create(data);
  });
};
const selectScoreboard = async () => {
  const results = await Scoreboard.findAll();
  results.forEach((result) => console.log({ id: result.id, name: result.name }));
};
//seedScoreboard();
selectScoreboard();

const Scoreboard = require('./config_table.js');
const importData = require('./data.json');

const seedScoreboard = async () => {
  await Scoreboard.sync({ force: true });
  importData.forEach((data) => {
    Scoreboard.create(data);
  });
};

seedScoreboard();

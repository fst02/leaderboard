const Scoreboard = require('../models/Scoreboard.js');
const importData = require('./data.json');

const seedScoreboard = async () => {
  importData.forEach((data) => {
    Scoreboard.create(data);
  });
};

seedScoreboard();

const Scoreboard = require('../models/Scoreboard');
const importData = require('./scoreboard.json');

const seedScoreboard = async () => {
  importData.forEach((data) => {
    Scoreboard.create(data);
  });
};

seedScoreboard();

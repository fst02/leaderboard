const Scoreboard = require('../models/Scoreboard');
const importData = require('./scoreboard.json');

module.exports = {
  seedScoreboard: async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const row of importData) {
      await Scoreboard.create(row);
    }
  },
};

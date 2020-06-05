const Game = require('../models/Game');
const games = require('./games.json');

module.exports = {
  seedGame: async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const row of games) {
      await Game.create(row);
    }
  },
};

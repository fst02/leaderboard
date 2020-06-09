const games = require('./games.json');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('games', games.map((game) => Object.assign(game, { createdAt: new Date(), updatedAt: new Date() }))),

  down: (queryInterface) => queryInterface.bulkDelete('games', null, {}),
};

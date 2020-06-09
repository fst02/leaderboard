const scoreboard = require('./scoreboard.json');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('scoreboards', scoreboard.map((score) => Object.assign(score, { createdAt: new Date(), updatedAt: new Date() }))),

  down: (queryInterface) => queryInterface.bulkDelete('scoreboards', null, {}),
};

const Scoreboard = require('../models/Scoreboard');
const User = require('../models/User');
const Game = require('../models/Game');

const select = async (orderColumn = 'topScore', orderDirection = 'DESC', game = 'All', offset = '0') => {
  const whereStatement = {};
  if (game !== 'All') {
    whereStatement.game = game;
  }
  const results = await Scoreboard.findAll({
    limit: 5,
    offset: parseInt(offset, 10),
    where: whereStatement,
    order: [[orderColumn, orderDirection]],
    include: [User, Game],
  });
  const exportData = [];
  results.forEach((result) => {
    exportData.push({
      id: result.id,
      name: result.user.nickname,
      game: result.game.game,
      topScore: result.topScore,
      numberOfRounds: result.numberOfRounds,
    });
  });
  return exportData;
};

module.exports = {
  select,
};

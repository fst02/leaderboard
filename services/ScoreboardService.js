const Scoreboard = require('../models/Scoreboard');

const select = async (orderColumn = 'topScore', orderDirection = 'DESC', game = 'All') => {
  const whereStatement = {};
  if (game !== 'All') {
    whereStatement.game = game;
  }
  const results = await Scoreboard.findAll({
    where: whereStatement,
    order: [[orderColumn, orderDirection]],
  });
  const exportData = [];
  results.forEach((result) => {
    exportData.push({
      id: result.id,
      name: result.name,
      game: result.game,
      topScore: result.topScore,
      numberOfRounds: result.numberOfRounds,
    });
  });
  return exportData;
};

module.exports = {
  select,
};

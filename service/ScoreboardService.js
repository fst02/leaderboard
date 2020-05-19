const Scoreboard = require('../models/Scoreboard');

const select = async (orderByColumn = 'topScore', order = 'DESC', game) => {
  const whereStatement = {};
  if (game !== undefined && game !== 'All') {
    whereStatement.game = game;
  }
  const results = await Scoreboard.findAll({
    where: whereStatement,
    order: [[orderByColumn, order]],
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

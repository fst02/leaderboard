const Scoreboard = require('./config_table.js');
const selectScoreboard = async (orderByColumn = 'topScore', order = 'DESC', game) => {
  const whereStatement = {};
  if (game !== undefined && game !== 'All') {
    // whereStatement.where = { game: `${game}` };
    whereStatement.game = game;
  }
  console.log(`WHERESTATEMENT: ${whereStatement}`);
  const results = await Scoreboard.findAll({ where: whereStatement, order: [[`${orderByColumn}`, `${order}`]] });
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
  selectScoreboard: selectScoreboard,
};

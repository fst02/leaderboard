const Scoreboard = require('./config_table.js');
const selectScoreboard = async (orderByColumn = 'topScore', order = 'DESC', game) => {
  const results = await Scoreboard.findAll({ where: { game: `${game}` }, order: [[`${orderByColumn}`, `${order}`]] });
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

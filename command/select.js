const Scoreboard = require('./config_table.js');

const selectScoreboard = async () => {
  const results = await Scoreboard.findAll();
  const exportData = [];
  results.forEach((result) => {
  exportData.push({
    id: result.id,
    name: result.name,
    game: result.game,
    topScore: result.topScore,
    numberOfRounds: result.numberOfRounds
    });
  });
  return exportData;
};

// selectScoreboard();

module.exports = selectScoreboard();

const Scoreboard = require('../models/Scoreboard');
const User = require('../models/User');
const Game = require('../models/Game');

const buildWhereStatement = (gameId) => {
  const whereStatement = {};
  if (gameId !== 'All') {
    whereStatement.gameId = gameId;
  }
  return whereStatement;
};

const buildOrderStatement = (orderColumn, orderDirection) => {
  let orderStatement = [[orderColumn, orderDirection]];
  if (orderColumn === 'name') {
    orderStatement = [[{ model: User }, 'nickname', orderDirection]];
  } else if (orderColumn === 'game') {
    orderStatement = [[{ model: Game }, 'game', orderDirection]];
  }
  return orderStatement;
};

const mapScoreboardDataToTable = (scoreboardData) => {
  const exportData = [];
  scoreboardData.forEach((result) => {
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

const select = async (orderColumn = 'topScore', orderDirection = 'DESC', gameId = 'All', offset = '0') => {
  const whereStatement = buildWhereStatement(gameId);
  const orderStatement = buildOrderStatement(orderColumn, orderDirection);
  const results = await Scoreboard.findAll({
    limit: 5,
    offset: parseInt(offset, 10),
    where: whereStatement,
    order: orderStatement,
    include: [User, Game],
  });
  const exportData = mapScoreboardDataToTable(results);
  return exportData;
};

module.exports = {
  select,
};

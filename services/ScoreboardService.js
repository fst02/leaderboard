const Scoreboard = require('../models/Scoreboard');
const User = require('../models/User');
const Game = require('../models/Game');

const select = async (orderColumn = 'topScore', orderDirection = 'DESC', gameId = 'All', offset = '0') => {
  const whereStatement = {};
  let orderStatement = [[orderColumn, orderDirection]];
  if (gameId !== 'All') {
    whereStatement.gameId = gameId;
  }
  if (orderColumn === 'name') {
    orderStatement = [[{ model: User }, 'nickname', orderDirection]];
  } else if (orderColumn === 'game') {
    orderStatement = [[{ model: Game }, 'game', orderDirection]];
  }
  const results = await Scoreboard.findAll({
    limit: 5,
    offset: parseInt(offset, 10),
    where: whereStatement,
    order: orderStatement,
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

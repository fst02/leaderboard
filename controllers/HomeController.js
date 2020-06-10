const ScoreboardService = require('../services/ScoreboardService');

const scoreboard = (req, res) => {
  const {
    order,
    game,
    orderByColumn,
  } = req.query;
  const offset = req.query.offset || '0';
  ScoreboardService.select(orderByColumn, order, game, offset).then((data) => {
    const loggedIn = req.session.loggedIn === true;
    res.render('home/scoreboard', {
      title: 'Leaderboard',
      scoreboard: data,
      loggedIn,
      game: game || 'All',
      nickname: req.session.nickname,
      previousOffset: Math.max(0, parseInt(offset, 10) - 5),
      nextOffset: parseInt(offset, 10) + 5,
    });
  });
};

module.exports = {
  scoreboard,
};

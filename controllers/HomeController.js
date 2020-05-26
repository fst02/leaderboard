const ScoreboardService = require('../services/ScoreboardService');

const scoreboard = (req, res) => {
  const { order, game, orderByColumn } = req.query;
  ScoreboardService.select(orderByColumn, order, game).then((data) => {
    const loggedIn = req.session.loggedIn === true;
    res.render('index', {
      title: 'Leaderboard',
      scoreboard: data,
      loggedIn,
      game: game || 'All',
    });
  });
};

module.exports = {
  scoreboard,
};
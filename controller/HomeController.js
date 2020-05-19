const ScoreboardService = require('../service/ScoreboardService');

const scoreboard = (req, res) => {
  const { order, game, orderByColumn } = req.query;
  ScoreboardService.select(orderByColumn, order, game).then((data) => {
    res.render('index', { title: 'Leaderboard', scoreboard: data });
  });
};

module.exports = {
  scoreboard,
};

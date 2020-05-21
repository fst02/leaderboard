const ScoreboardService = require('../service/ScoreboardService');

const scoreboard = (req, res) => {
  const { order, game, orderByColumn } = req.query;
  ScoreboardService.select(orderByColumn, order, game).then((data) => {
    let loggedIn = req.session.loggedIn === true;
    res.render('index', { title: 'Leaderboard', scoreboard: data, loggedIn: loggedIn });
  });
};

module.exports = {
  scoreboard,
};

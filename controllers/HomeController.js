const ScoreboardService = require('../services/ScoreboardService');

const scoreboard = (req, res) => {
  try {
    const {
      order,
      gameId,
      orderByColumn,
    } = req.query;
    const offset = req.query.offset || '0';
    ScoreboardService.select(orderByColumn, order, gameId, offset).then((data) => {
      const loggedIn = req.session.loggedIn === true;
      console.log(data);
      res.render('home/scoreboard', {
        title: 'Leaderboard',
        scoreboard: data,
        loggedIn,
        gameId: gameId || 'All',
        nickname: req.session.nickname,
        previousOffset: Math.max(0, parseInt(offset, 10) - 5),
        nextOffset: parseInt(offset, 10) + 5,
        order: order || 'DESC',
        orderByColumn: orderByColumn || 'topScore',
      });
    });
  } catch (err) {
    console.log(err);
    res.render('error', { error: err });
  }
};

module.exports = {
  scoreboard,
};

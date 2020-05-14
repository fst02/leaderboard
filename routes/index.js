const express = require('express');
const selectScoreboard = require('../command/select.js');

const router = express.Router();
const scoreboard = selectScoreboard;

/* GET home page. */
router.get('/', (req, res) => {
  const orderBy = req.query.orderByColumn;
  const order = req.query.order;
  scoreboard.selectScoreboard(orderBy, order).then((data) => {
    res.render('index', { title: 'Leaderboard', scoreboard: data });
  });
});

module.exports = router;

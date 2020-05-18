const express = require('express');
const selectScoreboard = require('../command/select.js');
const UserController = require('../controller/UserController.js');

const targetUrl = '/';
const router = express.Router();

const scoreboard = selectScoreboard;

/* GET home page. */
router.get('/', (req, res) => {
  const orderBy = req.query.orderByColumn;
  const order = req.query.order;
  const game = req.query.game;
  scoreboard.selectScoreboard(orderBy, order, game).then((data) => {
    res.render('index', { title: 'Leaderboard', scoreboard: data });
  });
});
router.post('/register', async (req, res) => {
  try {
    await UserController.create(req.body);
    res.redirect(targetUrl);
  } catch (err) {
    res.render('error', { message: 'Username is already taken! :(' });
  }
});
router.get('/register', (req, res) => {
  res.render('register');
});


module.exports = router;

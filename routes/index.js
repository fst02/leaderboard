const express = require('express');
const selectScoreboard = require('../command/select.js');
const postUser = require('../command/post.js');
const targetUrl = '/';
const router = express.Router();

const scoreboard = selectScoreboard;
const userdata = postUser;

/* GET home page. */
router.get('/', (req, res) => {
  const orderBy = req.query.orderByColumn;
  const order = req.query.order;
  const game = req.query.game;
  scoreboard.selectScoreboard(orderBy, order, game).then((data) => {
    res.render('index', { title: 'Leaderboard', scoreboard: data });
  });
});
router.post('/', async (req, res) => {
  const userPostData = {
    nickname: req.body.nickname,
    email: req.body.email,
    password: req.body.password,
    passwordRepeat: req.body.passwordRepeat,
    introduction: req.body.introduction,
  };
  try {
    await userdata.postUser(userPostData);
    res.redirect(targetUrl);
  } catch (err) {
    res.render('error', { message: 'Username is already taken! :(' });
  }
});
router.get('/register', (req, res) => {
  res.render('register');
});


module.exports = router;

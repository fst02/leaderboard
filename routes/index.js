const express = require('express');
const multer = require('multer');
const selectScoreboard = require('../command/select.js');
const UserController = require('../controller/UserController.js');

const upload = multer({ dest: 'public/images/' });

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
router.post('/register', upload.single('imageUpload'), async (req, res) => {
  try {
    let filename = null;
    if (req.file !== undefined) {
      filename = req.file.filename;
    }
    const userData = Object.assign(req.body, { avatar: filename });
    await UserController.create(userData);
    res.redirect(targetUrl);
  } catch (err) {
    console.log(err);
    res.render('error', { validationError: err });
  }
});
router.get('/register', (req, res) => {
  res.render('register');
});


module.exports = router;

const fs = require('fs');
const hasha = require('hasha');
const path = require('path');
const url = require('url');
const { serializeError } = require('serialize-error');
const User = require('../models/User');
const Scoreboard = require('../models/Scoreboard');
const Game = require('../models/Game');
const ImageService = require('../services/ImageService');

module.exports = {
  show: async (req, res) => {
    const user = await User.findOne({
      where: { id: req.session.userId },
    });
    const userScores = await Scoreboard.findAll({
      where: { userId: req.session.userId },
      include: [User, Game],
    });
    const loggedIn = req.session.loggedIn === true;
    res.render('profile/show', {
      loggedIn,
      nickname: req.session.nickname,
      userScores: JSON.parse(JSON.stringify(userScores)),
      user: JSON.parse(JSON.stringify(user)),
    });
  },

  edit: async (req, res) => {
    const { introduction } = req.query;
    const loggedIn = req.session.loggedIn === true;
    const user = await User.findOne({
      where: { id: req.session.userId },
    });
    res.render('profile/edit', {
      validationError: req.session.error,
      introduction,
      loggedIn,
      nickname: req.session.nickname,
      user: JSON.parse(JSON.stringify(user)),
    });
  },

  delete: async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.session.userId } });
      const absolutePath = path.join(__dirname, '../public/images/', user.avatar);
      fs.unlink(absolutePath, (err) => {
        if (err) console.log(err.message);
      });
      await User.update({ avatar: null }, { where: { id: user.id } });
      res.send('OK');
    } catch (err) {
      console.log(err);
      res.send('Image delete error');
    }
  },

  update: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { id: req.session.userId },
      });
      const avatar = ImageService.changeImage(req.file, user.avatar);
      let { password } = user;
      if (req.body.newPassword === req.body.passwordRepeat && req.body.newPassword) {
        password = hasha(req.body.newPassword);
      }
      if (user.password === hasha(req.body.currentPassword)) {
        await User.update(
          {
            introduction: req.body.introduction,
            avatar,
            password,
          },
          { where: { id: user.id } },
        );
      }
      res.redirect('/profile/show');
    } catch (err) {
      console.log(err);
      req.session.error = serializeError(err);
      res.redirect(303, url.format({
        pathname: '/profile/edit',
        query: {
          introduction: req.body.introduction,
        },
      }));
    }
  },
};

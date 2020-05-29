const fs = require('fs');
const hasha = require('hasha');
const path = require('path');
const readChunk = require('read-chunk');
const imageType = require('image-type');
const url = require('url');
const { serializeError } = require('serialize-error');
const User = require('../models/User');

module.exports = {
  show: async (req, res) => {
    const user = await User.findOne({
      where: { id: req.session.userId },
    });
    const loggedIn = req.session.loggedIn === true;
    res.render('profile/show', {
      loggedIn,
      nickname: req.session.nickname,
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
      let { avatar } = user;
      if (req.file) {
        const buffer = readChunk.sync(path.join(__dirname, `../public/images/${req.file.filename}`), 0, 12);
        if (imageType(buffer).mime.includes('image')) {
          avatar = req.file.filename;
        }
        if (user.avatar) {
          const absolutePath = path.join(__dirname, '../public/images/', user.avatar);
          fs.unlink(absolutePath, (err) => {
            if (err) console.log(err.message);
          });
        }
      }
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

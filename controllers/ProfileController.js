const fs = require('fs');
const hasha = require('hasha');
const path = require('path');
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
    const loggedIn = req.session.loggedIn === true;
    const user = await User.findOne({
      where: { id: req.session.userId },
    });
    res.render('profile/edit', {
      loggedIn,
      nickname: req.session.nickname,
      user: JSON.parse(JSON.stringify(user)),
    });
  },

  update: async (req, res) => {
    const user = await User.findOne({
      where: { id: req.session.userId },
    });
    let { avatar } = user;
    if (req.file) {
      if (user.avatar) {
        const absolutePath = path.join(__dirname, '../public/images/', user.avatar);
        fs.unlink(absolutePath, (err) => {
          if (err) throw err;
          console.log('File deleted!');
        });
      }
      avatar = req.file.filename;
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
  },
};

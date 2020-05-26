const User = require('../models/User');

module.exports = {
  show: async (req, res) => {
    const user = await User.findOne({
      where: { id: req.session.userId },
    });
    const loggedIn = req.session.loggedIn === true;
    res.render('profile', {
      loggedIn,
      user: JSON.parse(JSON.stringify(user)),
    });
  },

  edit: async (req, res) => {
    const loggedIn = req.session.loggedIn === true;
    const user = await User.findOne({
      where: { id: req.session.userId },
    });
    res.render('editProfile', {
      loggedIn,
      user: JSON.parse(JSON.stringify(user)),
    });
  },

  update: async (req, res) => {
    const user = await User.findOne({
      where: { id: req.session.userId },
    });
    let { avatar } = user;
    if (req.file) {
      avatar = req.file.filename;
    }
    if (user.password === req.body.currentPassword) {
      await User.update(
        {
          introduction: req.body.introduction,
          avatar,
        },
        { where: { id: user.id } },
      );
    }
    res.redirect('/profile/show');
  },

};

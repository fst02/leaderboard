const hasha = require('hasha');
const User = require('../models/User');

const targetUrl = '/';

module.exports = {
  logIn: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { email: req.body.email, password: hasha(req.body.password) },
      });
      if (user && user.isVerified === true) {
        req.session.loggedIn = true;
        req.session.userId = user.id;
        req.session.nickname = user.nickname;
        res.send('confirmed');
      } else {
        throw new Error('Invalid email/password or not verified user');
      }
    } catch (err) {
      console.log(`Login error: ${err}`);
      res.send(` ${err}`);
    }
  },

  logOut: async (req, res) => {
    req.session.loggedIn = false;
    res.redirect(targetUrl);
  },
};

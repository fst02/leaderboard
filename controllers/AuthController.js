const User = require('../models/User');

const targetUrl = '/';

module.exports = {
  logIn: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { email: req.body.email, password: req.body.password },
      });
      if (user && user.isVerified === true) {
        req.session.loggedIn = true;
        req.session.userId = user.id;
        res.redirect(targetUrl);
      }
    } catch (err) {
      console.log(`Login error: ${err}`);
      res.send('Erre születni kell.');
    }
  },

  logOut: async (req, res) => {
    req.session.loggedIn = false;
    res.redirect(targetUrl);
  },

};
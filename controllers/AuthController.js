const User = require('../models/User');
const HashingService = require('../services/HashingService');

const targetUrl = '/';

const logIn = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email, password: HashingService.hashString(req.body.password) },
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
};

const logOut = async (req, res) => {
  req.session.loggedIn = false;
  res.redirect(targetUrl);
};

module.exports = {
  logIn,
  logOut,
};

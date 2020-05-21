const cryptoRandomString = require('crypto-random-string');
const session = require('express-session');
const User = require('../models/User');
const MailerService = require('../service/MailerService');
const UserActivation = require('../models/UserActivation');
const ValidationService = require('../service/ValidationService');

const targetUrl = '/';

const token = cryptoRandomString({ length: 15, type: 'url-safe' });

const create = async (userData) => {
  if (userData.password !== userData.passwordRepeat) {
    throw new Error('Passwords do not match');
  }
  const user = await User.create(userData);
  const expiredAt = new Date();
  expiredAt.setHours(expiredAt.getHours() + 24);
  await UserActivation.create({ token, expiredAt, userId: user.id });
  MailerService.send(
    userData.email,
    'Confirmation email',
    `Let's confirm your email address.
    Please finish your registration by clicking on the link below:
    http://fullstack.braininghub.com:3000/verify?token=${token}`,
  );
};

const register = async (req, res) => {
  try {
    let filename = null;
    if (req.file !== undefined) {
      filename = req.file.filename;
    }
    const userData = Object.assign(req.body, { avatar: filename });
    await create(userData);
    res.redirect(targetUrl);
  } catch (err) {
    console.log(err);
    res.render('error', { validationError: err });
  }
};

const verify = async (req, res) => {
  try {
    const currentDate = new Date();
    const result = await ValidationService.select(req.query.token);
    if (result.length !== 0 && result[0].expiredAt >= currentDate) {
      ValidationService.setToVerified(result[0].userId);
    }
    res.redirect(targetUrl);
  } catch (err) {
    console.log(`verify error: ${err}`);
  }
};

const select = async (req, res) => {
  try {
    const results = await User.findAll({
      where: { email: req.body.email, password: req.body.password },
    });
    if (results.length !== 0 && results[0].isVerified === true) {
      req.session.loggedIn = true;
      res.redirect(targetUrl);
    }
  } catch (err) {
    console.log(`Login error: ${err}`);
    res.send('Erre születni kell.');
  }
};

const logOut = async (req, res) => {
  req.session.loggedIn = false;
  res.redirect(targetUrl);
};

module.exports = {
  create,
  register,
  verify,
  select,
  logOut,
};

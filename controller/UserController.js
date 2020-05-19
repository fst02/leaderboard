const cryptoRandomString = require('crypto-random-string');
const User = require('../models/User');
const MailerService = require('../service/MailerService');
const UserActivation = require('../models/UserActivation');

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
    http://fullstack.braininghub.com:3000/${token}`,
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

module.exports = {
  create,
  register,
};

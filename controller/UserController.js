const User = require('../model/User');
const MailerService = require('../service/MailerService');

const targetUrl = '/';

const create = async (userData) => {
  if (userData.password !== userData.passwordRepeat) {
    throw new Error('Passwords do not match');
  }
  await User.create(userData);
  MailerService.send(userData.email, 'testsubject', 'testtext');
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

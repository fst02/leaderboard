const User = require('../model/user');
const MailerService = require('../service/MailerService');

const create = async (userData) => {
  if (userData.password !== userData.passwordRepeat) {
    throw new Error('Passwords do not match');
  }
  await User.create(userData);
  MailerService.send(userData.email, 'testsubject', 'testtext');
};

module.exports = {
  create,
};

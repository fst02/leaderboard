const User = require('../model/user.js');

const create = async (userData) => {
  if (userData.password !== userData.passwordRepeat) {
    throw new Error('Passwords do not match');
  }
  await User.create(userData);
};

module.exports = {
  create,
};

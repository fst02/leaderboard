const User = require('../model/user.js');

const create = async (userData) => {
  const existingUsers = await User.findAll({ where: { nickname: userData.nickname } });
  if (existingUsers.length > 0) {
    throw new Error('Username already exist.');
  }
  if (userData.password.length < 6) {
    throw new Error('Password needs to be longer than 6 characters!');
  }
  User.create(userData);
};

module.exports = {
  create,
};

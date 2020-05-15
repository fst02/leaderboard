const UserData = require('../model/userData.js');

const postUser = async (userPostData) => {
  const username = await UserData.findAll({ where: { nickname: userPostData.nickname } });
  if (username.length === 0) {
    UserData.create(userPostData);
  } else {
    throw new Error('Username already exist.');
  }
};

module.exports = {
  postUser: postUser,
};

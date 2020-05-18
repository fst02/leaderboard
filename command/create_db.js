const UserData = require('../model/user.js');

const createUserData = async () => {
  UserData.sync({ force: true });
};

createUserData();

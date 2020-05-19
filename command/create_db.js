const UserData = require('../model/user.js');
const UserActivation = require('../model/userActivation');

const createUserData = async () => {
  await UserData.sync({ force: true });
  await UserActivation.sync({ force: true });
};

createUserData();

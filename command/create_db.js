const UserData = require('../model/userData.js');

const createUserData = async () => {
  UserData.sync({ force: true });
};

createUserData();

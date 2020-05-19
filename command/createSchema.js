const User = require('../model/User');
const UserActivation = require('../model/UserActivation');

const createSchema = async () => {
  await User.sync({ force: true });
  await UserActivation.sync({ force: true });
};

createSchema();

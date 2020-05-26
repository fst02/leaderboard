const UserActivation = require('../models/UserActivation');
const User = require('../models/User');

const select = async (token) => {
  const results = await UserActivation.findAll({
    where: { token },
  });
  const exportData = [];
  results.forEach((result) => {
    exportData.push({
      userId: result.userId,
      token: result.token,
      expiredAt: result.expiredAt,
    });
  });
  return exportData;
};

const setToVerified = async (userId) => {
  await User.update(
    { isVerified: true },
    { where: { id: userId } },
  );
};

module.exports = {
  select,
  setToVerified,
};

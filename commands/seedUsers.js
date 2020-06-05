const User = require('../models/User');
const importData = require('./users.json');

module.exports = {
  seedUsers: async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const row of importData) {
      await User.create(row);
    }
  },
};

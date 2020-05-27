const User = require('../models/User');
const importData = require('./users.json');

const seedUsers = async () => {
  importData.forEach((data) => {
    User.create(data);
  });
};

seedUsers();

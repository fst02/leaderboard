const SeedUsers = require('./seedUsers');
const SeedScoreboard = require('./seedScoreboard');

const seedDatabase = async () => {
  await SeedUsers.seedUsers();
  await SeedScoreboard.seedScoreboard();
};

seedDatabase();

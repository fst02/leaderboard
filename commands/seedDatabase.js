const SeedUsers = require('./seedUsers');
const SeedScoreboard = require('./seedScoreboard');
const SeedGames = require('./seedGames');

const seedDatabase = async () => {
  await SeedUsers.seedUsers();
  await SeedGames.seedGame();
  await SeedScoreboard.seedScoreboard();
};

seedDatabase();

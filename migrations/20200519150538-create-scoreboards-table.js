module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'scoreboards',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      game: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      topScore: {
        type: Sequelize.INTEGER,
      },
      numberOfWins: {
        type: Sequelize.INTEGER,
      },
      numberOfRounds: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      country: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_hungarian_ci',
    },
  ),

  down: (queryInterface) => queryInterface.dropTable('scoreboards'),
};

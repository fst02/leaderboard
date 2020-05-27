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
      },
      game: {
        type: Sequelize.STRING,
      },
      topScore: {
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
    },
    {
      charset: 'utf8',
      collate: 'utf8_hungarian_ci',
    },
  ),

  down: (queryInterface) => queryInterface.dropTable('scoreboards'),
};

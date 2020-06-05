module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'games',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      game: {
        type: Sequelize.STRING,
        allowNull: false,
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
  down: (queryInterface) => queryInterface.dropTable('games'),
};

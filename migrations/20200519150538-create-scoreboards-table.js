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
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      game: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      topScore: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      numberOfWins: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      numberOfRounds: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_hungarian_ci',
    },
  ),

  down: (queryInterface) => queryInterface.dropTable('scoreboards'),
};

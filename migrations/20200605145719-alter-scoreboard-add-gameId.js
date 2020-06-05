module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('scoreboards', 'gameId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'games',
        key: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('scoreboards', 'gameId');
  },
};

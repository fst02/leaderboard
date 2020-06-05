module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn('scoreboards', 'game'),

  down: (queryInterface, Sequelize) => queryInterface.addColumn('scoreboards', 'game', {
    type: Sequelize.STRING,
    allowNull: false,
  }),
};

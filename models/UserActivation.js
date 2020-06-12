const Sequelize = require('sequelize');
const User = require('./User');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const UserActivation = sequelize.define('user_activations', {
  token: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  expiredAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

User.hasOne(UserActivation);

module.exports = UserActivation;

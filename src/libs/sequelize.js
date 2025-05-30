const { Sequelize, Op } = require('sequelize');
const { config } = require('../database/conexion');
const setupModels = require('./../models');

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: 'mysql',
    timezone: "-06:00",
  }
);

const models = setupModels(sequelize);

module.exports = {
  sequelize,
  models: sequelize.models,
  Op 
};

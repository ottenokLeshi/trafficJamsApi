/**
 * Конфигурация базы данных
 */

const databaseConfig = require('../config');
const Sequelize = require('sequelize');

const config = Object.assign({}, {
    username: 'username',
    password: 'password',
    database: 'database',
    host: '127.0.0.1',
    dialect: 'postgres'
}, databaseConfig);

const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;


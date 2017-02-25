const Sequelize = require('sequelize');
const sequelize = require('./../database');

const lines = sequelize.define('lines', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    begin_p: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    end_p: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    weight: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = lines;
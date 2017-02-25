const Sequelize = require('sequelize');
const sequelize = require('./../database');

const points = sequelize.define('points', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    point: {
        type: Sequelize.GEOMETRY('POINT', 4326),
        allowNull: false
    }
});

module.exports = points;
const Sequelize = require('sequelize');
const sequelize = require('./../database');

const Points = sequelize.define('points', {
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

module.exports = Points;

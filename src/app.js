const workWithCoors = require('./helpers/index.js');
const lines = require('../database_side/models/lines');
const points = require('../database_side/models/points');
const methodsDb = require('../database_side/databaseMethods');
const _ = require('lodash');

/**
 * Функция, возвращающая описание ребра
 *
 * @return {Promise} - результат запроса к БД
 */
const getDataFromDb = () => methodsDb.readDb(lines, {
    order: 'id',
    include: [
            { model: points, as: 'begin_point' },
            { model: points, as: 'end_point' }
    ]
});

/**
 * Функция, запускающая алгоритм получения параметров от API
 *
 * @param {Object} window - виртуальное окно
 */
const main = window => {
    getDataFromDb()
        .then(data => {
            const graphArray = data.map(item => {
                const line = item.toJSON();
                return {
                    id: line.id || 1,
                    begin_p: line.begin_p || 1,
                    end_p: line.end_p || 1,
                    begin_point_lat: _.get(line, 'begin_point.point.coordinates[0]', 59.9386300),
                    begin_point_lon: _.get(line, 'begin_point.point.coordinates[1]', 30.3141300),
                    end_point_lat: _.get(line, 'end_point.point.coordinates[0]', 59.9386300),
                    end_point_lon: _.get(line, 'end_point.point.coordinates[1]', 30.3141300),
                };
            });
            workWithCoors(graphArray, window);
        }
    );
};

module.exports = main;

const workWithCoors = require('./helpers/index.js');
const lines = require('../database_side/models/lines');
const points = require('../database_side/models/points');
const methodsDb = require('../database_side/databaseMethods');

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
                return [
                    line.id,
                    line.begin_p,
                    line.end_p,
                    line.begin_point.point.coordinates[0],
                    line.begin_point.point.coordinates[1],
                    line.end_point.point.coordinates[0],
                    line.end_point.point.coordinates[1]
                ];
            });
            workWithCoors(graphArray, window);
        }
    );
};

module.exports = main;

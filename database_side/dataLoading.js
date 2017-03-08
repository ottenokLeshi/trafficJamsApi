/**
 * Загрузка данных для первого запуска БД
 */
const fs = require('fs');
const lines = require('../database_side/models/lines');
const points = require('../database_side/models/points');
const methodsDb = require('./databaseMethods');
const _ = require('lodash');

/**
 * Создание таблицы
 *
 * @param {Object} table - таблица из /models/
 *
 * @return {Promise} - результат создания таблицы
 */
const createTable = table => table.sync().then(() => {
    console.log('Success with creating table!');
}).catch(err => {
    console.log(`Database error: ${err}`);
});

/**
 * Преобразование строк в объекты
 *
 * @param {Array} fileArray - массив строк
 *
 * @return {Array} graphArray - массив объектов
 */
const getObjects = fileArray => {
    const graphArray = fileArray.map(str => {
        const item = str.split(' ');
        return _.omit({
            id: item[0],
            begin_p: item[1],
            end_p: item[2],
            begin_p_lat: item[3],
            begin_p_lon: item[4],
            end_p_lat: item[5],
            end_p_lon: item[6] }, []);
    });
    return graphArray;
};

/**
 * Чтение из файла
 *
 * @return {Array} - массив строк, описывающих ребера графа
 */
const getLinesFromFile = () => {
    const fileArray = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n');
    return getObjects(fileArray);
};

/**
 * Добавление ребер в таблицу БД
 *
 * @param {Array} graphArray - массив объектов
 *
 * @return {Promise} - результат загрузки данных в БД
 */
const loadLinesToDb = graphArray => {
    const elements = graphArray.map(item => {
        const edge = item;
        edge.weight = 0;
        return _.pick(edge, ['id', 'begin_p', 'end_p', 'weight']);
    });
    return methodsDb.createDb(lines, elements).then(() => {
        console.log('Lines were loaded!');
    }).catch(err => {
        console.log(`Database error: ${err}`);
    });
};

/**
 * Функция, выделяющая вершины из графа
 *
 * @param {Array} graphArray - массив объектов
 *
 * @return {Array} - массив объектов, описывающих вершины графа
 */
const getNodes = graphArray => {
    let pointsArray = [];
    /* counter - счетчик для занесения в pointsArray уникальных значений */
    let counter = 1;
    pointsArray = graphArray.map(item => {
        if (parseInt(item.begin_p, 10) === counter) {
            const lat = parseFloat(item.begin_p_lat);
            const lon = parseFloat(item.begin_p_lon);
            const pointGeo = {
                type: 'Point',
                coordinates: [lat, lon],
                crs: { type: 'name', properties: { name: 'EPSG:4326' } }
            };
            console.log(`${item.begin_p}   ${counter}`)
            counter += 1;
            return {
                id: item.begin_p,
                point: pointGeo
            };
        }
        return undefined;
    }).filter(item => !_.isUndefined(item));
    return pointsArray;
};

/**
 * Добавление вершин в таблицу БД
 *
 * @param {Array} graphArray - массив объектов, описывающих ребра
 *
 * @return {Promise} - результат создания таблицы
 */
const loadPointsToDb = graphArray => {
    const elements = getNodes(graphArray);
    return methodsDb.createDb(points, elements).then(() => {
        console.log('Points were loaded!');
    }).catch(err => {
        console.log(`Database error: ${err}`);
    });
};

/**
 * После разрешения двух промисов, в которых происходит создание таблиц (если таблицы не были созданы,
 * происходит заполнение значениями), устанавливается связь между таблицами
 *
 * @return {Promise} - промис, сигнализирующий о заполнении таблиц БД
 */
const firstLaunching = () => {
    const graphArray = getLinesFromFile();
    const linesPromise = createTable(lines).then(() => {
        /*
        * Проверяем, заполнена ли таблица, в,
        * иначе заполняем значениями и вызываем функцию загрузки данных в БД
        */
        methodsDb.readDb(lines).then(data => {
            if (data.length !== 0) {
                return data;
            }
            return loadLinesToDb(graphArray);
        });
    });
    const pointsPromise = createTable(points).then(() => {
        methodsDb.readDb(points).then(data => {
            if (data.length !== 0) {
                return data;
            }
            return loadPointsToDb(graphArray);
        });
    });
    /* Дожидаемся загрузки таблиц и значений в них, и устанавливаем отношения
    * между таблицами
    */
    return Promise.all([linesPromise, pointsPromise]).then(() => {
        points.hasMany(lines, { as: 'begin_point', foreignKey: 'begin_p' });
        points.hasMany(lines, { as: 'end_point', foreignKey: 'end_p' });
        lines.belongsTo(points, { as: 'begin_point', foreignKey: 'begin_p' });
        lines.belongsTo(points, { as: 'end_point', foreignKey: 'end_p' });
    });
};


module.exports = firstLaunching;

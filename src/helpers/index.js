const lines = require('../../database_side/models/lines');
const methodsDb = require('../../database_side/databaseMethods');
const updateFile = require('../../server_side/fileUpdater');

/**
 * Проверка вершин
 *
 * @param {Object} edge - Массив координат для ребра
 *
 * @return {Number} - Позицию элемента в массиве или же -1
 */
const edgeChecking = edge => {
    const checkArr = [43, 201, 251, 42, 38, 45, 252, 199, 142, 11, 21, 79];
    return checkArr.indexOf(edge.begin_p) || checkArr.indexOf(edge.end_p);
};

/**
 * Функция отвечающая за возвращение маршрута
 *
 * @param {Object} edge - Массив координат для ребра
 * @param {Object} window - виртуальное окно
 *
 * @return {Object} при успешном построении преобразуется в Объект, описывающий маршрут
 */
const getRoute = (edge, window) => {
    if (edgeChecking(edge) !== -1) {
        return window.ymaps.route([
            [edge.begin_point_lat, edge.begin_point_lon], {
                type: 'wayPoint',
                point: [edge.end_point_lat, edge.end_point_lon]
            }], {
                avoidTrafficJams: true
            });
    }
    return window.ymaps.route([
        [edge.begin_point_lat, edge.begin_point_lon], {
            type: 'wayPoint',
            point: [edge.end_point_lat, edge.end_point_lon]
        }
    ]);
};

/**
 * Функция отвечающая за запись вычисленного значения в исходный файл
 *
 * @param {Object} route - Объект, описывающий проложенный маршрут.
 * @param {Object} edge - Массив координат и id ребра
 *
 * @return {Promise} необходимо для непрерывной обработки запросов
 */
const addToBlob = (route, edge) => {
    let time;
    if (!route) {
        time = "Error: \"Can't construct a route\"";
    } else {
        time = route.getHumanJamsTime().split('&')[0];
        if (time > 10000000) {
            time = 10000000;
        }
    }
    /* eslint-disable no-console */
    return methodsDb.updateDb(lines,
        { weight: time },
        { where: { id: edge.id } }
        );
};

/**
 * Функция инициализирует объект яндекс карт
 *
 * @param {Array} graphArray - Массив координат всех ребер
 * @param {Object} window - виртуальное окно
 */
const workWithCoors = (graphArray, window) => {
    let chain = Promise.resolve();
    graphArray.forEach(edge => {
        chain = chain
        .then(() => getRoute(edge, window))
        .catch(() => Promise.resolve())
        .then(route => addToBlob(route, edge));
    });
    chain.then(() => updateFile())
};

module.exports = workWithCoors;

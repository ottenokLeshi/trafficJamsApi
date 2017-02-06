const pool = require('../../database_side/database');

/**
 * Функция отвечающая за возвращение маршрута
 *
 * @param {String} line - Массив координат для ребра
 * @param {Object} window - виртуальное окно
 *
 * @return {Object} при успешном построении преобразуется в Объект, описывающий маршрут
 */
const getRoute = (line, window) => {
    const coors = line.split(' ');

    if (coors[1] === 43 || coors[2] === 43 || coors[1] === 201 || coors[2] === 201 || coors[1] === 251 ||
        coors[2] === 251 || coors[1] === 42 || coors[2] === 42 || coors[1] === 38 || coors[2] === 38 ||
        coors[1] === 45 || coors[2] === 45 || coors[1] === 252 || coors[2] === 252 || coors[1] === 199 ||
        coors[2] === 199 || coors[1] === 142 || coors[2] === 142 || coors[1] === 11 || coors[2] === 11 ||
        coors[1] === 21 || coors[2] === 21 || coors[1] === 79 || coors[2] === 79) {
        return window.ymaps.route([
            [parseFloat(coors[3]), parseFloat(coors[4])], {
                type: 'wayPoint',
                point: [parseFloat(coors[5]), parseFloat(coors[6])]
            }], {
                avoidTrafficJams: true
            });
    }
    return window.ymaps.route([
        [parseFloat(coors[3]), parseFloat(coors[4])], {
            type: 'wayPoint',
            point: [parseFloat(coors[5]), parseFloat(coors[6])]
        }
    ]);
};

/**
 * Функция отвечающая за запись вычисленного значения в исходный файл
 *
 * @param {Object} route - Объект, описывающий проложенный маршрут.
 * @param {Array} line - Массив координат и id ребра
 *
 * @return {Promise} необходимо для непрерывной обработки запросов
 */
const addToBlob = (route, line) => {
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
    const queryText = `UPDATE lines SET weight = ${time} WHERE id = ${line[0]}`;
    pool.query(queryText, err => {
        if (err) {
            console.log(`Error with updating weight ${err}`);
        }
        console.log(`Line ${line.split(' ')[0]} was updated`);
    });
    return Promise.resolve();
};

/**
 * Функция инициализирует объект яндекс карт
 *
 * @param {Array} lines - Массив координат всех ребер
 * @param {Object} window - виртуальное окно
 */
const workWithCoors = (lines, window) => {
    let chain = Promise.resolve();
    lines.forEach(line => {
        chain = chain
        .then(() => getRoute(line, window))
        .catch(() => Promise.resolve())
        .then(route => addToBlob(route, line));
    });
};

module.exports = workWithCoors;

/**
 * Функции, связанные с приходящими на сервер запросами
 *
 */

const fs = require('fs');

/**
 * Функция возвращающая пользователю главную html страницу
 *
 * @param {Object} response - ответ на запрос
 */
const start = response => {
    fs.readFile('./public/index.html', (err, data) => {
        if (err) {
            throw err;
        }
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    });
};

/**
 * Функция возвращающая пользователю файл с параметрами
 *
 * @param {Object} response - ответ на запрос
 */
const getRoutes = response => {
    fs.readFile('../public/index.html', (err, data) => {
        if (err) {
            throw err;
        }
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(data);
        response.end();
    });
};

/**
 * Функция возвращающая пользователю файл с параметрами
 *
 * @param {Object} response - ответ на запрос
 * @param {String} pathname - часть запроса
 */
const getError = (response, pathname) => {
    /* eslint-disable no-console */
    console.log(`No request handler found for ${pathname}`);
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('Error!');
};

exports.start = start;
exports.getRoutes = getRoutes;
exports.getError = getError;

/**
 * Функции, связанные с приходящими на сервер запросами
 *
 */

const fs = require('fs');
const pool = require('../database_side/database');

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
    pool.query('SELECT id, weight FROM lines ORDER BY id', (err1, data) => {
        if (err1) {
            throw err1;
        }
        const lines = [];
        for (let i = 0; i < Object.keys(data.rows).length; i += 1) {
            const line = [];
            if (+data.rows[i].weight === 10000000) {
                line.push(`<br> id = ${data.rows[i].id} Error </br>`);
            } else {
                line.push(`<br> id = ${data.rows[i].id} time = ${data.rows[i].weight} </br>`);
            }
            lines.push(line.join(' '));
        }
        fs.writeFile('./public/data.txt', lines.join('\n'), err2 => {
            if (err2) {
                throw err2;
            }
            fs.readFile('./public/data.txt', 'binary', (err, fileData) => {
                if (err) {
                    throw err;
                }
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.write(fileData);
                response.end();
            });
        });
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

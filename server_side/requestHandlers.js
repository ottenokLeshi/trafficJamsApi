/**
 * Функции, связанные с приходящими на сервер запросами
 *
 */

const fs = require('fs');
const lines = require('../database_side/models/lines');
const methodsDb = require('../database_side/databaseMethods');

/**
 * Функция возвращающая пользователю файл
 *
 * @param {Object} response - ответ на запрос
 * @param {Object} data - данные, которые необходимо отослать
 */
const sendData = (response, data) => {
    data.pipe(response);
    data.on('error', err => {
        response.writeHead(500);
        response.end('Server error');
        /* eslint-disable no-console */
        console.error(err);
    });
    response.on('close', () => {
        data.destroy();
    });
};

/**
 * Функция создающая поток и вызывающая sendData, которая при помощи потока отправит файл
 *
 * @param {Object} response - ответ на запрос
 * @param {String} pathname - путь к файлу
 */
const getPublicFile = (response, pathname) => {
    let filePath = pathname;
    if (filePath === '/') {
        filePath = `${filePath}index.html`;
    }
    const data = new fs.ReadStream(`./public${filePath}`);
    sendData(response, data);
};


/**
 * Функция возвращающая пользователю id ребра и его вес
 *
 * @param {Object} response - ответ на запрос
 */
const getRoutes = response => {
    methodsDb.readDb(lines, {
        order: 'id',
        attributes: ['id', 'weight']
    }).then(data => {
        const nodes = data.map(item => {
            const node = item.toJSON();
            return `id: ${node.id} weight: ${node.weight}`;
        }).join('\n');
        response.writeHead(200);
        response.write(nodes);
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

exports.getPublicFile = getPublicFile;
exports.getRoutes = getRoutes;
exports.getError = getError;

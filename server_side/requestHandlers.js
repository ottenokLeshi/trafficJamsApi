/**
 * Функции, связанные с приходящими на сервер запросами
 *
 */

const fs = require('fs');
const lines = require('../database_side/models/lines');
const methodsDb = require('../database_side/databaseMethods');
const path = require('path');

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
 * Функция возвращающая значения из БД в файле с расширением txt
 *
 * @param {Object} response - ответ на запрос
 *
 * @return {Promise} результат отдачи пользователю txt файла
 */
const getRoutesInTXT = response => {
    return methodsDb.readDb(lines, {
        order: 'id'
    }).then(data => {
        const nodes = data.map(item => {
            const node = item.toJSON();
            return `id: ${node.id} weight: ${node.weight} updatedAt: ${node.updatedAt}`;
        }).join('\n');
        fs.writeFile('public/output.txt',nodes, (err) =>{
            if (err) {
                console.log(err);
            }
            response.download(path.join(__dirname, '../public/output.txt'));
        });
    });
};

/**
 * Функция возвращающая значения из БД в файле с расширением txt
 *
 * @param {Object} response - ответ на запрос
 *
 * @return {Promise} результат отдачи пользователю json
 */
const getRoutesInJSON = response => {
    return methodsDb.readDb(lines, {
        order: 'id'
    }).then(data => {
        const nodes = data.map(item => {
            return item.toJSON();
        });
        const nodesJSON = `{ "nodes" : ${JSON.stringify(nodes)} }`;
        response.json(JSON.parse(nodesJSON));
    })
        
};

exports.getPublicFile = getPublicFile;
exports.getRoutesInTXT = getRoutesInTXT;
exports.getRoutesInJSON = getRoutesInJSON;
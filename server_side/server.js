const http = require('http');
const url = require('url');

/**
 * Функция запускающая сервер
 *
 * @param {Function} route - функция
 * @param {Array} handle - массив функций-обработчиков запроса
 */
const start = (route, handle) => {
    /* eslint-disable no-console */
    http.createServer((request, response) => {
        const pathname = url.parse(request.url).pathname;
        console.log(`Request for ${pathname} received.`);
        route(handle, pathname, response);
    }).listen(8888);
    console.log('Server has started.');
};

exports.start = start;

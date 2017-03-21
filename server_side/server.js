const express = require('express');
const requestHandlers = require('./requestHandlers');
const url = require('url');

const app = express();
/**
 * Функция запускающая сервер
 */
const start = () => {
    app.listen(8888, () => {
        console.log('Express server listening on port 1337');
    });
    app.get('/', (request, response) => {
        requestHandlers.getPublicFile(response, request.url);
    });
    app.get('/script.js', (request, response) => {
        requestHandlers.getPublicFile(response, request.url);
    });
    app.get('/file/txt', (request, response) => {
        requestHandlers.getRoutesInTXT(response, request.url);
    });
    app.get('/file/json', (request, response) => {
        requestHandlers.getRoutesInJSON(response, request.url);
    });
};

exports.start = start;
exports.app = app;
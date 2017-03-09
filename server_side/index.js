const server = require('./server');
const route = require('./route');
const requestHandlers = require('./requestHandlers');
const virtualWindow = require('./virtualWindow');
const firstLaunching = require('../database_side/dataLoading');

/**
 * На запросы навешиваются обработчики
 */
const handle = [];
handle['/'] = requestHandlers.getPublicFile;
handle['/script.js'] = requestHandlers.getPublicFile;
handle['/routes'] = requestHandlers.getRoutes;
handle['/getError'] = requestHandlers.getError;

/**
 * Запуск сервера
 */
server.start(route, handle);

/**
 * Запуск виртуального окна, где буду проводиться запросы к API
 */

firstLaunching().then(() => {
    virtualWindow.createWindow();
});

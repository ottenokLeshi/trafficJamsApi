const server = require("./server");
const route  = require("./route");
const requestHandlers = require("./requestHandlers");
const virtualWindow = require("./virtualWindow");

/**
 * На запросы навешиваются обработчики
 */
const handle  = {};
handle['/'] = requestHandlers.start;
handle['/routes'] = requestHandlers.getRoutes;

/**
 * Запуск сервера
 */
server.start(route, handle);

/**
 * Запуск виртуального окна, где буду проводиться запросы к API
 */
virtualWindow.createWindow();

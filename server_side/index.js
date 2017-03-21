const server = require('./server');
const virtualWindow = require('./virtualWindow');
const firstLaunching = require('../database_side/dataLoading');

/**
 * Запуск сервера
 */
server.start();

/**
 * Запуск виртуального окна, где буду проводиться запросы к API
 */
firstLaunching().then(() => {
    virtualWindow.createWindow();
});

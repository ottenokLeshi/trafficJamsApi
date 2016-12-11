/**
 * Функции, связанные с приходящими на сервер запросами
 *
 */

const fs = require("fs");

/**
 * Функция возвращающая пользователю главную html страницу
 *
 * @param {Object} response - ответ на запрос
 */
const start = (response) => {
  fs.readFile('./public/index.html', function(err, data){
  	if (err) throw err;
  	response.writeHead(200, {"Content-Type": "text/html"});
  	response.write(data);
  	response.end();
  })
};

/**
 * Функция возвращающая пользователю файл с параметрами
 *
 * @param {Object} response - ответ на запрос
 */
const getRoutes = (response) => {
    fs.readFile('./public/output.txt', function(err, data){
        if (err) throw err;
        response.writeHead(200, {"Content-Type": "aplicatiion/json"});
        response.write(data);
        response.end();
    })
};

exports.start = start;
exports.getRoutes = getRoutes;

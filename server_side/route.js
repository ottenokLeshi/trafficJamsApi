/**
 * Функция проверяет, есть ли обработчики запроса, вызывая их впоследствии, или же возвращает 404
 *
 * @param {Array} handle - массив функций-обработчиков запроса
 * @param {String} pathname - запрошенный путь URL
 * @param {Array} response - ответ на запрос
 *
 * @return {Function} - вызов обработчика запроса
 */
const route = (handle, pathname, response) => {
	console.log("About to route a request for " + pathname);
 	if (typeof handle[pathname] === 'function') {
    	return handle[pathname](response);
  	} else {
		console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/html"});
        response.end("Error!");
	}
};

module.exports = route;

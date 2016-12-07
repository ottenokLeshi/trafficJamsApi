let http = require("http");
let url = require("url");

/**
 * Функция запускающая сервер
 *
 * @param {Function} route - функция
 * @param {Array} handle - массив функций-обработчиков запроса
 */
const start = (route, handle) => {
	const onRequest = (request, response) => {
		let pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
    	route(handle, pathname, response);
	};
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
};

exports.start = start;

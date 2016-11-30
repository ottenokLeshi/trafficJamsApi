var fetch = require('node-fetch');

/**
 * Функция инициализирует объект яндекс карт
 */
const workWithCoors = (lines, myBlobBuilder) => {
	let chain = Promise.resolve();

	// функция, считающая время переезда по ребру графа
	lines.forEach(line =>
		chain = chain
			.then(() => getRoute(line))
			.catch(() => Promise.resolve())
			.then(route => addToBlob(myBlobBuilder, route))
	);
};

/**
 *Функция отвечающая за возвращение маршрута
 *
 *@param {Array} line - Массив координат для ребра
 *
 *@return {Объект-Promise} при успешном построении преобразуется в Объект, описывающий маршрут
 */
const getRoute = line => {
    return fetch("https://api-maps.yandex.ru/services/route/2.0/",
		{
		method : 'GET',
		mode : 'cors',
		headers :{
            "Accept" : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            "Accept-Encoding" : 'gzip, deflate, lzma, sdch, br',
            "Accept-Language" : 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
            "Cache-Control" : 'max-age=0',
            "Connection" : 'keep-alive',
            "Cookie" : 'yandexuid=6154763121480503642; _ym_uid=148053455534917102; _ym_isad=2'
		},
		body : 'callback=id_14805325641326229207&rll=30.334873%2C60.052852~30.320028%2C60.030239&lang=ru_RU&token=1bd9e5537e5e8bb1fb589b571ca4238d&results=1&rtm=atm'
		})
		.then( response => {
			return response.json();
        })
		.then( data => console.log(data));
	/*
	const coors = line.split(" ");

	if (coors[1] == 43 || coors[2] == 43 || coors[1] == 201 || coors[2] == 201 || coors[1] == 251 || coors[2] == 251 || coors[1] == 42 || coors[2] == 42 || coors[1] == 38 || coors[2] == 38 || coors[1] == 45 || coors[2] == 45 || coors[1] == 252 || coors[2] == 252 || coors[1] == 199 || coors[2] == 199 || coors[1] == 142 || coors[2] == 142 || coors[1] == 11 || coors[2] == 11 || coors[1] == 21 || coors[2] == 21 || coors[1] == 79 || coors[2] == 79) {
		return ymaps.route([
			[parseFloat(coors[3]), parseFloat(coors[4])], {
				type: 'wayPoint',
				point: [parseFloat(coors[5]), parseFloat(coors[6])]
			}
		], {
			avoidTrafficJams: true
		})
	} else {
		return ymaps.route([
			[parseFloat(coors[3]), parseFloat(coors[4])], {
				type: 'wayPoint',
				point: [parseFloat(coors[5]), parseFloat(coors[6])]
			}
		])
	}*/
}

/**
 *Функция отвечающая за запись вычисленного значения в исходный файл
 *
 *@param {MyBlobBuilder} myBlobBuilder - инстанс класса MyBlobBuilder
 *@param {Object} route - Объект, описывающий проложенный маршрут.
 *@param {Number} k - количество итераций
 *
 *@return {Promise} необходимо для непрерывной обработки запросов
 */
const addToBlob = (myBlobBuilder, route) => {
	if (!route){
		let time = "Error: \"Can't construct a route\"";
		myBlobBuilder.append(time.split("&")[0] + "\n");
	} else {
		let time =  route;
		myBlobBuilder.append(time.split("&")[0] + "\n");
	}

	return Promise.resolve();
}

exports.workWithCoors = workWithCoors;
exports.getRoute = getRoute;
exports.addToBlob = addToBlob;
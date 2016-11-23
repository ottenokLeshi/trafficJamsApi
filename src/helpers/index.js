/**
 * Функция инициализирует объект яндекс карт
 */
export const workWithCoors = (lines, myBlobBuilder, result) => ymaps.ready(() => {
	let chain = Promise.resolve();

	// функция, считающая время переезда по ребру графа
	lines.forEach(line =>
		chain = chain
			.then(() => getRoute(line))
			.catch(() => Promise.resolve())
			.then(route => addToBlob(myBlobBuilder, route))
	);
});

/**
 *Функция отвечающая за возвращение маршрута
 *
 *@param {Array} line - Массив координат для ребра
 *
 *@return {Объект-Promise} при успешном построении преобразуется в Объект, описывающий маршрут
 */
export const getRoute = line => {
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
	}
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
export const addToBlob = (myBlobBuilder, route) => {
	if (!route){
		document.getElementById("result").value = "Error: \"Can't construct a route\"";
		myBlobBuilder.append(document.getElementById("result").value.split("&")[0] + "\n");
	} else {
		document.getElementById("result").value = route.getHumanJamsTime();
		myBlobBuilder.append(document.getElementById("result").value.split("&")[0] + "\n");
	}

	return Promise.resolve();
}

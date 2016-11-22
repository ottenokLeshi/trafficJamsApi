import MyBlobBuilder                from './components/my-blob-builder';

let coors = "";
let lines = "";
let route;
let k = 0;
let d = new Date();

const myBlobBuilder = new MyBlobBuilder();
myBlobBuilder.append("TIME : " + d.getHours().toString() + ":" + d.getMinutes().toString() + "\n");

// считываем данные из файла, координаты точек графа
let fileInput = document.getElementById('fileInput');
let fileDisplayArea = document.getElementById('fileDisplayArea');

fileInput.addEventListener('change', function(e) {
	let file = fileInput.files[0];
	let reader = new FileReader();

	reader.onload = function(e) {
		lines = reader.result.split("\n");
		workWithCoors(lines);
	}
	reader.readAsText(file);
});


// инициализуруем объекты яндекс карт
function workWithCoors(lines) {
	ymaps.ready(init);
}

//функция, считающая время переезда по ребру графа
function init() {
	let chain = Promise.resolve();

	lines.forEach(line =>
	chain = chain
			.then(() => getRoute(line))
.catch(() => Promise.resolve())
.then(route => addToBlob(route))
);

}
/**
 *Функция отвечающая за возвращение маршрута
 *
 *@param {Array} line - Массив координат для ребра
 *
 *@return {Объект-Promise} при успешном построении преобразуется в Объект, описывающий маршрут
 */
function getRoute(line) {
	let coors = line.split(" ");

	if (coors[1] == 43 || coors[2] == 43 || coors[1] == 201 || coors[2] == 201 || coors[1] == 251 || coors[2] == 251 || coors[1] == 42 || coors[2] == 42 || coors[1] == 38 || coors[2] == 38 || coors[1] == 45 || coors[2] == 45 || coors[1] == 252 || coors[2] == 252 || coors[1] == 199 || coors[2] == 199 || coors[1] == 142 || coors[2] == 142 || coors[1] == 11 || coors[2] == 11 || coors[1] == 21 || coors[2] == 21 || coors[1] == 79 || coors[2] == 79) {
		return route = ymaps.route([
			[parseFloat(coors[3]), parseFloat(coors[4])], {
				type: 'wayPoint',
				point: [parseFloat(coors[5]), parseFloat(coors[6])]
			}


		], {
			avoidTrafficJams: true
		})
	} else {
		return route = ymaps.route([


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
 *@param {Object} route - Объект, описывающий проложенный маршрут.
 *
 *@return {Promise} необходимо для непрерывной обработки запросов
 */
function addToBlob(route) {
	if (!route){
		document.getElementById("result").value = "Error: \"Can't construct a route\"";
		myBlobBuilder.append(document.getElementById("result").value.split("&")[0] + "\n");
		k = k + 1;
	} else{
		document.getElementById("result").value = route.getHumanJamsTime();
		myBlobBuilder.append(document.getElementById("result").value.split("&")[0] + "\n");
		k = k + 1;
	}
	return Promise.resolve();
}

let urlOfTextFile = null;
let create = document.getElementById('create');
let textbox = document.getElementById('textbox');

const makeUrlForTextFile = function() {

	let data = myBlobBuilder.getBlob();

	// If we are replacing a previously generated file we need to
	// manually revoke the object URL to avoid memory leaks.
	if (urlOfTextFile !== null) {
		window.URL.revokeObjectURL(urlOfTextFile);
	}
	urlOfTextFile = window.URL.createObjectURL(data);
	return urlOfTextFile;
};

create.addEventListener('click', function() {
	let link = document.getElementById('downloadlink');
	link.href = makeUrlForTextFile();
	link.style.display = 'block';
}, false);

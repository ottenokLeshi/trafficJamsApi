import MyBlobBuilder                from './components/my-blob-builder';
import {
	workWithCoors
}                                   from './helpers';

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

let urlOfTextFile = null;
let create = document.getElementById('create');
let textbox = document.getElementById('textbox');

const makeUrlForTextFile = function() {
	const data = myBlobBuilder.getBlob();

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

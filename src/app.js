let MyBlobBuilder = require("./components/my-blob-builder");
let	workWithCoors = require("./helpers/index.js");
let fs = require("fs");

let coors = "";
let lines = "";
let route;
let k = 0;
let d = new Date();

const myBlobBuilder = new MyBlobBuilder.MyBlobBuilder();
myBlobBuilder.append("TIME : " + d.getHours().toString() + ":" + d.getMinutes().toString() + "\n");

function main() {
	let dir = __dirname.split('/');
	dir.splice(dir.length-1, 1);
	dir = dir.join('/');

	fs.readFile(dir + '/input.txt', function(err, data){
		if (err) throw err;
		lines = data.toString().split("\n");
		workWithCoors.workWithCoors(lines, myBlobBuilder);
		});
}

exports.main = main;
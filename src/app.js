let MyBlobBuilder = require("./components/myBlobBuilder");
let	workWithCoors = require("./helpers/index.js");
let fs = require("fs");

let lines = "";
let d = new Date();

const myBlobBuilder = new MyBlobBuilder.MyBlobBuilder();
myBlobBuilder.append("TIME : " + d.getHours().toString() + ":" + d.getMinutes().toString() + "\n");

function main(window) {
	fs.readFile('./input.txt', function(err, data){
		if (err) throw err;
		lines = data.toString().split("\n");
		workWithCoors.workWithCoors(lines, myBlobBuilder, window);
		});
}

exports.main = main;
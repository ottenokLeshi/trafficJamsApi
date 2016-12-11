const MyBlobBuilder = require("./components/myBlobBuilder");
const workWithCoors = require("./helpers/index.js");
const fs = require("fs");
let lines = "";
let d = new Date();
const myBlobBuilder = new MyBlobBuilder();

/**
 * Функция, запускающая алгоритм получения параметров от API
 *
 * @param {Object} виртуальное окно
 */
function main(window) {
	fs.readFile('../input.txt', function(err, data){
		if (err) {
		    throw err;
        }
        myBlobBuilder.append("TIME : " + d.getHours().toString() + ":" + d.getMinutes().toString() + "\n");
		lines = data.toString().split("\n");
		workWithCoors(lines, myBlobBuilder, window);
    });
}

module.exports = main;

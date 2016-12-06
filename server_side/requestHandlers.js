/**
 * Функции, связанные с приходящими на сервер запросами
 *
 */

let fs = require("fs");

const start = (response) => {

  fs.readFile('./public/index.html', function(err, data){
  	if (err) throw err;
  	response.writeHead(200, {"Content-Type": "text/html"});
  	response.write(data);
  	response.end();
  })
}

const getRoutes = (response) => {
    fs.readFile('./public/output.txt', function(err, data){
        if (err) throw err;
        response.writeHead(200, {"Content-Type": "applicatiion/json"});
        response.write(data);
        response.end();
    })
}


exports.start = start;
exports.getRoutes = getRoutes;
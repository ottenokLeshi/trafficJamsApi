let server = require("./server");
let route  = require("./route");
let requestHandlers = require("./requestHandlers");

let dir = __dirname.split('/');
	dir.splice(dir.length-1, 1);
	dir = dir.join('/');

let main = require(dir + "/src/app.js");
let handle  = {};

handle['/'] = requestHandlers.start;

server.start(route.route, handle);

main.main();
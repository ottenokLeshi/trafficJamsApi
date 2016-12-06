let server = require("./server");
let route  = require("./route");
let virtualWindow = require("./virtualWindow");
let requestHandlers = require("./requestHandlers");

//let main = require("./src/app.js");
let handle  = {};

handle['/'] = requestHandlers.start;
handle['/routes'] = requestHandlers.getRoutes;

server.start(route.route, handle);

virtualWindow.createWindow();
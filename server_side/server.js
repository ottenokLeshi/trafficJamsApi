let http = require("http");
let url = require("url");

const start = (route, handle) => {
	const onRequest = (request, response) => {
		let pathname = url.parse(request.url).pathname;
    	if (pathname != '/favicon.ico'){
    		console.log("Request for " + pathname + " received.");
    	}

    	let content = route(handle, pathname, response);
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;
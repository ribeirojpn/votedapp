var http = require('http');
var app = require('./config/express')();
require('./config/database')('mongodb://localhost/voted');

http.createServer(app).listen(app.get('port'),function () {
	console.log('Server on...');
});

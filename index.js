var http = require('http');
var express = require('express')
var app = require('./config/express')();
require('./config/passport')();
require('./config/database')('mongodb://localhost/voted');

http.createServer(app).listen(app.get('port'),function () {
	console.log('Server on...');
});

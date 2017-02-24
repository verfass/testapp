var express = require('express');
var app = express();

app.set('view engine', 'pug');

const port = 80;
const hostname = '127.0.0.1';

var myLogger = function(req, res, next) {
	console.log('LOGGED');
	next();
};

var requestTime = function(req, res, next) {
	req.requestTime = Date.now();
	next();
};

var innerText = function(req, res, next) {
	var responseText = '';
	responseText += 'Requested at: ' + req.requestTime + '';
	//res.send(responseText);
	console.log(responseText);
	next();
};

//오류 처리
var myExcept = function(err, req, res, next) {
	console.error(err.stack)
	if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
};

app.use(myLogger);
app.use(requestTime);
app.use(innerText);
app.use(myExcept);

//app.get('/', function(req, res) {
	//var responseText = 'Hello World!';
	//responseText += 'Requested at: ' + req.requestTime + '';
	//res.send(responseText);
//});

app.get('/', function(req, res) {
	res.render('index', {title:'Hey', message: 'Hello World!', time: Date()});
})

app.listen(port);

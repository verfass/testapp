var express = require('express');
var app = express();

const port = 80;
const hostname = '127.0.0.1';

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log('Example app listening on port 80!');
});

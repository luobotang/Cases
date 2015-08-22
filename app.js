var app = require('connect')()
var serveStatic = require('serve-static')

var PORT = 8080

app.use(function (req, res, next) {
	console.log(new Date().toISOString() + ' request for url: ' + req.url)
	next()
}).use(serveStatic('app', {index: ['index.htm']})).listen(PORT)

console.log('server started on port: ' + PORT)
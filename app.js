
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var expressUglify = require('express-uglify');

var dirPublic = path.join(__dirname, 'public');

app.use(expressUglify.middleware({
    src: dirPublic
}));

// all environments
app.set('port', process.argv[2] || 8800);
app.set('views', dirPublic);
app.set('view engine', 'jade');
// app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')(dirPublic));
app.use(express.static(dirPublic));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/warriors', user.list);
// views
app.get('/public/modal.html', function (req, res) {
  res.send(require('jade').renderFile('./public/modal.jade'));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

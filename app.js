'use strict';
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var fs = require('fs');
var path = require('path');

var app = express();
var expressUglify = require('express-uglify');
/**
*   globals
*/
fs.readFile('./data/ips.json', function (err, data) {
    // ignore err
    if (err) {
        global.ips = {};
    }
    else {
        global.ips = JSON.parse(data.toString());
    }
});
/**
*   Express
*/
var dirPublic = path.join(__dirname, 'public');
// route log
fs.mkdir('./log', function () {});
var routeLogStream = fs.createWriteStream('./log/route.log');

app.use(expressUglify.middleware({
    src: dirPublic
}));

// all environments
app.set('port', process.argv[2] || 8800);
app.set('views', dirPublic);
app.set('view engine', 'jade');
// app.use(express.favicon());
app.use(express.logger({ format: 'short', stream: routeLogStream }));
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

app.get('/:menu?', routes.index);
app.get('/docs/heros', user.heros);
app.get('/docs/skills', user.skills);
app.get('/dev/ips', user.ips);

// views
app.get('/public/modal_diff.html', function (req, res) {
  res.render('modal_diff');
});
app.get('/public/hero_table.html', function (req, res) {
  res.render('hero_table');
});
app.get('/public/hero_skill.html', function (req, res) {
  res.render('hero_skill');
});
app.get('/public/bread_calc.html', function (req, res) {
  res.render('bread_calc');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
/**
*
*/
function serverExit() {
    // save
    fs.writeFile('./data/ips.json', JSON.stringify(global.ips, null, 4), function (err) {
        if (err) {
            throw err;
            process.exit(1);
        }
        process.exit(0);
    });
}
process.once('SIGINT', serverExit);
process.once('SIGTERM', serverExit);

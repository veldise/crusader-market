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
require('child_process').exec('git describe --tags', function (err, stdout) {
    if (err) {
        throw err;
    }
    // ex) v0.3.0-14-g2638707 -> v0.3.14
    var m = /(v\d+\.\d+\.)\d+\-(\d+)\-\w+/.exec(stdout);
    if (m) {
        global.version = m[1] + m[2];
    }
    else {
        global.version = stdout.trim();
    }
});
/**
*   Express
*/
var dirViews = path.join(__dirname, 'views');
var dirPublic = path.join(__dirname, 'public');

global.dirViews = dirViews;
global.dirPublic = dirPublic;
// route log
fs.mkdir('./log', function () {});
var routeLogStream = fs.createWriteStream('./log/route.log');

// var uglifyMiddleware = require('./uglify_middleware.js');
// app.use(uglifyMiddleware({
//     src: dirPublic
// }));

// all environments
app.set('port', process.argv[2] || 8800);
app.set('views', dirViews);
app.set('view engine', 'jade');
// app.use(express.favicon());
app.use(express.logger({ format: 'short', stream: routeLogStream }));
app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')(dirPublic));
app.use(express.static(dirPublic));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/heros', user.heros);
app.get('/skills', user.skills);
app.get('/weapons', user.weapons);
app.get('/dev/ips', user.ips);
app.get('/dev/reports', user.reports);

// views
app.get('/public/*.html', function (req, res) {
    var renderUrl = req.url.replace('/public/', '').replace(/\.html$/, '');
    res.render(renderUrl);
});
app.get('/public/partials/*.html', function (req, res) {
    var renderUrl = req.url.replace('/public/', '').replace(/\.html$/, '');
    res.render(renderUrl);
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
/**
*
*/
app.get('/app.min.js', routes.optimizeIndex([
    'jquery',
    'angular',
    'angular-route',
    'lodash',
    'bootstrap',
    'ui-bootstrap',
    'smart-table'
]));
/**
*
*/
function serverExit() {
    // save
    var strJSON = JSON.stringify(global.ips, null, 4);
    fs.writeFile('./data/ips.json', strJSON, function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        process.exit(0);
    });
}
process.once('SIGINT', serverExit);
process.once('SIGTERM', serverExit);

'use strict';
/*
 * GET home page.
 */
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var requirejs = require('requirejs');

exports.index = function(req, res){
    var remoteIP = req.ip || req.connection.remoteAddress;
    console.log('access index.jade:', remoteIP, req.headers['user-agent']);

    // user conut
    if (!global.ips[remoteIP]) {
        global.ips[remoteIP] = { count: 0 };
    }
    global.ips[remoteIP].count += 1;
    global.ips[remoteIP].last_atime = new Date();

    res.render('index', { version: global.version });
};

exports.optimizeIndex = function (dependencies, isNoCache) {
    var config = {
        // almond: true,
        baseUrl: path.join(global.dirPublic, 'js'),
        paths: {},
        include: ['app'],
        exclude: dependencies,
        out: path.join(global.dirPublic, 'js', 'app.min.js')
    };
    _.each(dependencies, function (dep) {
        config.paths[dep] = 'empty:';
    });

    return function (req, res) {
        var sendOutFile = function () {
            res.setHeader('Content-Type', 'text/javascript');
            res.sendfile(config.out);
        };

        fs.exists(config.out, function (exists) {
            if (exists && !isNoCache) {
                return sendOutFile();
            }

            requirejs.optimize(config, function () {
                sendOutFile();
            }, function(err) {
                console.error('requirejs.optimize:', err);
                res.send(500, err);
            });
        });
    };
};

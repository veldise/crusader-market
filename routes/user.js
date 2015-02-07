'use strict';
/*
 * GET users listing.
 */

// var fs = require('fs'),
//     path = require('path');

var heros = require('../heros.json');
var skills = require('../skills.json');

exports.heros = function(req, res){
    var remoteIP = req.ip || req.connection.remoteAddress;
    console.log('access heros data:', remoteIP, req.headers['user-agent']);
    // fs.readFile(path.join(__dirname, '../heros.json'), function (err, data) {
    //  if (err) {
    //      return res.send(500, err);
    //  }
    //  res.send(data);
    // });
    res.send(heros);
};

exports.skills = function(req, res){
    var remoteIP = req.ip || req.connection.remoteAddress;
    console.log('access skills data:', remoteIP, req.headers['user-agent']);
    // fs.readFile(path.join(__dirname, '../skills.json'), function (err, data) {
    //  if (err) {
    //      return res.send(500, err);
    //  }
    //  res.send(data);
    // });
    res.send(skills);
};

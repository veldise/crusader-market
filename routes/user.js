'use strict';
/*
 * GET users listing.
 */

// var fs = require('fs'),
//     path = require('path');

var heros = require('../data/heros.json');
var skills = require('../data/skills.json');
var weapons = require('../data/weapons.json');

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

exports.weapons = function(req, res){
    var remoteIP = req.ip || req.connection.remoteAddress;
    console.log('access weapons data:', remoteIP, req.headers['user-agent']);
    // fs.readFile(path.join(__dirname, '../weapons.json'), function (err, data) {
    //  if (err) {
    //      return res.send(500, err);
    //  }
    //  res.send(data);
    // });
    res.send(weapons);
};

exports.ips = function(req, res){
    res.send(global.ips);
};

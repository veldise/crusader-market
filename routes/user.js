
/*
 * GET users listing.
 */

var fs = require('fs'),
    path = require('path');

var heros = require('../heros.json');

exports.heros = function(req, res){
    var remoteIP = req.ip || req.connection.remoteAddress;
    console.log('access list data:', remoteIP, req.headers['user-agent']);
    // fs.readFile(path.join(__dirname, '../heros.json'), function (err, data) {
    //  if (err) {
    //      return res.send(500, err);
    //  }
    //  res.send(data);
    // });
    res.send(heros);
};

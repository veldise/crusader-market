
/*
 * GET users listing.
 */

var fs = require('fs'),
    path = require('path');

var warriors = require('../warriors.json');

exports.list = function(req, res){
    var remoteIP = req.ip || req.connection.remoteAddress;
    console.log('access list data:', remoteIP);
    // fs.readFile(path.join(__dirname, '../warriors.json'), function (err, data) {
    //  if (err) {
    //      return res.send(500, err);
    //  }
    //  res.send(data);
    // });
    res.send(warriors);
};


/*
 * GET users listing.
 */

var fs = require('fs'),
	path = require('path');

exports.list = function(req, res){
	fs.readFile(path.join(__dirname, '../warriors.json'), function (err, data) {
		if (err) {
			return res.send(500, err);
		}
		res.send(data);
	});
};


/*
 * GET users listing.
 */

var fs = require('fs');

exports.list = function(req, res){
	try {
		res.send(require('../warriors.json'));
	}
	catch (e) {
		res.send(500, e);
	}
};

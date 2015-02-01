
/*
 * GET home page.
 */

exports.index = function(req, res){
    var remoteIP = req.ip || req.connection.remoteAddress;
    console.log('access index.jade:', remoteIP);

    res.render('index', { title: 'Express' });
};


/*
 * GET home page.
 */

exports.index = function(req, res){
    var menu = req.params.menu;
    var remoteIP = req.ip || req.connection.remoteAddress;
    console.log('access index.jade:', remoteIP, req.headers['user-agent']);

    // user conut
    if (!global.ips[remoteIP]) {
        global.ips[remoteIP] = { count: 0 };
    }
    global.ips[remoteIP].count += 1;
    global.ips[remoteIP].last_atime = new Date();

    res.render('index', {
        menu: menu,
        version: 'v0.1.1'
    });
};

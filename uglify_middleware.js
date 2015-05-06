'use strict';

var fs = require('fs');
var path = require('path');
var UglifyJS = require('uglify-js');
var url = require('url');
/**
*
*/
module.exports = function (options) {
    var dirSrc = options.src;

    return function (req, res, next) {
        var urlPath = url.parse(req.url).pathname;
        if (urlPath.match(/\.js$/) && !urlPath.match(/min/)) {
            var jsPath = path.join(dirSrc, urlPath);
            fs.exists(jsPath, function (exists) {
                if (!exists) {
                    return res.send(404);
                }

                var result = UglifyJS.minify(jsPath, {
                    // outSourceMap: path.basename(jsPath) + '.map',
                    mangle: {
                        except: ['require', 'exports', 'module']
                    }
                });
                res.setHeader('Content-Type', 'text/javascript');
                res.send(200, result.code);
            });
        } else {
            next();
        }
    };
};

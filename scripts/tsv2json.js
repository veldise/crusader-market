#!/usr/local/bin/node

'use strict';
/**
*   Module dependencies
*/
var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');
/**
*   process arguments
*/
if (process.argv.length < 2) {
    console.error([
        'usage:',
        path.basename(__filename, '.js'),
        '[-r]',
        '[-f]',
        '<filepath>'
    ].join(' '));
    process.exit();
}

var tsvPath = process.argv[2],
    jsonPath = process.argv[3] || tsvPath.replace(/\.\w+$/, '.json');

console.log(tsvPath, ' to ', jsonPath);

fs.readFile(tsvPath, 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    var json = tsv2json(removeBOM(data));

    fs.writeFile(jsonPath, JSON.stringify(json, null, 2), 'utf8', function (err) {
        if (err) {
            throw err;
        }
        console.log('converted.');
    });
});

function tsv2json (tsv) {
    var json;

    var lines = tsv.replace(/\?/igm, ' ').split(/\r?\n/);
    lines = _.compact(_.map(lines, function (line) {
        if (line.trim()) {
            line = line.replace(/^\ +/, '').replace(/\ +$/, '');
            line = line.split(/\t/);
            for (var i=line.length-1; i>=0; i--) {
                line[i] = convTypes(line[i]);
            }
            return line;
        }
        else {
            return null;
        }
    }));
    var header = lines.shift();

    return _.map(lines, function (line) {
        return _.zipObject(header, line);
    });
}

function removeBOM (str) {
    var buf = new Buffer(str);
    if ((buf[0] === 0xEF) && (buf[1] === 0xBB) && (buf[2] === 0xBF)) {
        return buf.slice(3).toString();
    }
    return buf.toString();
}

function convTypes (str) {
    if (!str) {
        return null;
    }

    // number
    if (!_.isNaN(+str)) {
        return +str;
    }
    // boolean
    else if (str.toLowerCase() === 'true') {
        return true;
    }
    else if (str.toLowerCase() === 'false') {
        return false;
    }
    else {
        return str.replace(/^\"/, '').replace(/\"$/, '');
    }
}

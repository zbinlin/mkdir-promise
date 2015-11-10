"use strict";

var path = require("path");
var fs = require("fs");

function _exists(filepath) {
    return new Promise(function (resolve) {
        fs.exists(filepath, function (exists) {
            resolve(exists);
        });
    });
}

function _stat(filepath) {
    return new Promise(function (resolve, reject) {
        fs.stat(filepath, function (err, stats) {
            if (err) return reject(err);
            resolve(stats);
        });
    });
}

function _mkdir(dir, mode) {
    mode || (mode = 511/* 0777 */);
    return new Promise(function (resolve, reject) {
        fs.mkdir(dir, mode, function (err) {
            if (err && err.code !== "EEXIST") return reject(err);
            resolve(dir);
        });
    });
}

module.exports = function mkdir(dir, mode) {
    var paths = dir.split(path.sep);
    if (paths[0] === "") {
        paths[0] = path.sep;
    }
    return paths.reduce(function (promise, fp) {
        return promise.then(function (prev) {
            fp = path.join(prev, fp);
            return _exists(fp).then(function (exists) {
                if (!exists) return _mkdir(fp, mode);

                return _stat(fp).then(function (stats) {
                    if (stats.isDirectory()) {
                        return fp;
                    } else {
                        var err = new Error("Cannot create directory " + fp + ": Not a directory.");
                        return Promise.reject(err);
                    }
                });
            });
        });
    }, Promise.resolve(""));
};

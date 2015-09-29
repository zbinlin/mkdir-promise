var assert = require("assert");
var mkdir = require("../index");
var child_process = require("child_process");
var path = require('path');

describe("mkdir -p foo/bar", function () {
    var cwd;
    before(function (done) {
        cwd = process.cwd();
        process.chdir(__dirname);
        done();
    });
    it("should return foo/bar", function (done) {
        mkdir("foo/bar").then(function (rst) {
            assert.equal(rst, "foo/bar");
            done();
        }).catch(function (ex) {
            done(ex);
        });
    });
    it("should handle absolute paths", function (done) {
        var absolutePath = path.join(__dirname, "foo", "bar");
        mkdir(absolutePath).then(function (rst) {
            assert.equal(rst, absolutePath);
            done();
        }).catch(function (ex) {
            done(ex);
        });
    });
    after(function () {
        child_process.exec("rm -r foo");
        process.chdir(cwd);
    });
});

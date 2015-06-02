var assert = require("assert");
var mkdir = require("../index");
var child_process = require("child_process");

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
    after(function () {
        child_process.exec("rm -r foo");
        process.chdir(cwd);
    });
});

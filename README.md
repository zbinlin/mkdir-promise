# mkdir-promise

fs.mkdir implementation with es6 Promise, support make directory recursively,
just like `mkdir -p`.


## Install

```shell
npm install mkdir-promise
```


## Usage

```javascript
var mkdir = require("mkdir-promise");
mkdir("/a/b/c/d").then(function () {
    console.log("success!");
}, function (ex) {
    console.error(ex);
});
```

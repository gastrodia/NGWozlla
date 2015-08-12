'use strict';var test_lib_1 = require('angular2/test_lib');
var lowercase_pipe_1 = require('angular2/src/change_detection/pipes/lowercase_pipe');
function main() {
    test_lib_1.describe("LowerCasePipe", function () {
        var upper;
        var lower;
        var pipe;
        test_lib_1.beforeEach(function () {
            lower = 'something';
            upper = 'SOMETHING';
            pipe = new lowercase_pipe_1.LowerCasePipe();
        });
        test_lib_1.describe("transform", function () {
            test_lib_1.it("should return lowercase", function () {
                var val = pipe.transform(upper);
                test_lib_1.expect(val).toEqual(lower);
            });
            test_lib_1.it("should lowercase when there is a new value", function () {
                var val = pipe.transform(upper);
                test_lib_1.expect(val).toEqual(lower);
                var val2 = pipe.transform('WAT');
                test_lib_1.expect(val2).toEqual('wat');
            });
            test_lib_1.it("should not support other objects", function () { test_lib_1.expect(function () { return pipe.transform(new Object()); }).toThrowError(); });
        });
    });
}
exports.main = main;
//# sourceMappingURL=lowercase_pipe_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
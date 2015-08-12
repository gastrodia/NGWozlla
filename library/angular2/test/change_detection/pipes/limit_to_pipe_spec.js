'use strict';var test_lib_1 = require('angular2/test_lib');
var limit_to_pipe_1 = require('angular2/src/change_detection/pipes/limit_to_pipe');
function main() {
    test_lib_1.describe("LimitToPipe", function () {
        var list;
        var str;
        var pipe;
        test_lib_1.beforeEach(function () {
            list = [1, 2, 3, 4, 5];
            str = 'tuvwxyz';
            pipe = new limit_to_pipe_1.LimitToPipe();
        });
        test_lib_1.describe("supports", function () {
            test_lib_1.it("should support strings", function () { test_lib_1.expect(pipe.supports(str)).toBe(true); });
            test_lib_1.it("should support lists", function () { test_lib_1.expect(pipe.supports(list)).toBe(true); });
            test_lib_1.it("should not support other objects", function () {
                test_lib_1.expect(pipe.supports(new Object())).toBe(false);
                test_lib_1.expect(pipe.supports(null)).toBe(false);
            });
        });
        test_lib_1.describe("transform", function () {
            test_lib_1.it('should return the first X items when X is positive', function () {
                test_lib_1.expect(pipe.transform(list, [3])).toEqual([1, 2, 3]);
                test_lib_1.expect(pipe.transform(str, [3])).toEqual('tuv');
            });
            test_lib_1.it('should return the last X items when X is negative', function () {
                test_lib_1.expect(pipe.transform(list, [-3])).toEqual([3, 4, 5]);
                test_lib_1.expect(pipe.transform(str, [-3])).toEqual('xyz');
            });
            test_lib_1.it('should return a copy of input array if X is exceeds array length', function () {
                test_lib_1.expect(pipe.transform(list, [20])).toEqual(list);
                test_lib_1.expect(pipe.transform(list, [-20])).toEqual(list);
            });
            test_lib_1.it('should return the entire string if X exceeds input length', function () {
                test_lib_1.expect(pipe.transform(str, [20])).toEqual(str);
                test_lib_1.expect(pipe.transform(str, [-20])).toEqual(str);
            });
            test_lib_1.it('should not modify the input list', function () {
                test_lib_1.expect(pipe.transform(list, [3])).toEqual([1, 2, 3]);
                test_lib_1.expect(list).toEqual([1, 2, 3, 4, 5]);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=limit_to_pipe_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
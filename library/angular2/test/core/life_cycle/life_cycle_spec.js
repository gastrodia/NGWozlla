'use strict';var test_lib_1 = require('angular2/test_lib');
var core_1 = require('angular2/core');
function main() {
    test_lib_1.describe("LifeCycle", function () {
        test_lib_1.it("should throw when reentering tick", function () {
            var cd = new test_lib_1.SpyChangeDetector();
            var lc = new core_1.LifeCycle(cd, false);
            cd.spy("detectChanges").andCallFake(function () { return lc.tick(); });
            test_lib_1.expect(function () { return lc.tick(); }).toThrowError("LifeCycle.tick is called recursively");
        });
    });
}
exports.main = main;
//# sourceMappingURL=life_cycle_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
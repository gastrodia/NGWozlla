'use strict';var test_lib_1 = require('angular2/test_lib');
var change_detection_1 = require('angular2/src/change_detection/change_detection');
function main() {
    test_lib_1.describe("PreGeneratedChangeDetection", function () {
        var proto;
        var def;
        test_lib_1.beforeEach(function () {
            proto = new test_lib_1.SpyProtoChangeDetector();
            def = new change_detection_1.ChangeDetectorDefinition('id', null, [], [], [], true);
        });
        test_lib_1.it("should return a proto change detector when one is available", function () {
            var map = { 'id': function (def) { return proto; } };
            var cd = new change_detection_1.PreGeneratedChangeDetection(map);
            test_lib_1.expect(cd.createProtoChangeDetector(def)).toBe(proto);
        });
        test_lib_1.it("should delegate to dynamic change detection otherwise", function () {
            var cd = new change_detection_1.PreGeneratedChangeDetection({});
            test_lib_1.expect(cd.createProtoChangeDetector(def)).toBeAnInstanceOf(change_detection_1.DynamicProtoChangeDetector);
        });
    });
}
exports.main = main;
//# sourceMappingURL=change_detection_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
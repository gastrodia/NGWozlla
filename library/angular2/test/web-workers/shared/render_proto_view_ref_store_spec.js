'use strict';var test_lib_1 = require("angular2/test_lib");
var api_1 = require("angular2/src/render/api");
var render_proto_view_ref_store_1 = require("angular2/src/web-workers/shared/render_proto_view_ref_store");
function main() {
    test_lib_1.describe("RenderProtoViewRefStore", function () {
        test_lib_1.it("should store and return the correct reference", function () {
            var store = new render_proto_view_ref_store_1.RenderProtoViewRefStore(true);
            var ref1 = new api_1.RenderProtoViewRef();
            var index1 = store.storeRenderProtoViewRef(ref1);
            test_lib_1.expect(store.retreiveRenderProtoViewRef(index1)).toBe(ref1);
            var ref2 = new api_1.RenderProtoViewRef();
            var index2 = store.storeRenderProtoViewRef(ref2);
            test_lib_1.expect(store.retreiveRenderProtoViewRef(index2)).toBe(ref2);
        });
        test_lib_1.it("should cache index numbers", function () {
            var store = new render_proto_view_ref_store_1.RenderProtoViewRefStore(true);
            var ref = new api_1.RenderProtoViewRef();
            var index = store.storeRenderProtoViewRef(ref);
            test_lib_1.expect(store.storeRenderProtoViewRef(ref)).toEqual(index);
        });
    });
}
exports.main = main;
//# sourceMappingURL=render_proto_view_ref_store_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
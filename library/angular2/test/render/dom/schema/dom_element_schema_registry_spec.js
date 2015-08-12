'use strict';var test_lib_1 = require('angular2/test_lib');
var dom_element_schema_registry_1 = require('angular2/src/render/dom/schema/dom_element_schema_registry');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
function main() {
    // DOMElementSchema can only be used on the JS side where we can safely
    // use reflection for DOM elements
    if (test_lib_1.IS_DARTIUM)
        return;
    var registry;
    test_lib_1.beforeEach(function () { registry = new dom_element_schema_registry_1.DomElementSchemaRegistry(); });
    test_lib_1.describe('DOMElementSchema', function () {
        test_lib_1.it('should detect properties on regular elements', function () {
            var divEl = dom_adapter_1.DOM.createElement('div');
            test_lib_1.expect(registry.hasProperty(divEl, 'id')).toBeTruthy();
            test_lib_1.expect(registry.hasProperty(divEl, 'title')).toBeTruthy();
            test_lib_1.expect(registry.hasProperty(divEl, 'unknown')).toBeFalsy();
        });
        test_lib_1.it('should return true for custom-like elements', function () {
            var customLikeEl = dom_adapter_1.DOM.createElement('custom-like');
            test_lib_1.expect(registry.hasProperty(customLikeEl, 'unknown')).toBeTruthy();
        });
        test_lib_1.it('should not re-map property names that are not specified in DOM facade', function () { test_lib_1.expect(registry.getMappedPropName('readonly')).toEqual('readOnly'); });
        test_lib_1.it('should not re-map property names that are not specified in DOM facade', function () {
            test_lib_1.expect(registry.getMappedPropName('title')).toEqual('title');
            test_lib_1.expect(registry.getMappedPropName('exotic-unknown')).toEqual('exotic-unknown');
        });
    });
}
exports.main = main;
//# sourceMappingURL=dom_element_schema_registry_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
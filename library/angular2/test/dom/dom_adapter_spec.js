'use strict';var test_lib_1 = require('angular2/test_lib');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
function main() {
    test_lib_1.describe('dom adapter', function () {
        test_lib_1.it('should not coalesque text nodes', function () {
            var el1 = test_lib_1.el('<div>a</div>');
            var el2 = test_lib_1.el('<div>b</div>');
            dom_adapter_1.DOM.appendChild(el2, dom_adapter_1.DOM.firstChild(el1));
            test_lib_1.expect(dom_adapter_1.DOM.childNodes(el2).length).toBe(2);
            var el2Clone = dom_adapter_1.DOM.clone(el2);
            test_lib_1.expect(dom_adapter_1.DOM.childNodes(el2Clone).length).toBe(2);
        });
        test_lib_1.it('should clone correctly', function () {
            var el1 = test_lib_1.el('<div x="y">a<span>b</span></div>');
            var clone = dom_adapter_1.DOM.clone(el1);
            test_lib_1.expect(clone).not.toBe(el1);
            dom_adapter_1.DOM.setAttribute(clone, 'test', '1');
            test_lib_1.expect(test_lib_1.stringifyElement(clone)).toEqual('<div test="1" x="y">a<span>b</span></div>');
            test_lib_1.expect(dom_adapter_1.DOM.getAttribute(el1, 'test')).toBeFalsy();
            var cNodes = dom_adapter_1.DOM.childNodes(clone);
            var firstChild = cNodes[0];
            var secondChild = cNodes[1];
            test_lib_1.expect(dom_adapter_1.DOM.parentElement(firstChild)).toBe(clone);
            test_lib_1.expect(dom_adapter_1.DOM.nextSibling(firstChild)).toBe(secondChild);
            test_lib_1.expect(dom_adapter_1.DOM.isTextNode(firstChild)).toBe(true);
            test_lib_1.expect(dom_adapter_1.DOM.parentElement(secondChild)).toBe(clone);
            test_lib_1.expect(dom_adapter_1.DOM.nextSibling(secondChild)).toBeFalsy();
            test_lib_1.expect(dom_adapter_1.DOM.isElementNode(secondChild)).toBe(true);
        });
    });
}
exports.main = main;
//# sourceMappingURL=dom_adapter_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
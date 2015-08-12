'use strict';var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var proto_view_1 = require('angular2/src/render/dom/view/proto_view');
var element_binder_1 = require('angular2/src/render/dom/view/element_binder');
var view_1 = require('angular2/src/render/dom/view/view');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var template_cloner_1 = require('angular2/src/render/dom/template_cloner');
function main() {
    test_lib_1.describe('DomView', function () {
        function createProtoView(binders) {
            if (binders === void 0) { binders = null; }
            if (lang_1.isBlank(binders)) {
                binders = [];
            }
            var rootEl = dom_adapter_1.DOM.createTemplate('<div></div>');
            return proto_view_1.DomProtoView.create(new template_cloner_1.TemplateCloner(-1), null, rootEl, null, [1], [], binders, null);
        }
        function createElementBinder() { return new element_binder_1.DomElementBinder({ textNodeIndices: [] }); }
        function createView(pv, boundElementCount) {
            if (pv === void 0) { pv = null; }
            if (boundElementCount === void 0) { boundElementCount = 0; }
            if (lang_1.isBlank(pv)) {
                var elementBinders = collection_1.ListWrapper.createFixedSize(boundElementCount);
                for (var i = 0; i < boundElementCount; i++) {
                    elementBinders[i] = createElementBinder();
                }
                pv = createProtoView(elementBinders);
            }
            var root = test_lib_1.el('<div><div></div></div>');
            var boundElements = [];
            for (var i = 0; i < boundElementCount; i++) {
                boundElements.push(test_lib_1.el('<span></span'));
            }
            return new view_1.DomView(pv, [dom_adapter_1.DOM.childNodes(root)[0]], boundElements);
        }
        test_lib_1.describe('setElementProperty', function () {
            var el, view;
            test_lib_1.beforeEach(function () {
                view = createView(null, 1);
                el = view.boundElements[0];
            });
            test_lib_1.it('should update the property value', function () {
                view.setElementProperty(0, 'title', 'Hello');
                test_lib_1.expect(el.title).toEqual('Hello');
            });
        });
        test_lib_1.describe('setElementAttribute', function () {
            var el, view;
            test_lib_1.beforeEach(function () {
                view = createView(null, 1);
                el = view.boundElements[0];
            });
            test_lib_1.it('should update and remove an attribute', function () {
                view.setElementAttribute(0, 'role', 'button');
                test_lib_1.expect(dom_adapter_1.DOM.getAttribute(el, 'role')).toEqual('button');
                view.setElementAttribute(0, 'role', null);
                test_lib_1.expect(dom_adapter_1.DOM.getAttribute(el, 'role')).toEqual(null);
            });
            test_lib_1.it('should de-normalize attribute names', function () {
                view.setElementAttribute(0, 'ariaLabel', 'fancy button');
                test_lib_1.expect(dom_adapter_1.DOM.getAttribute(el, 'aria-label')).toEqual('fancy button');
            });
        });
        test_lib_1.describe('setElementClass', function () {
            var el, view;
            test_lib_1.beforeEach(function () {
                view = createView(null, 1);
                el = view.boundElements[0];
            });
            test_lib_1.it('should set and remove a class', function () {
                view.setElementClass(0, 'active', true);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(el, 'active')).toEqual(true);
                view.setElementClass(0, 'active', false);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(el, 'active')).toEqual(false);
            });
            test_lib_1.it('should not de-normalize class names', function () {
                view.setElementClass(0, 'veryActive', true);
                view.setElementClass(0, 'very-active', true);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(el, 'veryActive')).toEqual(true);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(el, 'very-active')).toEqual(true);
                view.setElementClass(0, 'veryActive', false);
                view.setElementClass(0, 'very-active', false);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(el, 'veryActive')).toEqual(false);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(el, 'very-active')).toEqual(false);
            });
        });
        test_lib_1.describe('setElementStyle', function () {
            var el, view;
            test_lib_1.beforeEach(function () {
                view = createView(null, 1);
                el = view.boundElements[0];
            });
            test_lib_1.it('should set and remove styles', function () {
                view.setElementStyle(0, 'width', '40px');
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(el, 'width')).toEqual('40px');
                view.setElementStyle(0, 'width', null);
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(el, 'width')).toEqual('');
            });
            test_lib_1.it('should de-normalize style names', function () {
                view.setElementStyle(0, 'maxWidth', '40px');
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(el, 'max-width')).toEqual('40px');
                view.setElementStyle(0, 'maxWidth', null);
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(el, 'max-width')).toEqual('');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=view_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
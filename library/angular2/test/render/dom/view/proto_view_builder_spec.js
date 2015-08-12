'use strict';var test_lib_1 = require('angular2/test_lib');
var dom_element_schema_registry_1 = require('angular2/src/render/dom/schema/dom_element_schema_registry');
var template_cloner_1 = require('angular2/src/render/dom/template_cloner');
var proto_view_builder_1 = require('angular2/src/render/dom/view/proto_view_builder');
var change_detection_1 = require('angular2/src/change_detection/change_detection');
var api_1 = require('angular2/src/render/api');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
function main() {
    function emptyExpr() { return new change_detection_1.ASTWithSource(new change_detection_1.AST(), 'empty', 'empty'); }
    test_lib_1.describe('ProtoViewBuilder', function () {
        var builder;
        var templateCloner;
        test_lib_1.beforeEach(function () {
            templateCloner = new template_cloner_1.TemplateCloner(-1);
            builder =
                new proto_view_builder_1.ProtoViewBuilder(dom_adapter_1.DOM.createTemplate(''), api_1.ViewType.EMBEDDED, api_1.ViewEncapsulation.NONE);
        });
        if (!test_lib_1.IS_DARTIUM) {
            test_lib_1.describe('verification of properties', function () {
                test_lib_1.it('should throw for unknown properties', function () {
                    builder.bindElement(test_lib_1.el('<div/>')).bindProperty('unknownProperty', emptyExpr());
                    test_lib_1.expect(function () { return builder.build(new dom_element_schema_registry_1.DomElementSchemaRegistry(), templateCloner); })
                        .toThrowError("Can't bind to 'unknownProperty' since it isn't a known property of the '<div>' element and there are no matching directives with a corresponding property");
                });
                test_lib_1.it('should allow unknown properties if a directive uses it', function () {
                    var binder = builder.bindElement(test_lib_1.el('<div/>'));
                    binder.bindDirective(0).bindProperty('someDirProperty', emptyExpr(), 'directiveProperty');
                    binder.bindProperty('directiveProperty', emptyExpr());
                    test_lib_1.expect(function () { return builder.build(new dom_element_schema_registry_1.DomElementSchemaRegistry(), templateCloner); }).not.toThrow();
                });
                test_lib_1.it('should throw for unknown host properties even if another directive uses it', function () {
                    var binder = builder.bindElement(test_lib_1.el('<div/>'));
                    binder.bindDirective(0).bindProperty('someDirProperty', emptyExpr(), 'someDirProperty');
                    binder.bindDirective(1).bindHostProperty('someDirProperty', emptyExpr());
                    test_lib_1.expect(function () { return builder.build(new dom_element_schema_registry_1.DomElementSchemaRegistry()); })
                        .toThrowError("Can't bind to 'someDirProperty' since it isn't a known property of the '<div>' element");
                });
                test_lib_1.it('should allow unknown properties on custom elements', function () {
                    var binder = builder.bindElement(test_lib_1.el('<some-custom/>'));
                    binder.bindProperty('unknownProperty', emptyExpr());
                    test_lib_1.expect(function () { return builder.build(new dom_element_schema_registry_1.DomElementSchemaRegistry(), templateCloner); }).not.toThrow();
                });
                test_lib_1.it('should throw for unknown properties on custom elements if there is an ng component', function () {
                    var binder = builder.bindElement(test_lib_1.el('<some-custom/>'));
                    binder.bindProperty('unknownProperty', emptyExpr());
                    binder.setComponentId('someComponent');
                    test_lib_1.expect(function () { return builder.build(new dom_element_schema_registry_1.DomElementSchemaRegistry(), templateCloner); })
                        .toThrowError("Can't bind to 'unknownProperty' since it isn't a known property of the '<some-custom>' element and there are no matching directives with a corresponding property");
                });
            });
        }
        else {
            test_lib_1.describe('verification of properties', function () {
                // TODO(tbosch): This is just a temporary test that makes sure that the dart server and
                // dart browser is in sync. Change this to "not contains notifyBinding"
                // when https://github.com/angular/angular/issues/3019 is solved.
                test_lib_1.it('should not throw for unknown properties', function () {
                    builder.bindElement(test_lib_1.el('<div/>')).bindProperty('unknownProperty', emptyExpr());
                    test_lib_1.expect(function () { return builder.build(new dom_element_schema_registry_1.DomElementSchemaRegistry(), templateCloner); }).not.toThrow();
                });
            });
        }
        test_lib_1.describe('property normalization', function () {
            test_lib_1.it('should normalize "innerHtml" to "innerHTML"', function () {
                builder.bindElement(test_lib_1.el('<div/>')).bindProperty('innerHtml', emptyExpr());
                var pv = builder.build(new dom_element_schema_registry_1.DomElementSchemaRegistry(), templateCloner);
                test_lib_1.expect(pv.elementBinders[0].propertyBindings[0].property).toEqual('innerHTML');
            });
            test_lib_1.it('should normalize "tabindex" to "tabIndex"', function () {
                builder.bindElement(test_lib_1.el('<div/>')).bindProperty('tabindex', emptyExpr());
                var pv = builder.build(new dom_element_schema_registry_1.DomElementSchemaRegistry(), templateCloner);
                test_lib_1.expect(pv.elementBinders[0].propertyBindings[0].property).toEqual('tabIndex');
            });
            test_lib_1.it('should normalize "readonly" to "readOnly"', function () {
                builder.bindElement(test_lib_1.el('<input/>')).bindProperty('readonly', emptyExpr());
                var pv = builder.build(new dom_element_schema_registry_1.DomElementSchemaRegistry(), templateCloner);
                test_lib_1.expect(pv.elementBinders[0].propertyBindings[0].property).toEqual('readOnly');
            });
        });
        test_lib_1.describe('property binding', function () {
            test_lib_1.describe('types', function () {
                test_lib_1.it('should detect property names', function () {
                    builder.bindElement(test_lib_1.el('<div/>')).bindProperty('tabindex', emptyExpr());
                    var pv = builder.build(new dom_element_schema_registry_1.DomElementSchemaRegistry(), templateCloner);
                    test_lib_1.expect(pv.elementBinders[0].propertyBindings[0].type)
                        .toEqual(api_1.PropertyBindingType.PROPERTY);
                });
                test_lib_1.it('should detect attribute names', function () {
                    builder.bindElement(test_lib_1.el('<div/>')).bindProperty('attr.someName', emptyExpr());
                    var pv = builder.build(new dom_element_schema_registry_1.DomElementSchemaRegistry(), templateCloner);
                    test_lib_1.expect(pv.elementBinders[0].propertyBindings[0].type)
                        .toEqual(api_1.PropertyBindingType.ATTRIBUTE);
                });
                test_lib_1.it('should detect class names', function () {
                    builder.bindElement(test_lib_1.el('<div/>')).bindProperty('class.someName', emptyExpr());
                    var pv = builder.build(new dom_element_schema_registry_1.DomElementSchemaRegistry(), templateCloner);
                    test_lib_1.expect(pv.elementBinders[0].propertyBindings[0].type).toEqual(api_1.PropertyBindingType.CLASS);
                });
                test_lib_1.it('should detect style names', function () {
                    builder.bindElement(test_lib_1.el('<div/>')).bindProperty('style.someName', emptyExpr());
                    var pv = builder.build(new dom_element_schema_registry_1.DomElementSchemaRegistry(), templateCloner);
                    test_lib_1.expect(pv.elementBinders[0].propertyBindings[0].type).toEqual(api_1.PropertyBindingType.STYLE);
                });
                test_lib_1.it('should detect style units', function () {
                    builder.bindElement(test_lib_1.el('<div/>')).bindProperty('style.someName.someUnit', emptyExpr());
                    var pv = builder.build(new dom_element_schema_registry_1.DomElementSchemaRegistry(), templateCloner);
                    test_lib_1.expect(pv.elementBinders[0].propertyBindings[0].unit).toEqual('someUnit');
                });
            });
            test_lib_1.it('should not create a property binding when there is already same directive property binding', function () {
                var binder = builder.bindElement(test_lib_1.el('<div/>'));
                binder.bindProperty('tabindex', emptyExpr());
                binder.bindDirective(0).bindProperty('tabindex', emptyExpr(), 'tabindex');
                var pv = builder.build(new dom_element_schema_registry_1.DomElementSchemaRegistry(), templateCloner);
                test_lib_1.expect(pv.elementBinders[0].propertyBindings.length).toEqual(0);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=proto_view_builder_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
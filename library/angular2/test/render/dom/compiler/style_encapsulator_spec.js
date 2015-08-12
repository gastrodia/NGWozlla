'use strict';var test_lib_1 = require('angular2/test_lib');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var compile_pipeline_1 = require('angular2/src/render/dom/compiler/compile_pipeline');
var api_1 = require('angular2/src/render/api');
var style_encapsulator_1 = require('angular2/src/render/dom/compiler/style_encapsulator');
var pipeline_spec_1 = require('./pipeline_spec');
function main() {
    test_lib_1.describe('StyleEncapsulator', function () {
        var componentIdCache;
        test_lib_1.beforeEach(function () { componentIdCache = new Map(); });
        function createPipeline(viewDef) {
            return new compile_pipeline_1.CompilePipeline([
                new pipeline_spec_1.MockStep(function (parent, current, control) {
                    var tagName = dom_adapter_1.DOM.tagName(current.element).toLowerCase();
                    if (tagName.startsWith('comp-')) {
                        current.bindElement().setComponentId(tagName);
                    }
                }),
                new style_encapsulator_1.StyleEncapsulator('someapp', viewDef, componentIdCache)
            ]);
        }
        function createViewDefinition(encapsulation, componentId) {
            return new api_1.ViewDefinition({ encapsulation: encapsulation, componentId: componentId });
        }
        function processStyles(encapsulation, componentId, styles) {
            var viewDef = createViewDefinition(encapsulation, componentId);
            return createPipeline(viewDef).processStyles(styles);
        }
        function processElements(encapsulation, componentId, template, viewType) {
            if (viewType === void 0) { viewType = api_1.ViewType.COMPONENT; }
            var viewDef = createViewDefinition(encapsulation, componentId);
            var compileElements = createPipeline(viewDef).processElements(template, viewType, viewDef);
            return compileElements[0].inheritedProtoView;
        }
        test_lib_1.describe('ViewEncapsulation.NONE', function () {
            test_lib_1.it('should not change the styles', function () {
                var cs = processStyles(api_1.ViewEncapsulation.NONE, 'someComponent', ['.one {}']);
                test_lib_1.expect(cs[0]).toEqual('.one {}');
            });
        });
        test_lib_1.describe('ViewEncapsulation.NATIVE', function () {
            test_lib_1.it('should not change the styles', function () {
                var cs = processStyles(api_1.ViewEncapsulation.NATIVE, 'someComponent', ['.one {}']);
                test_lib_1.expect(cs[0]).toEqual('.one {}');
            });
        });
        test_lib_1.describe('ViewEncapsulation.EMULATED', function () {
            test_lib_1.it('should scope styles', function () {
                var cs = processStyles(api_1.ViewEncapsulation.EMULATED, 'someComponent', ['.foo {} :host {}']);
                test_lib_1.expect(cs[0]).toEqual(".foo[_ngcontent-someapp-0] {\n\n}\n\n[_nghost-someapp-0] {\n\n}");
            });
            test_lib_1.it('should return the same style given the same component', function () {
                var style = '.foo {} :host {}';
                var cs1 = processStyles(api_1.ViewEncapsulation.EMULATED, 'someComponent', [style]);
                var cs2 = processStyles(api_1.ViewEncapsulation.EMULATED, 'someComponent', [style]);
                test_lib_1.expect(cs1[0]).toEqual(cs2[0]);
            });
            test_lib_1.it('should return different styles given different components', function () {
                var style = '.foo {} :host {}';
                var cs1 = processStyles(api_1.ViewEncapsulation.EMULATED, 'someComponent1', [style]);
                var cs2 = processStyles(api_1.ViewEncapsulation.EMULATED, 'someComponent2', [style]);
                test_lib_1.expect(cs1[0]).not.toEqual(cs2[0]);
            });
            test_lib_1.it('should add a host attribute to component proto views', function () {
                var template = dom_adapter_1.DOM.createTemplate('<div></div>');
                var protoViewBuilder = processElements(api_1.ViewEncapsulation.EMULATED, 'someComponent', template);
                test_lib_1.expect(protoViewBuilder.hostAttributes.get('_nghost-someapp-0')).toEqual('');
            });
            test_lib_1.it('should not add a host attribute to embedded proto views', function () {
                var template = dom_adapter_1.DOM.createTemplate('<div></div>');
                var protoViewBuilder = processElements(api_1.ViewEncapsulation.EMULATED, 'someComponent', template, api_1.ViewType.EMBEDDED);
                test_lib_1.expect(protoViewBuilder.hostAttributes.size).toBe(0);
            });
            test_lib_1.it('should not add a host attribute to host proto views', function () {
                var template = dom_adapter_1.DOM.createTemplate('<div></div>');
                var protoViewBuilder = processElements(api_1.ViewEncapsulation.EMULATED, 'someComponent', template, api_1.ViewType.HOST);
                test_lib_1.expect(protoViewBuilder.hostAttributes.size).toBe(0);
            });
            test_lib_1.it('should add an attribute to the content elements', function () {
                var template = dom_adapter_1.DOM.createTemplate('<div></div>');
                processElements(api_1.ViewEncapsulation.EMULATED, 'someComponent', template);
                test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(template)).toEqual('<div _ngcontent-someapp-0=""></div>');
            });
            test_lib_1.it('should not add an attribute to the content elements for host views', function () {
                var template = dom_adapter_1.DOM.createTemplate('<div></div>');
                processElements(api_1.ViewEncapsulation.EMULATED, 'someComponent', template, api_1.ViewType.HOST);
                test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(template)).toEqual('<div></div>');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=style_encapsulator_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
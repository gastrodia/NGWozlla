'use strict';var test_lib_1 = require('angular2/test_lib');
var collection_1 = require('angular2/src/facade/collection');
var view_splitter_1 = require('angular2/src/render/dom/compiler/view_splitter');
var compile_pipeline_1 = require('angular2/src/render/dom/compiler/compile_pipeline');
var api_1 = require('angular2/src/render/api');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var change_detection_1 = require('angular2/src/change_detection/change_detection');
function main() {
    test_lib_1.describe('ViewSplitter', function () {
        function createViewDefinition() {
            return new api_1.ViewDefinition({ componentId: 'someComponent' });
        }
        function createPipeline() {
            return new compile_pipeline_1.CompilePipeline([new view_splitter_1.ViewSplitter(new change_detection_1.Parser(new change_detection_1.Lexer()))]);
        }
        function proceess(el) {
            return createPipeline().processElements(el, api_1.ViewType.COMPONENT, createViewDefinition());
        }
        test_lib_1.describe('<template> elements', function () {
            test_lib_1.it('should move the content into a new <template> element and mark that as viewRoot', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<template if="true">a</template>');
                var results = proceess(rootElement);
                test_lib_1.expect(test_lib_1.stringifyElement(results[1].element))
                    .toEqual('<template class="ng-binding" if="true"></template>');
                test_lib_1.expect(results[1].isViewRoot).toBe(false);
                test_lib_1.expect(test_lib_1.stringifyElement(results[2].element)).toEqual('<template>a</template>');
                test_lib_1.expect(results[2].isViewRoot).toBe(true);
            });
            test_lib_1.it('should mark the new <template> element as viewRoot', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<template if="true">a</template>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[2].isViewRoot).toBe(true);
            });
            test_lib_1.it('should not wrap the root element', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('');
                var results = proceess(rootElement);
                test_lib_1.expect(results.length).toBe(1);
                test_lib_1.expect(test_lib_1.stringifyElement(rootElement)).toEqual('<template></template>');
            });
            test_lib_1.it('should copy over the elementDescription', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<template if="true">a</template>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[2].elementDescription).toBe(results[1].elementDescription);
            });
            test_lib_1.it('should clean out the inheritedElementBinder', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<template if="true">a</template>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[2].inheritedElementBinder).toBe(null);
            });
            test_lib_1.it('should create a nestedProtoView', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<template if="true">a</template>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[2].inheritedProtoView).not.toBe(null);
                test_lib_1.expect(results[2].inheritedProtoView)
                    .toBe(results[1].inheritedElementBinder.nestedProtoView);
                test_lib_1.expect(results[2].inheritedProtoView.type).toBe(api_1.ViewType.EMBEDDED);
                test_lib_1.expect(test_lib_1.stringifyElement(results[2].inheritedProtoView.rootElement))
                    .toEqual('<template>a</template>');
            });
        });
        test_lib_1.describe('elements with template attribute', function () {
            test_lib_1.it('should replace the element with an empty <template> element', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<span template=""></span>');
                var originalChild = dom_adapter_1.DOM.firstChild(dom_adapter_1.DOM.content(rootElement));
                var results = proceess(rootElement);
                test_lib_1.expect(results[0].element).toBe(rootElement);
                test_lib_1.expect(test_lib_1.stringifyElement(results[0].element))
                    .toEqual('<template><template class="ng-binding"></template></template>');
                test_lib_1.expect(test_lib_1.stringifyElement(results[2].element))
                    .toEqual('<template><span template=""></span></template>');
                test_lib_1.expect(dom_adapter_1.DOM.firstChild(dom_adapter_1.DOM.content(results[2].element))).toBe(originalChild);
            });
            test_lib_1.it('should work with top-level template node', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<div template>x</div>');
                var originalChild = dom_adapter_1.DOM.content(rootElement).childNodes[0];
                var results = proceess(rootElement);
                test_lib_1.expect(results[0].element).toBe(rootElement);
                test_lib_1.expect(results[0].isViewRoot).toBe(true);
                test_lib_1.expect(results[2].isViewRoot).toBe(true);
                test_lib_1.expect(test_lib_1.stringifyElement(results[0].element))
                    .toEqual('<template><template class="ng-binding"></template></template>');
                test_lib_1.expect(dom_adapter_1.DOM.firstChild(dom_adapter_1.DOM.content(results[2].element))).toBe(originalChild);
            });
            test_lib_1.it('should mark the element as viewRoot', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<div template></div>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[2].isViewRoot).toBe(true);
            });
            test_lib_1.it('should add property bindings from the template attribute', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<div template="some-prop:expr"></div>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[1].inheritedElementBinder.propertyBindings.get('someProp').source)
                    .toEqual('expr');
                test_lib_1.expect(results[1].attrs().get('some-prop')).toEqual('expr');
            });
            test_lib_1.it('should add variable mappings from the template attribute to the nestedProtoView', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<div template="var var-name=mapName"></div>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[2].inheritedProtoView.variableBindings)
                    .toEqual(collection_1.MapWrapper.createFromStringMap({ 'mapName': 'varName' }));
            });
            test_lib_1.it('should add entries without value as attributes to the element', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<div template="varname"></div>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[1].attrs().get('varname')).toEqual('');
                test_lib_1.expect(results[1].inheritedElementBinder.propertyBindings).toEqual(new Map());
                test_lib_1.expect(results[1].inheritedElementBinder.variableBindings).toEqual(new Map());
            });
            test_lib_1.it('should iterate properly after a template dom modification', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<div template></div><after></after>');
                var results = proceess(rootElement);
                // 1 root + 2 initial + 2 generated template elements
                test_lib_1.expect(results.length).toEqual(5);
            });
            test_lib_1.it('should copy over the elementDescription', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<span template=""></span>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[2].elementDescription).toBe(results[1].elementDescription);
            });
            test_lib_1.it('should clean out the inheritedElementBinder', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<span template=""></span>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[2].inheritedElementBinder).toBe(null);
            });
            test_lib_1.it('should create a nestedProtoView', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<span template=""></span>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[2].inheritedProtoView).not.toBe(null);
                test_lib_1.expect(results[2].inheritedProtoView)
                    .toBe(results[1].inheritedElementBinder.nestedProtoView);
                test_lib_1.expect(test_lib_1.stringifyElement(results[2].inheritedProtoView.rootElement))
                    .toEqual('<template><span template=""></span></template>');
            });
        });
        test_lib_1.describe('elements with *directive_name attribute', function () {
            test_lib_1.it('should replace the element with an empty <template> element', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<span *ng-if></span>');
                var originalChild = dom_adapter_1.DOM.firstChild(dom_adapter_1.DOM.content(rootElement));
                var results = proceess(rootElement);
                test_lib_1.expect(results[0].element).toBe(rootElement);
                test_lib_1.expect(test_lib_1.stringifyElement(results[0].element))
                    .toEqual('<template><template class="ng-binding" ng-if=""></template></template>');
                test_lib_1.expect(test_lib_1.stringifyElement(results[2].element))
                    .toEqual('<template><span *ng-if=""></span></template>');
                test_lib_1.expect(dom_adapter_1.DOM.firstChild(dom_adapter_1.DOM.content(results[2].element))).toBe(originalChild);
            });
            test_lib_1.it('should mark the element as viewRoot', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<div *foo="bar"></div>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[2].isViewRoot).toBe(true);
            });
            test_lib_1.it('should work with top-level template node', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<div *foo>x</div>');
                var originalChild = dom_adapter_1.DOM.content(rootElement).childNodes[0];
                var results = proceess(rootElement);
                test_lib_1.expect(results[0].element).toBe(rootElement);
                test_lib_1.expect(results[0].isViewRoot).toBe(true);
                test_lib_1.expect(results[2].isViewRoot).toBe(true);
                test_lib_1.expect(test_lib_1.stringifyElement(results[0].element))
                    .toEqual('<template><template class="ng-binding" foo=""></template></template>');
                test_lib_1.expect(dom_adapter_1.DOM.firstChild(dom_adapter_1.DOM.content(results[2].element))).toBe(originalChild);
            });
            test_lib_1.it('should add property bindings from the template attribute', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<div *prop="expr"></div>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[1].inheritedElementBinder.propertyBindings.get('prop').source)
                    .toEqual('expr');
                test_lib_1.expect(results[1].attrs().get('prop')).toEqual('expr');
            });
            test_lib_1.it('should add variable mappings from the template attribute to the nestedProtoView', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<div *foreach="var varName=mapName"></div>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[2].inheritedProtoView.variableBindings)
                    .toEqual(collection_1.MapWrapper.createFromStringMap({ 'mapName': 'varName' }));
            });
            test_lib_1.it('should add entries without value as attribute to the element', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<div *varname></div>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[1].attrs().get('varname')).toEqual('');
                test_lib_1.expect(results[1].inheritedElementBinder.propertyBindings).toEqual(new Map());
                test_lib_1.expect(results[1].inheritedElementBinder.variableBindings).toEqual(new Map());
            });
            test_lib_1.it('should iterate properly after a template dom modification', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<div *foo></div><after></after>');
                var results = proceess(rootElement);
                // 1 root + 2 initial + 2 generated template elements
                test_lib_1.expect(results.length).toEqual(5);
            });
            test_lib_1.it('should copy over the elementDescription', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<span *foo></span>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[2].elementDescription).toBe(results[1].elementDescription);
            });
            test_lib_1.it('should clean out the inheritedElementBinder', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<span *foo></span>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[2].inheritedElementBinder).toBe(null);
            });
            test_lib_1.it('should create a nestedProtoView', function () {
                var rootElement = dom_adapter_1.DOM.createTemplate('<span *foo></span>');
                var results = proceess(rootElement);
                test_lib_1.expect(results[2].inheritedProtoView).not.toBe(null);
                test_lib_1.expect(results[2].inheritedProtoView)
                    .toBe(results[1].inheritedElementBinder.nestedProtoView);
                test_lib_1.expect(test_lib_1.stringifyElement(results[2].inheritedProtoView.rootElement))
                    .toEqual('<template><span *foo=""></span></template>');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=view_splitter_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
'use strict';var test_lib_1 = require('angular2/test_lib');
var collection_1 = require('angular2/src/facade/collection');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var lang_1 = require('angular2/src/facade/lang');
var compile_pipeline_1 = require('angular2/src/render/dom/compiler/compile_pipeline');
var compile_element_1 = require('angular2/src/render/dom/compiler/compile_element');
var proto_view_builder_1 = require('angular2/src/render/dom/view/proto_view_builder');
var api_1 = require('angular2/src/render/api');
function main() {
    test_lib_1.describe('compile_pipeline', function () {
        function createViewDefinition() {
            return new api_1.ViewDefinition({ componentId: 'someComponent' });
        }
        test_lib_1.describe('children compilation', function () {
            test_lib_1.it('should walk the tree in depth first order including template contents', function () {
                var element = test_lib_1.el('<div id="1"><template id="2"><span id="3"></span></template></div>');
                var step0Log = [];
                var results = new compile_pipeline_1.CompilePipeline([createLoggerStep(step0Log)])
                    .processElements(element, api_1.ViewType.COMPONENT, createViewDefinition());
                test_lib_1.expect(step0Log).toEqual(['1', '1<2', '2<3']);
                test_lib_1.expect(resultIdLog(results)).toEqual(['1', '2', '3']);
            });
            test_lib_1.it('should stop walking the tree when compileChildren is false', function () {
                var element = test_lib_1.el('<div id="1"><template id="2" ignore-children><span id="3"></span></template></div>');
                var step0Log = [];
                var pipeline = new compile_pipeline_1.CompilePipeline([new IgnoreChildrenStep(), createLoggerStep(step0Log)]);
                var results = pipeline.processElements(element, api_1.ViewType.COMPONENT, createViewDefinition());
                test_lib_1.expect(step0Log).toEqual(['1', '1<2']);
                test_lib_1.expect(resultIdLog(results)).toEqual(['1', '2']);
            });
        });
        test_lib_1.it('should inherit protoViewBuilders to children', function () {
            var element = test_lib_1.el('<div><div><span viewroot><span></span></span></div></div>');
            var pipeline = new compile_pipeline_1.CompilePipeline([
                new MockStep(function (parent, current, control) {
                    if (lang_1.isPresent(dom_adapter_1.DOM.getAttribute(current.element, 'viewroot'))) {
                        current.inheritedProtoView =
                            new proto_view_builder_1.ProtoViewBuilder(current.element, api_1.ViewType.EMBEDDED, api_1.ViewEncapsulation.NONE);
                    }
                })
            ]);
            var results = pipeline.processElements(element, api_1.ViewType.COMPONENT, createViewDefinition());
            test_lib_1.expect(results[0].inheritedProtoView).toBe(results[1].inheritedProtoView);
            test_lib_1.expect(results[2].inheritedProtoView).toBe(results[3].inheritedProtoView);
        });
        test_lib_1.it('should inherit elementBinderBuilders to children', function () {
            var element = test_lib_1.el('<div bind><div><span bind><span></span></span></div></div>');
            var pipeline = new compile_pipeline_1.CompilePipeline([
                new MockStep(function (parent, current, control) {
                    if (lang_1.isPresent(dom_adapter_1.DOM.getAttribute(current.element, 'bind'))) {
                        current.bindElement();
                    }
                })
            ]);
            var results = pipeline.processElements(element, api_1.ViewType.COMPONENT, createViewDefinition());
            test_lib_1.expect(results[0].inheritedElementBinder).toBe(results[1].inheritedElementBinder);
            test_lib_1.expect(results[2].inheritedElementBinder).toBe(results[3].inheritedElementBinder);
        });
        test_lib_1.it('should mark root elements as viewRoot', function () {
            var rootElement = test_lib_1.el('<div></div>');
            var results = new compile_pipeline_1.CompilePipeline([])
                .processElements(rootElement, api_1.ViewType.COMPONENT, createViewDefinition());
            test_lib_1.expect(results[0].isViewRoot).toBe(true);
        });
        test_lib_1.it('should calculate distanceToParent / parent correctly', function () {
            var element = test_lib_1.el('<div bind><div bind></div><div><div bind></div></div></div>');
            var pipeline = new compile_pipeline_1.CompilePipeline([
                new MockStep(function (parent, current, control) {
                    if (lang_1.isPresent(dom_adapter_1.DOM.getAttribute(current.element, 'bind'))) {
                        current.bindElement();
                    }
                })
            ]);
            var results = pipeline.processElements(element, api_1.ViewType.COMPONENT, createViewDefinition());
            test_lib_1.expect(results[0].inheritedElementBinder.distanceToParent).toBe(0);
            test_lib_1.expect(results[1].inheritedElementBinder.distanceToParent).toBe(1);
            test_lib_1.expect(results[3].inheritedElementBinder.distanceToParent).toBe(2);
            test_lib_1.expect(results[1].inheritedElementBinder.parent).toBe(results[0].inheritedElementBinder);
            test_lib_1.expect(results[3].inheritedElementBinder.parent).toBe(results[0].inheritedElementBinder);
        });
        test_lib_1.it('should not execute further steps when ignoreCurrentElement has been called', function () {
            var element = test_lib_1.el('<div id="1"><span id="2" ignore-current></span><span id="3"></span></div>');
            var logs = [];
            var pipeline = new compile_pipeline_1.CompilePipeline([
                new IgnoreCurrentElementStep(),
                createLoggerStep(logs),
            ]);
            var results = pipeline.processElements(element, api_1.ViewType.COMPONENT, createViewDefinition());
            test_lib_1.expect(results.length).toBe(2);
            test_lib_1.expect(logs).toEqual(['1', '1<3']);
        });
        test_lib_1.describe('control.addParent', function () {
            test_lib_1.it('should report the new parent to the following processor and the result', function () {
                var element = test_lib_1.el('<div id="1"><span wrap0="1" id="2"><b id="3"></b></span></div>');
                var step0Log = [];
                var step1Log = [];
                var pipeline = new compile_pipeline_1.CompilePipeline([createWrapperStep('wrap0', step0Log), createLoggerStep(step1Log)]);
                var result = pipeline.processElements(element, api_1.ViewType.COMPONENT, createViewDefinition());
                test_lib_1.expect(step0Log).toEqual(['1', '1<2', '2<3']);
                test_lib_1.expect(step1Log).toEqual(['1', '1<wrap0#0', 'wrap0#0<2', '2<3']);
                test_lib_1.expect(resultIdLog(result)).toEqual(['1', 'wrap0#0', '2', '3']);
            });
            test_lib_1.it('should allow to add a parent by multiple processors to the same element', function () {
                var element = test_lib_1.el('<div id="1"><span wrap0="1" wrap1="1" id="2"><b id="3"></b></span></div>');
                var step0Log = [];
                var step1Log = [];
                var step2Log = [];
                var pipeline = new compile_pipeline_1.CompilePipeline([
                    createWrapperStep('wrap0', step0Log),
                    createWrapperStep('wrap1', step1Log),
                    createLoggerStep(step2Log)
                ]);
                var result = pipeline.processElements(element, api_1.ViewType.COMPONENT, createViewDefinition());
                test_lib_1.expect(step0Log).toEqual(['1', '1<2', '2<3']);
                test_lib_1.expect(step1Log).toEqual(['1', '1<wrap0#0', 'wrap0#0<2', '2<3']);
                test_lib_1.expect(step2Log).toEqual(['1', '1<wrap0#0', 'wrap0#0<wrap1#0', 'wrap1#0<2', '2<3']);
                test_lib_1.expect(resultIdLog(result)).toEqual(['1', 'wrap0#0', 'wrap1#0', '2', '3']);
            });
            test_lib_1.it('should allow to add a parent by multiple processors to different elements', function () {
                var element = test_lib_1.el('<div id="1"><span wrap0="1" id="2"><b id="3" wrap1="1"></b></span></div>');
                var step0Log = [];
                var step1Log = [];
                var step2Log = [];
                var pipeline = new compile_pipeline_1.CompilePipeline([
                    createWrapperStep('wrap0', step0Log),
                    createWrapperStep('wrap1', step1Log),
                    createLoggerStep(step2Log)
                ]);
                var result = pipeline.processElements(element, api_1.ViewType.COMPONENT, createViewDefinition());
                test_lib_1.expect(step0Log).toEqual(['1', '1<2', '2<3']);
                test_lib_1.expect(step1Log).toEqual(['1', '1<wrap0#0', 'wrap0#0<2', '2<3']);
                test_lib_1.expect(step2Log).toEqual(['1', '1<wrap0#0', 'wrap0#0<2', '2<wrap1#0', 'wrap1#0<3']);
                test_lib_1.expect(resultIdLog(result)).toEqual(['1', 'wrap0#0', '2', 'wrap1#0', '3']);
            });
            test_lib_1.it('should allow to add multiple parents by the same processor', function () {
                var element = test_lib_1.el('<div id="1"><span wrap0="2" id="2"><b id="3"></b></span></div>');
                var step0Log = [];
                var step1Log = [];
                var pipeline = new compile_pipeline_1.CompilePipeline([createWrapperStep('wrap0', step0Log), createLoggerStep(step1Log)]);
                var result = pipeline.processElements(element, api_1.ViewType.COMPONENT, createViewDefinition());
                test_lib_1.expect(step0Log).toEqual(['1', '1<2', '2<3']);
                test_lib_1.expect(step1Log).toEqual(['1', '1<wrap0#0', 'wrap0#0<wrap0#1', 'wrap0#1<2', '2<3']);
                test_lib_1.expect(resultIdLog(result)).toEqual(['1', 'wrap0#0', 'wrap0#1', '2', '3']);
            });
        });
        test_lib_1.describe('control.addChild', function () {
            test_lib_1.it('should report the new child to all processors and the result', function () {
                var element = test_lib_1.el('<div id="1"><div id="2"></div></div>');
                var resultLog = [];
                var newChild = new compile_element_1.CompileElement(test_lib_1.el('<div id="3"></div>'));
                var pipeline = new compile_pipeline_1.CompilePipeline([
                    new MockStep(function (parent, current, control) {
                        if (lang_1.StringWrapper.equals(dom_adapter_1.DOM.getAttribute(current.element, 'id'), '1')) {
                            control.addChild(newChild);
                        }
                    }),
                    createLoggerStep(resultLog)
                ]);
                var result = pipeline.processElements(element, api_1.ViewType.COMPONENT, createViewDefinition());
                test_lib_1.expect(result[2]).toBe(newChild);
                test_lib_1.expect(resultLog).toEqual(['1', '1<2', '1<3']);
                test_lib_1.expect(resultIdLog(result)).toEqual(['1', '2', '3']);
            });
        });
        test_lib_1.describe('processStyles', function () {
            test_lib_1.it('should call the steps for every style', function () {
                var stepCalls = [];
                var pipeline = new compile_pipeline_1.CompilePipeline([
                    new MockStep(null, function (style) {
                        stepCalls.push(style);
                        return style;
                    })
                ]);
                var result = pipeline.processStyles(['a', 'b']);
                test_lib_1.expect(result[0]).toEqual('a');
                test_lib_1.expect(result[1]).toEqual('b');
                test_lib_1.expect(result).toEqual(stepCalls);
            });
        });
    });
}
exports.main = main;
var MockStep = (function () {
    function MockStep(processElementClosure, processStyleClosure) {
        if (processStyleClosure === void 0) { processStyleClosure = null; }
        this.processElementClosure = processElementClosure;
        this.processStyleClosure = processStyleClosure;
    }
    MockStep.prototype.processElement = function (parent, current, control) {
        if (lang_1.isPresent(this.processElementClosure)) {
            this.processElementClosure(parent, current, control);
        }
    };
    MockStep.prototype.processStyle = function (style) {
        if (lang_1.isPresent(this.processStyleClosure)) {
            return this.processStyleClosure(style);
        }
        else {
            return style;
        }
    };
    return MockStep;
})();
exports.MockStep = MockStep;
var IgnoreChildrenStep = (function () {
    function IgnoreChildrenStep() {
    }
    IgnoreChildrenStep.prototype.processElement = function (parent, current, control) {
        var attributeMap = dom_adapter_1.DOM.attributeMap(current.element);
        if (attributeMap.has('ignore-children')) {
            current.compileChildren = false;
        }
    };
    IgnoreChildrenStep.prototype.processStyle = function (style) { return style; };
    return IgnoreChildrenStep;
})();
exports.IgnoreChildrenStep = IgnoreChildrenStep;
var IgnoreCurrentElementStep = (function () {
    function IgnoreCurrentElementStep() {
    }
    IgnoreCurrentElementStep.prototype.processElement = function (parent, current, control) {
        var attributeMap = dom_adapter_1.DOM.attributeMap(current.element);
        if (attributeMap.has('ignore-current')) {
            control.ignoreCurrentElement();
        }
    };
    IgnoreCurrentElementStep.prototype.processStyle = function (style) { return style; };
    return IgnoreCurrentElementStep;
})();
function logEntry(log, parent, current) {
    var parentId = '';
    if (lang_1.isPresent(parent)) {
        parentId = dom_adapter_1.DOM.getAttribute(parent.element, 'id') + '<';
    }
    log.push(parentId + dom_adapter_1.DOM.getAttribute(current.element, 'id'));
}
function createLoggerStep(log) {
    return new MockStep(function (parent, current, control) { logEntry(log, parent, current); });
}
function createWrapperStep(wrapperId, log) {
    var nextElementId = 0;
    return new MockStep(function (parent, current, control) {
        var parentCountStr = dom_adapter_1.DOM.getAttribute(current.element, wrapperId);
        if (lang_1.isPresent(parentCountStr)) {
            var parentCount = lang_1.NumberWrapper.parseInt(parentCountStr, 10);
            while (parentCount > 0) {
                control.addParent(new compile_element_1.CompileElement(test_lib_1.el("<a id=\"" + wrapperId + "#" + nextElementId++ + "\"></a>")));
                parentCount--;
            }
        }
        logEntry(log, parent, current);
    });
}
function resultIdLog(result) {
    var idLog = [];
    collection_1.ListWrapper.forEach(result, function (current) { logEntry(idLog, null, current); });
    return idLog;
}
//# sourceMappingURL=pipeline_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
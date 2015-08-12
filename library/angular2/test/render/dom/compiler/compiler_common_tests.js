'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var test_lib_1 = require('angular2/test_lib');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var compiler_1 = require('angular2/src/render/dom/compiler/compiler');
var api_1 = require('angular2/src/render/api');
var compile_step_factory_1 = require('angular2/src/render/dom/compiler/compile_step_factory');
var element_schema_registry_1 = require('angular2/src/render/dom/schema/element_schema_registry');
var view_loader_1 = require('angular2/src/render/dom/compiler/view_loader');
var proto_view_1 = require('angular2/src/render/dom/view/proto_view');
var shared_styles_host_1 = require('angular2/src/render/dom/view/shared_styles_host');
var template_cloner_1 = require('angular2/src/render/dom/template_cloner');
var pipeline_spec_1 = require('./pipeline_spec');
function runCompilerCommonTests() {
    test_lib_1.describe('DomCompiler', function () {
        var mockStepFactory;
        var sharedStylesHost;
        test_lib_1.beforeEach(function () { sharedStylesHost = new shared_styles_host_1.SharedStylesHost(); });
        function createCompiler(processElementClosure, processStyleClosure, urlData) {
            if (processElementClosure === void 0) { processElementClosure = null; }
            if (processStyleClosure === void 0) { processStyleClosure = null; }
            if (urlData === void 0) { urlData = null; }
            if (lang_1.isBlank(urlData)) {
                urlData = new collection_1.Map();
            }
            var tplLoader = new FakeViewLoader(urlData);
            mockStepFactory =
                new MockStepFactory([new pipeline_spec_1.MockStep(processElementClosure, processStyleClosure)]);
            return new compiler_1.DomCompiler(new element_schema_registry_1.ElementSchemaRegistry(), new template_cloner_1.TemplateCloner(-1), mockStepFactory, tplLoader, sharedStylesHost);
        }
        test_lib_1.describe('compile', function () {
            test_lib_1.it('should run the steps and build the AppProtoView of the root element', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler(function (parent, current, control) {
                    current.inheritedProtoView.bindVariable('b', 'a');
                });
                compiler.compile(new api_1.ViewDefinition({ componentId: 'someComponent', template: '<div></div>' }))
                    .then(function (protoView) {
                    test_lib_1.expect(protoView.variableBindings)
                        .toEqual(collection_1.MapWrapper.createFromStringMap({ 'a': 'b' }));
                    async.done();
                });
            }));
            test_lib_1.it('should run the steps and build the proto view', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler(function (parent, current, control) {
                    current.inheritedProtoView.bindVariable('b', 'a');
                });
                var dirMetadata = api_1.DirectiveMetadata.create({ id: 'id', selector: 'custom', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
                compiler.compileHost(dirMetadata)
                    .then(function (protoView) {
                    test_lib_1.expect(dom_adapter_1.DOM.tagName(dom_adapter_1.DOM.firstChild(dom_adapter_1.DOM.content(templateRoot(protoView))))
                        .toLowerCase())
                        .toEqual('custom');
                    test_lib_1.expect(mockStepFactory.viewDef.directives).toEqual([dirMetadata]);
                    test_lib_1.expect(protoView.variableBindings)
                        .toEqual(collection_1.MapWrapper.createFromStringMap({ 'a': 'b' }));
                    async.done();
                });
            }));
            test_lib_1.it('should create element from component selector', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler(function (parent, current, control) {
                    current.inheritedProtoView.bindVariable('b', 'a');
                });
                var dirMetadata = api_1.DirectiveMetadata.create({
                    id: 'id',
                    selector: 'marquee.jazzy[size=huge]',
                    type: api_1.DirectiveMetadata.COMPONENT_TYPE
                });
                compiler.compileHost(dirMetadata)
                    .then(function (protoView) {
                    var element = dom_adapter_1.DOM.firstChild(dom_adapter_1.DOM.content(templateRoot(protoView)));
                    test_lib_1.expect(dom_adapter_1.DOM.tagName(element).toLowerCase()).toEqual('marquee');
                    test_lib_1.expect(dom_adapter_1.DOM.hasClass(element, 'jazzy')).toBe(true);
                    test_lib_1.expect(dom_adapter_1.DOM.getAttribute(element, 'size')).toEqual('huge');
                    async.done();
                });
            }));
            test_lib_1.it('should use the inline template and compile in sync', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler(EMPTY_STEP);
                compiler.compile(new api_1.ViewDefinition({ componentId: 'someId', template: 'inline component' }))
                    .then(function (protoView) {
                    test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(templateRoot(protoView))).toEqual('inline component');
                    async.done();
                });
            }));
            test_lib_1.it('should load url templates', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var urlData = collection_1.MapWrapper.createFromStringMap({ 'someUrl': 'url component' });
                var compiler = createCompiler(EMPTY_STEP, null, urlData);
                compiler.compile(new api_1.ViewDefinition({ componentId: 'someId', templateAbsUrl: 'someUrl' }))
                    .then(function (protoView) {
                    test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(templateRoot(protoView))).toEqual('url component');
                    async.done();
                });
            }));
            test_lib_1.it('should remove script tags from templates', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler(EMPTY_STEP);
                compiler.compile(new api_1.ViewDefinition({ componentId: 'someId', template: '<div></div><script></script>' }))
                    .then(function (protoView) {
                    test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(templateRoot(protoView))).toEqual('<div></div>');
                    async.done();
                });
            }));
            test_lib_1.it('should report loading errors', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler(EMPTY_STEP, null, new collection_1.Map());
                async_1.PromiseWrapper.catchError(compiler.compile(new api_1.ViewDefinition({ componentId: 'someId', templateAbsUrl: 'someUrl' })), function (e) {
                    test_lib_1.expect(e.message).toEqual('Failed to load the template for "someId" : Failed to fetch url "someUrl"');
                    async.done();
                    return null;
                });
            }));
            test_lib_1.it('should return ProtoViews of type COMPONENT_VIEW_TYPE', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler(EMPTY_STEP);
                compiler.compile(new api_1.ViewDefinition({ componentId: 'someId', template: 'inline component' }))
                    .then(function (protoView) {
                    test_lib_1.expect(protoView.type).toEqual(api_1.ViewType.COMPONENT);
                    async.done();
                });
            }));
        });
        test_lib_1.describe('compileHost', function () {
            test_lib_1.it('should return ProtoViews of type HOST_VIEW_TYPE', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler(EMPTY_STEP);
                compiler.compileHost(someComponent)
                    .then(function (protoView) {
                    test_lib_1.expect(protoView.type).toEqual(api_1.ViewType.HOST);
                    async.done();
                });
            }));
        });
        test_lib_1.describe('compile styles', function () {
            test_lib_1.it('should run the steps', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler(null, function (style) { return style + 'b {};'; });
                compiler.compile(new api_1.ViewDefinition({ componentId: 'someComponent', template: '', styles: ['a {};'] }))
                    .then(function (protoViewDto) {
                    test_lib_1.expect(sharedStylesHost.getAllStyles()).toEqual(['a {};b {};']);
                    async.done();
                });
            }));
            test_lib_1.it('should store the styles in the SharedStylesHost for ViewEncapsulation.NONE', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler();
                compiler.compile(new api_1.ViewDefinition({
                    componentId: 'someComponent',
                    template: '',
                    styles: ['a {};'],
                    encapsulation: api_1.ViewEncapsulation.NONE
                }))
                    .then(function (protoViewDto) {
                    test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(templateRoot(protoViewDto))).toEqual('');
                    test_lib_1.expect(sharedStylesHost.getAllStyles()).toEqual(['a {};']);
                    async.done();
                });
            }));
            test_lib_1.it('should store the styles in the SharedStylesHost for ViewEncapsulation.EMULATED', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler();
                compiler.compile(new api_1.ViewDefinition({
                    componentId: 'someComponent',
                    template: '',
                    styles: ['a {};'],
                    encapsulation: api_1.ViewEncapsulation.EMULATED
                }))
                    .then(function (protoViewDto) {
                    test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(templateRoot(protoViewDto))).toEqual('');
                    test_lib_1.expect(sharedStylesHost.getAllStyles()).toEqual(['a {};']);
                    async.done();
                });
            }));
            if (dom_adapter_1.DOM.supportsNativeShadowDOM()) {
                test_lib_1.it('should store the styles in the template for ViewEncapsulation.NATIVE', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var compiler = createCompiler();
                    compiler.compile(new api_1.ViewDefinition({
                        componentId: 'someComponent',
                        template: '',
                        styles: ['a {};'],
                        encapsulation: api_1.ViewEncapsulation.NATIVE
                    }))
                        .then(function (protoViewDto) {
                        test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(templateRoot(protoViewDto)))
                            .toEqual('<style>a {};</style>');
                        test_lib_1.expect(sharedStylesHost.getAllStyles()).toEqual([]);
                        async.done();
                    });
                }));
            }
            test_lib_1.it('should default to ViewEncapsulation.NONE if no styles are specified', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler();
                compiler.compile(new api_1.ViewDefinition({ componentId: 'someComponent', template: '', styles: [] }))
                    .then(function (protoView) {
                    test_lib_1.expect(mockStepFactory.viewDef.encapsulation).toBe(api_1.ViewEncapsulation.NONE);
                    async.done();
                });
            }));
            test_lib_1.it('should default to ViewEncapsulation.EMULATED if styles are specified', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler();
                compiler.compile(new api_1.ViewDefinition({ componentId: 'someComponent', template: '', styles: ['a {};'] }))
                    .then(function (protoView) {
                    test_lib_1.expect(mockStepFactory.viewDef.encapsulation).toBe(api_1.ViewEncapsulation.EMULATED);
                    async.done();
                });
            }));
        });
        test_lib_1.describe('mergeProtoViews', function () {
            test_lib_1.it('should store the styles of the merged ProtoView in the SharedStylesHost', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler();
                compiler.compile(new api_1.ViewDefinition({ componentId: 'someComponent', template: '', styles: ['a {};'] }))
                    .then(function (protoViewDto) { return compiler.mergeProtoViewsRecursively([protoViewDto.render]); })
                    .then(function (_) {
                    test_lib_1.expect(sharedStylesHost.getAllStyles()).toEqual(['a {};']);
                    async.done();
                });
            }));
        });
    });
}
exports.runCompilerCommonTests = runCompilerCommonTests;
function templateRoot(protoViewDto) {
    var pv = proto_view_1.resolveInternalDomProtoView(protoViewDto.render);
    return pv.cloneableTemplate;
}
var MockStepFactory = (function (_super) {
    __extends(MockStepFactory, _super);
    function MockStepFactory(steps) {
        _super.call(this);
        this.steps = steps;
    }
    MockStepFactory.prototype.createSteps = function (viewDef) {
        this.viewDef = viewDef;
        return this.steps;
    };
    return MockStepFactory;
})(compile_step_factory_1.CompileStepFactory);
var EMPTY_STEP = function (parent, current, control) {
    if (lang_1.isPresent(parent)) {
        current.inheritedProtoView = parent.inheritedProtoView;
    }
};
var FakeViewLoader = (function (_super) {
    __extends(FakeViewLoader, _super);
    function FakeViewLoader(urlData) {
        _super.call(this, null, null, null);
        this._urlData = urlData;
    }
    FakeViewLoader.prototype.load = function (viewDef) {
        var styles = lang_1.isPresent(viewDef.styles) ? viewDef.styles : [];
        if (lang_1.isPresent(viewDef.template)) {
            return async_1.PromiseWrapper.resolve(new view_loader_1.TemplateAndStyles(viewDef.template, styles));
        }
        if (lang_1.isPresent(viewDef.templateAbsUrl)) {
            var content = this._urlData.get(viewDef.templateAbsUrl);
            return lang_1.isPresent(content) ?
                async_1.PromiseWrapper.resolve(new view_loader_1.TemplateAndStyles(content, styles)) :
                async_1.PromiseWrapper.reject("Failed to fetch url \"" + viewDef.templateAbsUrl + "\"", null);
        }
        throw new lang_1.BaseException('View should have either the templateUrl or template property set');
    };
    return FakeViewLoader;
})(view_loader_1.ViewLoader);
var someComponent = api_1.DirectiveMetadata.create({ selector: 'some-comp', id: 'someComponent', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
//# sourceMappingURL=compiler_common_tests.js.map
'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var test_lib_1 = require("angular2/test_lib");
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var dom_testbed_1 = require('../../render/dom/dom_testbed');
var di_1 = require('angular2/di');
var renderer_1 = require("angular2/src/web-workers/worker/renderer");
var broker_1 = require("angular2/src/web-workers/worker/broker");
var serializer_1 = require("angular2/src/web-workers/shared/serializer");
var collection_1 = require("angular2/src/facade/collection");
var api_1 = require("angular2/src/render/api");
var render_proto_view_ref_store_1 = require("angular2/src/web-workers/shared/render_proto_view_ref_store");
var render_view_with_fragments_store_1 = require('angular2/src/web-workers/shared/render_view_with_fragments_store');
var proto_view_1 = require('angular2/src/render/dom/view/proto_view');
var dom_renderer_integration_spec_1 = require('../../render/dom/dom_renderer_integration_spec');
var impl_1 = require('angular2/src/web-workers/ui/impl');
var anchor_based_app_root_url_1 = require('angular2/src/services/anchor_based_app_root_url');
var worker_test_util_1 = require('./worker_test_util');
function main() {
    function createBroker(workerSerializer, uiSerializer, tb, uiRenderViewStore, workerRenderViewStore) {
        // set up the two message buses to pass messages to each other
        var uiMessageBus = new worker_test_util_1.MockMessageBus(new worker_test_util_1.MockMessageBusSink(), new worker_test_util_1.MockMessageBusSource());
        var workerMessageBus = new worker_test_util_1.MockMessageBus(new worker_test_util_1.MockMessageBusSink(), new worker_test_util_1.MockMessageBusSource());
        uiMessageBus.attachToBus(workerMessageBus);
        workerMessageBus.attachToBus(uiMessageBus);
        // set up the worker side
        var broker = new broker_1.MessageBroker(workerMessageBus, workerSerializer, null);
        // set up the ui side
        var webWorkerMain = new impl_1.WebWorkerMain(tb.compiler, tb.renderer, uiRenderViewStore, uiSerializer, new anchor_based_app_root_url_1.AnchorBasedAppRootUrl());
        webWorkerMain.attachToWebWorker(uiMessageBus);
        return broker;
    }
    function createWorkerRenderer(workerSerializer, uiSerializer, tb, uiRenderViewStore, workerRenderViewStore) {
        var broker = createBroker(workerSerializer, uiSerializer, tb, uiRenderViewStore, workerRenderViewStore);
        return new renderer_1.WebWorkerRenderer(broker, workerRenderViewStore);
    }
    function createWorkerCompiler(workerSerializer, uiSerializer, tb) {
        var broker = createBroker(workerSerializer, uiSerializer, tb, null, null);
        return new renderer_1.WebWorkerCompiler(broker);
    }
    test_lib_1.describe("Web Worker Compiler", function () {
        var workerSerializer;
        var uiSerializer;
        var workerRenderProtoViewRefStore;
        var uiRenderProtoViewRefStore;
        var tb;
        test_lib_1.beforeEach(function () {
            workerRenderProtoViewRefStore = new render_proto_view_ref_store_1.RenderProtoViewRefStore(true);
            uiRenderProtoViewRefStore = new render_proto_view_ref_store_1.RenderProtoViewRefStore(false);
            workerSerializer = createSerializer(workerRenderProtoViewRefStore, null);
            uiSerializer = createSerializer(uiRenderProtoViewRefStore, null);
            tb = test_lib_1.createTestInjector([dom_testbed_1.DomTestbed]).get(dom_testbed_1.DomTestbed);
        });
        function resolveWebWorkerRef(ref) {
            var refNumber = ref.refNumber;
            return proto_view_1.resolveInternalDomProtoView(uiRenderProtoViewRefStore.deserialize(refNumber));
        }
        test_lib_1.it('should build the proto view', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var compiler = createWorkerCompiler(workerSerializer, uiSerializer, tb);
            var dirMetadata = api_1.DirectiveMetadata.create({ id: 'id', selector: 'custom', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
            compiler.compileHost(dirMetadata)
                .then(function (protoView) {
                test_lib_1.expect(dom_adapter_1.DOM.tagName(dom_adapter_1.DOM.firstChild(dom_adapter_1.DOM.content(templateRoot(resolveWebWorkerRef(protoView.render)))))
                    .toLowerCase())
                    .toEqual('custom');
                test_lib_1.expect(protoView).not.toBeNull();
                async.done();
            });
        }));
    });
    test_lib_1.describe("Web Worker Renderer", function () {
        var renderer;
        var workerSerializer;
        var workerRenderViewStore;
        var uiRenderViewStore;
        var uiSerializer;
        var tb;
        /**
         * Seriliazes the given obj with the uiSerializer and then returns the version that
         * the worker would deserialize
         */
        function serialize(obj, type) {
            var serialized = uiSerializer.serialize(obj, type);
            return workerSerializer.deserialize(serialized, type);
        }
        test_lib_1.beforeEach(function () {
            workerRenderViewStore = new render_view_with_fragments_store_1.RenderViewWithFragmentsStore(true);
            tb = test_lib_1.createTestInjector([dom_testbed_1.DomTestbed]).get(dom_testbed_1.DomTestbed);
            uiRenderViewStore = new render_view_with_fragments_store_1.RenderViewWithFragmentsStore(false);
            workerSerializer = createSerializer(new render_proto_view_ref_store_1.RenderProtoViewRefStore(true), workerRenderViewStore);
            uiSerializer = createSerializer(new render_proto_view_ref_store_1.RenderProtoViewRefStore(false), uiRenderViewStore);
            renderer = createWorkerRenderer(workerSerializer, uiSerializer, tb, uiRenderViewStore, workerRenderViewStore);
        });
        test_lib_1.it('should create and destroy root host views while using the given elements in place', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tb.compiler.compileHost(dom_renderer_integration_spec_1.someComponent)
                .then(function (hostProtoViewDto) {
                hostProtoViewDto = serialize(hostProtoViewDto, api_1.ProtoViewDto);
                var viewWithFragments = renderer.createRootHostView(hostProtoViewDto.render, 1, '#root');
                var view = new WorkerTestRootView(viewWithFragments, uiRenderViewStore);
                test_lib_1.expect(tb.rootEl.parentNode).toBeTruthy();
                test_lib_1.expect(view.hostElement).toBe(tb.rootEl);
                renderer.detachFragment(viewWithFragments.fragmentRefs[0]);
                renderer.destroyView(viewWithFragments.viewRef);
                test_lib_1.expect(tb.rootEl.parentNode).toBeFalsy();
                async.done();
            });
        }));
        test_lib_1.it('should update text nodes', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tb.compileAndMerge(dom_renderer_integration_spec_1.someComponent, [
                new api_1.ViewDefinition({ componentId: 'someComponent', template: '{{a}}', directives: [] })
            ])
                .then(function (protoViewMergeMappings) {
                protoViewMergeMappings =
                    serialize(protoViewMergeMappings, api_1.RenderProtoViewMergeMapping);
                var rootView = renderer.createView(protoViewMergeMappings.mergedProtoViewRef, 1);
                renderer.hydrateView(rootView.viewRef);
                renderer.setText(rootView.viewRef, 0, 'hello');
                var view = new WorkerTestRootView(rootView, uiRenderViewStore);
                test_lib_1.expect(view.hostElement).toHaveText('hello');
                async.done();
            });
        }));
        test_lib_1.it('should update any element property/attributes/class/style independent of the compilation on the root element and other elements', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tb.compileAndMerge(dom_renderer_integration_spec_1.someComponent, [
                new api_1.ViewDefinition({
                    componentId: 'someComponent',
                    template: '<input [title]="y" style="position:absolute">',
                    directives: []
                })
            ])
                .then(function (protoViewMergeMappings) {
                protoViewMergeMappings =
                    serialize(protoViewMergeMappings, api_1.RenderProtoViewMergeMapping);
                var checkSetters = function (elr, el) {
                    renderer.setElementProperty(elr, 'tabIndex', 1);
                    test_lib_1.expect(el.tabIndex).toEqual(1);
                    renderer.setElementClass(elr, 'a', true);
                    test_lib_1.expect(dom_adapter_1.DOM.hasClass(el, 'a')).toBe(true);
                    renderer.setElementClass(elr, 'a', false);
                    test_lib_1.expect(dom_adapter_1.DOM.hasClass(el, 'a')).toBe(false);
                    renderer.setElementStyle(elr, 'width', '10px');
                    test_lib_1.expect(dom_adapter_1.DOM.getStyle(el, 'width')).toEqual('10px');
                    renderer.setElementStyle(elr, 'width', null);
                    test_lib_1.expect(dom_adapter_1.DOM.getStyle(el, 'width')).toEqual('');
                    renderer.setElementAttribute(elr, 'someAttr', 'someValue');
                    test_lib_1.expect(dom_adapter_1.DOM.getAttribute(el, 'some-attr')).toEqual('someValue');
                };
                var rootViewWithFragments = renderer.createView(protoViewMergeMappings.mergedProtoViewRef, 1);
                renderer.hydrateView(rootViewWithFragments.viewRef);
                var rootView = new WorkerTestRootView(rootViewWithFragments, uiRenderViewStore);
                // root element
                checkSetters(dom_testbed_1.elRef(rootViewWithFragments.viewRef, 0), rootView.hostElement);
                // nested elements
                checkSetters(dom_testbed_1.elRef(rootViewWithFragments.viewRef, 1), dom_adapter_1.DOM.firstChild(rootView.hostElement));
                async.done();
            });
        }));
        test_lib_1.it('should add and remove empty fragments', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tb.compileAndMerge(dom_renderer_integration_spec_1.someComponent, [
                new api_1.ViewDefinition({
                    componentId: 'someComponent',
                    template: '<template></template><template></template>',
                    directives: []
                })
            ])
                .then(function (protoViewMergeMappings) {
                protoViewMergeMappings =
                    serialize(protoViewMergeMappings, api_1.RenderProtoViewMergeMapping);
                var rootViewWithFragments = renderer.createView(protoViewMergeMappings.mergedProtoViewRef, 3);
                var elr = dom_testbed_1.elRef(rootViewWithFragments.viewRef, 1);
                var rootView = new WorkerTestRootView(rootViewWithFragments, uiRenderViewStore);
                test_lib_1.expect(rootView.hostElement).toHaveText('');
                var fragment = rootViewWithFragments.fragmentRefs[1];
                var fragment2 = rootViewWithFragments.fragmentRefs[2];
                renderer.attachFragmentAfterElement(elr, fragment);
                renderer.attachFragmentAfterFragment(fragment, fragment2);
                renderer.detachFragment(fragment);
                renderer.detachFragment(fragment2);
                test_lib_1.expect(rootView.hostElement).toHaveText('');
                async.done();
            });
        }));
        if (dom_adapter_1.DOM.supportsDOMEvents()) {
            test_lib_1.it('should call actions on the element independent of the compilation', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                tb.compileAndMerge(dom_renderer_integration_spec_1.someComponent, [
                    new api_1.ViewDefinition({
                        componentId: 'someComponent',
                        template: '<input [title]="y"></input>',
                        directives: []
                    })
                ])
                    .then(function (protoViewMergeMappings) {
                    protoViewMergeMappings =
                        serialize(protoViewMergeMappings, api_1.RenderProtoViewMergeMapping);
                    var rootViewWithFragments = renderer.createView(protoViewMergeMappings.mergedProtoViewRef, 1);
                    var rootView = new WorkerTestRootView(rootViewWithFragments, uiRenderViewStore);
                    renderer.invokeElementMethod(dom_testbed_1.elRef(rootViewWithFragments.viewRef, 1), 'setAttribute', ['a', 'b']);
                    test_lib_1.expect(dom_adapter_1.DOM.getAttribute(dom_adapter_1.DOM.childNodes(rootView.hostElement)[0], 'a'))
                        .toEqual('b');
                    async.done();
                });
            }));
        }
    });
}
exports.main = main;
var WorkerTestRootView = (function (_super) {
    __extends(WorkerTestRootView, _super);
    function WorkerTestRootView(workerViewWithFragments, uiRenderViewStore) {
        _super.call(this, new api_1.RenderViewWithFragments(uiRenderViewStore.retreive(workerViewWithFragments.viewRef.refNumber), collection_1.ListWrapper.map(workerViewWithFragments.fragmentRefs, function (val) { return uiRenderViewStore.retreive(val.refNumber); })));
    }
    return WorkerTestRootView;
})(dom_testbed_1.TestRootView);
function templateRoot(pv) {
    return pv.cloneableTemplate;
}
function createSerializer(protoViewRefStore, renderViewStore) {
    var injector = test_lib_1.createTestInjector([
        di_1.bind(render_proto_view_ref_store_1.RenderProtoViewRefStore)
            .toValue(protoViewRefStore),
        di_1.bind(render_view_with_fragments_store_1.RenderViewWithFragmentsStore).toValue(renderViewStore)
    ]);
    return injector.get(serializer_1.Serializer);
}
//# sourceMappingURL=renderer_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
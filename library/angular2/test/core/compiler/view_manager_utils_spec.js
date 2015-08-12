'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var test_lib_1 = require('angular2/test_lib');
var di_1 = require('angular2/di');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var view_1 = require('angular2/src/core/compiler/view');
var element_binder_1 = require('angular2/src/core/compiler/element_binder');
var element_injector_1 = require('angular2/src/core/compiler/element_injector');
var directive_resolver_1 = require('angular2/src/core/compiler/directive_resolver');
var annotations_1 = require('angular2/annotations');
var view_manager_utils_1 = require('angular2/src/core/compiler/view_manager_utils');
var render_1 = require('angular2/src/render/render');
function main() {
    // TODO(tbosch): add more tests here!
    test_lib_1.describe('AppViewManagerUtils', function () {
        var utils;
        test_lib_1.beforeEach(function () { utils = new view_manager_utils_1.AppViewManagerUtils(); });
        function createViewWithChildren(pv) {
            var renderViewWithFragments = new render_1.RenderViewWithFragments(null, [null, null]);
            return utils.createView(pv, renderViewWithFragments, null, null);
        }
        test_lib_1.describe('shared hydrate functionality', function () {
            test_lib_1.it("should hydrate the change detector after hydrating element injectors", function () {
                var log = new test_lib_1.Log();
                var componentProtoView = createComponentPv([createEmptyElBinder()]);
                var hostView = createViewWithChildren(createHostPv([createNestedElBinder(componentProtoView)]));
                var componentView = hostView.views[1];
                var spyEi = componentView.elementInjectors[0];
                spyEi.spy('hydrate').andCallFake(log.fn('hydrate'));
                var spyCd = componentView.changeDetector;
                spyCd.spy('hydrate').andCallFake(log.fn('hydrateCD'));
                utils.hydrateRootHostView(hostView, createInjector());
                test_lib_1.expect(log.result()).toEqual('hydrate; hydrateCD');
            });
            test_lib_1.it("should set up event listeners", function () {
                var dir = new Object();
                var hostPv = createHostPv([createNestedElBinder(createComponentPv()), createEmptyElBinder()]);
                var hostView = createViewWithChildren(hostPv);
                var spyEventAccessor1 = test_lib_1.SpyObject.stub({ "subscribe": null });
                test_lib_1.SpyObject.stub(hostView.elementInjectors[0], {
                    'getHostActionAccessors': [],
                    'getEventEmitterAccessors': [[spyEventAccessor1]],
                    'getDirectiveAtIndex': dir
                });
                var spyEventAccessor2 = test_lib_1.SpyObject.stub({ "subscribe": null });
                test_lib_1.SpyObject.stub(hostView.elementInjectors[1], {
                    'getHostActionAccessors': [],
                    'getEventEmitterAccessors': [[spyEventAccessor2]],
                    'getDirectiveAtIndex': dir
                });
                utils.hydrateRootHostView(hostView, createInjector());
                test_lib_1.expect(spyEventAccessor1.spy('subscribe')).toHaveBeenCalledWith(hostView, 0, dir);
                test_lib_1.expect(spyEventAccessor2.spy('subscribe')).toHaveBeenCalledWith(hostView, 1, dir);
            });
            test_lib_1.it("should set up host action listeners", function () {
                var dir = new Object();
                var hostPv = createHostPv([createNestedElBinder(createComponentPv()), createEmptyElBinder()]);
                var hostView = createViewWithChildren(hostPv);
                var spyActionAccessor1 = test_lib_1.SpyObject.stub({ "subscribe": null });
                test_lib_1.SpyObject.stub(hostView.elementInjectors[0], {
                    'getHostActionAccessors': [[spyActionAccessor1]],
                    'getEventEmitterAccessors': [],
                    'getDirectiveAtIndex': dir
                });
                var spyActionAccessor2 = test_lib_1.SpyObject.stub({ "subscribe": null });
                test_lib_1.SpyObject.stub(hostView.elementInjectors[1], {
                    'getHostActionAccessors': [[spyActionAccessor2]],
                    'getEventEmitterAccessors': [],
                    'getDirectiveAtIndex': dir
                });
                utils.hydrateRootHostView(hostView, createInjector());
                test_lib_1.expect(spyActionAccessor1.spy('subscribe')).toHaveBeenCalledWith(hostView, 0, dir);
                test_lib_1.expect(spyActionAccessor2.spy('subscribe')).toHaveBeenCalledWith(hostView, 1, dir);
            });
            test_lib_1.it("should not hydrate element injectors of component views inside of embedded fragments", function () {
                var hostView = createViewWithChildren(createHostPv([
                    createNestedElBinder(createComponentPv([
                        createNestedElBinder(createEmbeddedPv([createNestedElBinder(createComponentPv([createEmptyElBinder()]))]))
                    ]))
                ]));
                utils.hydrateRootHostView(hostView, createInjector());
                test_lib_1.expect(hostView.elementInjectors.length).toBe(4);
                test_lib_1.expect(hostView.elementInjectors[3].spy('hydrate')).not.toHaveBeenCalled();
            });
        });
        test_lib_1.describe('attachViewInContainer', function () {
            var parentView, contextView, childView;
            function createViews(numInj) {
                if (numInj === void 0) { numInj = 1; }
                var childPv = createEmbeddedPv([createEmptyElBinder()]);
                childView = createViewWithChildren(childPv);
                var parentPv = createHostPv([createEmptyElBinder()]);
                parentView = createViewWithChildren(parentPv);
                var binders = [];
                for (var i = 0; i < numInj; i++) {
                    binders.push(createEmptyElBinder(i > 0 ? binders[i - 1] : null));
                }
                ;
                var contextPv = createHostPv(binders);
                contextView = createViewWithChildren(contextPv);
            }
            test_lib_1.it('should link the views rootElementInjectors at the given context', function () {
                createViews();
                utils.attachViewInContainer(parentView, 0, contextView, 0, 0, childView);
                test_lib_1.expect(contextView.rootElementInjectors.length).toEqual(2);
            });
            test_lib_1.it('should link the views rootElementInjectors after the elementInjector at the given context', function () {
                createViews(2);
                utils.attachViewInContainer(parentView, 0, contextView, 1, 0, childView);
                test_lib_1.expect(childView.rootElementInjectors[0].spy('linkAfter'))
                    .toHaveBeenCalledWith(contextView.elementInjectors[0], null);
            });
        });
        test_lib_1.describe('hydrateViewInContainer', function () {
            var parentView, contextView, childView;
            function createViews() {
                var parentPv = createHostPv([createEmptyElBinder()]);
                parentView = createViewWithChildren(parentPv);
                var contextPv = createHostPv([createEmptyElBinder()]);
                contextView = createViewWithChildren(contextPv);
                var childPv = createEmbeddedPv([createEmptyElBinder()]);
                childView = createViewWithChildren(childPv);
                utils.attachViewInContainer(parentView, 0, contextView, 0, 0, childView);
            }
            test_lib_1.it("should instantiate the elementInjectors with the host of the context's elementInjector", function () {
                createViews();
                utils.hydrateViewInContainer(parentView, 0, contextView, 0, 0, null);
                test_lib_1.expect(childView.rootElementInjectors[0].spy('hydrate'))
                    .toHaveBeenCalledWith(null, contextView.elementInjectors[0].getHost(), childView.preBuiltObjects[0]);
            });
        });
        test_lib_1.describe('hydrateRootHostView', function () {
            var hostView;
            function createViews() {
                var hostPv = createHostPv([createNestedElBinder(createComponentPv())]);
                hostView = createViewWithChildren(hostPv);
            }
            test_lib_1.it("should instantiate the elementInjectors with the given injector and an empty host element injector", function () {
                var injector = createInjector();
                createViews();
                utils.hydrateRootHostView(hostView, injector);
                test_lib_1.expect(hostView.rootElementInjectors[0].spy('hydrate'))
                    .toHaveBeenCalledWith(injector, null, hostView.preBuiltObjects[0]);
            });
        });
    });
}
exports.main = main;
function createInjector() {
    return di_1.Injector.resolveAndCreate([]);
}
exports.createInjector = createInjector;
function createElementInjector(parent) {
    if (parent === void 0) { parent = null; }
    var host = new SpyElementInjector(null);
    var elementInjector = new SpyElementInjector(parent);
    return test_lib_1.SpyObject.stub(elementInjector, {
        'isExportingComponent': false,
        'isExportingElement': false,
        'getEventEmitterAccessors': [],
        'getHostActionAccessors': [],
        'getComponent': new Object(),
        'getHost': host
    }, {});
}
function createProtoElInjector(parent) {
    if (parent === void 0) { parent = null; }
    var pei = new SpyProtoElementInjector(parent);
    pei.spy('instantiate').andCallFake(function (parentEli) { return createElementInjector(parentEli); });
    return pei;
}
exports.createProtoElInjector = createProtoElInjector;
function createEmptyElBinder(parent) {
    if (parent === void 0) { parent = null; }
    var parentPeli = lang_1.isPresent(parent) ? parent.protoElementInjector : null;
    return new element_binder_1.ElementBinder(0, null, 0, createProtoElInjector(parentPeli), null);
}
exports.createEmptyElBinder = createEmptyElBinder;
function createNestedElBinder(nestedProtoView) {
    var componentBinding = null;
    if (nestedProtoView.type === render_1.ViewType.COMPONENT) {
        var annotation = new directive_resolver_1.DirectiveResolver().resolve(SomeComponent);
        componentBinding = element_injector_1.DirectiveBinding.createFromType(SomeComponent, annotation);
    }
    var binder = new element_binder_1.ElementBinder(0, null, 0, createProtoElInjector(), componentBinding);
    binder.nestedProtoView = nestedProtoView;
    return binder;
}
exports.createNestedElBinder = createNestedElBinder;
function countNestedElementBinders(pv) {
    var result = pv.elementBinders.length;
    pv.elementBinders.forEach(function (binder) {
        if (lang_1.isPresent(binder.nestedProtoView)) {
            result += countNestedElementBinders(binder.nestedProtoView);
        }
    });
    return result;
}
function calcHostElementIndicesByViewIndex(pv, elementOffset, target) {
    if (elementOffset === void 0) { elementOffset = 0; }
    if (target === void 0) { target = null; }
    if (lang_1.isBlank(target)) {
        target = [null];
    }
    for (var binderIdx = 0; binderIdx < pv.elementBinders.length; binderIdx++) {
        var binder = pv.elementBinders[binderIdx];
        if (lang_1.isPresent(binder.nestedProtoView)) {
            target.push(elementOffset + binderIdx);
            calcHostElementIndicesByViewIndex(binder.nestedProtoView, elementOffset + pv.elementBinders.length, target);
            elementOffset += countNestedElementBinders(binder.nestedProtoView);
        }
    }
    return target;
}
function countNestedProtoViews(pv, target) {
    if (target === void 0) { target = null; }
    if (lang_1.isBlank(target)) {
        target = [];
    }
    target.push(null);
    var resultIndex = target.length - 1;
    var count = 0;
    for (var binderIdx = 0; binderIdx < pv.elementBinders.length; binderIdx++) {
        var binder = pv.elementBinders[binderIdx];
        if (lang_1.isPresent(binder.nestedProtoView)) {
            var nextResultIndex = target.length;
            countNestedProtoViews(binder.nestedProtoView, target);
            count += target[nextResultIndex] + 1;
        }
    }
    target[resultIndex] = count;
    return target;
}
function _createProtoView(type, binders) {
    if (binders === void 0) { binders = null; }
    if (lang_1.isBlank(binders)) {
        binders = [];
    }
    var protoChangeDetector = new test_lib_1.SpyProtoChangeDetector();
    protoChangeDetector.spy('instantiate').andReturn(new test_lib_1.SpyChangeDetector());
    var res = new view_1.AppProtoView(type, null, null, protoChangeDetector, null, null, 0);
    res.elementBinders = binders;
    var mappedElementIndices = collection_1.ListWrapper.createFixedSize(countNestedElementBinders(res));
    for (var i = 0; i < binders.length; i++) {
        var binder = binders[i];
        mappedElementIndices[i] = i;
        binder.protoElementInjector.index = i;
    }
    var hostElementIndicesByViewIndex = calcHostElementIndicesByViewIndex(res);
    if (type === render_1.ViewType.EMBEDDED || type === render_1.ViewType.HOST) {
        res.mergeMapping = new view_1.AppProtoViewMergeMapping(new render_1.RenderProtoViewMergeMapping(null, hostElementIndicesByViewIndex.length, mappedElementIndices, mappedElementIndices.length, [], hostElementIndicesByViewIndex, countNestedProtoViews(res)));
    }
    return res;
}
function createHostPv(binders) {
    if (binders === void 0) { binders = null; }
    return _createProtoView(render_1.ViewType.HOST, binders);
}
exports.createHostPv = createHostPv;
function createComponentPv(binders) {
    if (binders === void 0) { binders = null; }
    return _createProtoView(render_1.ViewType.COMPONENT, binders);
}
exports.createComponentPv = createComponentPv;
function createEmbeddedPv(binders) {
    if (binders === void 0) { binders = null; }
    return _createProtoView(render_1.ViewType.EMBEDDED, binders);
}
exports.createEmbeddedPv = createEmbeddedPv;
var SomeComponent = (function () {
    function SomeComponent() {
    }
    SomeComponent = __decorate([
        annotations_1.Component({ selector: 'someComponent' }), 
        __metadata('design:paramtypes', [])
    ], SomeComponent);
    return SomeComponent;
})();
var SpyProtoElementInjector = (function (_super) {
    __extends(SpyProtoElementInjector, _super);
    function SpyProtoElementInjector(parent) {
        _super.call(this, element_injector_1.ProtoElementInjector);
        this.parent = parent;
    }
    SpyProtoElementInjector.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyProtoElementInjector = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(element_injector_1.ProtoElementInjector), 
        __metadata('design:paramtypes', [element_injector_1.ProtoElementInjector])
    ], SpyProtoElementInjector);
    return SpyProtoElementInjector;
})(test_lib_1.SpyObject);
var SpyElementInjector = (function (_super) {
    __extends(SpyElementInjector, _super);
    function SpyElementInjector(parent) {
        _super.call(this, element_injector_1.ElementInjector);
        this.parent = parent;
    }
    SpyElementInjector.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyElementInjector = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(element_injector_1.ElementInjector), 
        __metadata('design:paramtypes', [element_injector_1.ElementInjector])
    ], SpyElementInjector);
    return SpyElementInjector;
})(test_lib_1.SpyObject);
var SpyPreBuiltObjects = (function (_super) {
    __extends(SpyPreBuiltObjects, _super);
    function SpyPreBuiltObjects() {
        _super.call(this, element_injector_1.PreBuiltObjects);
    }
    SpyPreBuiltObjects.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyPreBuiltObjects = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(element_injector_1.PreBuiltObjects), 
        __metadata('design:paramtypes', [])
    ], SpyPreBuiltObjects);
    return SpyPreBuiltObjects;
})(test_lib_1.SpyObject);
var SpyInjector = (function (_super) {
    __extends(SpyInjector, _super);
    function SpyInjector() {
        _super.call(this, di_1.Injector);
    }
    SpyInjector.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyInjector = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(di_1.Injector), 
        __metadata('design:paramtypes', [])
    ], SpyInjector);
    return SpyInjector;
})(test_lib_1.SpyObject);
//# sourceMappingURL=view_manager_utils_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
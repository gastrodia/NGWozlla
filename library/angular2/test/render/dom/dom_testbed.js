'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var di_1 = require('angular2/di');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var async_1 = require('angular2/src/facade/async');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var dom_renderer_1 = require('angular2/src/render/dom/dom_renderer');
var dom_tokens_1 = require('angular2/src/render/dom/dom_tokens');
var compiler_1 = require('angular2/src/render/dom/compiler/compiler');
var api_1 = require('angular2/src/render/api');
var view_1 = require('angular2/src/render/dom/view/view');
var fragment_1 = require('angular2/src/render/dom/view/fragment');
var test_lib_1 = require('angular2/test_lib');
var TestRootView = (function () {
    function TestRootView(viewWithFragments) {
        this.viewRef = viewWithFragments.viewRef;
        this.fragments = viewWithFragments.fragmentRefs;
        this.hostElement = fragment_1.resolveInternalDomFragment(this.fragments[0])[0];
        this.events = [];
    }
    return TestRootView;
})();
exports.TestRootView = TestRootView;
var TestRenderElementRef = (function () {
    function TestRenderElementRef(renderView, renderBoundElementIndex) {
        this.renderView = renderView;
        this.renderBoundElementIndex = renderBoundElementIndex;
    }
    return TestRenderElementRef;
})();
exports.TestRenderElementRef = TestRenderElementRef;
function elRef(renderView, boundElementIndex) {
    return new TestRenderElementRef(renderView, boundElementIndex);
}
exports.elRef = elRef;
function rootNodes(view) { }
exports.rootNodes = rootNodes;
var LoggingEventDispatcher = (function () {
    function LoggingEventDispatcher(log) {
        this.log = log;
    }
    LoggingEventDispatcher.prototype.dispatchRenderEvent = function (elementIndex, eventName, locals) {
        this.log.push([elementIndex, eventName, locals]);
        return true;
    };
    return LoggingEventDispatcher;
})();
var DomTestbed = (function () {
    function DomTestbed(renderer, compiler, document) {
        this.renderer = renderer;
        this.compiler = compiler;
        this.rootEl = test_lib_1.el('<div id="root" class="rootElem"></div>');
        var oldRoots = dom_adapter_1.DOM.querySelectorAll(document, '#root');
        for (var i = 0; i < oldRoots.length; i++) {
            dom_adapter_1.DOM.remove(oldRoots[i]);
        }
        dom_adapter_1.DOM.appendChild(dom_adapter_1.DOM.querySelector(document, 'body'), this.rootEl);
    }
    DomTestbed.prototype.compile = function (host, componentViews) {
        var _this = this;
        var promises = [this.compiler.compileHost(host)];
        componentViews.forEach(function (view) { return promises.push(_this.compiler.compile(view)); });
        return async_1.PromiseWrapper.all(promises);
    };
    DomTestbed.prototype.merge = function (protoViews) {
        return this.compiler.mergeProtoViewsRecursively(collectMergeRenderProtoViewsRecurse(protoViews[0], collection_1.ListWrapper.slice(protoViews, 1)));
    };
    DomTestbed.prototype.compileAndMerge = function (host, componentViews) {
        var _this = this;
        return this.compile(host, componentViews).then(function (protoViewDtos) { return _this.merge(protoViewDtos); });
    };
    DomTestbed.prototype._createTestView = function (viewWithFragments) {
        var testView = new TestRootView(viewWithFragments);
        this.renderer.setEventDispatcher(viewWithFragments.viewRef, new LoggingEventDispatcher(testView.events));
        return testView;
    };
    DomTestbed.prototype.createView = function (protoView) {
        var viewWithFragments = this.renderer.createView(protoView.mergedProtoViewRef, 0);
        this.renderer.hydrateView(viewWithFragments.viewRef);
        return this._createTestView(viewWithFragments);
    };
    DomTestbed.prototype.triggerEvent = function (elementRef, eventName) {
        var element = view_1.resolveInternalDomView(elementRef.renderView)
            .boundElements[elementRef.renderBoundElementIndex];
        test_lib_1.dispatchEvent(element, eventName);
    };
    DomTestbed = __decorate([
        di_1.Injectable(),
        __param(2, di_1.Inject(dom_tokens_1.DOCUMENT_TOKEN)), 
        __metadata('design:paramtypes', [dom_renderer_1.DomRenderer, compiler_1.DefaultDomCompiler, Object])
    ], DomTestbed);
    return DomTestbed;
})();
exports.DomTestbed = DomTestbed;
function collectMergeRenderProtoViewsRecurse(current, components) {
    var result = [current.render];
    current.elementBinders.forEach(function (elementBinder) {
        if (lang_1.isPresent(elementBinder.nestedProtoView)) {
            result.push(collectMergeRenderProtoViewsRecurse(elementBinder.nestedProtoView, components));
        }
        else if (elementBinder.directives.length > 0) {
            if (components.length > 0) {
                var comp = components.shift();
                if (comp instanceof api_1.ProtoViewDto) {
                    result.push(collectMergeRenderProtoViewsRecurse(comp, components));
                }
                else {
                    result.push(comp);
                }
            }
            else {
                result.push(null);
            }
        }
    });
    return result;
}
//# sourceMappingURL=dom_testbed.js.map
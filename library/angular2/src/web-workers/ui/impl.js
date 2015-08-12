'use strict';/*
 * This file is the entry point for the main thread
 * It takes care of spawning the worker and sending it the initial init message
 * It also acts and the messenger between the worker thread and the renderer running on the UI
 * thread
*/
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
var di_bindings_1 = require("./di_bindings");
var api_1 = require("angular2/src/render/api");
var lang_1 = require("angular2/src/facade/lang");
var async_1 = require("angular2/src/facade/async");
var collection_1 = require('angular2/src/facade/collection');
var serializer_1 = require("angular2/src/web-workers/shared/serializer");
var render_view_with_fragments_store_1 = require('angular2/src/web-workers/shared/render_view_with_fragments_store');
var application_common_1 = require('angular2/src/core/application_common');
var api_2 = require('angular2/src/web-workers/shared/api');
var anchor_based_app_root_url_1 = require('angular2/src/services/anchor_based_app_root_url');
var di_1 = require('angular2/di');
var browser_adapter_1 = require('angular2/src/dom/browser_adapter');
var event_serializer_1 = require('angular2/src/web-workers/ui/event_serializer');
var wtf_init_1 = require('angular2/src/profile/wtf_init');
/**
 * Creates a zone, sets up the DI bindings
 * And then creates a new WebWorkerMain object to handle messages from the worker
 */
function bootstrapUICommon(bus) {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    var zone = application_common_1.createNgZone();
    wtf_init_1.wtfInit();
    zone.run(function () {
        var injector = di_bindings_1.createInjector(zone);
        var webWorkerMain = injector.get(WebWorkerMain);
        webWorkerMain.attachToWebWorker(bus);
    });
}
exports.bootstrapUICommon = bootstrapUICommon;
var WebWorkerMain = (function () {
    function WebWorkerMain(_renderCompiler, _renderer, _renderViewWithFragmentsStore, _serializer, rootUrl) {
        this._renderCompiler = _renderCompiler;
        this._renderer = _renderer;
        this._renderViewWithFragmentsStore = _renderViewWithFragmentsStore;
        this._serializer = _serializer;
        this._rootUrl = rootUrl.value;
    }
    /**
     * Attach's this WebWorkerMain instance to the given MessageBus
     * This instance will now listen for all messages from the worker and handle them appropriately
     * Note: Don't attach more than one WebWorkerMain instance to the same MessageBus.
     */
    WebWorkerMain.prototype.attachToWebWorker = function (bus) {
        var _this = this;
        this._bus = bus;
        this._bus.source.addListener(function (message) { _this._handleWebWorkerMessage(message); });
    };
    WebWorkerMain.prototype._sendInitMessage = function () { this._sendWebWorkerMessage("init", { "rootUrl": this._rootUrl }); };
    /*
     * Sends an error back to the worker thread in response to an opeartion on the UI thread
     */
    WebWorkerMain.prototype._sendWebWorkerError = function (id, error) {
        this._sendWebWorkerMessage("error", { "error": error }, id);
    };
    WebWorkerMain.prototype._sendWebWorkerMessage = function (type, value, id) {
        this._bus.sink.send({ 'type': type, 'id': id, 'value': value });
    };
    // TODO: Transfer the types with the serialized data so this can be automated?
    WebWorkerMain.prototype._handleCompilerMessage = function (data) {
        var promise;
        switch (data.method) {
            case "compileHost":
                var directiveMetadata = this._serializer.deserialize(data.args[0], api_1.DirectiveMetadata);
                promise = this._renderCompiler.compileHost(directiveMetadata);
                this._wrapWebWorkerPromise(data.id, promise, api_1.ProtoViewDto);
                break;
            case "compile":
                var view = this._serializer.deserialize(data.args[0], api_1.ViewDefinition);
                promise = this._renderCompiler.compile(view);
                this._wrapWebWorkerPromise(data.id, promise, api_1.ProtoViewDto);
                break;
            case "mergeProtoViewsRecursively":
                var views = this._serializer.deserialize(data.args[0], api_1.RenderProtoViewRef);
                promise = this._renderCompiler.mergeProtoViewsRecursively(views);
                this._wrapWebWorkerPromise(data.id, promise, api_1.RenderProtoViewMergeMapping);
                break;
            default:
                throw new lang_1.BaseException("not implemented");
        }
    };
    WebWorkerMain.prototype._createViewHelper = function (args, method) {
        var hostProtoView = this._serializer.deserialize(args[0], api_1.RenderProtoViewRef);
        var fragmentCount = args[1];
        var startIndex, renderViewWithFragments;
        if (method == "createView") {
            startIndex = args[2];
            renderViewWithFragments = this._renderer.createView(hostProtoView, fragmentCount);
        }
        else {
            var selector = args[2];
            startIndex = args[3];
            renderViewWithFragments =
                this._renderer.createRootHostView(hostProtoView, fragmentCount, selector);
        }
        this._renderViewWithFragmentsStore.store(renderViewWithFragments, startIndex);
    };
    WebWorkerMain.prototype._handleRendererMessage = function (data) {
        var args = data.args;
        switch (data.method) {
            case "createRootHostView":
            case "createView":
                this._createViewHelper(args, data.method);
                break;
            case "destroyView":
                var viewRef = this._serializer.deserialize(args[0], api_1.RenderViewRef);
                this._renderer.destroyView(viewRef);
                break;
            case "attachFragmentAfterFragment":
                var previousFragment = this._serializer.deserialize(args[0], api_1.RenderFragmentRef);
                var fragment = this._serializer.deserialize(args[1], api_1.RenderFragmentRef);
                this._renderer.attachFragmentAfterFragment(previousFragment, fragment);
                break;
            case "attachFragmentAfterElement":
                var element = this._serializer.deserialize(args[0], api_2.WebWorkerElementRef);
                var fragment = this._serializer.deserialize(args[1], api_1.RenderFragmentRef);
                this._renderer.attachFragmentAfterElement(element, fragment);
                break;
            case "detachFragment":
                var fragment = this._serializer.deserialize(args[0], api_1.RenderFragmentRef);
                this._renderer.detachFragment(fragment);
                break;
            case "hydrateView":
                var viewRef = this._serializer.deserialize(args[0], api_1.RenderViewRef);
                this._renderer.hydrateView(viewRef);
                break;
            case "dehydrateView":
                var viewRef = this._serializer.deserialize(args[0], api_1.RenderViewRef);
                this._renderer.dehydrateView(viewRef);
                break;
            case "setText":
                var viewRef = this._serializer.deserialize(args[0], api_1.RenderViewRef);
                var textNodeIndex = args[1];
                var text = args[2];
                this._renderer.setText(viewRef, textNodeIndex, text);
                break;
            case "setElementProperty":
                var elementRef = this._serializer.deserialize(args[0], api_2.WebWorkerElementRef);
                var propName = args[1];
                var propValue = args[2];
                this._renderer.setElementProperty(elementRef, propName, propValue);
                break;
            case "setElementAttribute":
                var elementRef = this._serializer.deserialize(args[0], api_2.WebWorkerElementRef);
                var attributeName = args[1];
                var attributeValue = args[2];
                this._renderer.setElementAttribute(elementRef, attributeName, attributeValue);
                break;
            case "setElementClass":
                var elementRef = this._serializer.deserialize(args[0], api_2.WebWorkerElementRef);
                var className = args[1];
                var isAdd = args[2];
                this._renderer.setElementClass(elementRef, className, isAdd);
                break;
            case "setElementStyle":
                var elementRef = this._serializer.deserialize(args[0], api_2.WebWorkerElementRef);
                var styleName = args[1];
                var styleValue = args[2];
                this._renderer.setElementStyle(elementRef, styleName, styleValue);
                break;
            case "invokeElementMethod":
                var elementRef = this._serializer.deserialize(args[0], api_2.WebWorkerElementRef);
                var methodName = args[1];
                var methodArgs = args[2];
                this._renderer.invokeElementMethod(elementRef, methodName, methodArgs);
                break;
            case "setEventDispatcher":
                var viewRef = this._serializer.deserialize(args[0], api_1.RenderViewRef);
                var dispatcher = new EventDispatcher(viewRef, this._bus.sink, this._serializer);
                this._renderer.setEventDispatcher(viewRef, dispatcher);
                break;
            default:
                throw new lang_1.BaseException("Not Implemented");
        }
    };
    // TODO(jteplitz602): Create message type enum #3044
    WebWorkerMain.prototype._handleWebWorkerMessage = function (message) {
        var data = new ReceivedMessage(message['data']);
        switch (data.type) {
            case "ready":
                return this._sendInitMessage();
            case "compiler":
                return this._handleCompilerMessage(data);
            case "renderer":
                return this._handleRendererMessage(data);
        }
    };
    WebWorkerMain.prototype._wrapWebWorkerPromise = function (id, promise, type) {
        var _this = this;
        async_1.PromiseWrapper.then(promise, function (result) {
            try {
                _this._sendWebWorkerMessage("result", _this._serializer.serialize(result, type), id);
            }
            catch (e) {
                lang_1.print(e);
            }
        }, function (error) { _this._sendWebWorkerError(id, error); });
    };
    WebWorkerMain = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [api_1.RenderCompiler, api_1.Renderer, render_view_with_fragments_store_1.RenderViewWithFragmentsStore, serializer_1.Serializer, anchor_based_app_root_url_1.AnchorBasedAppRootUrl])
    ], WebWorkerMain);
    return WebWorkerMain;
})();
exports.WebWorkerMain = WebWorkerMain;
var EventDispatcher = (function () {
    function EventDispatcher(_viewRef, _sink, _serializer) {
        this._viewRef = _viewRef;
        this._sink = _sink;
        this._serializer = _serializer;
    }
    EventDispatcher.prototype.dispatchRenderEvent = function (elementIndex, eventName, locals) {
        var e = locals.get('$event');
        var serializedEvent;
        // TODO (jteplitz602): support custom events #3350
        switch (e.type) {
            case "click":
            case "mouseup":
            case "mousedown":
            case "dblclick":
            case "contextmenu":
            case "mouseenter":
            case "mouseleave":
            case "mousemove":
            case "mouseout":
            case "mouseover":
            case "show":
                serializedEvent = event_serializer_1.serializeMouseEvent(e);
                break;
            case "keydown":
            case "keypress":
            case "keyup":
                serializedEvent = event_serializer_1.serializeKeyboardEvent(e);
                break;
            case "input":
            case "change":
            case "blur":
                serializedEvent = event_serializer_1.serializeEventWithTarget(e);
                break;
            case "abort":
            case "afterprint":
            case "beforeprint":
            case "cached":
            case "canplay":
            case "canplaythrough":
            case "chargingchange":
            case "chargingtimechange":
            case "close":
            case "dischargingtimechange":
            case "DOMContentLoaded":
            case "downloading":
            case "durationchange":
            case "emptied":
            case "ended":
            case "error":
            case "fullscreenchange":
            case "fullscreenerror":
            case "invalid":
            case "languagechange":
            case "levelfchange":
            case "loadeddata":
            case "loadedmetadata":
            case "obsolete":
            case "offline":
            case "online":
            case "open":
            case "orientatoinchange":
            case "pause":
            case "pointerlockchange":
            case "pointerlockerror":
            case "play":
            case "playing":
            case "ratechange":
            case "readystatechange":
            case "reset":
            case "seeked":
            case "seeking":
            case "stalled":
            case "submit":
            case "success":
            case "suspend":
            case "timeupdate":
            case "updateready":
            case "visibilitychange":
            case "volumechange":
            case "waiting":
                serializedEvent = event_serializer_1.serializeGenericEvent(e);
                break;
            default:
                throw new lang_1.BaseException(eventName + " not supported on WebWorkers");
        }
        var serializedLocals = collection_1.StringMapWrapper.create();
        collection_1.StringMapWrapper.set(serializedLocals, '$event', serializedEvent);
        this._sink.send({
            "type": "event",
            "value": {
                "viewRef": this._serializer.serialize(this._viewRef, api_1.RenderViewRef),
                "elementIndex": elementIndex,
                "eventName": eventName,
                "locals": serializedLocals
            }
        });
    };
    return EventDispatcher;
})();
var ReceivedMessage = (function () {
    function ReceivedMessage(data) {
        this.method = data['method'];
        this.args = data['args'];
        this.id = data['id'];
        this.type = data['type'];
    }
    return ReceivedMessage;
})();
//# sourceMappingURL=impl.js.map
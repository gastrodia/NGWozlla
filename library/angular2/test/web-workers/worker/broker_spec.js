'use strict';var test_lib_1 = require('angular2/test_lib');
var serializer_1 = require('angular2/src/web-workers/shared/serializer');
var ng_zone_1 = require('angular2/src/core/zone/ng_zone');
var broker_1 = require('angular2/src/web-workers/worker/broker');
var worker_test_util_1 = require('./worker_test_util');
var api_1 = require('angular2/src/web-workers/shared/api');
var di_1 = require('angular2/di');
var render_proto_view_ref_store_1 = require('angular2/src/web-workers/shared/render_proto_view_ref_store');
var render_view_with_fragments_store_1 = require('angular2/src/web-workers/shared/render_view_with_fragments_store');
var api_2 = require('angular2/src/render/api');
function main() {
    test_lib_1.describe("MessageBroker", function () {
        test_lib_1.beforeEachBindings(function () { return [
            di_1.bind(api_1.ON_WEB_WORKER)
                .toValue(true),
            render_proto_view_ref_store_1.RenderProtoViewRefStore,
            render_view_with_fragments_store_1.RenderViewWithFragmentsStore
        ]; });
        test_lib_1.it("should dispatch events", test_lib_1.inject([serializer_1.Serializer, ng_zone_1.NgZone], function (serializer, zone) {
            var bus = new worker_test_util_1.MockMessageBus(new worker_test_util_1.MockMessageBusSink(), new worker_test_util_1.MockMessageBusSource());
            var broker = new broker_1.MessageBroker(bus, serializer, zone);
            var eventDispatcher = new SpyEventDispatcher();
            var viewRef = new render_view_with_fragments_store_1.WebWorkerRenderViewRef(0);
            serializer.allocateRenderViews(0); // serialize the ref so it's in the store
            viewRef =
                serializer.deserialize(serializer.serialize(viewRef, api_2.RenderViewRef), api_2.RenderViewRef);
            broker.registerEventDispatcher(viewRef, eventDispatcher);
            var elementIndex = 15;
            var eventName = 'click';
            bus.source.receive({
                'data': {
                    'type': 'event',
                    'value': {
                        'viewRef': viewRef.serialize(),
                        'elementIndex': elementIndex,
                        'eventName': eventName,
                        'locals': { '$event': { 'target': { value: null } } }
                    }
                }
            });
            test_lib_1.expect(eventDispatcher.wasDispatched).toBeTruthy();
            test_lib_1.expect(eventDispatcher.elementIndex).toEqual(elementIndex);
            test_lib_1.expect(eventDispatcher.eventName).toEqual(eventName);
        }));
    });
}
exports.main = main;
var SpyEventDispatcher = (function () {
    function SpyEventDispatcher() {
        this.wasDispatched = false;
    }
    SpyEventDispatcher.prototype.dispatchRenderEvent = function (elementIndex, eventName, locals) {
        this.wasDispatched = true;
        this.elementIndex = elementIndex;
        this.eventName = eventName;
    };
    return SpyEventDispatcher;
})();
//# sourceMappingURL=broker_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
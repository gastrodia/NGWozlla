'use strict';var collection_1 = require("angular2/src/facade/collection");
var MockMessageBusSource = (function () {
    function MockMessageBusSource() {
        this._listenerStore = new Map();
        this._numListeners = 0;
    }
    MockMessageBusSource.prototype.addListener = function (fn) {
        this._listenerStore.set(++this._numListeners, fn);
        return this._numListeners;
    };
    MockMessageBusSource.prototype.removeListener = function (index) { collection_1.MapWrapper.delete(this._listenerStore, index); };
    MockMessageBusSource.prototype.receive = function (message) {
        collection_1.MapWrapper.forEach(this._listenerStore, function (fn, key) { fn(message); });
    };
    return MockMessageBusSource;
})();
exports.MockMessageBusSource = MockMessageBusSource;
var MockMessageBusSink = (function () {
    function MockMessageBusSink() {
    }
    MockMessageBusSink.prototype.send = function (message) { this._sendTo.receive({ 'data': message }); };
    MockMessageBusSink.prototype.attachToSource = function (source) { this._sendTo = source; };
    return MockMessageBusSink;
})();
exports.MockMessageBusSink = MockMessageBusSink;
var MockMessageBus = (function () {
    function MockMessageBus(sink, source) {
        this.sink = sink;
        this.source = source;
    }
    MockMessageBus.prototype.attachToBus = function (bus) { this.sink.attachToSource(bus.source); };
    return MockMessageBus;
})();
exports.MockMessageBus = MockMessageBus;
//# sourceMappingURL=worker_test_util.js.map
import { MessageBus, MessageBusSource, MessageBusSink, SourceListener } from "angular2/src/web-workers/shared/message_bus";
export declare class MockMessageBusSource implements MessageBusSource {
    private _listenerStore;
    private _numListeners;
    addListener(fn: SourceListener): int;
    removeListener(index: int): void;
    receive(message: Object): void;
}
export declare class MockMessageBusSink implements MessageBusSink {
    private _sendTo;
    send(message: Object): void;
    attachToSource(source: MockMessageBusSource): void;
}
export declare class MockMessageBus implements MessageBus {
    sink: MockMessageBusSink;
    source: MockMessageBusSource;
    constructor(sink: MockMessageBusSink, source: MockMessageBusSource);
    attachToBus(bus: MockMessageBus): void;
}

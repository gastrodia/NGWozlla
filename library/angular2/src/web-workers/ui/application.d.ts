import { MessageBus, MessageBusSource, MessageBusSink, SourceListener } from "angular2/src/web-workers/shared/message_bus";
/**
 * Bootstrapping a WebWorker
 *
 * You instantiate a WebWorker application by calling bootstrap with the URI of your worker's index
 * script
 * Note: The WebWorker script must call bootstrapWebworker once it is set up to complete the
 * bootstrapping process
 */
export declare function bootstrap(uri: string): MessageBus;
export declare function spawnWebWorker(uri: string): MessageBus;
export declare class UIMessageBus implements MessageBus {
    sink: UIMessageBusSink;
    source: UIMessageBusSource;
    constructor(sink: UIMessageBusSink, source: UIMessageBusSource);
}
export declare class UIMessageBusSink implements MessageBusSink {
    private _webWorker;
    constructor(_webWorker: Worker);
    send(message: Object): void;
}
export declare class UIMessageBusSource implements MessageBusSource {
    private _webWorker;
    private _listenerStore;
    private _numListeners;
    constructor(_webWorker: Worker);
    addListener(fn: SourceListener): int;
    removeListener(index: int): void;
}

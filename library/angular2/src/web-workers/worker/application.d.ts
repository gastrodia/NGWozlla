import { MessageBus, MessageBusSource, MessageBusSink, SourceListener } from "angular2/src/web-workers/shared/message_bus";
import { Type } from "angular2/src/facade/lang";
import { Binding } from "angular2/di";
import { ApplicationRef } from "angular2/src/core/application";
/**
 * Bootstrapping a Webworker Application
 *
 * You instantiate the application side by calling bootstrapWebworker from your webworker index
 * script.
 * You can call bootstrapWebworker() exactly as you would call bootstrap() in a regular Angular
 * application
 * See the bootstrap() docs for more details.
 */
export declare function bootstrapWebWorker(appComponentType: Type, componentInjectableBindings?: List<Type | Binding | List<any>>): Promise<ApplicationRef>;
export declare class WebWorkerMessageBus implements MessageBus {
    sink: WebWorkerMessageBusSink;
    source: WebWorkerMessageBusSource;
    constructor(sink: WebWorkerMessageBusSink, source: WebWorkerMessageBusSource);
}
export declare class WebWorkerMessageBusSink implements MessageBusSink {
    send(message: Object): void;
}
export declare class WebWorkerMessageBusSource implements MessageBusSource {
    private listenerStore;
    private numListeners;
    constructor();
    addListener(fn: SourceListener): int;
    removeListener(index: int): void;
}

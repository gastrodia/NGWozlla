import { Binding } from 'angular2/di';
import { Type } from 'angular2/src/facade/lang';
import { Promise } from 'angular2/src/facade/async';
import { WebWorkerMessageBus } from 'angular2/src/web-workers/worker/application';
import { ApplicationRef } from 'angular2/src/core/application';
export declare function bootstrapWebWorkerCommon(appComponentType: Type, bus: WebWorkerMessageBus, componentInjectableBindings?: List<Type | Binding | List<any>>): Promise<ApplicationRef>;

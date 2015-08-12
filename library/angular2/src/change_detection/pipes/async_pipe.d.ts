import { Observable, Promise } from 'angular2/src/facade/async';
import { Pipe } from './pipe';
import { ChangeDetectorRef } from '../change_detector_ref';
/**
 * Implements async bindings to Observable and Promise.
 *
 * # Example
 *
 * In this example we bind the description observable to the DOM. The async pipe will convert an
 *observable to the
 * latest value it emitted. It will also request a change detection check when a new value is
 *emitted.
 *
 *  ```
 * @Component({
 *   selector: "task-cmp",
 *   changeDetection: ON_PUSH
 * })
 * @View({
 *   template: "Task Description {{ description | async }}"
 * })
 * class Task {
 *  description:Observable<string>;
 * }
 *
 * ```
 */
export declare class AsyncPipe implements Pipe {
    _ref: ChangeDetectorRef;
    _latestValue: Object;
    _latestReturnedValue: Object;
    _subscription: Object;
    _obj: Observable | Promise<any>;
    private _strategy;
    constructor(_ref: ChangeDetectorRef);
    onDestroy(): void;
    transform(obj: Observable | Promise<any>, args?: any[]): any;
    _subscribe(obj: Observable | Promise<any>): void;
    _selectStrategy(obj: Observable | Promise<any>): any;
    _dispose(): void;
    _updateLatestValue(async: any, value: Object): void;
}

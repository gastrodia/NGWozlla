import { Type } from 'angular2/src/facade/lang';
import { Pipe } from './pipe';
import { Binding, Injector } from 'angular2/di';
import { ChangeDetectorRef } from '../change_detector_ref';
export declare class Pipes {
    injector: Injector;
    /**
     * Map of {@link Pipe} names to {@link Pipe} implementations.
     *
     * #Example
     *
     * ```
     * var pipesConfig = {
     *   'json': JsonPipe
     * }
     * @Component({
     *   viewBindings: [
     *     bind(Pipes).toFactory(inj => new Pipes(pipesConfig, in), [Injector])
     *   ]
     * })
     * ```
     */
    config: StringMap<string, Type | Binding>;
    constructor(config: StringMap<string, Type | Binding>, injector: Injector);
    get(type: string, cdRef: ChangeDetectorRef): Pipe;
    /**
     * Takes a {@link Pipes} config object and returns a binding used to extend the
     * inherited {@link Pipes} instance with the provided config and return a new
     * {@link Pipes} instance.
     *
     * The provided config is merged with the {@link Pipes} instance.
     *
     * # Example
     *
     * ```
     * @Component({
     *   viewBindings: [
     *     Pipes.extend({
     *       'bithdayFormat': BirthdayFormat
     *     })
     *   ]
     * })
     * ```
     */
    static extend(config: StringMap<string, Type | Binding>): Binding;
    static create(config: StringMap<string, Type | Binding>, injector: Injector, pipes?: Pipes): Pipes;
}

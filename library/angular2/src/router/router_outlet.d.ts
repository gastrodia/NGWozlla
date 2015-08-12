import { Promise } from 'angular2/src/facade/async';
import { DynamicComponentLoader, ElementRef } from 'angular2/core';
import * as routerMod from './router';
import { Instruction } from './instruction';
/**
 * A router outlet is a placeholder that Angular dynamically fills based on the application's route.
 *
 * ## Use
 *
 * ```
 * <router-outlet></router-outlet>
 * ```
 */
export declare class RouterOutlet {
    private _elementRef;
    private _loader;
    private _parentRouter;
    childRouter: routerMod.Router;
    private _componentRef;
    private _currentInstruction;
    constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader, _parentRouter: routerMod.Router, nameAttr: string);
    /**
     * Given an instruction, update the contents of this outlet.
     */
    commit(instruction: Instruction): Promise<any>;
    private _commitChild(instruction);
    private _activate(instruction);
    /**
     * Called by Router during recognition phase
     */
    canDeactivate(nextInstruction: Instruction): Promise<boolean>;
    /**
     * Called by Router during recognition phase
     */
    canReuse(nextInstruction: Instruction): Promise<boolean>;
    private _reuse(instruction);
    deactivate(nextInstruction: Instruction): Promise<any>;
}

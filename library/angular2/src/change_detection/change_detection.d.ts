import { IterableDiffers, IterableDifferFactory } from './differs/iterable_differs';
import { KeyValueDiffers, KeyValueDifferFactory } from './differs/keyvalue_differs';
import { ChangeDetection, ProtoChangeDetector, ChangeDetectorDefinition } from './interfaces';
import { OpaqueToken, Binding } from 'angular2/di';
export { ASTWithSource, AST, AstTransformer, AccessMember, LiteralArray, ImplicitReceiver } from './parser/ast';
export { Lexer } from './parser/lexer';
export { Parser } from './parser/parser';
export { Locals } from './parser/locals';
export { DehydratedException, ExpressionChangedAfterItHasBeenCheckedException, ChangeDetectionError } from './exceptions';
export { ProtoChangeDetector, ChangeDetector, ChangeDispatcher, ChangeDetection, ChangeDetectorDefinition, DebugContext } from './interfaces';
export { CHECK_ONCE, CHECK_ALWAYS, DETACHED, CHECKED, ON_PUSH, DEFAULT } from './constants';
export { DynamicProtoChangeDetector } from './proto_change_detector';
export { BindingRecord } from './binding_record';
export { DirectiveIndex, DirectiveRecord } from './directive_record';
export { DynamicChangeDetector } from './dynamic_change_detector';
export { ChangeDetectorRef } from './change_detector_ref';
export { Pipes } from './pipes/pipes';
export { IterableDiffers, IterableDiffer, IterableDifferFactory } from './differs/iterable_differs';
export { KeyValueDiffers, KeyValueDiffer, KeyValueDifferFactory } from './differs/keyvalue_differs';
export { WrappedValue, Pipe, BasePipe } from './pipes/pipe';
export declare const defaultPipes: Binding;
/**
 * Structural diffing for `Object`s and `Map`s.
 */
export declare const keyValDiff: KeyValueDifferFactory[];
/**
 * Structural diffing for `Iterable` types such as `Array`s.
 */
export declare const iterableDiff: IterableDifferFactory[];
export declare const defaultIterableDiffers: IterableDiffers;
export declare const defaultKeyValueDiffers: KeyValueDiffers;
/**
 * Map from {@link ChangeDetectorDefinition#id} to a factory method which takes a
 * {@link Pipes} and a {@link ChangeDetectorDefinition} and generates a
 * {@link ProtoChangeDetector} associated with the definition.
 */
export declare var preGeneratedProtoDetectors: StringMap<string, Function>;
export declare const PROTO_CHANGE_DETECTOR_KEY: OpaqueToken;
/**
 * Implements change detection using a map of pregenerated proto detectors.
 */
export declare class PreGeneratedChangeDetection extends ChangeDetection {
    _dynamicChangeDetection: ChangeDetection;
    _protoChangeDetectorFactories: StringMap<string, Function>;
    constructor(protoChangeDetectorsForTest?: StringMap<string, Function>);
    static isSupported(): boolean;
    createProtoChangeDetector(definition: ChangeDetectorDefinition): ProtoChangeDetector;
}
/**
 * Implements change detection that does not require `eval()`.
 *
 * This is slower than {@link JitChangeDetection}.
 */
export declare class DynamicChangeDetection extends ChangeDetection {
    createProtoChangeDetector(definition: ChangeDetectorDefinition): ProtoChangeDetector;
}
/**
 * Implements faster change detection by generating source code.
 *
 * This requires `eval()`. For change detection that does not require `eval()`, see
 * {@link DynamicChangeDetection} and {@link PreGeneratedChangeDetection}.
 */
export declare class JitChangeDetection extends ChangeDetection {
    static isSupported(): boolean;
    createProtoChangeDetector(definition: ChangeDetectorDefinition): ProtoChangeDetector;
}

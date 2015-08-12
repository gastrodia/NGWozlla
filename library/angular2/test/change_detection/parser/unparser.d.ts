import { AST, AstVisitor, AccessMember, Assignment, Binary, Chain, Conditional, If, BindingPipe, FunctionCall, ImplicitReceiver, Interpolation, KeyedAccess, LiteralArray, LiteralMap, LiteralPrimitive, MethodCall, PrefixNot, SafeAccessMember, SafeMethodCall } from 'angular2/src/change_detection/parser/ast';
export declare class Unparser implements AstVisitor {
    private static _quoteRegExp;
    private _expression;
    unparse(ast: AST): string;
    visitAccessMember(ast: AccessMember): void;
    visitAssignment(ast: Assignment): void;
    visitBinary(ast: Binary): void;
    visitChain(ast: Chain): void;
    visitConditional(ast: Conditional): void;
    visitIf(ast: If): void;
    visitPipe(ast: BindingPipe): void;
    visitFunctionCall(ast: FunctionCall): void;
    visitImplicitReceiver(ast: ImplicitReceiver): void;
    visitInterpolation(ast: Interpolation): void;
    visitKeyedAccess(ast: KeyedAccess): void;
    visitLiteralArray(ast: LiteralArray): void;
    visitLiteralMap(ast: LiteralMap): void;
    visitLiteralPrimitive(ast: LiteralPrimitive): void;
    visitMethodCall(ast: MethodCall): void;
    visitPrefixNot(ast: PrefixNot): void;
    visitSafeAccessMember(ast: SafeAccessMember): void;
    visitSafeMethodCall(ast: SafeMethodCall): void;
    private _visit(ast);
    private _visitExpOrBlock(ast);
}

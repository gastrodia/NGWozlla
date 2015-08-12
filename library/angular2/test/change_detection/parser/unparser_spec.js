'use strict';var test_lib_1 = require('angular2/test_lib');
var ast_1 = require('angular2/src/change_detection/parser/ast');
var parser_1 = require('angular2/src/change_detection/parser/parser');
var lexer_1 = require('angular2/src/change_detection/parser/lexer');
var unparser_1 = require('./unparser');
var reflection_1 = require('angular2/src/reflection/reflection');
var lang_1 = require('angular2/src/facade/lang');
function main() {
    var parser = new parser_1.Parser(new lexer_1.Lexer(), reflection_1.reflector);
    var unparser = new unparser_1.Unparser();
    function parseAction(text, location) {
        if (location === void 0) { location = null; }
        return parser.parseAction(text, location);
    }
    function parseBinding(text, location) {
        if (location === void 0) { location = null; }
        return parser.parseBinding(text, location);
    }
    function check(expression, type) {
        var ast = parseAction(expression).ast;
        if (lang_1.isPresent(type)) {
            test_lib_1.expect(ast).toBeAnInstanceOf(type);
        }
        test_lib_1.expect(unparser.unparse(ast)).toEqual(expression);
    }
    test_lib_1.describe('Unparser', function () {
        test_lib_1.it('should support AccessMember', function () {
            check('a', ast_1.AccessMember);
            check('a.b', ast_1.AccessMember);
        });
        test_lib_1.it('should support Assignment', function () { check('a = b', ast_1.Assignment); });
        test_lib_1.it('should support Binary', function () { check('a && b', ast_1.Binary); });
        test_lib_1.it('should support Chain', function () { check('a; b;', ast_1.Chain); });
        test_lib_1.it('should support Conditional', function () { check('a ? b : c', ast_1.Conditional); });
        test_lib_1.it('should support Pipe', function () {
            var originalExp = '(a | b)';
            var ast = parseBinding(originalExp).ast;
            test_lib_1.expect(ast).toBeAnInstanceOf(ast_1.BindingPipe);
            test_lib_1.expect(unparser.unparse(ast)).toEqual(originalExp);
        });
        test_lib_1.it('should support KeyedAccess', function () { check('a[b]', ast_1.KeyedAccess); });
        test_lib_1.it('should support LiteralArray', function () { check('[a, b]', ast_1.LiteralArray); });
        test_lib_1.it('should support LiteralMap', function () { check('{a: b, c: d}', ast_1.LiteralMap); });
        test_lib_1.it('should support LiteralPrimitive', function () {
            check('true', ast_1.LiteralPrimitive);
            check('"a"', ast_1.LiteralPrimitive);
            check('1.234', ast_1.LiteralPrimitive);
        });
        test_lib_1.it('should support MethodCall', function () {
            check('a(b, c)', ast_1.MethodCall);
            check('a.b(c, d)', ast_1.MethodCall);
        });
        test_lib_1.it('should support PrefixNot', function () { check('!a', ast_1.PrefixNot); });
        test_lib_1.it('should support SafeAccessMember', function () { check('a?.b', ast_1.SafeAccessMember); });
        test_lib_1.it('should support SafeMethodCall', function () { check('a?.b(c, d)', ast_1.SafeMethodCall); });
        test_lib_1.it('should support if statements', function () {
            var ifs = [
                'if (true) a()',
                'if (true) a() else b()',
                'if (a()) { b = 1; c = 2; }',
                'if (a()) b = 1 else { c = 2; d = e(); }'
            ];
            ifs.forEach(function (ifStmt) { return check(ifStmt, ast_1.If); });
        });
        test_lib_1.it('should support complex expression', function () {
            var originalExp = 'a + 3 * fn([(c + d | e).f], {a: 3})[g].h && i';
            var ast = parseBinding(originalExp).ast;
            test_lib_1.expect(unparser.unparse(ast)).toEqual(originalExp);
        });
        test_lib_1.it('should support Interpolation', function () {
            var ast = parser.parseInterpolation('a {{ b }}', null).ast;
            test_lib_1.expect(ast).toBeAnInstanceOf(ast_1.Interpolation);
            test_lib_1.expect(unparser.unparse(ast)).toEqual('a {{ b }}');
            ast = parser.parseInterpolation('a {{ b }} c', null).ast;
            test_lib_1.expect(ast).toBeAnInstanceOf(ast_1.Interpolation);
            test_lib_1.expect(unparser.unparse(ast)).toEqual('a {{ b }} c');
        });
        test_lib_1.it('should support EmptyExpr', function () {
            var ast = parser.parseAction('if (true) { }', null).ast;
            test_lib_1.expect(ast).toBeAnInstanceOf(ast_1.If);
            test_lib_1.expect(ast.trueExp).toBeAnInstanceOf(ast_1.EmptyExpr);
            test_lib_1.expect(unparser.unparse(ast)).toEqual('if (true) {  }');
        });
    });
}
exports.main = main;
//# sourceMappingURL=unparser_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
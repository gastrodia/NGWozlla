'use strict';var test_lib_1 = require('angular2/test_lib');
var path_recognizer_1 = require('angular2/src/router/path_recognizer');
var sync_route_handler_1 = require('angular2/src/router/sync_route_handler');
var DummyClass = (function () {
    function DummyClass() {
    }
    return DummyClass;
})();
var mockRouteHandler = new sync_route_handler_1.SyncRouteHandler(DummyClass);
function main() {
    test_lib_1.describe('PathRecognizer', function () {
        test_lib_1.it('should throw when given an invalid path', function () {
            test_lib_1.expect(function () { return new path_recognizer_1.PathRecognizer('/hi#', mockRouteHandler); })
                .toThrowError("Path \"/hi#\" should not include \"#\". Use \"HashLocationStrategy\" instead.");
            test_lib_1.expect(function () { return new path_recognizer_1.PathRecognizer('hi?', mockRouteHandler); })
                .toThrowError("Path \"hi?\" contains \"?\" which is not allowed in a route config.");
            test_lib_1.expect(function () { return new path_recognizer_1.PathRecognizer('hi;', mockRouteHandler); })
                .toThrowError("Path \"hi;\" contains \";\" which is not allowed in a route config.");
            test_lib_1.expect(function () { return new path_recognizer_1.PathRecognizer('hi=', mockRouteHandler); })
                .toThrowError("Path \"hi=\" contains \"=\" which is not allowed in a route config.");
            test_lib_1.expect(function () { return new path_recognizer_1.PathRecognizer('hi(', mockRouteHandler); })
                .toThrowError("Path \"hi(\" contains \"(\" which is not allowed in a route config.");
            test_lib_1.expect(function () { return new path_recognizer_1.PathRecognizer('hi)', mockRouteHandler); })
                .toThrowError("Path \"hi)\" contains \")\" which is not allowed in a route config.");
            test_lib_1.expect(function () { return new path_recognizer_1.PathRecognizer('hi//there', mockRouteHandler); })
                .toThrowError("Path \"hi//there\" contains \"//\" which is not allowed in a route config.");
        });
        test_lib_1.describe('querystring params', function () {
            test_lib_1.it('should parse querystring params so long as the recognizer is a root', function () {
                var rec = new path_recognizer_1.PathRecognizer('/hello/there', mockRouteHandler, true);
                var params = rec.parseParams('/hello/there?name=igor');
                test_lib_1.expect(params).toEqual({ 'name': 'igor' });
            });
            test_lib_1.it('should return a combined map of parameters with the param expected in the URL path', function () {
                var rec = new path_recognizer_1.PathRecognizer('/hello/:name', mockRouteHandler, true);
                var params = rec.parseParams('/hello/paul?topic=success');
                test_lib_1.expect(params).toEqual({ 'name': 'paul', 'topic': 'success' });
            });
        });
        test_lib_1.describe('matrix params', function () {
            test_lib_1.it('should recognize a trailing matrix value on a path value and assign it to the params return value', function () {
                var rec = new path_recognizer_1.PathRecognizer('/hello/:id', mockRouteHandler);
                var params = rec.parseParams('/hello/matias;key=value');
                test_lib_1.expect(params['id']).toEqual('matias');
                test_lib_1.expect(params['key']).toEqual('value');
            });
            test_lib_1.it('should recognize and parse multiple matrix params separated by a colon value', function () {
                var rec = new path_recognizer_1.PathRecognizer('/jello/:sid', mockRouteHandler);
                var params = rec.parseParams('/jello/man;color=red;height=20');
                test_lib_1.expect(params['sid']).toEqual('man');
                test_lib_1.expect(params['color']).toEqual('red');
                test_lib_1.expect(params['height']).toEqual('20');
            });
            test_lib_1.it('should recognize a matrix param value on a static path value', function () {
                var rec = new path_recognizer_1.PathRecognizer('/static/man', mockRouteHandler);
                var params = rec.parseParams('/static/man;name=dave');
                test_lib_1.expect(params['name']).toEqual('dave');
            });
            test_lib_1.it('should not parse matrix params when a wildcard segment is used', function () {
                var rec = new path_recognizer_1.PathRecognizer('/wild/*everything', mockRouteHandler);
                var params = rec.parseParams('/wild/super;variable=value');
                test_lib_1.expect(params['everything']).toEqual('super;variable=value');
            });
            test_lib_1.it('should set matrix param values to true when no value is present within the path string', function () {
                var rec = new path_recognizer_1.PathRecognizer('/path', mockRouteHandler);
                var params = rec.parseParams('/path;one;two;three=3');
                test_lib_1.expect(params['one']).toEqual(true);
                test_lib_1.expect(params['two']).toEqual(true);
                test_lib_1.expect(params['three']).toEqual('3');
            });
            test_lib_1.it('should ignore earlier instances of matrix params and only consider the ones at the end of the path', function () {
                var rec = new path_recognizer_1.PathRecognizer('/one/two/three', mockRouteHandler);
                var params = rec.parseParams('/one;a=1/two;b=2/three;c=3');
                test_lib_1.expect(params).toEqual({ 'c': '3' });
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=path_recognizer_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
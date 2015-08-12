'use strict';var test_lib_1 = require('angular2/test_lib');
var collection_1 = require('angular2/src/facade/collection');
var route_recognizer_1 = require('angular2/src/router/route_recognizer');
var route_config_decorator_1 = require('angular2/src/router/route_config_decorator');
function main() {
    test_lib_1.describe('RouteRecognizer', function () {
        var recognizer;
        test_lib_1.beforeEach(function () { recognizer = new route_recognizer_1.RouteRecognizer(); });
        test_lib_1.it('should recognize a static segment', function () {
            recognizer.config(new route_config_decorator_1.Route({ path: '/test', component: DummyCmpA }));
            var solution = recognizer.recognize('/test')[0];
            test_lib_1.expect(getComponentType(solution)).toEqual(DummyCmpA);
        });
        test_lib_1.it('should recognize a single slash', function () {
            recognizer.config(new route_config_decorator_1.Route({ path: '/', component: DummyCmpA }));
            var solution = recognizer.recognize('/')[0];
            test_lib_1.expect(getComponentType(solution)).toEqual(DummyCmpA);
        });
        test_lib_1.it('should recognize a dynamic segment', function () {
            recognizer.config(new route_config_decorator_1.Route({ path: '/user/:name', component: DummyCmpA }));
            var solution = recognizer.recognize('/user/brian')[0];
            test_lib_1.expect(getComponentType(solution)).toEqual(DummyCmpA);
            test_lib_1.expect(solution.params()).toEqual({ 'name': 'brian' });
        });
        test_lib_1.it('should recognize a star segment', function () {
            recognizer.config(new route_config_decorator_1.Route({ path: '/first/*rest', component: DummyCmpA }));
            var solution = recognizer.recognize('/first/second/third')[0];
            test_lib_1.expect(getComponentType(solution)).toEqual(DummyCmpA);
            test_lib_1.expect(solution.params()).toEqual({ 'rest': 'second/third' });
        });
        test_lib_1.it('should throw when given two routes that start with the same static segment', function () {
            recognizer.config(new route_config_decorator_1.Route({ path: '/hello', component: DummyCmpA }));
            test_lib_1.expect(function () { return recognizer.config(new route_config_decorator_1.Route({ path: '/hello', component: DummyCmpB })); })
                .toThrowError('Configuration \'/hello\' conflicts with existing route \'/hello\'');
        });
        test_lib_1.it('should throw when given two routes that have dynamic segments in the same order', function () {
            recognizer.config(new route_config_decorator_1.Route({ path: '/hello/:person/how/:doyoudou', component: DummyCmpA }));
            test_lib_1.expect(function () { return recognizer.config(new route_config_decorator_1.Route({ path: '/hello/:friend/how/:areyou', component: DummyCmpA })); })
                .toThrowError('Configuration \'/hello/:friend/how/:areyou\' conflicts with existing route \'/hello/:person/how/:doyoudou\'');
        });
        test_lib_1.it('should recognize redirects', function () {
            recognizer.config(new route_config_decorator_1.Redirect({ path: '/a', redirectTo: '/b' }));
            recognizer.config(new route_config_decorator_1.Route({ path: '/b', component: DummyCmpA }));
            var solutions = recognizer.recognize('/a');
            test_lib_1.expect(solutions.length).toBe(1);
            var solution = solutions[0];
            test_lib_1.expect(getComponentType(solution)).toEqual(DummyCmpA);
            test_lib_1.expect(solution.matchedUrl).toEqual('/b');
        });
        test_lib_1.it('should not perform root URL redirect on a non-root route', function () {
            recognizer.config(new route_config_decorator_1.Redirect({ path: '/', redirectTo: '/foo' }));
            recognizer.config(new route_config_decorator_1.Route({ path: '/bar', component: DummyCmpA }));
            var solutions = recognizer.recognize('/bar');
            test_lib_1.expect(solutions.length).toBe(1);
            var solution = solutions[0];
            test_lib_1.expect(getComponentType(solution)).toEqual(DummyCmpA);
            test_lib_1.expect(solution.matchedUrl).toEqual('/bar');
        });
        test_lib_1.it('should perform a root URL redirect when only a slash or an empty string is being processed', function () {
            recognizer.config(new route_config_decorator_1.Redirect({ path: '/', redirectTo: '/matias' }));
            recognizer.config(new route_config_decorator_1.Route({ path: '/matias', component: DummyCmpA }));
            recognizer.config(new route_config_decorator_1.Route({ path: '/fatias', component: DummyCmpA }));
            var solutions;
            solutions = recognizer.recognize('/');
            test_lib_1.expect(solutions[0].matchedUrl).toBe('/matias');
            solutions = recognizer.recognize('/fatias');
            test_lib_1.expect(solutions[0].matchedUrl).toBe('/fatias');
            solutions = recognizer.recognize('');
            test_lib_1.expect(solutions[0].matchedUrl).toBe('/matias');
        });
        test_lib_1.it('should generate URLs with params', function () {
            recognizer.config(new route_config_decorator_1.Route({ path: '/app/user/:name', component: DummyCmpA, as: 'user' }));
            test_lib_1.expect(recognizer.generate('user', { 'name': 'misko' })['url']).toEqual('app/user/misko');
        });
        test_lib_1.it('should generate URLs with numeric params', function () {
            recognizer.config(new route_config_decorator_1.Route({ path: '/app/page/:number', component: DummyCmpA, as: 'page' }));
            test_lib_1.expect(recognizer.generate('page', { 'number': 42 })['url']).toEqual('app/page/42');
        });
        test_lib_1.it('should throw in the absence of required params URLs', function () {
            recognizer.config(new route_config_decorator_1.Route({ path: 'app/user/:name', component: DummyCmpA, as: 'user' }));
            test_lib_1.expect(function () { return recognizer.generate('user', {})['url']; })
                .toThrowError('Route generator for \'name\' was not included in parameters passed.');
        });
        test_lib_1.describe('querystring params', function () {
            test_lib_1.it('should recognize querystring parameters within the URL path', function () {
                var recognizer = new route_recognizer_1.RouteRecognizer(true);
                recognizer.config(new route_config_decorator_1.Route({ path: 'profile/:name', component: DummyCmpA, as: 'user' }));
                var solution = recognizer.recognize('/profile/matsko?comments=all')[0];
                var params = solution.params();
                test_lib_1.expect(params['name']).toEqual('matsko');
                test_lib_1.expect(params['comments']).toEqual('all');
            });
            test_lib_1.it('should generate and populate the given static-based route with querystring params', function () {
                var recognizer = new route_recognizer_1.RouteRecognizer(true);
                recognizer.config(new route_config_decorator_1.Route({ path: 'forum/featured', component: DummyCmpA, as: 'forum-page' }));
                var params = collection_1.StringMapWrapper.create();
                params['start'] = 10;
                params['end'] = 100;
                var result = recognizer.generate('forum-page', params);
                test_lib_1.expect(result['url']).toEqual('forum/featured?start=10&end=100');
            });
            test_lib_1.it('should place a higher priority on actual route params incase the same params are defined in the querystring', function () {
                var recognizer = new route_recognizer_1.RouteRecognizer(true);
                recognizer.config(new route_config_decorator_1.Route({ path: 'profile/:name', component: DummyCmpA, as: 'user' }));
                var solution = recognizer.recognize('/profile/yegor?name=igor')[0];
                var params = solution.params();
                test_lib_1.expect(params['name']).toEqual('yegor');
            });
            test_lib_1.it('should strip out any occurences of matrix params when querystring params are allowed', function () {
                var recognizer = new route_recognizer_1.RouteRecognizer(true);
                recognizer.config(new route_config_decorator_1.Route({ path: '/home', component: DummyCmpA, as: 'user' }));
                var solution = recognizer.recognize('/home;showAll=true;limit=100?showAll=false')[0];
                var params = solution.params();
                test_lib_1.expect(params['showAll']).toEqual('false');
                test_lib_1.expect(params['limit']).toBeFalsy();
            });
            test_lib_1.it('should strip out any occurences of matrix params as input data', function () {
                var recognizer = new route_recognizer_1.RouteRecognizer(true);
                recognizer.config(new route_config_decorator_1.Route({ path: '/home/:subject', component: DummyCmpA, as: 'user' }));
                var solution = recognizer.recognize('/home/zero;one=1?two=2')[0];
                var params = solution.params();
                test_lib_1.expect(params['subject']).toEqual('zero');
                test_lib_1.expect(params['one']).toBeFalsy();
                test_lib_1.expect(params['two']).toEqual('2');
            });
        });
        test_lib_1.describe('matrix params', function () {
            test_lib_1.it('should recognize matrix parameters within the URL path', function () {
                var recognizer = new route_recognizer_1.RouteRecognizer();
                recognizer.config(new route_config_decorator_1.Route({ path: 'profile/:name', component: DummyCmpA, as: 'user' }));
                var solution = recognizer.recognize('/profile/matsko;comments=all')[0];
                var params = solution.params();
                test_lib_1.expect(params['name']).toEqual('matsko');
                test_lib_1.expect(params['comments']).toEqual('all');
            });
            test_lib_1.it('should recognize multiple matrix params and set parameters that contain no value to true', function () {
                var recognizer = new route_recognizer_1.RouteRecognizer();
                recognizer.config(new route_config_decorator_1.Route({ path: '/profile/hello', component: DummyCmpA, as: 'user' }));
                var solution = recognizer.recognize('/profile/hello;modal;showAll=true;hideAll=false')[0];
                var params = solution.params();
                test_lib_1.expect(params['modal']).toEqual(true);
                test_lib_1.expect(params['showAll']).toEqual('true');
                test_lib_1.expect(params['hideAll']).toEqual('false');
            });
            test_lib_1.it('should only consider the matrix parameters at the end of the path handler', function () {
                var recognizer = new route_recognizer_1.RouteRecognizer();
                recognizer.config(new route_config_decorator_1.Route({ path: '/profile/hi/:name', component: DummyCmpA, as: 'user' }));
                var solution = recognizer.recognize('/profile;a=1/hi;b=2;c=3/william;d=4')[0];
                var params = solution.params();
                test_lib_1.expect(params).toEqual({ 'name': 'william', 'd': '4' });
            });
            test_lib_1.it('should generate and populate the given static-based route with matrix params', function () {
                var recognizer = new route_recognizer_1.RouteRecognizer();
                recognizer.config(new route_config_decorator_1.Route({ path: 'forum/featured', component: DummyCmpA, as: 'forum-page' }));
                var params = collection_1.StringMapWrapper.create();
                params['start'] = 10;
                params['end'] = 100;
                var result = recognizer.generate('forum-page', params);
                test_lib_1.expect(result['url']).toEqual('forum/featured;start=10;end=100');
            });
            test_lib_1.it('should generate and populate the given dynamic-based route with matrix params', function () {
                var recognizer = new route_recognizer_1.RouteRecognizer();
                recognizer.config(new route_config_decorator_1.Route({ path: 'forum/:topic', component: DummyCmpA, as: 'forum-page' }));
                var params = collection_1.StringMapWrapper.create();
                params['topic'] = 'crazy';
                params['total-posts'] = 100;
                params['moreDetail'] = null;
                var result = recognizer.generate('forum-page', params);
                test_lib_1.expect(result['url']).toEqual('forum/crazy;total-posts=100;moreDetail');
            });
            test_lib_1.it('should not apply any matrix params if a dynamic route segment takes up the slot when a path is generated', function () {
                var recognizer = new route_recognizer_1.RouteRecognizer();
                recognizer.config(new route_config_decorator_1.Route({ path: 'hello/:name', component: DummyCmpA, as: 'profile-page' }));
                var params = collection_1.StringMapWrapper.create();
                params['name'] = 'matsko';
                var result = recognizer.generate('profile-page', params);
                test_lib_1.expect(result['url']).toEqual('hello/matsko');
            });
            test_lib_1.it('should place a higher priority on actual route params incase the same params are defined in the matrix params string', function () {
                var recognizer = new route_recognizer_1.RouteRecognizer();
                recognizer.config(new route_config_decorator_1.Route({ path: 'profile/:name', component: DummyCmpA, as: 'user' }));
                var solution = recognizer.recognize('/profile/yegor;name=igor')[0];
                var params = solution.params();
                test_lib_1.expect(params['name']).toEqual('yegor');
            });
            test_lib_1.it('should strip out any occurences of querystring params when matrix params are allowed', function () {
                var recognizer = new route_recognizer_1.RouteRecognizer();
                recognizer.config(new route_config_decorator_1.Route({ path: '/home', component: DummyCmpA, as: 'user' }));
                var solution = recognizer.recognize('/home;limit=100?limit=1000&showAll=true')[0];
                var params = solution.params();
                test_lib_1.expect(params['showAll']).toBeFalsy();
                test_lib_1.expect(params['limit']).toEqual('100');
            });
            test_lib_1.it('should strip out any occurences of matrix params as input data', function () {
                var recognizer = new route_recognizer_1.RouteRecognizer();
                recognizer.config(new route_config_decorator_1.Route({ path: '/home/:subject', component: DummyCmpA, as: 'user' }));
                var solution = recognizer.recognize('/home/zero;one=1?two=2')[0];
                var params = solution.params();
                test_lib_1.expect(params['subject']).toEqual('zero');
                test_lib_1.expect(params['one']).toEqual('1');
                test_lib_1.expect(params['two']).toBeFalsy();
            });
        });
    });
}
exports.main = main;
function getComponentType(routeMatch) {
    return routeMatch.recognizer.handler.componentType;
}
var DummyCmpA = (function () {
    function DummyCmpA() {
    }
    return DummyCmpA;
})();
var DummyCmpB = (function () {
    function DummyCmpB() {
    }
    return DummyCmpB;
})();
//# sourceMappingURL=route_recognizer_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
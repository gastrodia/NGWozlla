'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var collection_1 = require('angular2/src/facade/collection');
var router_1 = require('angular2/src/router/router');
var pipeline_1 = require('angular2/src/router/pipeline');
var router_outlet_1 = require('angular2/src/router/router_outlet');
var location_mock_1 = require('angular2/src/mock/location_mock');
var location_1 = require('angular2/src/router/location');
var route_registry_1 = require('angular2/src/router/route_registry');
var route_config_decorator_1 = require('angular2/src/router/route_config_decorator');
var directive_resolver_1 = require('angular2/src/core/compiler/directive_resolver');
var di_1 = require('angular2/di');
function main() {
    test_lib_1.describe('Router', function () {
        var router, location;
        test_lib_1.beforeEachBindings(function () { return [
            pipeline_1.Pipeline,
            route_registry_1.RouteRegistry,
            directive_resolver_1.DirectiveResolver,
            di_1.bind(location_1.Location).toClass(location_mock_1.SpyLocation),
            di_1.bind(router_1.Router)
                .toFactory(function (registry, pipeline, location) { return new router_1.RootRouter(registry, pipeline, location, AppCmp); }, [route_registry_1.RouteRegistry, pipeline_1.Pipeline, location_1.Location])
        ]; });
        test_lib_1.beforeEach(test_lib_1.inject([router_1.Router, location_1.Location], function (rtr, loc) {
            router = rtr;
            location = loc;
        }));
        test_lib_1.it('should navigate based on the initial URL state', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.config([new route_config_decorator_1.Route({ path: '/', component: DummyComponent })])
                .then(function (_) { return router.registerOutlet(outlet); })
                .then(function (_) {
                test_lib_1.expect(outlet.spy('commit')).toHaveBeenCalled();
                test_lib_1.expect(location.urlChanges).toEqual([]);
                async.done();
            });
        }));
        test_lib_1.it('should activate viewports and update URL on navigate', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.registerOutlet(outlet)
                .then(function (_) { return router.config([new route_config_decorator_1.Route({ path: '/a', component: DummyComponent })]); })
                .then(function (_) { return router.navigate('/a'); })
                .then(function (_) {
                test_lib_1.expect(outlet.spy('commit')).toHaveBeenCalled();
                test_lib_1.expect(location.urlChanges).toEqual(['/a']);
                async.done();
            });
        }));
        test_lib_1.it('should not push a history change on when navigate is called with skipUrlChange', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.registerOutlet(outlet)
                .then(function (_) { return router.config([new route_config_decorator_1.Route({ path: '/b', component: DummyComponent })]); })
                .then(function (_) { return router.navigate('/b', true); })
                .then(function (_) {
                test_lib_1.expect(outlet.spy('commit')).toHaveBeenCalled();
                test_lib_1.expect(location.urlChanges).toEqual([]);
                async.done();
            });
        }));
        test_lib_1.it('should navigate after being configured', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.registerOutlet(outlet)
                .then(function (_) { return router.navigate('/a'); })
                .then(function (_) {
                test_lib_1.expect(outlet.spy('commit')).not.toHaveBeenCalled();
                return router.config([new route_config_decorator_1.Route({ path: '/a', component: DummyComponent })]);
            })
                .then(function (_) {
                test_lib_1.expect(outlet.spy('commit')).toHaveBeenCalled();
                async.done();
            });
        }));
        test_lib_1.it('should throw when linkParams does not start with a "/" or "./"', function () {
            test_lib_1.expect(function () { return router.generate(['firstCmp', 'secondCmp']); })
                .toThrowError("Link \"" + collection_1.ListWrapper.toJSON(['firstCmp', 'secondCmp']) + "\" must start with \"/\", \"./\", or \"../\"");
        });
        test_lib_1.it('should throw when linkParams does not include a route name', function () {
            test_lib_1.expect(function () { return router.generate(['./']); })
                .toThrowError("Link \"" + collection_1.ListWrapper.toJSON(['./']) + "\" must include a route name.");
            test_lib_1.expect(function () { return router.generate(['/']); })
                .toThrowError("Link \"" + collection_1.ListWrapper.toJSON(['/']) + "\" must include a route name.");
        });
        test_lib_1.it('should generate URLs from the root component when the path starts with /', function () {
            router.config([new route_config_decorator_1.Route({ path: '/first/...', component: DummyParentComp, as: 'firstCmp' })]);
            test_lib_1.expect(router.generate(['/firstCmp', 'secondCmp'])).toEqual('/first/second');
            test_lib_1.expect(router.generate(['/firstCmp', 'secondCmp'])).toEqual('/first/second');
            test_lib_1.expect(router.generate(['/firstCmp/secondCmp'])).toEqual('/first/second');
        });
        test_lib_1.describe('querstring params', function () {
            test_lib_1.it('should only apply querystring params if the given URL is on the root router and is terminal', function () {
                router.config([
                    new route_config_decorator_1.Route({ path: '/hi/how/are/you', component: DummyComponent, as: 'greeting-url' })
                ]);
                var path = router.generate(['/greeting-url', { 'name': 'brad' }]);
                test_lib_1.expect(path).toEqual('/hi/how/are/you?name=brad');
            });
            test_lib_1.it('should use parameters that are not apart of the route definition as querystring params', function () {
                router.config([new route_config_decorator_1.Route({ path: '/one/two/:three', component: DummyComponent, as: 'number-url' })]);
                var path = router.generate(['/number-url', { 'three': 'three', 'four': 'four' }]);
                test_lib_1.expect(path).toEqual('/one/two/three?four=four');
            });
        });
        test_lib_1.describe('matrix params', function () {
            test_lib_1.it('should apply inline matrix params for each router path within the generated URL', function () {
                router.config([new route_config_decorator_1.Route({ path: '/first/...', component: DummyParentComp, as: 'firstCmp' })]);
                var path = router.generate(['/firstCmp', { 'key': 'value' }, 'secondCmp', { 'project': 'angular' }]);
                test_lib_1.expect(path).toEqual('/first;key=value/second;project=angular');
            });
            test_lib_1.it('should apply inline matrix params for each router path within the generated URL and also include named params', function () {
                router.config([
                    new route_config_decorator_1.Route({ path: '/first/:token/...', component: DummyParentComp, as: 'firstCmp' })
                ]);
                var path = router.generate(['/firstCmp', { 'token': 'min' }, 'secondCmp', { 'author': 'max' }]);
                test_lib_1.expect(path).toEqual('/first/min/second;author=max');
            });
        });
    });
}
exports.main = main;
var DummyOutlet = (function (_super) {
    __extends(DummyOutlet, _super);
    function DummyOutlet() {
        _super.apply(this, arguments);
    }
    DummyOutlet.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    DummyOutlet = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(router_outlet_1.RouterOutlet), 
        __metadata('design:paramtypes', [])
    ], DummyOutlet);
    return DummyOutlet;
})(test_lib_1.SpyObject);
var DummyComponent = (function () {
    function DummyComponent() {
    }
    return DummyComponent;
})();
var DummyParentComp = (function () {
    function DummyParentComp() {
    }
    DummyParentComp = __decorate([
        route_config_decorator_1.RouteConfig([new route_config_decorator_1.Route({ path: '/second', component: DummyComponent, as: 'secondCmp' })]), 
        __metadata('design:paramtypes', [])
    ], DummyParentComp);
    return DummyParentComp;
})();
function makeDummyOutlet() {
    var ref = new DummyOutlet();
    ref.spy('canActivate').andCallFake(function (_) { return async_1.PromiseWrapper.resolve(true); });
    ref.spy('canReuse').andCallFake(function (_) { return async_1.PromiseWrapper.resolve(false); });
    ref.spy('canDeactivate').andCallFake(function (_) { return async_1.PromiseWrapper.resolve(true); });
    ref.spy('commit').andCallFake(function (_) { return async_1.PromiseWrapper.resolve(true); });
    return ref;
}
var AppCmp = (function () {
    function AppCmp() {
    }
    return AppCmp;
})();
//# sourceMappingURL=router_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
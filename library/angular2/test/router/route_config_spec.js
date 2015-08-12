'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
var bootstrap_1 = require('angular2/bootstrap');
var annotations_1 = require('angular2/annotations');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var di_1 = require('angular2/di');
var render_1 = require('angular2/src/render/render');
var router_1 = require('angular2/router');
var location_strategy_1 = require('angular2/src/router/location_strategy');
var mock_location_strategy_1 = require('angular2/src/mock/mock_location_strategy');
function main() {
    test_lib_1.describe('RouteConfig with POJO arguments', function () {
        var fakeDoc, el, testBindings;
        test_lib_1.beforeEach(function () {
            fakeDoc = dom_adapter_1.DOM.createHtmlDocument();
            el = dom_adapter_1.DOM.createElement('app-cmp', fakeDoc);
            dom_adapter_1.DOM.appendChild(fakeDoc.body, el);
            testBindings = [
                router_1.routerInjectables,
                di_1.bind(location_strategy_1.LocationStrategy).toClass(mock_location_strategy_1.MockLocationStrategy),
                di_1.bind(render_1.DOCUMENT_TOKEN).toValue(fakeDoc)
            ];
        });
        test_lib_1.it('should bootstrap an app with a hierarchy', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            bootstrap_1.bootstrap(HierarchyAppCmp, testBindings)
                .then(function (applicationRef) {
                var router = applicationRef.hostComponent.router;
                router.subscribe(function (_) {
                    test_lib_1.expect(el).toHaveText('root { parent { hello } }');
                    test_lib_1.expect(applicationRef.hostComponent.location.path()).toEqual('/parent/child');
                    async.done();
                });
                router.navigate('/parent/child');
            });
        }));
        test_lib_1.it('should work in an app with redirects', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            bootstrap_1.bootstrap(RedirectAppCmp, testBindings)
                .then(function (applicationRef) {
                var router = applicationRef.hostComponent.router;
                router.subscribe(function (_) {
                    test_lib_1.expect(el).toHaveText('root { hello }');
                    test_lib_1.expect(applicationRef.hostComponent.location.path()).toEqual('/after');
                    async.done();
                });
                router.navigate('/before');
            });
        }));
        test_lib_1.it('should work in an app with async components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            bootstrap_1.bootstrap(AsyncAppCmp, testBindings)
                .then(function (applicationRef) {
                var router = applicationRef.hostComponent.router;
                router.subscribe(function (_) {
                    test_lib_1.expect(el).toHaveText('root { hello }');
                    test_lib_1.expect(applicationRef.hostComponent.location.path()).toEqual('/hello');
                    async.done();
                });
                router.navigate('/hello');
            });
        }));
        test_lib_1.it('should work in an app with a constructor component', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            bootstrap_1.bootstrap(ExplicitConstructorAppCmp, testBindings)
                .then(function (applicationRef) {
                var router = applicationRef.hostComponent.router;
                router.subscribe(function (_) {
                    test_lib_1.expect(el).toHaveText('root { hello }');
                    test_lib_1.expect(applicationRef.hostComponent.location.path()).toEqual('/hello');
                    async.done();
                });
                router.navigate('/hello');
            });
        }));
        // TODO: test apps with wrong configs
    });
}
exports.main = main;
var HelloCmp = (function () {
    function HelloCmp() {
    }
    HelloCmp = __decorate([
        annotations_1.Component({ selector: 'hello-cmp' }),
        annotations_1.View({ template: 'hello' }), 
        __metadata('design:paramtypes', [])
    ], HelloCmp);
    return HelloCmp;
})();
var RedirectAppCmp = (function () {
    function RedirectAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    RedirectAppCmp = __decorate([
        annotations_1.Component({ selector: 'app-cmp' }),
        annotations_1.View({ template: "root { <router-outlet></router-outlet> }", directives: router_1.routerDirectives }),
        router_1.RouteConfig([{ path: '/before', redirectTo: '/after' }, { path: '/after', component: HelloCmp }]), 
        __metadata('design:paramtypes', [router_1.Router, location_strategy_1.LocationStrategy])
    ], RedirectAppCmp);
    return RedirectAppCmp;
})();
function HelloLoader() {
    return Promise.resolve(HelloCmp);
}
var AsyncAppCmp = (function () {
    function AsyncAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    AsyncAppCmp = __decorate([
        annotations_1.Component({ selector: 'app-cmp' }),
        annotations_1.View({ template: "root { <router-outlet></router-outlet> }", directives: router_1.routerDirectives }),
        router_1.RouteConfig([
            { path: '/hello', component: { type: 'loader', loader: HelloLoader } },
        ]), 
        __metadata('design:paramtypes', [router_1.Router, location_strategy_1.LocationStrategy])
    ], AsyncAppCmp);
    return AsyncAppCmp;
})();
var ExplicitConstructorAppCmp = (function () {
    function ExplicitConstructorAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    ExplicitConstructorAppCmp = __decorate([
        annotations_1.Component({ selector: 'app-cmp' }),
        annotations_1.View({ template: "root { <router-outlet></router-outlet> }", directives: router_1.routerDirectives }),
        router_1.RouteConfig([
            { path: '/hello', component: { type: 'constructor', constructor: HelloCmp } },
        ]), 
        __metadata('design:paramtypes', [router_1.Router, location_strategy_1.LocationStrategy])
    ], ExplicitConstructorAppCmp);
    return ExplicitConstructorAppCmp;
})();
var ParentCmp = (function () {
    function ParentCmp() {
    }
    ParentCmp = __decorate([
        annotations_1.Component({ selector: 'parent-cmp' }),
        annotations_1.View({ template: "parent { <router-outlet></router-outlet> }", directives: router_1.routerDirectives }),
        router_1.RouteConfig([{ path: '/child', component: HelloCmp }]), 
        __metadata('design:paramtypes', [])
    ], ParentCmp);
    return ParentCmp;
})();
var HierarchyAppCmp = (function () {
    function HierarchyAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    HierarchyAppCmp = __decorate([
        annotations_1.Component({ selector: 'app-cmp' }),
        annotations_1.View({ template: "root { <router-outlet></router-outlet> }", directives: router_1.routerDirectives }),
        router_1.RouteConfig([{ path: '/parent/...', component: ParentCmp }]), 
        __metadata('design:paramtypes', [router_1.Router, location_strategy_1.LocationStrategy])
    ], HierarchyAppCmp);
    return HierarchyAppCmp;
})();
//# sourceMappingURL=route_config_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
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
var application_1 = require('angular2/src/core/application');
var decorators_1 = require('angular2/src/core/annotations/decorators');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var di_1 = require('angular2/di');
var render_1 = require('angular2/src/render/render');
var route_config_decorator_1 = require('angular2/src/router/route_config_decorator');
var async_1 = require('angular2/src/facade/async');
var lang_1 = require('angular2/src/facade/lang');
var router_1 = require('angular2/router');
var location_strategy_1 = require('angular2/src/router/location_strategy');
var mock_location_strategy_1 = require('angular2/src/mock/mock_location_strategy');
var application_tokens_1 = require('angular2/src/core/application_tokens');
function main() {
    test_lib_1.describe('router injectables', function () {
        test_lib_1.beforeEachBindings(function () {
            return [router_1.routerInjectables, di_1.bind(location_strategy_1.LocationStrategy).toClass(mock_location_strategy_1.MockLocationStrategy)];
        });
        // do not refactor out the `bootstrap` functionality. We still want to
        // keep this test around so we can ensure that bootstrapping a router works
        test_lib_1.describe('boostrap functionality', function () {
            test_lib_1.it('should bootstrap a simple app', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var fakeDoc = dom_adapter_1.DOM.createHtmlDocument();
                var el = dom_adapter_1.DOM.createElement('app-cmp', fakeDoc);
                dom_adapter_1.DOM.appendChild(fakeDoc.body, el);
                application_1.bootstrap(AppCmp, [
                    router_1.routerInjectables,
                    di_1.bind(location_strategy_1.LocationStrategy).toClass(mock_location_strategy_1.MockLocationStrategy),
                    di_1.bind(render_1.DOCUMENT_TOKEN).toValue(fakeDoc)
                ])
                    .then(function (applicationRef) {
                    var router = applicationRef.hostComponent.router;
                    router.subscribe(function (_) {
                        test_lib_1.expect(el).toHaveText('outer { hello }');
                        test_lib_1.expect(applicationRef.hostComponent.location.path()).toEqual('');
                        async.done();
                    });
                });
            }));
        });
        test_lib_1.describe('broken app', function () {
            test_lib_1.beforeEachBindings(function () { return [di_1.bind(application_tokens_1.appComponentTypeToken).toValue(BrokenAppCmp)]; });
            test_lib_1.it('should rethrow exceptions from component constructors', test_lib_1.inject([test_lib_1.AsyncTestCompleter, test_lib_1.TestComponentBuilder], function (async, tcb) {
                tcb.createAsync(AppCmp).then(function (rootTC) {
                    var router = rootTC.componentInstance.router;
                    async_1.PromiseWrapper.catchError(router.navigate('/cause-error'), function (error) {
                        test_lib_1.expect(rootTC.nativeElement).toHaveText('outer { oh no }');
                        test_lib_1.expect(error).toContainError('oops!');
                        async.done();
                    });
                });
            }));
        });
        test_lib_1.describe('back button app', function () {
            test_lib_1.beforeEachBindings(function () { return [di_1.bind(application_tokens_1.appComponentTypeToken).toValue(HierarchyAppCmp)]; });
            test_lib_1.it('should change the url without pushing a new history state for back navigations', test_lib_1.inject([test_lib_1.AsyncTestCompleter, test_lib_1.TestComponentBuilder], function (async, tcb) {
                tcb.createAsync(HierarchyAppCmp)
                    .then(function (rootTC) {
                    var router = rootTC.componentInstance.router;
                    var position = 0;
                    var flipped = false;
                    var history = [
                        ['/parent/child', 'root { parent { hello } }', '/super-parent/child'],
                        ['/super-parent/child', 'root { super-parent { hello2 } }', '/parent/child'],
                        ['/parent/child', 'root { parent { hello } }', false]
                    ];
                    router.subscribe(function (_) {
                        var location = rootTC.componentInstance.location;
                        var element = rootTC.nativeElement;
                        var path = location.path();
                        var entry = history[position];
                        test_lib_1.expect(path).toEqual(entry[0]);
                        test_lib_1.expect(element).toHaveText(entry[1]);
                        var nextUrl = entry[2];
                        if (nextUrl == false) {
                            flipped = true;
                        }
                        if (flipped && position == 0) {
                            async.done();
                            return;
                        }
                        position = position + (flipped ? -1 : 1);
                        if (flipped) {
                            location.back();
                        }
                        else {
                            router.navigate(nextUrl);
                        }
                    });
                    router.navigate(history[0][0]);
                });
            }));
        });
        test_lib_1.describe('hierarchical app', function () {
            test_lib_1.beforeEachBindings(function () { return [di_1.bind(application_tokens_1.appComponentTypeToken).toValue(HierarchyAppCmp)]; });
            test_lib_1.it('should bootstrap an app with a hierarchy', test_lib_1.inject([test_lib_1.AsyncTestCompleter, test_lib_1.TestComponentBuilder], function (async, tcb) {
                tcb.createAsync(HierarchyAppCmp)
                    .then(function (rootTC) {
                    var router = rootTC.componentInstance.router;
                    router.subscribe(function (_) {
                        test_lib_1.expect(rootTC.nativeElement).toHaveText('root { parent { hello } }');
                        test_lib_1.expect(rootTC.componentInstance.location.path()).toEqual('/parent/child');
                        async.done();
                    });
                    router.navigate('/parent/child');
                });
            }));
            test_lib_1.describe('custom app base ref', function () {
                test_lib_1.beforeEachBindings(function () { return [di_1.bind(router_1.appBaseHrefToken).toValue('/my/app')]; });
                test_lib_1.it('should bootstrap', test_lib_1.inject([test_lib_1.AsyncTestCompleter, test_lib_1.TestComponentBuilder], function (async, tcb) {
                    tcb.createAsync(HierarchyAppCmp)
                        .then(function (rootTC) {
                        var router = rootTC.componentInstance.router;
                        router.subscribe(function (_) {
                            test_lib_1.expect(rootTC.nativeElement)
                                .toHaveText('root { parent { hello } }');
                            test_lib_1.expect(rootTC.componentInstance.location.path())
                                .toEqual('/my/app/parent/child');
                            async.done();
                        });
                        router.navigate('/parent/child');
                    });
                }));
            });
        });
        // TODO: add a test in which the child component has bindings
        test_lib_1.describe('querystring params app', function () {
            test_lib_1.beforeEachBindings(function () { return [di_1.bind(application_tokens_1.appComponentTypeToken).toValue(QueryStringAppCmp)]; });
            test_lib_1.it('should recognize and return querystring params with the injected RouteParams', test_lib_1.inject([test_lib_1.AsyncTestCompleter, test_lib_1.TestComponentBuilder], function (async, tcb) {
                tcb.createAsync(QueryStringAppCmp)
                    .then(function (rootTC) {
                    var router = rootTC.componentInstance.router;
                    router.subscribe(function (_) {
                        rootTC.detectChanges();
                        test_lib_1.expect(rootTC.nativeElement).toHaveText('qParam = search-for-something');
                        /*
                        expect(applicationRef.hostComponent.location.path())
                            .toEqual('/qs?q=search-for-something');*/
                        async.done();
                    });
                    router.navigate('/qs?q=search-for-something');
                    rootTC.detectChanges();
                });
            }));
        });
    });
}
exports.main = main;
var HelloCmp = (function () {
    function HelloCmp() {
    }
    HelloCmp = __decorate([
        decorators_1.Component({ selector: 'hello-cmp' }),
        decorators_1.View({ template: 'hello' }), 
        __metadata('design:paramtypes', [])
    ], HelloCmp);
    return HelloCmp;
})();
var Hello2Cmp = (function () {
    function Hello2Cmp() {
    }
    Hello2Cmp = __decorate([
        decorators_1.Component({ selector: 'hello2-cmp' }),
        decorators_1.View({ template: 'hello2' }), 
        __metadata('design:paramtypes', [])
    ], Hello2Cmp);
    return Hello2Cmp;
})();
var AppCmp = (function () {
    function AppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    AppCmp = __decorate([
        decorators_1.Component({ selector: 'app-cmp' }),
        decorators_1.View({ template: "outer { <router-outlet></router-outlet> }", directives: router_1.routerDirectives }),
        route_config_decorator_1.RouteConfig([new route_config_decorator_1.Route({ path: '/', component: HelloCmp })]), 
        __metadata('design:paramtypes', [router_1.Router, location_strategy_1.LocationStrategy])
    ], AppCmp);
    return AppCmp;
})();
var ParentCmp = (function () {
    function ParentCmp() {
    }
    ParentCmp = __decorate([
        decorators_1.Component({ selector: 'parent-cmp' }),
        decorators_1.View({ template: "parent { <router-outlet></router-outlet> }", directives: router_1.routerDirectives }),
        route_config_decorator_1.RouteConfig([new route_config_decorator_1.Route({ path: '/child', component: HelloCmp })]), 
        __metadata('design:paramtypes', [])
    ], ParentCmp);
    return ParentCmp;
})();
var SuperParentCmp = (function () {
    function SuperParentCmp() {
    }
    SuperParentCmp = __decorate([
        decorators_1.Component({ selector: 'super-parent-cmp' }),
        decorators_1.View({ template: "super-parent { <router-outlet></router-outlet> }", directives: router_1.routerDirectives }),
        route_config_decorator_1.RouteConfig([new route_config_decorator_1.Route({ path: '/child', component: Hello2Cmp })]), 
        __metadata('design:paramtypes', [])
    ], SuperParentCmp);
    return SuperParentCmp;
})();
var HierarchyAppCmp = (function () {
    function HierarchyAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    HierarchyAppCmp = __decorate([
        decorators_1.Component({ selector: 'app-cmp' }),
        decorators_1.View({ template: "root { <router-outlet></router-outlet> }", directives: router_1.routerDirectives }),
        route_config_decorator_1.RouteConfig([
            new route_config_decorator_1.Route({ path: '/parent/...', component: ParentCmp }),
            new route_config_decorator_1.Route({ path: '/super-parent/...', component: SuperParentCmp })
        ]), 
        __metadata('design:paramtypes', [router_1.Router, location_strategy_1.LocationStrategy])
    ], HierarchyAppCmp);
    return HierarchyAppCmp;
})();
var QSCmp = (function () {
    function QSCmp(params) {
        this.q = params.get('q');
    }
    QSCmp = __decorate([
        decorators_1.Component({ selector: 'qs-cmp' }),
        decorators_1.View({ template: "qParam = {{q}}" }), 
        __metadata('design:paramtypes', [router_1.RouteParams])
    ], QSCmp);
    return QSCmp;
})();
var QueryStringAppCmp = (function () {
    function QueryStringAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    QueryStringAppCmp = __decorate([
        decorators_1.Component({ selector: 'app-cmp' }),
        decorators_1.View({ template: "<router-outlet></router-outlet>", directives: router_1.routerDirectives }),
        route_config_decorator_1.RouteConfig([new route_config_decorator_1.Route({ path: '/qs', component: QSCmp })]), 
        __metadata('design:paramtypes', [router_1.Router, location_strategy_1.LocationStrategy])
    ], QueryStringAppCmp);
    return QueryStringAppCmp;
})();
var BrokenCmp = (function () {
    function BrokenCmp() {
        throw new lang_1.BaseException('oops!');
    }
    BrokenCmp = __decorate([
        decorators_1.Component({ selector: 'oops-cmp' }),
        decorators_1.View({ template: "oh no" }), 
        __metadata('design:paramtypes', [])
    ], BrokenCmp);
    return BrokenCmp;
})();
var BrokenAppCmp = (function () {
    function BrokenAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    BrokenAppCmp = __decorate([
        decorators_1.Component({ selector: 'app-cmp' }),
        decorators_1.View({ template: "outer { <router-outlet></router-outlet> }", directives: router_1.routerDirectives }),
        route_config_decorator_1.RouteConfig([new route_config_decorator_1.Route({ path: '/cause-error', component: BrokenCmp })]), 
        __metadata('design:paramtypes', [router_1.Router, location_strategy_1.LocationStrategy])
    ], BrokenAppCmp);
    return BrokenAppCmp;
})();
//# sourceMappingURL=router_integration_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
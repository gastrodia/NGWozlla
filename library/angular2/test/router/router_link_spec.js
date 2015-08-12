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
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
function main() {
    test_lib_1.describe('router-link directive', function () {
        test_lib_1.beforeEachBindings(function () {
            return [angular2_1.bind(router_1.Location).toValue(makeDummyLocation()), angular2_1.bind(router_1.Router).toValue(makeDummyRouter())];
        });
        test_lib_1.it('should update a[href] attribute', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(TestComponent)
                .then(function (testComponent) {
                testComponent.detectChanges();
                var anchorElement = testComponent.query(test_lib_1.By.css('a')).nativeElement;
                test_lib_1.expect(dom_adapter_1.DOM.getAttribute(anchorElement, 'href')).toEqual('/detail');
                async.done();
            });
        }));
        test_lib_1.it('should call router.navigate when a link is clicked', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter, router_1.Router], function (tcb, async, router) {
            tcb.createAsync(TestComponent)
                .then(function (testComponent) {
                testComponent.detectChanges();
                // TODO: shouldn't this be just 'click' rather than '^click'?
                testComponent.query(test_lib_1.By.css('a')).triggerEventHandler('^click', {});
                test_lib_1.expect(router.spy("navigate")).toHaveBeenCalledWith('/detail');
                async.done();
            });
        }));
    });
}
exports.main = main;
var TestComponent = (function () {
    function TestComponent() {
    }
    TestComponent = __decorate([
        angular2_1.Component({ selector: 'test-component' }),
        angular2_1.View({
            template: "\n    <div>\n      <a [router-link]=\"['/detail']\">detail view</a>\n    </div>",
            directives: [router_1.RouterLink]
        }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
})();
var DummyLocation = (function (_super) {
    __extends(DummyLocation, _super);
    function DummyLocation() {
        _super.apply(this, arguments);
    }
    DummyLocation.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    DummyLocation = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(router_1.Location), 
        __metadata('design:paramtypes', [])
    ], DummyLocation);
    return DummyLocation;
})(test_lib_1.SpyObject);
function makeDummyLocation() {
    var dl = new DummyLocation();
    dl.spy('normalizeAbsolutely').andCallFake(function (url) { return url; });
    return dl;
}
var DummyRouter = (function (_super) {
    __extends(DummyRouter, _super);
    function DummyRouter() {
        _super.apply(this, arguments);
    }
    DummyRouter.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    DummyRouter = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(router_1.Router), 
        __metadata('design:paramtypes', [])
    ], DummyRouter);
    return DummyRouter;
})(test_lib_1.SpyObject);
function makeDummyRouter() {
    var dr = new DummyRouter();
    dr.spy('generate').andCallFake(function (routeParams) { return routeParams.join('='); });
    dr.spy('navigate');
    return dr;
}
//# sourceMappingURL=router_link_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
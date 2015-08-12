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
var di_1 = require('angular2/di');
var directives_1 = require('angular2/directives');
var annotations_1 = require('angular2/annotations');
var viewAnn = require('angular2/src/core/annotations_impl/view');
var dynamic_component_loader_1 = require('angular2/src/core/compiler/dynamic_component_loader');
var element_ref_1 = require('angular2/src/core/compiler/element_ref');
var render_1 = require('angular2/src/render/render');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
function main() {
    test_lib_1.describe('DynamicComponentLoader', function () {
        test_lib_1.describe("loading into a location", function () {
            test_lib_1.it('should work', test_lib_1.inject([dynamic_component_loader_1.DynamicComponentLoader, test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (loader, tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<location #loc></location>', directives: [Location] }))
                    .createAsync(MyComp)
                    .then(function (tc) {
                    loader.loadIntoLocation(DynamicallyLoaded, tc.elementRef, 'loc')
                        .then(function (ref) {
                        test_lib_1.expect(tc.nativeElement).toHaveText("Location;DynamicallyLoaded;");
                        async.done();
                    });
                });
            }));
            test_lib_1.it('should return a disposable component ref', test_lib_1.inject([dynamic_component_loader_1.DynamicComponentLoader, test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (loader, tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<location #loc></location>', directives: [Location] }))
                    .createAsync(MyComp)
                    .then(function (tc) {
                    loader.loadIntoLocation(DynamicallyLoaded, tc.elementRef, 'loc')
                        .then(function (ref) {
                        ref.dispose();
                        test_lib_1.expect(tc.nativeElement).toHaveText("Location;");
                        async.done();
                    });
                });
            }));
            test_lib_1.it('should allow to dispose even if the location has been removed', test_lib_1.inject([dynamic_component_loader_1.DynamicComponentLoader, test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (loader, tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<child-cmp *ng-if="ctxBoolProp"></child-cmp>',
                    directives: [directives_1.NgIf, ChildComp]
                }))
                    .overrideView(ChildComp, new viewAnn.View({ template: '<location #loc></location>', directives: [Location] }))
                    .createAsync(MyComp)
                    .then(function (tc) {
                    tc.componentInstance.ctxBoolProp = true;
                    tc.detectChanges();
                    var childCompEl = tc.query(test_lib_1.By.css('child-cmp'));
                    loader.loadIntoLocation(DynamicallyLoaded, childCompEl.elementRef, 'loc')
                        .then(function (ref) {
                        test_lib_1.expect(tc.nativeElement).toHaveText("Location;DynamicallyLoaded;");
                        tc.componentInstance.ctxBoolProp = false;
                        tc.detectChanges();
                        test_lib_1.expect(tc.nativeElement).toHaveText("");
                        ref.dispose();
                        test_lib_1.expect(tc.nativeElement).toHaveText("");
                        async.done();
                    });
                });
            }));
            test_lib_1.it('should update host properties', test_lib_1.inject([dynamic_component_loader_1.DynamicComponentLoader, test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (loader, tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<location #loc></location>', directives: [Location] }))
                    .createAsync(MyComp)
                    .then(function (tc) {
                    loader.loadIntoLocation(DynamicallyLoadedWithHostProps, tc.elementRef, 'loc')
                        .then(function (ref) {
                        ref.instance.id = "new value";
                        tc.detectChanges();
                        var newlyInsertedElement = dom_adapter_1.DOM.childNodes(tc.nativeElement)[1];
                        test_lib_1.expect(newlyInsertedElement.id).toEqual("new value");
                        async.done();
                    });
                });
            }));
            test_lib_1.it('should throw if the variable does not exist', test_lib_1.inject([dynamic_component_loader_1.DynamicComponentLoader, test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (loader, tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<location #loc></location>', directives: [Location] }))
                    .createAsync(MyComp)
                    .then(function (tc) {
                    test_lib_1.expect(function () { return loader.loadIntoLocation(DynamicallyLoadedWithHostProps, tc.elementRef, 'someUnknownVariable'); })
                        .toThrowError('Could not find variable someUnknownVariable');
                    async.done();
                });
            }));
        });
        test_lib_1.describe("loading next to a location", function () {
            test_lib_1.it('should work', test_lib_1.inject([dynamic_component_loader_1.DynamicComponentLoader, test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (loader, tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<div><location #loc></location></div>',
                    directives: [Location]
                }))
                    .createAsync(MyComp)
                    .then(function (tc) {
                    loader.loadNextToLocation(DynamicallyLoaded, tc.elementRef)
                        .then(function (ref) {
                        test_lib_1.expect(tc.nativeElement).toHaveText("Location;");
                        test_lib_1.expect(dom_adapter_1.DOM.nextSibling(tc.nativeElement))
                            .toHaveText('DynamicallyLoaded;');
                        async.done();
                    });
                });
            }));
            test_lib_1.it('should return a disposable component ref', test_lib_1.inject([dynamic_component_loader_1.DynamicComponentLoader, test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (loader, tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<div><location #loc></location></div>',
                    directives: [Location]
                }))
                    .
                        createAsync(MyComp)
                    .then(function (tc) {
                    loader.loadNextToLocation(DynamicallyLoaded, tc.elementRef)
                        .then(function (ref) {
                        loader.loadNextToLocation(DynamicallyLoaded2, tc.elementRef)
                            .then(function (ref2) {
                            var firstSibling = dom_adapter_1.DOM.nextSibling(tc.nativeElement);
                            var secondSibling = dom_adapter_1.DOM.nextSibling(firstSibling);
                            test_lib_1.expect(tc.nativeElement).toHaveText("Location;");
                            test_lib_1.expect(firstSibling).toHaveText("DynamicallyLoaded;");
                            test_lib_1.expect(secondSibling).toHaveText("DynamicallyLoaded2;");
                            ref2.dispose();
                            firstSibling = dom_adapter_1.DOM.nextSibling(tc.nativeElement);
                            secondSibling = dom_adapter_1.DOM.nextSibling(firstSibling);
                            test_lib_1.expect(secondSibling).toBeNull();
                            async.done();
                        });
                    });
                });
            }));
            test_lib_1.it('should update host properties', test_lib_1.inject([dynamic_component_loader_1.DynamicComponentLoader, test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (loader, tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<div><location #loc></location></div>',
                    directives: [Location]
                }))
                    .createAsync(MyComp)
                    .then(function (tc) {
                    loader.loadNextToLocation(DynamicallyLoadedWithHostProps, tc.elementRef)
                        .then(function (ref) {
                        ref.instance.id = "new value";
                        tc.detectChanges();
                        var newlyInsertedElement = dom_adapter_1.DOM.nextSibling(tc.nativeElement);
                        test_lib_1.expect(newlyInsertedElement.id).toEqual("new value");
                        async.done();
                    });
                });
            }));
        });
        test_lib_1.describe('loadAsRoot', function () {
            test_lib_1.it('should allow to create, update and destroy components', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dynamic_component_loader_1.DynamicComponentLoader, render_1.DOCUMENT_TOKEN, di_1.Injector], function (async, loader, doc, injector) {
                var rootEl = test_lib_1.el('<child-cmp></child-cmp>');
                dom_adapter_1.DOM.appendChild(doc.body, rootEl);
                loader.loadAsRoot(ChildComp, null, injector)
                    .then(function (componentRef) {
                    var el = new test_lib_1.RootTestComponent(componentRef);
                    test_lib_1.expect(rootEl.parentNode).toBe(doc.body);
                    el.detectChanges();
                    test_lib_1.expect(rootEl).toHaveText('hello');
                    componentRef.instance.ctxProp = 'new';
                    el.detectChanges();
                    test_lib_1.expect(rootEl).toHaveText('new');
                    componentRef.dispose();
                    test_lib_1.expect(rootEl.parentNode).toBeFalsy();
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
var ChildComp = (function () {
    function ChildComp() {
        this.ctxProp = 'hello';
    }
    ChildComp = __decorate([
        annotations_1.Component({
            selector: 'child-cmp',
        }),
        annotations_1.View({ template: '{{ctxProp}}' }), 
        __metadata('design:paramtypes', [])
    ], ChildComp);
    return ChildComp;
})();
var DynamicallyCreatedComponentService = (function () {
    function DynamicallyCreatedComponentService() {
    }
    return DynamicallyCreatedComponentService;
})();
var DynamicallyCreatedCmp = (function () {
    function DynamicallyCreatedCmp(a) {
        this.destroyed = false;
        this.greeting = "hello";
        this.dynamicallyCreatedComponentService = a;
    }
    DynamicallyCreatedCmp.prototype.onDestroy = function () { this.destroyed = true; };
    DynamicallyCreatedCmp = __decorate([
        annotations_1.Component({
            selector: 'hello-cmp',
            viewBindings: [DynamicallyCreatedComponentService],
            lifecycle: [annotations_1.LifecycleEvent.onDestroy]
        }),
        annotations_1.View({ template: "{{greeting}}" }), 
        __metadata('design:paramtypes', [DynamicallyCreatedComponentService])
    ], DynamicallyCreatedCmp);
    return DynamicallyCreatedCmp;
})();
var DynamicallyLoaded = (function () {
    function DynamicallyLoaded() {
    }
    DynamicallyLoaded = __decorate([
        annotations_1.Component({ selector: 'dummy' }),
        annotations_1.View({ template: "DynamicallyLoaded;" }), 
        __metadata('design:paramtypes', [])
    ], DynamicallyLoaded);
    return DynamicallyLoaded;
})();
var DynamicallyLoaded2 = (function () {
    function DynamicallyLoaded2() {
    }
    DynamicallyLoaded2 = __decorate([
        annotations_1.Component({ selector: 'dummy' }),
        annotations_1.View({ template: "DynamicallyLoaded2;" }), 
        __metadata('design:paramtypes', [])
    ], DynamicallyLoaded2);
    return DynamicallyLoaded2;
})();
var DynamicallyLoadedWithHostProps = (function () {
    function DynamicallyLoadedWithHostProps() {
        this.id = "default";
    }
    DynamicallyLoadedWithHostProps = __decorate([
        annotations_1.Component({ selector: 'dummy', host: { '[id]': 'id' } }),
        annotations_1.View({ template: "DynamicallyLoadedWithHostProps;" }), 
        __metadata('design:paramtypes', [])
    ], DynamicallyLoadedWithHostProps);
    return DynamicallyLoadedWithHostProps;
})();
var Location = (function () {
    function Location(elementRef) {
        this.elementRef = elementRef;
    }
    Location = __decorate([
        annotations_1.Component({ selector: 'location' }),
        annotations_1.View({ template: "Location;" }), 
        __metadata('design:paramtypes', [element_ref_1.ElementRef])
    ], Location);
    return Location;
})();
var MyComp = (function () {
    function MyComp() {
        this.ctxBoolProp = false;
    }
    MyComp = __decorate([
        annotations_1.Component({ selector: 'my-comp' }),
        annotations_1.View({ directives: [] }), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
//# sourceMappingURL=dynamic_component_loader_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
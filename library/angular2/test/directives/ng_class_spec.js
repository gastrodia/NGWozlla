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
var collection_1 = require('angular2/src/facade/collection');
var angular2_1 = require('angular2/angular2');
var ng_class_1 = require('angular2/src/directives/ng_class');
var view_pool_1 = require('angular2/src/core/compiler/view_pool');
function main() {
    test_lib_1.describe('binding to CSS class list', function () {
        test_lib_1.describe('viewpool support', function () {
            test_lib_1.beforeEachBindings(function () { return [angular2_1.bind(view_pool_1.APP_VIEW_POOL_CAPACITY).toValue(100)]; });
            test_lib_1.it('should clean up when the directive is destroyed', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div *ng-for="var item of items" [ng-class]="item"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.componentInstance.items = [['0']];
                    rootTC.detectChanges();
                    rootTC.componentInstance.items = [['1']];
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[1].nativeElement.className)
                        .toEqual('ng-binding 1');
                    async.done();
                });
            }));
        });
        test_lib_1.describe('expressions evaluating to objects', function () {
            test_lib_1.it('should add classes specified in an object literal', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="{foo: true, bar: false}"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo');
                    async.done();
                });
            }));
            test_lib_1.it('should add classes specified in an object literal without change in class names', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ng-class]=\"{'foo-bar': true, 'fooBar': true}\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo-bar fooBar');
                    async.done();
                });
            }));
            test_lib_1.it('should add and remove classes based on changes in object literal values', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="{foo: condition, bar: !condition}"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo');
                    rootTC.componentInstance.condition = false;
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding bar');
                    async.done();
                });
            }));
            test_lib_1.it('should add and remove classes based on changes to the expression object', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="objExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo');
                    collection_1.StringMapWrapper.set(rootTC.componentInstance.objExpr, 'bar', true);
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo bar');
                    collection_1.StringMapWrapper.set(rootTC.componentInstance.objExpr, 'baz', true);
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo bar baz');
                    collection_1.StringMapWrapper.delete(rootTC.componentInstance.objExpr, 'bar');
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo baz');
                    async.done();
                });
            }));
            test_lib_1.it('should add and remove classes based on reference changes to the expression object', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="objExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo');
                    rootTC.componentInstance.objExpr = { foo: true, bar: true };
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo bar');
                    rootTC.componentInstance.objExpr = { baz: true };
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding baz');
                    async.done();
                });
            }));
        });
        test_lib_1.describe('expressions evaluating to lists', function () {
            test_lib_1.it('should add classes specified in a list literal', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ng-class]=\"['foo', 'bar', 'foo-bar', 'fooBar']\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo bar foo-bar fooBar');
                    async.done();
                });
            }));
            test_lib_1.it('should add and remove classes based on changes to the expression', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="arrExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    var arrExpr = rootTC.componentInstance.arrExpr;
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo');
                    arrExpr.push('bar');
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo bar');
                    arrExpr[1] = 'baz';
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo baz');
                    collection_1.ListWrapper.remove(rootTC.componentInstance.arrExpr, 'baz');
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo');
                    async.done();
                });
            }));
            test_lib_1.it('should add and remove classes when a reference changes', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="arrExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo');
                    rootTC.componentInstance.arrExpr = ['bar'];
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding bar');
                    async.done();
                });
            }));
        });
        test_lib_1.describe('expressions evaluating to string', function () {
            test_lib_1.it('should add classes specified in a string literal', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ng-class]=\"'foo bar foo-bar fooBar'\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo bar foo-bar fooBar');
                    async.done();
                });
            }));
            test_lib_1.it('should add and remove classes based on changes to the expression', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="strExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo');
                    rootTC.componentInstance.strExpr = 'foo bar';
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo bar');
                    rootTC.componentInstance.strExpr = 'baz';
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding baz');
                    async.done();
                });
            }));
            test_lib_1.it('should remove active classes when switching from string to null', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ng-class]=\"strExpr\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding foo');
                    rootTC.componentInstance.strExpr = null;
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                        .toEqual('ng-binding');
                    async.done();
                });
            }));
        });
        test_lib_1.it('should remove active classes when expression evaluates to null', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div [ng-class]="objExpr"></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                    .toEqual('ng-binding foo');
                rootTC.componentInstance.objExpr = null;
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                    .toEqual('ng-binding');
                rootTC.componentInstance.objExpr = { 'foo': false, 'bar': true };
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                    .toEqual('ng-binding bar');
                async.done();
            });
        }));
        test_lib_1.it('should co-operate with the class attribute', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div [ng-class]="objExpr" class="init foo"></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                collection_1.StringMapWrapper.set(rootTC.componentInstance.objExpr, 'bar', true);
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                    .toEqual('init foo ng-binding bar');
                collection_1.StringMapWrapper.set(rootTC.componentInstance.objExpr, 'foo', false);
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                    .toEqual('init ng-binding bar');
                async.done();
            });
        }));
        test_lib_1.it('should co-operate with the class attribute and class.name binding', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div class="init foo" [ng-class]="objExpr" [class.baz]="condition"></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                    .toEqual('init foo ng-binding baz');
                collection_1.StringMapWrapper.set(rootTC.componentInstance.objExpr, 'bar', true);
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                    .toEqual('init foo ng-binding baz bar');
                collection_1.StringMapWrapper.set(rootTC.componentInstance.objExpr, 'foo', false);
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                    .toEqual('init ng-binding baz bar');
                rootTC.componentInstance.condition = false;
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.className)
                    .toEqual('init ng-binding bar');
                async.done();
            });
        }));
    });
}
exports.main = main;
var TestComponent = (function () {
    function TestComponent() {
        this.condition = true;
        this.arrExpr = ['foo'];
        this.objExpr = { 'foo': true, 'bar': false };
        this.strExpr = 'foo';
    }
    TestComponent = __decorate([
        angular2_1.Component({ selector: 'test-cmp' }),
        angular2_1.View({ directives: [ng_class_1.NgClass, angular2_1.NgFor] }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
})();
//# sourceMappingURL=ng_class_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
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
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var angular2_1 = require('angular2/angular2');
var element_ref_1 = require('angular2/src/core/compiler/element_ref');
var ng_non_bindable_1 = require('angular2/src/directives/ng_non_bindable');
function main() {
    test_lib_1.describe('non-bindable', function () {
        test_lib_1.it('should not interpolate children', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div>{{text}}<span ng-non-bindable>{{text}}</span></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.nativeElement).toHaveText('foo{{text}}');
                async.done();
            });
        }));
        test_lib_1.it('should ignore directives on child nodes', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div ng-non-bindable><span id=child test-dec>{{text}}</span></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                // We must use DOM.querySelector instead of rootTC.query here
                // since the elements inside are not compiled.
                var span = dom_adapter_1.DOM.querySelector(rootTC.nativeElement, '#child');
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(span, 'compiled')).toBeFalsy();
                async.done();
            });
        }));
        test_lib_1.it('should trigger directives on the same node', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div><span id=child ng-non-bindable test-dec>{{text}}</span></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                var span = dom_adapter_1.DOM.querySelector(rootTC.nativeElement, '#child');
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(span, 'compiled')).toBeTruthy();
                async.done();
            });
        }));
    });
}
exports.main = main;
var TestDirective = (function () {
    function TestDirective(el) {
        dom_adapter_1.DOM.addClass(el.nativeElement, 'compiled');
    }
    TestDirective = __decorate([
        angular2_1.Directive({ selector: '[test-dec]' }), 
        __metadata('design:paramtypes', [element_ref_1.ElementRef])
    ], TestDirective);
    return TestDirective;
})();
var TestComponent = (function () {
    function TestComponent() {
        this.text = 'foo';
    }
    TestComponent = __decorate([
        angular2_1.Component({ selector: 'test-cmp' }),
        angular2_1.View({ directives: [ng_non_bindable_1.NgNonBindable, TestDirective] }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
})();
//# sourceMappingURL=non_bindable_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
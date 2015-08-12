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
var angular2_1 = require('angular2/angular2');
var viewAnn = require('angular2/src/core/annotations_impl/view');
function main() {
    test_lib_1.describe('directive lifecycle integration spec', function () {
        test_lib_1.it('should invoke lifecycle methods onChange > onInit > onCheck > onAllChangesDone', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MyComp, new viewAnn.View({ template: '<div [field]="123" lifecycle></div>', directives: [LifecycleDir] }))
                .createAsync(MyComp)
                .then(function (tc) {
                var dir = tc.componentViewChildren[0].inject(LifecycleDir);
                tc.detectChanges();
                test_lib_1.expect(dir.log).toEqual(["onChange", "onInit", "onCheck", "onAllChangesDone"]);
                tc.detectChanges();
                test_lib_1.expect(dir.log).toEqual([
                    "onChange",
                    "onInit",
                    "onCheck",
                    "onAllChangesDone",
                    "onCheck",
                    "onAllChangesDone"
                ]);
                async.done();
            });
        }));
    });
}
exports.main = main;
var LifecycleDir = (function () {
    function LifecycleDir() {
        this.log = [];
    }
    LifecycleDir.prototype.onChange = function (_) { this.log.push("onChange"); };
    LifecycleDir.prototype.onInit = function () { this.log.push("onInit"); };
    LifecycleDir.prototype.onCheck = function () { this.log.push("onCheck"); };
    LifecycleDir.prototype.onAllChangesDone = function () { this.log.push("onAllChangesDone"); };
    LifecycleDir = __decorate([
        angular2_1.Directive({
            selector: "[lifecycle]",
            properties: ['field'],
            lifecycle: [
                angular2_1.LifecycleEvent.onChange,
                angular2_1.LifecycleEvent.onCheck,
                angular2_1.LifecycleEvent.onInit,
                angular2_1.LifecycleEvent.onAllChangesDone
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LifecycleDir);
    return LifecycleDir;
})();
var MyComp = (function () {
    function MyComp() {
    }
    MyComp = __decorate([
        angular2_1.Component({ selector: 'my-comp' }),
        angular2_1.View({ directives: [] }), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
//# sourceMappingURL=directive_lifecycle_integration_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
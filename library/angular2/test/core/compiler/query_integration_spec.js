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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var test_lib_1 = require('angular2/test_lib');
var di_1 = require('angular2/di');
var core_1 = require('angular2/core');
var annotations_1 = require('angular2/annotations');
var angular2_1 = require('angular2/angular2');
var browser_adapter_1 = require('angular2/src/dom/browser_adapter');
function main() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    test_lib_1.describe('Query API', function () {
        test_lib_1.describe("querying by directive type", function () {
            test_lib_1.it('should contain all direct child directives in the light dom', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div text="1"></div>' +
                    '<needs-query text="2"><div text="3">' +
                    '<div text="too-deep"></div>' +
                    '</div></needs-query>' +
                    '<div text="4"></div>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(test_lib_1.asNativeElements(view.componentViewChildren)).toHaveText('2|3|');
                    async.done();
                });
            }));
            test_lib_1.it('should contain all directives in the light dom when descendants flag is used', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div text="1"></div>' +
                    '<needs-query-desc text="2"><div text="3">' +
                    '<div text="4"></div>' +
                    '</div></needs-query-desc>' +
                    '<div text="5"></div>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(test_lib_1.asNativeElements(view.componentViewChildren)).toHaveText('2|3|4|');
                    async.done();
                });
            }));
            test_lib_1.it('should contain all directives in the light dom', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div text="1"></div>' +
                    '<needs-query text="2"><div text="3"></div></needs-query>' +
                    '<div text="4"></div>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(test_lib_1.asNativeElements(view.componentViewChildren)).toHaveText('2|3|');
                    async.done();
                });
            }));
            test_lib_1.it('should reflect dynamically inserted directives', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div text="1"></div>' +
                    '<needs-query text="2"><div *ng-if="shouldShow" [text]="\'3\'"></div></needs-query>' +
                    '<div text="4"></div>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(test_lib_1.asNativeElements(view.componentViewChildren)).toHaveText('2|');
                    view.componentInstance.shouldShow = true;
                    view.detectChanges();
                    test_lib_1.expect(test_lib_1.asNativeElements(view.componentViewChildren)).toHaveText('2|3|');
                    async.done();
                });
            }));
            test_lib_1.it('should reflect moved directives', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div text="1"></div>' +
                    '<needs-query text="2"><div *ng-for="var i of list" [text]="i"></div></needs-query>' +
                    '<div text="4"></div>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(test_lib_1.asNativeElements(view.componentViewChildren)).toHaveText('2|1d|2d|3d|');
                    view.componentInstance.list = ['3d', '2d'];
                    view.detectChanges();
                    view.detectChanges();
                    test_lib_1.expect(test_lib_1.asNativeElements(view.componentViewChildren)).toHaveText('2|3d|2d|');
                    async.done();
                });
            }));
        });
        test_lib_1.describe("onChange", function () {
            test_lib_1.it('should notify query on change', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-query #q>' +
                    '<div text="1"></div>' +
                    '<div *ng-if="shouldShow" text="2"></div>' +
                    '</needs-query>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    var q = view.componentViewChildren[0].getLocal("q");
                    view.detectChanges();
                    q.query.onChange(function () {
                        test_lib_1.expect(q.query.first.text).toEqual("1");
                        test_lib_1.expect(q.query.last.text).toEqual("2");
                        async.done();
                    });
                    view.componentInstance.shouldShow = true;
                    view.detectChanges();
                });
            }));
            test_lib_1.it("should notify child's query before notifying parent's query", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-query-desc #q1>' +
                    '<needs-query-desc #q2>' +
                    '<div text="1"></div>' +
                    '</needs-query-desc>' +
                    '</needs-query-desc>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    var q1 = view.componentViewChildren[0].getLocal("q1");
                    var q2 = view.componentViewChildren[0].getLocal("q2");
                    var firedQ2 = false;
                    q2.query.onChange(function () { firedQ2 = true; });
                    q1.query.onChange(function () {
                        test_lib_1.expect(firedQ2).toBe(true);
                        async.done();
                    });
                    view.detectChanges();
                });
            }));
        });
        test_lib_1.describe("querying by var binding", function () {
            test_lib_1.it('should contain all the child directives in the light dom with the given var binding', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-query-by-var-binding #q>' +
                    '<div *ng-for="#item of list" [text]="item" #text-label="textDir"></div>' +
                    '</needs-query-by-var-binding>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    var q = view.componentViewChildren[0].getLocal("q");
                    view.componentInstance.list = ['1d', '2d'];
                    view.detectChanges();
                    test_lib_1.expect(q.query.first.text).toEqual("1d");
                    test_lib_1.expect(q.query.last.text).toEqual("2d");
                    async.done();
                });
            }));
            test_lib_1.it('should support querying by multiple var bindings', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-query-by-var-bindings #q>' +
                    '<div text="one" #text-label1="textDir"></div>' +
                    '<div text="two" #text-label2="textDir"></div>' +
                    '</needs-query-by-var-bindings>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    var q = view.componentViewChildren[0].getLocal("q");
                    view.detectChanges();
                    test_lib_1.expect(q.query.first.text).toEqual("one");
                    test_lib_1.expect(q.query.last.text).toEqual("two");
                    async.done();
                });
            }));
            test_lib_1.it('should reflect dynamically inserted directives', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-query-by-var-binding #q>' +
                    '<div *ng-for="#item of list" [text]="item" #text-label="textDir"></div>' +
                    '</needs-query-by-var-binding>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    var q = view.componentViewChildren[0].getLocal("q");
                    view.componentInstance.list = ['1d', '2d'];
                    view.detectChanges();
                    view.componentInstance.list = ['2d', '1d'];
                    view.detectChanges();
                    test_lib_1.expect(q.query.last.text).toEqual("1d");
                    async.done();
                });
            }));
            test_lib_1.it('should contain all the elements in the light dom with the given var binding', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-query-by-var-binding #q>' +
                    '<div template="ng-for: #item of list">' +
                    '<div #text-label>{{item}}</div>' +
                    '</div>' +
                    '</needs-query-by-var-binding>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    var q = view.componentViewChildren[0].getLocal("q");
                    view.componentInstance.list = ['1d', '2d'];
                    view.detectChanges();
                    test_lib_1.expect(q.query.first.nativeElement).toHaveText("1d");
                    test_lib_1.expect(q.query.last.nativeElement).toHaveText("2d");
                    async.done();
                });
            }));
            test_lib_1.it('should contain all the elements in the light dom even if they get projected', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-query-and-project #q>' +
                    '<div text="hello"></div><div text="world"></div>' +
                    '</needs-query-and-project>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(test_lib_1.asNativeElements(view.componentViewChildren)).toHaveText('hello|world|');
                    async.done();
                });
            }));
        });
        test_lib_1.describe("querying in the view", function () {
            test_lib_1.it('should contain all the elements in the view with that have the given directive', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-query #q><div text="ignoreme"></div></needs-view-query>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    var q = view.componentViewChildren[0].getLocal("q");
                    view.detectChanges();
                    test_lib_1.expect(q.query.map(function (d) { return d.text; })).toEqual(["1", "2", "3"]);
                    async.done();
                });
            }));
            test_lib_1.it('should query descendants in the view when the flag is used', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-query-desc #q></needs-view-query-desc>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    var q = view.componentViewChildren[0].getLocal("q");
                    view.detectChanges();
                    test_lib_1.expect(q.query.map(function (d) { return d.text; })).toEqual(["1", "2", "3", "4"]);
                    async.done();
                });
            }));
            test_lib_1.it('should include directive present on the host element', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-query #q text="self"></needs-view-query>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    var q = view.componentViewChildren[0].getLocal("q");
                    view.detectChanges();
                    test_lib_1.expect(q.query.map(function (d) { return d.text; })).toEqual(["self", "1", "2", "3"]);
                    async.done();
                });
            }));
            test_lib_1.it('should reflect changes in the component', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-query-if #q></needs-view-query-if>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    var q = view.componentViewChildren[0].getLocal("q");
                    view.detectChanges();
                    test_lib_1.expect(q.query.length).toBe(0);
                    q.show = true;
                    view.detectChanges();
                    test_lib_1.expect(q.query.first.text).toEqual("1");
                    async.done();
                });
            }));
            test_lib_1.it('should not be affected by other changes in the component', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-query-nested-if #q></needs-view-query-nested-if>';
                tcb.overrideTemplate(MyComp, template)
                    .createAsync(MyComp)
                    .then(function (view) {
                    var q = view.componentViewChildren[0].getLocal("q");
                    view.detectChanges();
                    test_lib_1.expect(q.query.length).toEqual(1);
                    test_lib_1.expect(q.query.first.text).toEqual("1");
                    q.show = false;
                    view.detectChanges();
                    test_lib_1.expect(q.query.length).toEqual(1);
                    test_lib_1.expect(q.query.first.text).toEqual("1");
                    async.done();
                });
            }));
            /* TODO(rado): fix and reenable.
      
            it('should maintain directives in pre-order depth-first DOM order after dynamic insertion',
              inject([TestComponentBuilder, AsyncTestCompleter], (tcb:TestComponentBuilder, async) => {
                var template = '<needs-view-query-order #q text="self"></needs-view-query-order>';
      
                tcb.overrideTemplate(MyComp, template)
                  .createAsync(MyComp)
                  .then((view) => {
                    var q:NeedsViewQueryOrder = view.componentViewChildren[0].getLocal("q");
      
                    view.detectChanges();
      
                    expect(q.query.length).toBe(4);
                    expect(q.query.first.text).toEqual("1");
                    expect(q.query.first.text).toEqual("4");
      
                    async.done();
                  });
              }));*/
        });
    });
}
exports.main = main;
var TextDirective = (function () {
    function TextDirective() {
    }
    TextDirective = __decorate([
        annotations_1.Directive({ selector: '[text]', properties: ['text'], exportAs: 'textDir' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TextDirective);
    return TextDirective;
})();
var InertDirective = (function () {
    function InertDirective() {
    }
    InertDirective = __decorate([
        annotations_1.Directive({ selector: '[dir]' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], InertDirective);
    return InertDirective;
})();
var NeedsQuery = (function () {
    function NeedsQuery(query) {
        this.query = query;
    }
    NeedsQuery = __decorate([
        annotations_1.Component({ selector: 'needs-query' }),
        annotations_1.View({
            directives: [angular2_1.NgFor, TextDirective],
            template: '<div text="ignoreme"></div><div *ng-for="var dir of query">{{dir.text}}|</div>'
        }),
        di_1.Injectable(),
        __param(0, annotations_1.Query(TextDirective)), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], NeedsQuery);
    return NeedsQuery;
})();
var NeedsQueryDesc = (function () {
    function NeedsQueryDesc(query) {
        this.query = query;
    }
    NeedsQueryDesc = __decorate([
        annotations_1.Component({ selector: 'needs-query-desc' }),
        annotations_1.View({ directives: [angular2_1.NgFor], template: '<div *ng-for="var dir of query">{{dir.text}}|</div>' }),
        di_1.Injectable(),
        __param(0, annotations_1.Query(TextDirective, { descendants: true })), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], NeedsQueryDesc);
    return NeedsQueryDesc;
})();
var NeedsQueryByLabel = (function () {
    function NeedsQueryByLabel(query) {
        this.query = query;
    }
    NeedsQueryByLabel = __decorate([
        annotations_1.Component({ selector: 'needs-query-by-var-binding' }),
        annotations_1.View({ directives: [], template: '<ng-content>' }),
        di_1.Injectable(),
        __param(0, annotations_1.Query("textLabel", { descendants: true })), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], NeedsQueryByLabel);
    return NeedsQueryByLabel;
})();
var NeedsQueryByTwoLabels = (function () {
    function NeedsQueryByTwoLabels(query) {
        this.query = query;
    }
    NeedsQueryByTwoLabels = __decorate([
        annotations_1.Component({ selector: 'needs-query-by-var-bindings' }),
        annotations_1.View({ directives: [], template: '<ng-content>' }),
        di_1.Injectable(),
        __param(0, annotations_1.Query("textLabel1,textLabel2", { descendants: true })), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], NeedsQueryByTwoLabels);
    return NeedsQueryByTwoLabels;
})();
var NeedsQueryAndProject = (function () {
    function NeedsQueryAndProject(query) {
        this.query = query;
    }
    NeedsQueryAndProject = __decorate([
        annotations_1.Component({ selector: 'needs-query-and-project' }),
        annotations_1.View({
            directives: [angular2_1.NgFor],
            template: '<div *ng-for="var dir of query">{{dir.text}}|</div><ng-content></ng-content>'
        }),
        di_1.Injectable(),
        __param(0, annotations_1.Query(TextDirective)), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], NeedsQueryAndProject);
    return NeedsQueryAndProject;
})();
var NeedsViewQuery = (function () {
    function NeedsViewQuery(query) {
        this.query = query;
    }
    NeedsViewQuery = __decorate([
        annotations_1.Component({ selector: 'needs-view-query' }),
        annotations_1.View({
            directives: [TextDirective],
            template: '<div text="1"><div text="need descendants"></div></div>' +
                '<div text="2"></div><div text="3"></div>'
        }),
        di_1.Injectable(),
        __param(0, annotations_1.ViewQuery(TextDirective)), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], NeedsViewQuery);
    return NeedsViewQuery;
})();
var NeedsViewQueryDesc = (function () {
    function NeedsViewQueryDesc(query) {
        this.query = query;
    }
    NeedsViewQueryDesc = __decorate([
        annotations_1.Component({ selector: 'needs-view-query-desc' }),
        annotations_1.View({
            directives: [TextDirective],
            template: '<div text="1"><div text="2"></div></div>' +
                '<div text="3"></div><div text="4"></div>'
        }),
        di_1.Injectable(),
        __param(0, annotations_1.ViewQuery(TextDirective, { descendants: true })), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], NeedsViewQueryDesc);
    return NeedsViewQueryDesc;
})();
var NeedsViewQueryIf = (function () {
    function NeedsViewQueryIf(query) {
        this.query = query;
        this.show = false;
    }
    NeedsViewQueryIf = __decorate([
        annotations_1.Component({ selector: 'needs-view-query-if' }),
        annotations_1.View({ directives: [angular2_1.NgIf, TextDirective], template: '<div *ng-if="show" text="1"></div>' }),
        di_1.Injectable(),
        __param(0, annotations_1.ViewQuery(TextDirective)), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], NeedsViewQueryIf);
    return NeedsViewQueryIf;
})();
var NeedsViewQueryNestedIf = (function () {
    function NeedsViewQueryNestedIf(query) {
        this.query = query;
        this.show = true;
    }
    NeedsViewQueryNestedIf = __decorate([
        annotations_1.Component({ selector: 'needs-view-query-nested-if' }),
        annotations_1.View({
            directives: [angular2_1.NgIf, InertDirective, TextDirective],
            template: '<div text="1"><div *ng-if="show"><div dir></div></div></div>'
        }),
        di_1.Injectable(),
        __param(0, annotations_1.ViewQuery(TextDirective)), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], NeedsViewQueryNestedIf);
    return NeedsViewQueryNestedIf;
})();
var NeedsViewQueryOrder = (function () {
    function NeedsViewQueryOrder(query) {
        this.query = query;
    }
    NeedsViewQueryOrder = __decorate([
        annotations_1.Component({ selector: 'needs-view-query-order' }),
        annotations_1.View({
            directives: [angular2_1.NgFor, TextDirective],
            template: '<div text="1">' +
                '<div *ng-for="var i of [\'2\', \'3\']" [text]="i"></div>' +
                '<div text="4">'
        }),
        di_1.Injectable(),
        __param(0, annotations_1.ViewQuery(TextDirective)), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], NeedsViewQueryOrder);
    return NeedsViewQueryOrder;
})();
var MyComp = (function () {
    function MyComp() {
        this.shouldShow = false;
        this.list = ['1d', '2d', '3d'];
    }
    MyComp = __decorate([
        annotations_1.Component({ selector: 'my-comp' }),
        annotations_1.View({
            directives: [
                NeedsQuery,
                NeedsQueryDesc,
                NeedsQueryByLabel,
                NeedsQueryByTwoLabels,
                NeedsQueryAndProject,
                NeedsViewQuery,
                NeedsViewQueryDesc,
                NeedsViewQueryIf,
                NeedsViewQueryNestedIf,
                NeedsViewQueryOrder,
                TextDirective,
                InertDirective,
                angular2_1.NgIf,
                angular2_1.NgFor
            ]
        }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
//# sourceMappingURL=query_integration_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
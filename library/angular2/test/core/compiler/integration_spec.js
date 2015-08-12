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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var test_lib_1 = require('angular2/test_lib');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var di_1 = require('angular2/di');
var change_detection_1 = require('angular2/src/change_detection/change_detection');
var annotations_1 = require('angular2/annotations');
var viewAnn = require('angular2/src/core/annotations_impl/view');
var query_list_1 = require('angular2/src/core/compiler/query_list');
var ng_if_1 = require('angular2/src/directives/ng_if');
var ng_for_1 = require('angular2/src/directives/ng_for');
var view_container_ref_1 = require('angular2/src/core/compiler/view_container_ref');
var compiler_1 = require('angular2/src/core/compiler/compiler');
var element_ref_1 = require('angular2/src/core/compiler/element_ref');
var template_ref_1 = require('angular2/src/core/compiler/template_ref');
var dom_renderer_1 = require('angular2/src/render/dom/dom_renderer');
var ANCHOR_ELEMENT = lang_1.CONST_EXPR(new di_1.OpaqueToken('AnchorElement'));
function main() {
    test_lib_1.describe('integration tests', function () {
        test_lib_1.beforeEachBindings(function () { return [di_1.bind(ANCHOR_ELEMENT).toValue(test_lib_1.el('<div></div>'))]; });
        test_lib_1.describe('react to record changes', function () {
            test_lib_1.it('should consume text node changes', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<div>{{ctxProp}}</div>' }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.componentInstance.ctxProp = 'Hello World!';
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.nativeElement).toHaveText('Hello World!');
                    async.done();
                });
            }));
            test_lib_1.it('should update text node with a blank string when interpolation evaluates to null', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<div>{{null}}{{ctxProp}}</div>' }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.componentInstance.ctxProp = null;
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.nativeElement).toHaveText('');
                    async.done();
                });
            }));
            test_lib_1.it('should consume element binding changes', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<div [id]="ctxProp"></div>' }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.componentInstance.ctxProp = 'Hello World!';
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.id).toEqual('Hello World!');
                    async.done();
                });
            }));
            test_lib_1.it('should consume binding to aria-* attributes', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<div [attr.aria-label]="ctxProp"></div>' }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.componentInstance.ctxProp = 'Initial aria label';
                    rootTC.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getAttribute(rootTC.componentViewChildren[0].nativeElement, 'aria-label'))
                        .toEqual('Initial aria label');
                    rootTC.componentInstance.ctxProp = 'Changed aria label';
                    rootTC.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getAttribute(rootTC.componentViewChildren[0].nativeElement, 'aria-label'))
                        .toEqual('Changed aria label');
                    async.done();
                });
            }));
            test_lib_1.it('should consume binding to property names where attr name and property name do not match', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<div [tabindex]="ctxNumProp"></div>' }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.tabIndex).toEqual(0);
                    rootTC.componentInstance.ctxNumProp = 5;
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.tabIndex).toEqual(5);
                    async.done();
                });
            }));
            test_lib_1.it('should consume binding to camel-cased properties using dash-cased syntax in templates', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<input [read-only]="ctxBoolProp">' }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.readOnly).toBeFalsy();
                    rootTC.componentInstance.ctxBoolProp = true;
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].nativeElement.readOnly).toBeTruthy();
                    async.done();
                });
            }));
            test_lib_1.it('should consume binding to inner-html', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<div inner-html="{{ctxProp}}"></div>' }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.componentInstance.ctxProp = 'Some <span>HTML</span>';
                    rootTC.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(rootTC.componentViewChildren[0].nativeElement))
                        .toEqual('Some <span>HTML</span>');
                    rootTC.componentInstance.ctxProp = 'Some other <div>HTML</div>';
                    rootTC.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(rootTC.componentViewChildren[0].nativeElement))
                        .toEqual('Some other <div>HTML</div>');
                    async.done();
                });
            }));
            test_lib_1.it('should consume directive watch expression change.', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var tpl = '<div>' +
                    '<div my-dir [elprop]="ctxProp"></div>' +
                    '<div my-dir elprop="Hi there!"></div>' +
                    '<div my-dir elprop="Hi {{\'there!\'}}"></div>' +
                    '<div my-dir elprop="One more {{ctxProp}}"></div>' +
                    '</div>';
                tcb.overrideView(MyComp, new viewAnn.View({ template: tpl, directives: [MyDir] }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.componentInstance.ctxProp = 'Hello World!';
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.componentViewChildren[0].inject(MyDir).dirProp)
                        .toEqual('Hello World!');
                    test_lib_1.expect(rootTC.componentViewChildren[1].inject(MyDir).dirProp).toEqual('Hi there!');
                    test_lib_1.expect(rootTC.componentViewChildren[2].inject(MyDir).dirProp).toEqual('Hi there!');
                    test_lib_1.expect(rootTC.componentViewChildren[3].inject(MyDir).dirProp)
                        .toEqual('One more Hello World!');
                    async.done();
                });
            }));
            test_lib_1.describe('pipes', function () {
                test_lib_1.it("should support pipes in bindings", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyCompWithPipes, new viewAnn.View({
                        template: '<div my-dir #dir="mydir" [elprop]="ctxProp | double"></div>',
                        directives: [MyDir]
                    }))
                        .createAsync(MyCompWithPipes)
                        .then(function (rootTC) {
                        rootTC.componentInstance.ctxProp = 'a';
                        rootTC.detectChanges();
                        var dir = rootTC.componentViewChildren[0].getLocal('dir');
                        test_lib_1.expect(dir.dirProp).toEqual('aa');
                        async.done();
                    });
                }));
            });
            test_lib_1.it('should support nested components.', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<child-cmp></child-cmp>', directives: [ChildComp] }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.nativeElement).toHaveText('hello');
                    async.done();
                });
            }));
            // GH issue 328 - https://github.com/angular/angular/issues/328
            test_lib_1.it('should support different directive types on a single node', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<child-cmp my-dir [elprop]="ctxProp"></child-cmp>',
                    directives: [MyDir, ChildComp]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.componentInstance.ctxProp = 'Hello World!';
                    rootTC.detectChanges();
                    var tc = rootTC.componentViewChildren[0];
                    test_lib_1.expect(tc.inject(MyDir).dirProp).toEqual('Hello World!');
                    test_lib_1.expect(tc.inject(ChildComp).dirProp).toEqual(null);
                    async.done();
                });
            }));
            test_lib_1.it('should support directives where a binding attribute is not given', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    // No attribute "el-prop" specified.
                    template: '<p my-dir></p>',
                    directives: [MyDir]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) { async.done(); });
            }));
            test_lib_1.it('should execute a given directive once, even if specified multiple times', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<p no-duplicate></p>',
                    directives: [
                        DuplicateDir,
                        DuplicateDir,
                        [DuplicateDir, [DuplicateDir, di_1.bind(DuplicateDir).toClass(DuplicateDir)]]
                    ]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    test_lib_1.expect(rootTC.nativeElement).toHaveText('noduplicate');
                    async.done();
                });
            }));
            test_lib_1.it('should use the last directive binding per directive', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<p no-duplicate></p>',
                    directives: [
                        di_1.bind(DuplicateDir)
                            .toClass(DuplicateDir),
                        di_1.bind(DuplicateDir).toClass(OtherDuplicateDir)
                    ]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    test_lib_1.expect(rootTC.nativeElement).toHaveText('othernoduplicate');
                    async.done();
                });
            }));
            test_lib_1.it('should support directives where a selector matches property binding', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<p [id]="ctxProp"></p>', directives: [IdDir] }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    var tc = rootTC.componentViewChildren[0];
                    var idDir = tc.inject(IdDir);
                    rootTC.componentInstance.ctxProp = 'some_id';
                    rootTC.detectChanges();
                    test_lib_1.expect(idDir.id).toEqual('some_id');
                    rootTC.componentInstance.ctxProp = 'other_id';
                    rootTC.detectChanges();
                    test_lib_1.expect(idDir.id).toEqual('other_id');
                    async.done();
                });
            }));
            test_lib_1.it('should allow specifying directives as bindings', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<child-cmp></child-cmp>',
                    directives: [di_1.bind(ChildComp).toClass(ChildComp)]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.nativeElement).toHaveText('hello');
                    async.done();
                });
            }));
            test_lib_1.it('should read directives metadata from their binding token', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<div public-api><div needs-public-api></div></div>',
                    directives: [di_1.bind(PublicApi).toClass(PrivateImpl), NeedsPublicApi]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) { async.done(); });
            }));
            test_lib_1.it('should support template directives via `<template>` elements.', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<div><template some-viewport var-greeting="some-tmpl"><copy-me>{{greeting}}</copy-me></template></div>',
                    directives: [SomeViewport]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    var childNodesOfWrapper = rootTC.componentViewChildren;
                    // 1 template + 2 copies.
                    test_lib_1.expect(childNodesOfWrapper.length).toBe(3);
                    test_lib_1.expect(childNodesOfWrapper[1].nativeElement).toHaveText('hello');
                    test_lib_1.expect(childNodesOfWrapper[2].nativeElement).toHaveText('again');
                    async.done();
                });
            }));
            test_lib_1.it('should support template directives via `template` attribute.', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<div><copy-me template="some-viewport: var greeting=some-tmpl">{{greeting}}</copy-me></div>',
                    directives: [SomeViewport]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    var childNodesOfWrapper = rootTC.componentViewChildren;
                    // 1 template + 2 copies.
                    test_lib_1.expect(childNodesOfWrapper.length).toBe(3);
                    test_lib_1.expect(childNodesOfWrapper[1].nativeElement).toHaveText('hello');
                    test_lib_1.expect(childNodesOfWrapper[2].nativeElement).toHaveText('again');
                    async.done();
                });
            }));
            test_lib_1.it('should allow to transplant embedded ProtoViews into other ViewContainers', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<some-directive><toolbar><template toolbarpart var-toolbar-prop="toolbarProp">{{ctxProp}},{{toolbarProp}},<cmp-with-host></cmp-with-host></template></toolbar></some-directive>',
                    directives: [SomeDirective, CompWithHost, ToolbarComponent, ToolbarPart]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.componentInstance.ctxProp = 'From myComp';
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.nativeElement)
                        .toHaveText('TOOLBAR(From myComp,From toolbar,Component with an injected host)');
                    async.done();
                });
            }));
            test_lib_1.describe("variable bindings", function () {
                test_lib_1.it('should assign a component to a var-', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new viewAnn.View({
                        template: '<p><child-cmp var-alice></child-cmp></p>',
                        directives: [ChildComp]
                    }))
                        .createAsync(MyComp)
                        .then(function (rootTC) {
                        test_lib_1.expect(rootTC.componentViewChildren[0].getLocal('alice'))
                            .toBeAnInstanceOf(ChildComp);
                        async.done();
                    });
                }));
                test_lib_1.it('should assign a directive to a var-', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new viewAnn.View({
                        template: '<p><div export-dir #localdir="dir"></div></p>',
                        directives: [ExportDir]
                    }))
                        .createAsync(MyComp)
                        .then(function (rootTC) {
                        test_lib_1.expect(rootTC.componentViewChildren[0].getLocal('localdir'))
                            .toBeAnInstanceOf(ExportDir);
                        async.done();
                    });
                }));
                test_lib_1.it('should make the assigned component accessible in property bindings', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new viewAnn.View({
                        template: '<p><child-cmp var-alice></child-cmp>{{alice.ctxProp}}</p>',
                        directives: [ChildComp]
                    }))
                        .createAsync(MyComp)
                        .then(function (rootTC) {
                        rootTC.detectChanges();
                        test_lib_1.expect(rootTC.nativeElement)
                            .toHaveText('hellohello'); // this first one is the
                        // component, the second one is
                        // the text binding
                        async.done();
                    });
                }));
                test_lib_1.it('should assign two component instances each with a var-', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new viewAnn.View({
                        template: '<p><child-cmp var-alice></child-cmp><child-cmp var-bob></p>',
                        directives: [ChildComp]
                    }))
                        .createAsync(MyComp)
                        .then(function (rootTC) {
                        test_lib_1.expect(rootTC.componentViewChildren[0].getLocal('alice'))
                            .toBeAnInstanceOf(ChildComp);
                        test_lib_1.expect(rootTC.componentViewChildren[0].getLocal('bob'))
                            .toBeAnInstanceOf(ChildComp);
                        test_lib_1.expect(rootTC.componentViewChildren[0].getLocal('alice'))
                            .not.toBe(rootTC.componentViewChildren[0].getLocal('bob'));
                        async.done();
                    });
                }));
                test_lib_1.it('should assign the component instance to a var- with shorthand syntax', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new viewAnn.View({
                        template: '<child-cmp #alice></child-cmp>',
                        directives: [ChildComp]
                    }))
                        .createAsync(MyComp)
                        .then(function (rootTC) {
                        test_lib_1.expect(rootTC.componentViewChildren[0].getLocal('alice'))
                            .toBeAnInstanceOf(ChildComp);
                        async.done();
                    });
                }));
                test_lib_1.it('should assign the element instance to a user-defined variable', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new viewAnn.View({ template: '<p><div var-alice><i>Hello</i></div></p>' }))
                        .createAsync(MyComp)
                        .then(function (rootTC) {
                        var value = rootTC.componentViewChildren[0].getLocal('alice');
                        test_lib_1.expect(value).not.toBe(null);
                        test_lib_1.expect(value.tagName.toLowerCase()).toEqual('div');
                        async.done();
                    });
                }));
                test_lib_1.it('should change dash-case to camel-case', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new viewAnn.View({
                        template: '<p><child-cmp var-super-alice></child-cmp></p>',
                        directives: [ChildComp]
                    }))
                        .createAsync(MyComp)
                        .then(function (rootTC) {
                        test_lib_1.expect(rootTC.componentViewChildren[0].getLocal('superAlice'))
                            .toBeAnInstanceOf(ChildComp);
                        async.done();
                    });
                }));
                test_lib_1.it('should allow to use variables in a for loop', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new viewAnn.View({
                        template: '<div><div *ng-for="var i of [1]"><child-cmp-no-template #cmp></child-cmp-no-template>{{i}}-{{cmp.ctxProp}}</div></div>',
                        directives: [ChildCompNoTemplate, ng_for_1.NgFor]
                    }))
                        .createAsync(MyComp)
                        .then(function (rootTC) {
                        rootTC.detectChanges();
                        // Get the element at index 1, since index 0 is the <template>.
                        test_lib_1.expect(rootTC.componentViewChildren[1].nativeElement).toHaveText("1-hello");
                        async.done();
                    });
                }));
            });
            test_lib_1.describe("ON_PUSH components", function () {
                test_lib_1.it("should use ChangeDetectorRef to manually request a check", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new viewAnn.View({
                        template: '<push-cmp-with-ref #cmp></push-cmp-with-ref>',
                        directives: [[[PushCmpWithRef]]]
                    }))
                        .createAsync(MyComp)
                        .then(function (rootTC) {
                        var cmp = rootTC.componentViewChildren[0].getLocal('cmp');
                        rootTC.detectChanges();
                        test_lib_1.expect(cmp.numberOfChecks).toEqual(1);
                        rootTC.detectChanges();
                        test_lib_1.expect(cmp.numberOfChecks).toEqual(1);
                        cmp.propagate();
                        rootTC.detectChanges();
                        test_lib_1.expect(cmp.numberOfChecks).toEqual(2);
                        async.done();
                    });
                }));
                test_lib_1.it("should be checked when its bindings got updated", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new viewAnn.View({
                        template: '<push-cmp [prop]="ctxProp" #cmp></push-cmp>',
                        directives: [[[PushCmp]]]
                    }))
                        .createAsync(MyComp)
                        .then(function (rootTC) {
                        var cmp = rootTC.componentViewChildren[0].getLocal('cmp');
                        rootTC.componentInstance.ctxProp = "one";
                        rootTC.detectChanges();
                        test_lib_1.expect(cmp.numberOfChecks).toEqual(1);
                        rootTC.componentInstance.ctxProp = "two";
                        rootTC.detectChanges();
                        test_lib_1.expect(cmp.numberOfChecks).toEqual(2);
                        async.done();
                    });
                }));
                test_lib_1.it('should not affect updating properties on the component', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new viewAnn.View({
                        template: '<push-cmp-with-ref [prop]="ctxProp" #cmp></push-cmp-with-ref>',
                        directives: [[[PushCmpWithRef]]]
                    }))
                        .createAsync(MyComp)
                        .then(function (rootTC) {
                        var cmp = rootTC.componentViewChildren[0].getLocal('cmp');
                        rootTC.componentInstance.ctxProp = "one";
                        rootTC.detectChanges();
                        test_lib_1.expect(cmp.prop).toEqual("one");
                        rootTC.componentInstance.ctxProp = "two";
                        rootTC.detectChanges();
                        test_lib_1.expect(cmp.prop).toEqual("two");
                        async.done();
                    });
                }));
                if (dom_adapter_1.DOM.supportsDOMEvents()) {
                    test_lib_1.it('should be checked when an async pipe requests a check', test_lib_1.inject([test_lib_1.TestComponentBuilder], test_lib_1.fakeAsync(function (tcb) {
                        tcb = tcb.overrideView(MyComp, new viewAnn.View({
                            template: '<push-cmp-with-async #cmp></push-cmp-with-async>',
                            directives: [[[PushCmpWithAsyncPipe]]]
                        }));
                        var rootTC;
                        tcb.createAsync(MyComp).then(function (root) { rootTC = root; });
                        test_lib_1.tick();
                        var cmp = rootTC.componentViewChildren[0].getLocal('cmp');
                        rootTC.detectChanges();
                        test_lib_1.expect(cmp.numberOfChecks).toEqual(1);
                        rootTC.detectChanges();
                        rootTC.detectChanges();
                        test_lib_1.expect(cmp.numberOfChecks).toEqual(1);
                        cmp.resolve(2);
                        test_lib_1.tick();
                        rootTC.detectChanges();
                        test_lib_1.expect(cmp.numberOfChecks).toEqual(2);
                    })));
                }
            });
            test_lib_1.it('should create a component that injects an @Host', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: "\n            <some-directive>\n              <p>\n                <cmp-with-host #child></cmp-with-host>\n              </p>\n            </some-directive>",
                    directives: [SomeDirective, CompWithHost]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    var childComponent = rootTC.componentViewChildren[0].getLocal('child');
                    test_lib_1.expect(childComponent.myHost).toBeAnInstanceOf(SomeDirective);
                    async.done();
                });
            }));
            test_lib_1.it('should create a component that injects an @Host through viewcontainer directive', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: "\n            <some-directive>\n              <p *ng-if=\"true\">\n                <cmp-with-host #child></cmp-with-host>\n              </p>\n            </some-directive>",
                    directives: [SomeDirective, CompWithHost, ng_if_1.NgIf]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    var tc = rootTC.componentViewChildren[0].children[1];
                    var childComponent = tc.getLocal('child');
                    test_lib_1.expect(childComponent.myHost).toBeAnInstanceOf(SomeDirective);
                    async.done();
                });
            }));
            test_lib_1.it('should support events via EventEmitter', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<div emitter listener></div>',
                    directives: [DirectiveEmitingEvent, DirectiveListeningEvent]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    var tc = rootTC.componentViewChildren[0];
                    var emitter = tc.inject(DirectiveEmitingEvent);
                    var listener = tc.inject(DirectiveListeningEvent);
                    test_lib_1.expect(listener.msg).toEqual('');
                    async_1.ObservableWrapper.subscribe(emitter.event, function (_) {
                        test_lib_1.expect(listener.msg).toEqual('fired !');
                        async.done();
                    });
                    emitter.fireEvent('fired !');
                });
            }));
            test_lib_1.it('should support [()] syntax', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<div [(control)]="ctxProp" two-way></div>',
                    directives: [DirectiveWithTwoWayBinding]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    var tc = rootTC.componentViewChildren[0];
                    var dir = tc.inject(DirectiveWithTwoWayBinding);
                    rootTC.componentInstance.ctxProp = 'one';
                    rootTC.detectChanges();
                    test_lib_1.expect(dir.value).toEqual('one');
                    async_1.ObservableWrapper.subscribe(dir.control, function (_) {
                        test_lib_1.expect(rootTC.componentInstance.ctxProp).toEqual('two');
                        async.done();
                    });
                    dir.triggerChange('two');
                });
            }));
            if (dom_adapter_1.DOM.supportsDOMEvents()) {
                test_lib_1.it("should support invoking methods on the host element via hostActions", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new viewAnn.View({
                        template: '<div update-host-actions></div>',
                        directives: [DirectiveUpdatingHostActions]
                    }))
                        .createAsync(MyComp)
                        .then(function (rootTC) {
                        var tc = rootTC.componentViewChildren[0];
                        var nativeElement = tc.nativeElement;
                        var updateHost = tc.inject(DirectiveUpdatingHostActions);
                        async_1.ObservableWrapper.subscribe(updateHost.setAttr, function (_) {
                            test_lib_1.expect(dom_adapter_1.DOM.hasAttribute(nativeElement, 'update-host-actions')).toBe(true);
                            async.done();
                        });
                        updateHost.triggerSetAttr('value');
                    });
                }));
            }
            test_lib_1.it('should support render events', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<div listener></div>', directives: [DirectiveListeningDomEvent] }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    var tc = rootTC.componentViewChildren[0];
                    var listener = tc.inject(DirectiveListeningDomEvent);
                    test_lib_1.dispatchEvent(tc.nativeElement, 'domEvent');
                    test_lib_1.expect(listener.eventType).toEqual('domEvent');
                    async.done();
                });
            }));
            test_lib_1.it('should support render global events', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<div listener></div>', directives: [DirectiveListeningDomEvent] }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    var tc = rootTC.componentViewChildren[0];
                    var listener = tc.inject(DirectiveListeningDomEvent);
                    test_lib_1.dispatchEvent(dom_adapter_1.DOM.getGlobalEventTarget("window"), 'domEvent');
                    test_lib_1.expect(listener.eventType).toEqual('window_domEvent');
                    listener = tc.inject(DirectiveListeningDomEvent);
                    test_lib_1.dispatchEvent(dom_adapter_1.DOM.getGlobalEventTarget("document"), 'domEvent');
                    test_lib_1.expect(listener.eventType).toEqual('document_domEvent');
                    rootTC.destroy();
                    listener = tc.inject(DirectiveListeningDomEvent);
                    test_lib_1.dispatchEvent(dom_adapter_1.DOM.getGlobalEventTarget("body"), 'domEvent');
                    test_lib_1.expect(listener.eventType).toEqual('');
                    async.done();
                });
            }));
            test_lib_1.it('should support updating host element via hostAttributes', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<div update-host-attributes></div>',
                    directives: [DirectiveUpdatingHostAttributes]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getAttribute(rootTC.componentViewChildren[0].nativeElement, "role"))
                        .toEqual("button");
                    async.done();
                });
            }));
            test_lib_1.it('should support updating host element via hostProperties', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<div update-host-properties></div>',
                    directives: [DirectiveUpdatingHostProperties]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    var tc = rootTC.componentViewChildren[0];
                    var updateHost = tc.inject(DirectiveUpdatingHostProperties);
                    updateHost.id = "newId";
                    rootTC.detectChanges();
                    test_lib_1.expect(tc.nativeElement.id).toEqual("newId");
                    async.done();
                });
            }));
            if (dom_adapter_1.DOM.supportsDOMEvents()) {
                test_lib_1.it('should support preventing default on render events', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new viewAnn.View({
                        template: '<input type="checkbox" listenerprevent></input><input type="checkbox" listenernoprevent></input>',
                        directives: [DirectiveListeningDomEventPrevent, DirectiveListeningDomEventNoPrevent]
                    }))
                        .createAsync(MyComp)
                        .then(function (rootTC) {
                        var dispatchedEvent = dom_adapter_1.DOM.createMouseEvent('click');
                        var dispatchedEvent2 = dom_adapter_1.DOM.createMouseEvent('click');
                        dom_adapter_1.DOM.dispatchEvent(rootTC.componentViewChildren[0].nativeElement, dispatchedEvent);
                        dom_adapter_1.DOM.dispatchEvent(rootTC.componentViewChildren[1].nativeElement, dispatchedEvent2);
                        test_lib_1.expect(dom_adapter_1.DOM.isPrevented(dispatchedEvent)).toBe(true);
                        test_lib_1.expect(dom_adapter_1.DOM.isPrevented(dispatchedEvent2)).toBe(false);
                        test_lib_1.expect(dom_adapter_1.DOM.getChecked(rootTC.componentViewChildren[0].nativeElement))
                            .toBeFalsy();
                        test_lib_1.expect(dom_adapter_1.DOM.getChecked(rootTC.componentViewChildren[1].nativeElement))
                            .toBeTruthy();
                        async.done();
                    });
                }));
            }
            test_lib_1.it('should support render global events from multiple directives', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<div *ng-if="ctxBoolProp" listener listenerother></div>',
                    directives: [ng_if_1.NgIf, DirectiveListeningDomEvent, DirectiveListeningDomEventOther]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    globalCounter = 0;
                    rootTC.componentInstance.ctxBoolProp = true;
                    rootTC.detectChanges();
                    var tc = rootTC.componentViewChildren[1];
                    var listener = tc.inject(DirectiveListeningDomEvent);
                    var listenerother = tc.inject(DirectiveListeningDomEventOther);
                    test_lib_1.dispatchEvent(dom_adapter_1.DOM.getGlobalEventTarget("window"), 'domEvent');
                    test_lib_1.expect(listener.eventType).toEqual('window_domEvent');
                    test_lib_1.expect(listenerother.eventType).toEqual('other_domEvent');
                    test_lib_1.expect(globalCounter).toEqual(1);
                    rootTC.componentInstance.ctxBoolProp = false;
                    rootTC.detectChanges();
                    test_lib_1.dispatchEvent(dom_adapter_1.DOM.getGlobalEventTarget("window"), 'domEvent');
                    test_lib_1.expect(globalCounter).toEqual(1);
                    rootTC.componentInstance.ctxBoolProp = true;
                    rootTC.detectChanges();
                    test_lib_1.dispatchEvent(dom_adapter_1.DOM.getGlobalEventTarget("window"), 'domEvent');
                    test_lib_1.expect(globalCounter).toEqual(2);
                    async.done();
                });
            }));
            test_lib_1.describe('dynamic ViewContainers', function () {
                test_lib_1.it('should allow to create a ViewContainerRef at any bound location', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter, compiler_1.Compiler], function (tcb, async, compiler) {
                    tcb.overrideView(MyComp, new viewAnn.View({
                        template: '<div><dynamic-vp #dynamic></dynamic-vp></div>',
                        directives: [DynamicViewport]
                    }))
                        .createAsync(MyComp)
                        .then(function (rootTC) {
                        var tc = rootTC.componentViewChildren[0];
                        var dynamicVp = tc.inject(DynamicViewport);
                        dynamicVp.done.then(function (_) {
                            rootTC.detectChanges();
                            test_lib_1.expect(rootTC.componentViewChildren[1].nativeElement)
                                .toHaveText('dynamic greet');
                            async.done();
                        });
                    });
                }));
            });
            test_lib_1.it('should support static attributes', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<input static type="text" title>', directives: [NeedsAttribute] }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    var tc = rootTC.componentViewChildren[0];
                    var needsAttribute = tc.inject(NeedsAttribute);
                    test_lib_1.expect(needsAttribute.typeAttribute).toEqual('text');
                    test_lib_1.expect(needsAttribute.titleAttribute).toEqual('');
                    test_lib_1.expect(needsAttribute.fooAttribute).toEqual(null);
                    async.done();
                });
            }));
        });
        test_lib_1.describe("dependency injection", function () {
            test_lib_1.it("should support bindings", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: "\n            <directive-providing-injectable >\n              <directive-consuming-injectable #consuming>\n              </directive-consuming-injectable>\n            </directive-providing-injectable>\n          ",
                    directives: [DirectiveProvidingInjectable, DirectiveConsumingInjectable]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    var comp = rootTC.componentViewChildren[0].getLocal("consuming");
                    test_lib_1.expect(comp.injectable).toBeAnInstanceOf(InjectableService);
                    async.done();
                });
            }));
            test_lib_1.it("should support viewBindings", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(DirectiveProvidingInjectableInView, new viewAnn.View({
                    template: "\n              <directive-consuming-injectable #consuming>\n              </directive-consuming-injectable>\n          ",
                    directives: [DirectiveConsumingInjectable]
                }))
                    .createAsync(DirectiveProvidingInjectableInView)
                    .then(function (rootTC) {
                    var comp = rootTC.componentViewChildren[0].getLocal("consuming");
                    test_lib_1.expect(comp.injectable).toBeAnInstanceOf(InjectableService);
                    async.done();
                });
            }));
            test_lib_1.it("should support unbounded lookup", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: "\n            <directive-providing-injectable>\n              <directive-containing-directive-consuming-an-injectable #dir>\n              </directive-containing-directive-consuming-an-injectable>\n            </directive-providing-injectable>\n          ",
                    directives: [
                        DirectiveProvidingInjectable,
                        DirectiveContainingDirectiveConsumingAnInjectable
                    ]
                }))
                    .overrideView(DirectiveContainingDirectiveConsumingAnInjectable, new viewAnn.View({
                    template: "\n            <directive-consuming-injectable-unbounded></directive-consuming-injectable-unbounded>\n          ",
                    directives: [DirectiveConsumingInjectableUnbounded]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    var comp = rootTC.componentViewChildren[0].getLocal("dir");
                    test_lib_1.expect(comp.directive.injectable).toBeAnInstanceOf(InjectableService);
                    async.done();
                });
            }));
            test_lib_1.it("should support the event-bus scenario", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: "\n            <grand-parent-providing-event-bus>\n              <parent-providing-event-bus>\n                <child-consuming-event-bus>\n                </child-consuming-event-bus>\n              </parent-providing-event-bus>\n            </grand-parent-providing-event-bus>\n          ",
                    directives: [
                        GrandParentProvidingEventBus,
                        ParentProvidingEventBus,
                        ChildConsumingEventBus
                    ]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    var gpComp = rootTC.componentViewChildren[0];
                    var parentComp = gpComp.children[0];
                    var childComp = parentComp.children[0];
                    var grandParent = gpComp.inject(GrandParentProvidingEventBus);
                    var parent = parentComp.inject(ParentProvidingEventBus);
                    var child = childComp.inject(ChildConsumingEventBus);
                    test_lib_1.expect(grandParent.bus.name).toEqual("grandparent");
                    test_lib_1.expect(parent.bus.name).toEqual("parent");
                    test_lib_1.expect(parent.grandParentBus).toBe(grandParent.bus);
                    test_lib_1.expect(child.bus).toBe(parent.bus);
                    async.done();
                });
            }));
            test_lib_1.it("should instantiate bindings lazily", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: "\n              <component-providing-logging-injectable #providing>\n                <directive-consuming-injectable *ng-if=\"ctxBoolProp\">\n                </directive-consuming-injectable>\n              </component-providing-logging-injectable>\n          ",
                    directives: [DirectiveConsumingInjectable, ComponentProvidingLoggingInjectable, ng_if_1.NgIf]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    var providing = rootTC.componentViewChildren[0].getLocal("providing");
                    test_lib_1.expect(providing.created).toBe(false);
                    rootTC.componentInstance.ctxBoolProp = true;
                    rootTC.detectChanges();
                    test_lib_1.expect(providing.created).toBe(true);
                    async.done();
                });
            }));
        });
        test_lib_1.describe("corner cases", function () {
            test_lib_1.it('should remove script tags from templates', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: "\n            <script>alert(\"Ooops\");</script>\n            <div>before<script>alert(\"Ooops\");</script><span>inside</span>after</div>"
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.nativeElement, 'script').length).toEqual(0);
                    async.done();
                });
            }));
        });
        test_lib_1.describe("error handling", function () {
            test_lib_1.it('should report a meaningful error when a directive is missing annotation', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb = tcb.overrideView(MyComp, new viewAnn.View({ directives: [SomeDirectiveMissingAnnotation] }));
                async_1.PromiseWrapper.catchError(tcb.createAsync(MyComp), function (e) {
                    test_lib_1.expect(e.message).toEqual("No Directive annotation found on " + lang_1.stringify(SomeDirectiveMissingAnnotation));
                    async.done();
                    return null;
                });
            }));
            test_lib_1.it('should report a meaningful error when a component is missing view annotation', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                async_1.PromiseWrapper.catchError(tcb.createAsync(ComponentWithoutView), function (e) {
                    test_lib_1.expect(e.message).toEqual("No View annotation found on component " + lang_1.stringify(ComponentWithoutView));
                    async.done();
                    return null;
                });
            }));
            test_lib_1.it('should report a meaningful error when a directive is null', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb = tcb.overrideView(MyComp, new viewAnn.View({ directives: [[null]] }));
                async_1.PromiseWrapper.catchError(tcb.createAsync(MyComp), function (e) {
                    test_lib_1.expect(e.message).toEqual("Unexpected directive value 'null' on the View of component '" + lang_1.stringify(MyComp) + "'");
                    async.done();
                    return null;
                });
            }));
            test_lib_1.it('should provide an error context when an error happens in DI', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb = tcb.overrideView(MyComp, new viewAnn.View({
                    directives: [DirectiveThrowingAnError],
                    template: "<directive-throwing-error></<directive-throwing-error>"
                }));
                async_1.PromiseWrapper.catchError(tcb.createAsync(MyComp), function (e) {
                    var c = e.context;
                    test_lib_1.expect(dom_adapter_1.DOM.nodeName(c.element).toUpperCase()).toEqual("DIRECTIVE-THROWING-ERROR");
                    test_lib_1.expect(dom_adapter_1.DOM.nodeName(c.componentElement).toUpperCase()).toEqual("DIV");
                    test_lib_1.expect(c.injector).toBeAnInstanceOf(di_1.Injector);
                    async.done();
                    return null;
                });
            }));
            test_lib_1.it('should provide an error context when an error happens in change detection', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb = tcb.overrideView(MyComp, new viewAnn.View({ template: "<input [value]=\"one.two.three\" #local>" }));
                tcb.createAsync(MyComp).then(function (rootTC) {
                    try {
                        rootTC.detectChanges();
                        throw "Should throw";
                    }
                    catch (e) {
                        var c = e.context;
                        test_lib_1.expect(dom_adapter_1.DOM.nodeName(c.element).toUpperCase()).toEqual("INPUT");
                        test_lib_1.expect(dom_adapter_1.DOM.nodeName(c.componentElement).toUpperCase()).toEqual("DIV");
                        test_lib_1.expect(c.injector).toBeAnInstanceOf(di_1.Injector);
                        test_lib_1.expect(c.expression).toContain("one.two.three");
                        test_lib_1.expect(c.context).toBe(rootTC.componentInstance);
                        test_lib_1.expect(c.locals["local"]).toBeDefined();
                    }
                    async.done();
                });
            }));
            test_lib_1.it('should provide an error context when an error happens in change detection (text node)', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb = tcb.overrideView(MyComp, new viewAnn.View({ template: "{{one.two.three}}" }));
                tcb.createAsync(MyComp).then(function (rootTC) {
                    try {
                        rootTC.detectChanges();
                        throw "Should throw";
                    }
                    catch (e) {
                        var c = e.context;
                        test_lib_1.expect(c.element).toBeNull();
                        test_lib_1.expect(c.injector).toBeNull();
                    }
                    async.done();
                });
            }));
            if (dom_adapter_1.DOM.supportsDOMEvents()) {
                test_lib_1.it('should provide an error context when an error happens in an event handler', test_lib_1.inject([test_lib_1.TestComponentBuilder], test_lib_1.fakeAsync(function (tcb) {
                    tcb = tcb.overrideView(MyComp, new viewAnn.View({
                        template: "<span emitter listener (event)=\"throwError()\" #local></span>",
                        directives: [DirectiveEmitingEvent, DirectiveListeningEvent]
                    }));
                    var rootTC;
                    tcb.createAsync(MyComp).then(function (root) { rootTC = root; });
                    test_lib_1.tick();
                    var tc = rootTC.componentViewChildren[0];
                    tc.inject(DirectiveEmitingEvent).fireEvent("boom");
                    try {
                        test_lib_1.tick();
                        throw "Should throw";
                    }
                    catch (e) {
                        test_lib_1.clearPendingTimers();
                        var c = e.context;
                        test_lib_1.expect(dom_adapter_1.DOM.nodeName(c.element).toUpperCase()).toEqual("SPAN");
                        test_lib_1.expect(dom_adapter_1.DOM.nodeName(c.componentElement).toUpperCase()).toEqual("DIV");
                        test_lib_1.expect(c.injector).toBeAnInstanceOf(di_1.Injector);
                        test_lib_1.expect(c.context).toBe(rootTC.componentInstance);
                        test_lib_1.expect(c.locals["local"]).toBeDefined();
                    }
                })));
            }
            if (!test_lib_1.IS_DARTIUM) {
                test_lib_1.it('should report a meaningful error when a directive is undefined', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    var undefinedValue;
                    tcb = tcb.overrideView(MyComp, new viewAnn.View({ directives: [undefinedValue] }));
                    async_1.PromiseWrapper.catchError(tcb.createAsync(MyComp), function (e) {
                        test_lib_1.expect(e.message).toEqual("Unexpected directive value 'undefined' on the View of component '" + lang_1.stringify(MyComp) + "'");
                        async.done();
                        return null;
                    });
                }));
            }
            test_lib_1.it('should specify a location of an error that happened during change detection (text)', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '{{a.b}}' }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    test_lib_1.expect(function () { return rootTC.detectChanges(); })
                        .toThrowError(test_lib_1.containsRegexp("{{a.b}} in " + lang_1.stringify(MyComp)));
                    async.done();
                });
            }));
            test_lib_1.it('should specify a location of an error that happened during change detection (element property)', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({ template: '<div [title]="a.b"></div>' }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    test_lib_1.expect(function () { return rootTC.detectChanges(); })
                        .toThrowError(test_lib_1.containsRegexp("a.b in " + lang_1.stringify(MyComp)));
                    async.done();
                });
            }));
            test_lib_1.it('should specify a location of an error that happened during change detection (directive property)', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<child-cmp [title]="a.b"></child-cmp>',
                    directives: [ChildComp]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    test_lib_1.expect(function () { return rootTC.detectChanges(); })
                        .toThrowError(test_lib_1.containsRegexp("a.b in " + lang_1.stringify(MyComp)));
                    async.done();
                });
            }));
        });
        test_lib_1.it('should support imperative views', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MyComp, new viewAnn.View({
                template: '<simple-imp-cmp></simple-imp-cmp>',
                directives: [SimpleImperativeViewComponent]
            }))
                .createAsync(MyComp)
                .then(function (rootTC) {
                test_lib_1.expect(rootTC.nativeElement).toHaveText('hello imp view');
                async.done();
            });
        }));
        test_lib_1.it('should support moving embedded views around', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter, ANCHOR_ELEMENT], function (tcb, async, anchorElement) {
            tcb.overrideView(MyComp, new viewAnn.View({
                template: '<div><div *some-impvp="ctxBoolProp">hello</div></div>',
                directives: [SomeImperativeViewport]
            }))
                .createAsync(MyComp)
                .then(function (rootTC) {
                rootTC.detectChanges();
                test_lib_1.expect(anchorElement).toHaveText('');
                rootTC.componentInstance.ctxBoolProp = true;
                rootTC.detectChanges();
                test_lib_1.expect(anchorElement).toHaveText('hello');
                rootTC.componentInstance.ctxBoolProp = false;
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.nativeElement).toHaveText('');
                async.done();
            });
        }));
        test_lib_1.describe('Property bindings', function () {
            if (!test_lib_1.IS_DARTIUM) {
                test_lib_1.it('should throw on bindings to unknown properties', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb =
                        tcb.overrideView(MyComp, new viewAnn.View({ template: '<div unknown="{{ctxProp}}"></div>' }));
                    async_1.PromiseWrapper.catchError(tcb.createAsync(MyComp), function (e) {
                        test_lib_1.expect(e.message).toEqual("Can't bind to 'unknown' since it isn't a known property of the '<div>' element and there are no matching directives with a corresponding property");
                        async.done();
                        return null;
                    });
                }));
                test_lib_1.it('should not throw for property binding to a non-existing property when there is a matching directive property', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new viewAnn.View({ template: '<div my-dir [elprop]="ctxProp"></div>', directives: [MyDir] }))
                        .createAsync(MyComp)
                        .then(function (val) { async.done(); });
                }));
            }
            test_lib_1.it('should not be created when there is a directive with the same property', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<span [title]="ctxProp"></span>',
                    directives: [DirectiveWithTitle]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.componentInstance.ctxProp = "TITLE";
                    rootTC.detectChanges();
                    var el = dom_adapter_1.DOM.querySelector(rootTC.nativeElement, "span");
                    test_lib_1.expect(lang_1.isBlank(el.title) || el.title == '').toBeTruthy();
                    async.done();
                });
            }));
            test_lib_1.it('should work when a directive uses hostProperty to update the DOM element', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new viewAnn.View({
                    template: '<span [title]="ctxProp"></span>',
                    directives: [DirectiveWithTitleAndHostProperty]
                }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    rootTC.componentInstance.ctxProp = "TITLE";
                    rootTC.detectChanges();
                    var el = dom_adapter_1.DOM.querySelector(rootTC.nativeElement, "span");
                    test_lib_1.expect(el.title).toEqual("TITLE");
                    async.done();
                });
            }));
        });
        test_lib_1.describe('different proto view storages', function () {
            function runWithMode(mode) {
                return test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new viewAnn.View({ template: "<!--" + mode + "--><div>{{ctxProp}}</div>" }))
                        .createAsync(MyComp)
                        .then(function (rootTC) {
                        rootTC.componentInstance.ctxProp = 'Hello World!';
                        rootTC.detectChanges();
                        test_lib_1.expect(rootTC.nativeElement).toHaveText('Hello World!');
                        async.done();
                    });
                });
            }
            test_lib_1.it('should work with storing DOM nodes', runWithMode('cache'));
            test_lib_1.it('should work with serializing the DOM nodes', runWithMode('nocache'));
        });
        // Disabled until a solution is found, refs:
        // - https://github.com/angular/angular/issues/776
        // - https://github.com/angular/angular/commit/81f3f32
        test_lib_1.xdescribe('Missing directive checks', function () {
            function expectCompileError(tcb, inlineTpl, errMessage, done) {
                tcb = tcb.overrideView(MyComp, new viewAnn.View({ template: inlineTpl }));
                async_1.PromiseWrapper.then(tcb.createAsync(MyComp), function (value) {
                    throw new lang_1.BaseException("Test failure: should not have come here as an exception was expected");
                }, function (err) {
                    test_lib_1.expect(err.message).toEqual(errMessage);
                    done();
                });
            }
            if (lang_1.assertionsEnabled()) {
                test_lib_1.it('should raise an error if no directive is registered for a template with template bindings', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    expectCompileError(tcb, '<div><div template="if: foo"></div></div>', 'Missing directive to handle \'if\' in <div template="if: foo">', function () { return async.done(); });
                }));
                test_lib_1.it('should raise an error for missing template directive (1)', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    expectCompileError(tcb, '<div><template foo></template></div>', 'Missing directive to handle: <template foo>', function () { return async.done(); });
                }));
                test_lib_1.it('should raise an error for missing template directive (2)', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    expectCompileError(tcb, '<div><template *ng-if="condition"></template></div>', 'Missing directive to handle: <template *ng-if="condition">', function () { return async.done(); });
                }));
                test_lib_1.it('should raise an error for missing template directive (3)', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                    expectCompileError(tcb, '<div *ng-if="condition"></div>', 'Missing directive to handle \'if\' in MyComp: <div *ng-if="condition">', function () { return async.done(); });
                }));
            }
        });
    });
}
exports.main = main;
var MyService = (function () {
    function MyService() {
        this.greeting = 'hello';
    }
    MyService = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyService);
    return MyService;
})();
var SimpleImperativeViewComponent = (function () {
    function SimpleImperativeViewComponent(self, renderer) {
        var hostElement = renderer.getNativeElementSync(self);
        dom_adapter_1.DOM.appendChild(hostElement, test_lib_1.el('hello imp view'));
    }
    SimpleImperativeViewComponent = __decorate([
        annotations_1.Component({ selector: 'simple-imp-cmp' }),
        annotations_1.View({ template: '' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [element_ref_1.ElementRef, dom_renderer_1.DomRenderer])
    ], SimpleImperativeViewComponent);
    return SimpleImperativeViewComponent;
})();
var DynamicViewport = (function () {
    function DynamicViewport(vc, compiler) {
        var myService = new MyService();
        myService.greeting = 'dynamic greet';
        var bindings = di_1.Injector.resolve([di_1.bind(MyService).toValue(myService)]);
        this.done = compiler.compileInHost(ChildCompUsingService)
            .then(function (hostPv) { vc.createHostView(hostPv, 0, bindings); });
    }
    DynamicViewport = __decorate([
        annotations_1.Directive({ selector: 'dynamic-vp' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [view_container_ref_1.ViewContainerRef, compiler_1.Compiler])
    ], DynamicViewport);
    return DynamicViewport;
})();
var MyDir = (function () {
    function MyDir() {
        this.dirProp = '';
    }
    MyDir = __decorate([
        annotations_1.Directive({ selector: '[my-dir]', properties: ['dirProp: elprop'], exportAs: 'mydir' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyDir);
    return MyDir;
})();
var DirectiveWithTitle = (function () {
    function DirectiveWithTitle() {
    }
    DirectiveWithTitle = __decorate([
        annotations_1.Directive({ selector: '[title]', properties: ['title'] }), 
        __metadata('design:paramtypes', [])
    ], DirectiveWithTitle);
    return DirectiveWithTitle;
})();
var DirectiveWithTitleAndHostProperty = (function () {
    function DirectiveWithTitleAndHostProperty() {
    }
    DirectiveWithTitleAndHostProperty = __decorate([
        annotations_1.Directive({ selector: '[title]', properties: ['title'], host: { '[title]': 'title' } }), 
        __metadata('design:paramtypes', [])
    ], DirectiveWithTitleAndHostProperty);
    return DirectiveWithTitleAndHostProperty;
})();
var PushCmp = (function () {
    function PushCmp() {
        this.numberOfChecks = 0;
    }
    Object.defineProperty(PushCmp.prototype, "field", {
        get: function () {
            this.numberOfChecks++;
            return "fixed";
        },
        enumerable: true,
        configurable: true
    });
    PushCmp = __decorate([
        annotations_1.Component({ selector: 'push-cmp', properties: ['prop'], changeDetection: change_detection_1.ON_PUSH }),
        annotations_1.View({ template: '{{field}}' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PushCmp);
    return PushCmp;
})();
var PushCmpWithRef = (function () {
    function PushCmpWithRef(ref) {
        this.numberOfChecks = 0;
        this.ref = ref;
    }
    Object.defineProperty(PushCmpWithRef.prototype, "field", {
        get: function () {
            this.numberOfChecks++;
            return "fixed";
        },
        enumerable: true,
        configurable: true
    });
    PushCmpWithRef.prototype.propagate = function () { this.ref.requestCheck(); };
    PushCmpWithRef = __decorate([
        annotations_1.Component({ selector: 'push-cmp-with-ref', properties: ['prop'], changeDetection: change_detection_1.ON_PUSH }),
        annotations_1.View({ template: '{{field}}' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [change_detection_1.ChangeDetectorRef])
    ], PushCmpWithRef);
    return PushCmpWithRef;
})();
var PushCmpWithAsyncPipe = (function () {
    function PushCmpWithAsyncPipe() {
        this.numberOfChecks = 0;
        this.completer = async_1.PromiseWrapper.completer();
        this.promise = this.completer.promise;
    }
    Object.defineProperty(PushCmpWithAsyncPipe.prototype, "field", {
        get: function () {
            this.numberOfChecks++;
            return this.promise;
        },
        enumerable: true,
        configurable: true
    });
    PushCmpWithAsyncPipe.prototype.resolve = function (value) { this.completer.resolve(value); };
    PushCmpWithAsyncPipe = __decorate([
        annotations_1.Component({ selector: 'push-cmp-with-async', changeDetection: change_detection_1.ON_PUSH }),
        annotations_1.View({ template: '{{field | async}}' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PushCmpWithAsyncPipe);
    return PushCmpWithAsyncPipe;
})();
var PipesWithDouble = (function (_super) {
    __extends(PipesWithDouble, _super);
    function PipesWithDouble(injector) {
        _super.call(this, { "double": DoublePipe }, injector);
    }
    PipesWithDouble = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [di_1.Injector])
    ], PipesWithDouble);
    return PipesWithDouble;
})(change_detection_1.Pipes);
var MyCompWithPipes = (function () {
    function MyCompWithPipes() {
        this.ctxProp = "initial value";
    }
    MyCompWithPipes = __decorate([
        annotations_1.Component({
            selector: 'my-comp-with-pipes',
            viewBindings: [new di_1.Binding(change_detection_1.Pipes, { toClass: PipesWithDouble })]
        }),
        annotations_1.View({ directives: [] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyCompWithPipes);
    return MyCompWithPipes;
})();
var MyComp = (function () {
    function MyComp() {
        this.ctxProp = 'initial value';
        this.ctxNumProp = 0;
        this.ctxBoolProp = false;
    }
    MyComp.prototype.throwError = function () { throw 'boom'; };
    MyComp = __decorate([
        annotations_1.Component({ selector: 'my-comp' }),
        annotations_1.View({ directives: [] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
var ChildComp = (function () {
    function ChildComp(service) {
        this.ctxProp = service.greeting;
        this.dirProp = null;
    }
    ChildComp = __decorate([
        annotations_1.Component({ selector: 'child-cmp', properties: ['dirProp'], viewBindings: [MyService] }),
        annotations_1.View({ directives: [MyDir], template: '{{ctxProp}}' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [MyService])
    ], ChildComp);
    return ChildComp;
})();
var ChildCompNoTemplate = (function () {
    function ChildCompNoTemplate() {
        this.ctxProp = 'hello';
    }
    ChildCompNoTemplate = __decorate([
        annotations_1.Component({ selector: 'child-cmp-no-template' }),
        annotations_1.View({ directives: [], template: '' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ChildCompNoTemplate);
    return ChildCompNoTemplate;
})();
var ChildCompUsingService = (function () {
    function ChildCompUsingService(service) {
        this.ctxProp = service.greeting;
    }
    ChildCompUsingService = __decorate([
        annotations_1.Component({ selector: 'child-cmp-svc' }),
        annotations_1.View({ template: '{{ctxProp}}' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [MyService])
    ], ChildCompUsingService);
    return ChildCompUsingService;
})();
var SomeDirective = (function () {
    function SomeDirective() {
    }
    SomeDirective = __decorate([
        annotations_1.Directive({ selector: 'some-directive' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SomeDirective);
    return SomeDirective;
})();
var SomeDirectiveMissingAnnotation = (function () {
    function SomeDirectiveMissingAnnotation() {
    }
    return SomeDirectiveMissingAnnotation;
})();
var CompWithHost = (function () {
    function CompWithHost(someComp) {
        this.myHost = someComp;
    }
    CompWithHost = __decorate([
        annotations_1.Component({ selector: 'cmp-with-host' }),
        annotations_1.View({ template: '<p>Component with an injected host</p>', directives: [SomeDirective] }),
        di_1.Injectable(),
        __param(0, di_1.Host()), 
        __metadata('design:paramtypes', [SomeDirective])
    ], CompWithHost);
    return CompWithHost;
})();
var ChildComp2 = (function () {
    function ChildComp2(service) {
        this.ctxProp = service.greeting;
        this.dirProp = null;
    }
    ChildComp2 = __decorate([
        annotations_1.Component({ selector: '[child-cmp2]', viewBindings: [MyService] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [MyService])
    ], ChildComp2);
    return ChildComp2;
})();
var SomeViewport = (function () {
    function SomeViewport(container, templateRef) {
        container.createEmbeddedView(templateRef).setLocal('some-tmpl', 'hello');
        container.createEmbeddedView(templateRef).setLocal('some-tmpl', 'again');
    }
    SomeViewport = __decorate([
        annotations_1.Directive({ selector: '[some-viewport]' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [view_container_ref_1.ViewContainerRef, template_ref_1.TemplateRef])
    ], SomeViewport);
    return SomeViewport;
})();
var DoublePipe = (function () {
    function DoublePipe() {
    }
    DoublePipe.prototype.onDestroy = function () { };
    DoublePipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return "" + value + value;
    };
    DoublePipe = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DoublePipe);
    return DoublePipe;
})();
var DirectiveEmitingEvent = (function () {
    function DirectiveEmitingEvent() {
        this.msg = '';
        this.event = new async_1.EventEmitter();
    }
    DirectiveEmitingEvent.prototype.fireEvent = function (msg) { async_1.ObservableWrapper.callNext(this.event, msg); };
    DirectiveEmitingEvent = __decorate([
        annotations_1.Directive({ selector: '[emitter]', events: ['event'] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveEmitingEvent);
    return DirectiveEmitingEvent;
})();
var DirectiveUpdatingHostAttributes = (function () {
    function DirectiveUpdatingHostAttributes() {
    }
    DirectiveUpdatingHostAttributes = __decorate([
        annotations_1.Directive({ selector: '[update-host-attributes]', host: { 'role': 'button' } }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveUpdatingHostAttributes);
    return DirectiveUpdatingHostAttributes;
})();
var DirectiveUpdatingHostProperties = (function () {
    function DirectiveUpdatingHostProperties() {
        this.id = "one";
    }
    DirectiveUpdatingHostProperties = __decorate([
        annotations_1.Directive({ selector: '[update-host-properties]', host: { '[id]': 'id' } }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveUpdatingHostProperties);
    return DirectiveUpdatingHostProperties;
})();
var DirectiveUpdatingHostActions = (function () {
    function DirectiveUpdatingHostActions() {
        this.setAttr = new async_1.EventEmitter();
    }
    DirectiveUpdatingHostActions.prototype.triggerSetAttr = function (attrValue) { async_1.ObservableWrapper.callNext(this.setAttr, ["key", attrValue]); };
    DirectiveUpdatingHostActions = __decorate([
        annotations_1.Directive({ selector: '[update-host-actions]', host: { '@setAttr': 'setAttribute' } }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveUpdatingHostActions);
    return DirectiveUpdatingHostActions;
})();
var DirectiveListeningEvent = (function () {
    function DirectiveListeningEvent() {
        this.msg = '';
    }
    DirectiveListeningEvent.prototype.onEvent = function (msg) { this.msg = msg; };
    DirectiveListeningEvent = __decorate([
        annotations_1.Directive({ selector: '[listener]', host: { '(event)': 'onEvent($event)' } }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveListeningEvent);
    return DirectiveListeningEvent;
})();
var DirectiveListeningDomEvent = (function () {
    function DirectiveListeningDomEvent() {
        this.eventType = '';
    }
    DirectiveListeningDomEvent.prototype.onEvent = function (eventType) { this.eventType = eventType; };
    DirectiveListeningDomEvent.prototype.onWindowEvent = function (eventType) { this.eventType = "window_" + eventType; };
    DirectiveListeningDomEvent.prototype.onDocumentEvent = function (eventType) { this.eventType = "document_" + eventType; };
    DirectiveListeningDomEvent.prototype.onBodyEvent = function (eventType) { this.eventType = "body_" + eventType; };
    DirectiveListeningDomEvent = __decorate([
        annotations_1.Directive({
            selector: '[listener]',
            host: {
                '(domEvent)': 'onEvent($event.type)',
                '(window:domEvent)': 'onWindowEvent($event.type)',
                '(document:domEvent)': 'onDocumentEvent($event.type)',
                '(body:domEvent)': 'onBodyEvent($event.type)'
            }
        }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveListeningDomEvent);
    return DirectiveListeningDomEvent;
})();
var globalCounter = 0;
var DirectiveListeningDomEventOther = (function () {
    function DirectiveListeningDomEventOther() {
        this.eventType = '';
    }
    DirectiveListeningDomEventOther.prototype.onEvent = function (eventType) {
        globalCounter++;
        this.eventType = "other_" + eventType;
    };
    DirectiveListeningDomEventOther = __decorate([
        annotations_1.Directive({ selector: '[listenerother]', host: { '(window:domEvent)': 'onEvent($event.type)' } }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveListeningDomEventOther);
    return DirectiveListeningDomEventOther;
})();
var DirectiveListeningDomEventPrevent = (function () {
    function DirectiveListeningDomEventPrevent() {
    }
    DirectiveListeningDomEventPrevent.prototype.onEvent = function (event) { return false; };
    DirectiveListeningDomEventPrevent = __decorate([
        annotations_1.Directive({ selector: '[listenerprevent]', host: { '(click)': 'onEvent($event)' } }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveListeningDomEventPrevent);
    return DirectiveListeningDomEventPrevent;
})();
var DirectiveListeningDomEventNoPrevent = (function () {
    function DirectiveListeningDomEventNoPrevent() {
    }
    DirectiveListeningDomEventNoPrevent.prototype.onEvent = function (event) { return true; };
    DirectiveListeningDomEventNoPrevent = __decorate([
        annotations_1.Directive({ selector: '[listenernoprevent]', host: { '(click)': 'onEvent($event)' } }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveListeningDomEventNoPrevent);
    return DirectiveListeningDomEventNoPrevent;
})();
var IdDir = (function () {
    function IdDir() {
    }
    IdDir = __decorate([
        annotations_1.Directive({ selector: '[id]', properties: ['id'] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], IdDir);
    return IdDir;
})();
var NeedsAttribute = (function () {
    function NeedsAttribute(typeAttribute, titleAttribute, fooAttribute) {
        this.typeAttribute = typeAttribute;
        this.titleAttribute = titleAttribute;
        this.fooAttribute = fooAttribute;
    }
    NeedsAttribute = __decorate([
        annotations_1.Directive({ selector: '[static]' }),
        di_1.Injectable(),
        __param(0, annotations_1.Attribute('type')),
        __param(1, annotations_1.Attribute('title')),
        __param(2, annotations_1.Attribute('foo')), 
        __metadata('design:paramtypes', [String, String, String])
    ], NeedsAttribute);
    return NeedsAttribute;
})();
var PublicApi = (function () {
    function PublicApi() {
    }
    PublicApi = __decorate([
        annotations_1.Directive({ selector: '[public-api]' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PublicApi);
    return PublicApi;
})();
var PrivateImpl = (function (_super) {
    __extends(PrivateImpl, _super);
    function PrivateImpl() {
        _super.apply(this, arguments);
    }
    PrivateImpl = __decorate([
        annotations_1.Directive({ selector: '[private-impl]' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PrivateImpl);
    return PrivateImpl;
})(PublicApi);
var NeedsPublicApi = (function () {
    function NeedsPublicApi(api) {
        test_lib_1.expect(api instanceof PrivateImpl).toBe(true);
    }
    NeedsPublicApi = __decorate([
        annotations_1.Directive({ selector: '[needs-public-api]' }),
        di_1.Injectable(),
        __param(0, di_1.Host()), 
        __metadata('design:paramtypes', [PublicApi])
    ], NeedsPublicApi);
    return NeedsPublicApi;
})();
var ToolbarPart = (function () {
    function ToolbarPart(templateRef) {
        this.templateRef = templateRef;
    }
    ToolbarPart = __decorate([
        annotations_1.Directive({ selector: '[toolbarpart]' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [template_ref_1.TemplateRef])
    ], ToolbarPart);
    return ToolbarPart;
})();
var ToolbarViewContainer = (function () {
    function ToolbarViewContainer(vc) {
        this.vc = vc;
    }
    Object.defineProperty(ToolbarViewContainer.prototype, "toolbarVc", {
        set: function (part) {
            var view = this.vc.createEmbeddedView(part.templateRef, 0);
            view.setLocal('toolbarProp', 'From toolbar');
        },
        enumerable: true,
        configurable: true
    });
    ToolbarViewContainer = __decorate([
        annotations_1.Directive({ selector: '[toolbar-vc]', properties: ['toolbarVc'] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [view_container_ref_1.ViewContainerRef])
    ], ToolbarViewContainer);
    return ToolbarViewContainer;
})();
var ToolbarComponent = (function () {
    function ToolbarComponent(query) {
        this.ctxProp = 'hello world';
        this.query = query;
    }
    ToolbarComponent = __decorate([
        annotations_1.Component({ selector: 'toolbar' }),
        annotations_1.View({
            template: 'TOOLBAR(<div *ng-for="var part of query" [toolbar-vc]="part"></div>)',
            directives: [ToolbarViewContainer, ng_for_1.NgFor]
        }),
        di_1.Injectable(),
        __param(0, annotations_1.Query(ToolbarPart)), 
        __metadata('design:paramtypes', [query_list_1.QueryList])
    ], ToolbarComponent);
    return ToolbarComponent;
})();
var DirectiveWithTwoWayBinding = (function () {
    function DirectiveWithTwoWayBinding() {
        this.control = new async_1.EventEmitter();
    }
    DirectiveWithTwoWayBinding.prototype.triggerChange = function (value) { async_1.ObservableWrapper.callNext(this.control, value); };
    DirectiveWithTwoWayBinding = __decorate([
        annotations_1.Directive({ selector: '[two-way]', properties: ['value: control'], events: ['control'] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveWithTwoWayBinding);
    return DirectiveWithTwoWayBinding;
})();
var InjectableService = (function () {
    function InjectableService() {
    }
    InjectableService = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], InjectableService);
    return InjectableService;
})();
function createInjectableWithLogging(inj) {
    inj.get(ComponentProvidingLoggingInjectable).created = true;
    return new InjectableService();
}
var ComponentProvidingLoggingInjectable = (function () {
    function ComponentProvidingLoggingInjectable() {
        this.created = false;
    }
    ComponentProvidingLoggingInjectable = __decorate([
        annotations_1.Component({
            selector: 'component-providing-logging-injectable',
            bindings: [new di_1.Binding(InjectableService, { toFactory: createInjectableWithLogging, deps: [di_1.Injector] })]
        }),
        annotations_1.View({ template: '' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ComponentProvidingLoggingInjectable);
    return ComponentProvidingLoggingInjectable;
})();
var DirectiveProvidingInjectable = (function () {
    function DirectiveProvidingInjectable() {
    }
    DirectiveProvidingInjectable = __decorate([
        annotations_1.Directive({ selector: 'directive-providing-injectable', bindings: [[InjectableService]] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveProvidingInjectable);
    return DirectiveProvidingInjectable;
})();
var DirectiveProvidingInjectableInView = (function () {
    function DirectiveProvidingInjectableInView() {
    }
    DirectiveProvidingInjectableInView = __decorate([
        annotations_1.Component({ selector: 'directive-providing-injectable', viewBindings: [[InjectableService]] }),
        annotations_1.View({ template: '' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveProvidingInjectableInView);
    return DirectiveProvidingInjectableInView;
})();
var DirectiveProvidingInjectableInHostAndView = (function () {
    function DirectiveProvidingInjectableInHostAndView() {
    }
    DirectiveProvidingInjectableInHostAndView = __decorate([
        annotations_1.Component({
            selector: 'directive-providing-injectable',
            bindings: [new di_1.Binding(InjectableService, { toValue: 'host' })],
            viewBindings: [new di_1.Binding(InjectableService, { toValue: 'view' })]
        }),
        annotations_1.View({ template: '' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveProvidingInjectableInHostAndView);
    return DirectiveProvidingInjectableInHostAndView;
})();
var DirectiveConsumingInjectable = (function () {
    function DirectiveConsumingInjectable(injectable) {
        this.injectable = injectable;
    }
    DirectiveConsumingInjectable = __decorate([
        annotations_1.Component({ selector: 'directive-consuming-injectable' }),
        annotations_1.View({ template: '' }),
        di_1.Injectable(),
        __param(0, di_1.Host()),
        __param(0, di_1.Inject(InjectableService)), 
        __metadata('design:paramtypes', [Object])
    ], DirectiveConsumingInjectable);
    return DirectiveConsumingInjectable;
})();
var DirectiveContainingDirectiveConsumingAnInjectable = (function () {
    function DirectiveContainingDirectiveConsumingAnInjectable() {
    }
    DirectiveContainingDirectiveConsumingAnInjectable = __decorate([
        annotations_1.Component({ selector: 'directive-containing-directive-consuming-an-injectable' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveContainingDirectiveConsumingAnInjectable);
    return DirectiveContainingDirectiveConsumingAnInjectable;
})();
var DirectiveConsumingInjectableUnbounded = (function () {
    function DirectiveConsumingInjectableUnbounded(injectable, parent) {
        this.injectable = injectable;
        parent.directive = this;
    }
    DirectiveConsumingInjectableUnbounded = __decorate([
        annotations_1.Component({ selector: 'directive-consuming-injectable-unbounded' }),
        annotations_1.View({ template: '' }),
        di_1.Injectable(),
        __param(1, di_1.SkipSelf()), 
        __metadata('design:paramtypes', [InjectableService, DirectiveContainingDirectiveConsumingAnInjectable])
    ], DirectiveConsumingInjectableUnbounded);
    return DirectiveConsumingInjectableUnbounded;
})();
var EventBus = (function () {
    function EventBus(parentEventBus, name) {
        this.parentEventBus = parentEventBus;
        this.name = name;
    }
    EventBus = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [EventBus, String])
    ], EventBus);
    return EventBus;
})();
var GrandParentProvidingEventBus = (function () {
    function GrandParentProvidingEventBus(bus) {
        this.bus = bus;
    }
    GrandParentProvidingEventBus = __decorate([
        annotations_1.Directive({
            selector: 'grand-parent-providing-event-bus',
            bindings: [new di_1.Binding(EventBus, { toValue: new EventBus(null, "grandparent") })]
        }), 
        __metadata('design:paramtypes', [EventBus])
    ], GrandParentProvidingEventBus);
    return GrandParentProvidingEventBus;
})();
function createParentBus(peb) {
    return new EventBus(peb, "parent");
}
var ParentProvidingEventBus = (function () {
    function ParentProvidingEventBus(bus, grandParentBus) {
        this.bus = bus;
        this.grandParentBus = grandParentBus;
    }
    ParentProvidingEventBus = __decorate([
        annotations_1.Component({
            selector: 'parent-providing-event-bus',
            bindings: [
                new di_1.Binding(EventBus, { toFactory: createParentBus, deps: [[EventBus, new di_1.SkipSelfMetadata()]] })
            ]
        }),
        annotations_1.View({
            directives: [di_1.forwardRef(function () { return ChildConsumingEventBus; })],
            template: "\n    <child-consuming-event-bus></child-consuming-event-bus>\n  "
        }),
        __param(1, di_1.SkipSelf()), 
        __metadata('design:paramtypes', [EventBus, EventBus])
    ], ParentProvidingEventBus);
    return ParentProvidingEventBus;
})();
var ChildConsumingEventBus = (function () {
    function ChildConsumingEventBus(bus) {
        this.bus = bus;
    }
    ChildConsumingEventBus = __decorate([
        annotations_1.Directive({ selector: 'child-consuming-event-bus' }),
        __param(0, di_1.SkipSelf()), 
        __metadata('design:paramtypes', [EventBus])
    ], ChildConsumingEventBus);
    return ChildConsumingEventBus;
})();
var SomeImperativeViewport = (function () {
    function SomeImperativeViewport(vc, templateRef, renderer, anchor) {
        this.vc = vc;
        this.templateRef = templateRef;
        this.renderer = renderer;
        this.view = null;
        this.anchor = anchor;
    }
    Object.defineProperty(SomeImperativeViewport.prototype, "someImpvp", {
        set: function (value) {
            if (lang_1.isPresent(this.view)) {
                this.vc.clear();
                this.view = null;
            }
            if (value) {
                this.view = this.vc.createEmbeddedView(this.templateRef);
                var nodes = this.renderer.getRootNodes(this.view.renderFragment);
                for (var i = 0; i < nodes.length; i++) {
                    dom_adapter_1.DOM.appendChild(this.anchor, nodes[i]);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    SomeImperativeViewport = __decorate([
        annotations_1.Directive({ selector: '[some-impvp]', properties: ['someImpvp'] }),
        di_1.Injectable(),
        __param(3, di_1.Inject(ANCHOR_ELEMENT)), 
        __metadata('design:paramtypes', [view_container_ref_1.ViewContainerRef, template_ref_1.TemplateRef, dom_renderer_1.DomRenderer, Object])
    ], SomeImperativeViewport);
    return SomeImperativeViewport;
})();
var ExportDir = (function () {
    function ExportDir() {
    }
    ExportDir = __decorate([
        annotations_1.Directive({ selector: '[export-dir]', exportAs: 'dir' }), 
        __metadata('design:paramtypes', [])
    ], ExportDir);
    return ExportDir;
})();
var ComponentWithoutView = (function () {
    function ComponentWithoutView() {
    }
    ComponentWithoutView = __decorate([
        annotations_1.Component({ selector: 'comp' }), 
        __metadata('design:paramtypes', [])
    ], ComponentWithoutView);
    return ComponentWithoutView;
})();
var DuplicateDir = (function () {
    function DuplicateDir(elRef) {
        dom_adapter_1.DOM.setText(elRef.nativeElement, dom_adapter_1.DOM.getText(elRef.nativeElement) + 'noduplicate');
    }
    DuplicateDir = __decorate([
        annotations_1.Directive({ selector: '[no-duplicate]' }), 
        __metadata('design:paramtypes', [element_ref_1.ElementRef])
    ], DuplicateDir);
    return DuplicateDir;
})();
var OtherDuplicateDir = (function () {
    function OtherDuplicateDir(elRef) {
        dom_adapter_1.DOM.setText(elRef.nativeElement, dom_adapter_1.DOM.getText(elRef.nativeElement) + 'othernoduplicate');
    }
    OtherDuplicateDir = __decorate([
        annotations_1.Directive({ selector: '[no-duplicate]' }), 
        __metadata('design:paramtypes', [element_ref_1.ElementRef])
    ], OtherDuplicateDir);
    return OtherDuplicateDir;
})();
var DirectiveThrowingAnError = (function () {
    function DirectiveThrowingAnError() {
        throw new lang_1.BaseException("BOOM");
    }
    DirectiveThrowingAnError = __decorate([
        annotations_1.Directive({ selector: 'directive-throwing-error' }), 
        __metadata('design:paramtypes', [])
    ], DirectiveThrowingAnError);
    return DirectiveThrowingAnError;
})();
//# sourceMappingURL=integration_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
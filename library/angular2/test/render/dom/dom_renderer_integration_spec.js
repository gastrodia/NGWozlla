'use strict';var test_lib_1 = require('angular2/test_lib');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var dom_testbed_1 = require('./dom_testbed');
var api_1 = require('angular2/src/render/api');
var dom_tokens_1 = require('angular2/src/render/dom/dom_tokens');
var di_1 = require('angular2/di');
function main() {
    test_lib_1.describe('DomRenderer integration', function () {
        test_lib_1.beforeEachBindings(function () { return [dom_testbed_1.DomTestbed]; });
        test_lib_1.it('should create and destroy root host views while using the given elements in place', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
            tb.compiler.compileHost(exports.someComponent)
                .then(function (hostProtoViewDto) {
                var view = new dom_testbed_1.TestRootView(tb.renderer.createRootHostView(hostProtoViewDto.render, 0, '#root'));
                test_lib_1.expect(tb.rootEl.parentNode).toBeTruthy();
                test_lib_1.expect(view.hostElement).toEqual(tb.rootEl);
                tb.renderer.detachFragment(view.fragments[0]);
                tb.renderer.destroyView(view.viewRef);
                test_lib_1.expect(tb.rootEl.parentNode).toBeFalsy();
                async.done();
            });
        }));
        test_lib_1.it('should update text nodes', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
            tb.compileAndMerge(exports.someComponent, [
                new api_1.ViewDefinition({ componentId: 'someComponent', template: '{{a}}', directives: [] })
            ])
                .then(function (protoViewMergeMappings) {
                var rootView = tb.createView(protoViewMergeMappings);
                tb.renderer.setText(rootView.viewRef, 0, 'hello');
                test_lib_1.expect(rootView.hostElement).toHaveText('hello');
                async.done();
            });
        }));
        test_lib_1.it('should update any element property/attributes/class/style independent of the compilation on the root element and other elements', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
            tb.compileAndMerge(exports.someComponent, [
                new api_1.ViewDefinition({
                    componentId: 'someComponent',
                    template: '<input [title]="y" style="position:absolute">',
                    directives: []
                })
            ])
                .then(function (protoViewMergeMappings) {
                var checkSetters = function (elr, el) {
                    tb.renderer.setElementProperty(elr, 'tabIndex', 1);
                    test_lib_1.expect(el.tabIndex).toEqual(1);
                    tb.renderer.setElementClass(elr, 'a', true);
                    test_lib_1.expect(dom_adapter_1.DOM.hasClass(el, 'a')).toBe(true);
                    tb.renderer.setElementClass(elr, 'a', false);
                    test_lib_1.expect(dom_adapter_1.DOM.hasClass(el, 'a')).toBe(false);
                    tb.renderer.setElementStyle(elr, 'width', '10px');
                    test_lib_1.expect(dom_adapter_1.DOM.getStyle(el, 'width')).toEqual('10px');
                    tb.renderer.setElementStyle(elr, 'width', null);
                    test_lib_1.expect(dom_adapter_1.DOM.getStyle(el, 'width')).toEqual('');
                    tb.renderer.setElementAttribute(elr, 'someAttr', 'someValue');
                    test_lib_1.expect(dom_adapter_1.DOM.getAttribute(el, 'some-attr')).toEqual('someValue');
                };
                var rootView = tb.createView(protoViewMergeMappings);
                // root element
                checkSetters(dom_testbed_1.elRef(rootView.viewRef, 0), rootView.hostElement);
                // nested elements
                checkSetters(dom_testbed_1.elRef(rootView.viewRef, 1), dom_adapter_1.DOM.firstChild(rootView.hostElement));
                async.done();
            });
        }));
        test_lib_1.it('should NOT reflect property values as attributes if flag is NOT set', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
            tb.compileAndMerge(exports.someComponent, [
                new api_1.ViewDefinition({
                    componentId: 'someComponent',
                    template: '<input [title]="y">',
                    directives: []
                })
            ])
                .then(function (protoViewMergeMappings) {
                var rootView = tb.createView(protoViewMergeMappings);
                var el = dom_adapter_1.DOM.childNodes(rootView.hostElement)[0];
                tb.renderer.setElementProperty(dom_testbed_1.elRef(rootView.viewRef, 1), 'maxLength', '20');
                test_lib_1.expect(dom_adapter_1.DOM.getAttribute(el, 'ng-reflect-max-length'))
                    .toEqual(null);
                async.done();
            });
        }));
        test_lib_1.describe('reflection', function () {
            test_lib_1.beforeEachBindings(function () { return [di_1.bind(dom_tokens_1.DOM_REFLECT_PROPERTIES_AS_ATTRIBUTES).toValue(true)]; });
            test_lib_1.it('should reflect property values as attributes if flag is set', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                tb.compileAndMerge(exports.someComponent, [
                    new api_1.ViewDefinition({
                        componentId: 'someComponent',
                        template: '<input [title]="y">',
                        directives: []
                    })
                ])
                    .then(function (protoViewMergeMappings) {
                    var rootView = tb.createView(protoViewMergeMappings);
                    var el = dom_adapter_1.DOM.childNodes(rootView.hostElement)[0];
                    tb.renderer.setElementProperty(dom_testbed_1.elRef(rootView.viewRef, 1), 'maxLength', '20');
                    test_lib_1.expect(dom_adapter_1.DOM.getAttribute(el, 'ng-reflect-max-length'))
                        .toEqual('20');
                    async.done();
                });
            }));
            test_lib_1.it('should reflect non-string property values as attributes if flag is set', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                tb.compileAndMerge(exports.someComponent, [
                    new api_1.ViewDefinition({
                        componentId: 'someComponent',
                        template: '<input [title]="y">',
                        directives: []
                    })
                ])
                    .then(function (protoViewMergeMappings) {
                    var rootView = tb.createView(protoViewMergeMappings);
                    var el = dom_adapter_1.DOM.childNodes(rootView.hostElement)[0];
                    tb.renderer.setElementProperty(dom_testbed_1.elRef(rootView.viewRef, 1), 'maxLength', 20);
                    test_lib_1.expect(dom_adapter_1.DOM.getAttribute(el, 'ng-reflect-max-length'))
                        .toEqual('20');
                    async.done();
                });
            }));
        });
        if (dom_adapter_1.DOM.supportsDOMEvents()) {
            test_lib_1.it('should call actions on the element independent of the compilation', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                tb.compileAndMerge(exports.someComponent, [
                    new api_1.ViewDefinition({
                        componentId: 'someComponent',
                        template: '<input [title]="y"></input>',
                        directives: []
                    })
                ])
                    .then(function (protoViewMergeMappings) {
                    var rootView = tb.createView(protoViewMergeMappings);
                    tb.renderer.invokeElementMethod(dom_testbed_1.elRef(rootView.viewRef, 1), 'setAttribute', ['a', 'b']);
                    test_lib_1.expect(dom_adapter_1.DOM.getAttribute(dom_adapter_1.DOM.childNodes(rootView.hostElement)[0], 'a'))
                        .toEqual('b');
                    async.done();
                });
            }));
        }
        test_lib_1.it('should add and remove fragments', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
            tb.compileAndMerge(exports.someComponent, [
                new api_1.ViewDefinition({
                    componentId: 'someComponent',
                    template: '<template>hello</template>',
                    directives: []
                })
            ])
                .then(function (protoViewMergeMappings) {
                var rootView = tb.createView(protoViewMergeMappings);
                var elr = dom_testbed_1.elRef(rootView.viewRef, 1);
                test_lib_1.expect(rootView.hostElement).toHaveText('');
                var fragment = rootView.fragments[1];
                tb.renderer.attachFragmentAfterElement(elr, fragment);
                test_lib_1.expect(rootView.hostElement).toHaveText('hello');
                tb.renderer.detachFragment(fragment);
                test_lib_1.expect(rootView.hostElement).toHaveText('');
                async.done();
            });
        }));
        test_lib_1.it('should add and remove empty fragments', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
            tb.compileAndMerge(exports.someComponent, [
                new api_1.ViewDefinition({
                    componentId: 'someComponent',
                    template: '<template></template><template></template>',
                    directives: []
                })
            ])
                .then(function (protoViewMergeMappings) {
                var rootView = tb.createView(protoViewMergeMappings);
                var elr = dom_testbed_1.elRef(rootView.viewRef, 1);
                test_lib_1.expect(rootView.hostElement).toHaveText('');
                var fragment = rootView.fragments[1];
                var fragment2 = rootView.fragments[2];
                tb.renderer.attachFragmentAfterElement(elr, fragment);
                tb.renderer.attachFragmentAfterFragment(fragment, fragment2);
                tb.renderer.detachFragment(fragment);
                tb.renderer.detachFragment(fragment2);
                test_lib_1.expect(rootView.hostElement).toHaveText('');
                async.done();
            });
        }));
        test_lib_1.it('should handle events', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
            tb.compileAndMerge(exports.someComponent, [
                new api_1.ViewDefinition({
                    componentId: 'someComponent',
                    template: '<input (change)="doSomething()">',
                    directives: []
                })
            ])
                .then(function (protoViewMergeMappings) {
                var rootView = tb.createView(protoViewMergeMappings);
                tb.triggerEvent(dom_testbed_1.elRef(rootView.viewRef, 1), 'change');
                var eventEntry = rootView.events[0];
                // bound element index
                test_lib_1.expect(eventEntry[0]).toEqual(1);
                // event type
                test_lib_1.expect(eventEntry[1]).toEqual('change');
                // actual event
                test_lib_1.expect(eventEntry[2].get('$event').type).toEqual('change');
                async.done();
            });
        }));
        if (dom_adapter_1.DOM.supportsNativeShadowDOM()) {
            test_lib_1.describe('native shadow dom support', function () {
                test_lib_1.it('should put the template into a shadow root', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                    tb.compileAndMerge(exports.someComponent, [
                        new api_1.ViewDefinition({
                            componentId: 'someComponent',
                            template: 'hello',
                            directives: [],
                            encapsulation: api_1.ViewEncapsulation.NATIVE
                        })
                    ])
                        .then(function (protoViewMergeMappings) {
                        var rootView = tb.createView(protoViewMergeMappings);
                        test_lib_1.expect(dom_adapter_1.DOM.getShadowRoot(rootView.hostElement)).toHaveText('hello');
                        async.done();
                    });
                }));
                test_lib_1.it('should add styles from non native components to shadow roots while the view is not destroyed', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                    tb.compileAndMerge(exports.someComponent, [
                        new api_1.ViewDefinition({
                            componentId: 'someComponent',
                            template: '',
                            directives: [],
                            encapsulation: api_1.ViewEncapsulation.NATIVE,
                            styles: ['a {};']
                        })
                    ])
                        .then(function (protoViewMergeMappings) {
                        var rootView = tb.createView(protoViewMergeMappings);
                        tb.compiler.compile(new api_1.ViewDefinition({
                            componentId: 'someComponent',
                            template: '',
                            directives: [],
                            encapsulation: api_1.ViewEncapsulation.NONE,
                            styles: ['b {};']
                        }))
                            .then(function (_) {
                            test_lib_1.expect(dom_adapter_1.DOM.getShadowRoot(rootView.hostElement)).toHaveText('a {};b {};');
                            tb.renderer.destroyView(rootView.viewRef);
                            tb.compiler.compile(new api_1.ViewDefinition({
                                componentId: 'someComponent',
                                template: '',
                                directives: [],
                                encapsulation: api_1.ViewEncapsulation.NONE,
                                styles: ['c {};']
                            }))
                                .then(function (_) {
                                test_lib_1.expect(dom_adapter_1.DOM.getShadowRoot(rootView.hostElement))
                                    .toHaveText('a {};b {};');
                                async.done();
                            });
                        });
                    });
                }));
            });
        }
    });
}
exports.main = main;
exports.someComponent = api_1.DirectiveMetadata.create({ id: 'someComponent', type: api_1.DirectiveMetadata.COMPONENT_TYPE, selector: 'some-comp' });
//# sourceMappingURL=dom_renderer_integration_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
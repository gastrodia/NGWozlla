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
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var compiler_1 = require('angular2/src/core/compiler/compiler');
var view_1 = require('angular2/src/core/compiler/view');
var element_binder_1 = require('angular2/src/core/compiler/element_binder');
var directive_resolver_1 = require('angular2/src/core/compiler/directive_resolver');
var annotations_1 = require('angular2/annotations');
var viewAnn = require('angular2/src/core/annotations_impl/view');
var view_ref_1 = require('angular2/src/core/compiler/view_ref');
var element_injector_1 = require('angular2/src/core/compiler/element_injector');
var view_resolver_1 = require('angular2/src/core/compiler/view_resolver');
var component_url_mapper_1 = require('angular2/src/core/compiler/component_url_mapper');
var proto_view_factory_1 = require('angular2/src/core/compiler/proto_view_factory');
var url_resolver_1 = require('angular2/src/services/url_resolver');
var app_root_url_1 = require('angular2/src/services/app_root_url');
var renderApi = require('angular2/src/render/api');
// TODO(tbosch): Spys don't support named modules...
var api_1 = require('angular2/src/render/api');
function main() {
    test_lib_1.describe('compiler', function () {
        var directiveResolver, tplResolver, renderCompiler, protoViewFactory, cmpUrlMapper, rootProtoView;
        var renderCompileRequests;
        function createCompiler(renderCompileResults, protoViewFactoryResults) {
            var urlResolver = new url_resolver_1.UrlResolver();
            renderCompileRequests = [];
            renderCompileResults = collection_1.ListWrapper.clone(renderCompileResults);
            renderCompiler.spy('compile').andCallFake(function (view) {
                renderCompileRequests.push(view);
                return async_1.PromiseWrapper.resolve(collection_1.ListWrapper.removeAt(renderCompileResults, 0));
            });
            protoViewFactory = new FakeProtoViewFactory(protoViewFactoryResults);
            return new compiler_1.Compiler(directiveResolver, new compiler_1.CompilerCache(), tplResolver, cmpUrlMapper, urlResolver, renderCompiler, protoViewFactory, new app_root_url_1.AppRootUrl("http://www.app.com"));
        }
        test_lib_1.beforeEach(function () {
            directiveResolver = new directive_resolver_1.DirectiveResolver();
            tplResolver = new FakeViewResolver();
            cmpUrlMapper = new component_url_mapper_1.RuntimeComponentUrlMapper();
            renderCompiler = new SpyRenderCompiler();
            renderCompiler.spy('compileHost')
                .andCallFake(function (componentId) {
                return async_1.PromiseWrapper.resolve(createRenderProtoView([createRenderComponentElementBinder(0)], renderApi.ViewType.HOST));
            });
            renderCompiler.spy('mergeProtoViewsRecursively')
                .andCallFake(function (protoViewRefs) {
                return async_1.PromiseWrapper.resolve(new renderApi.RenderProtoViewMergeMapping(new MergedRenderProtoViewRef(protoViewRefs), 1, [], 0, [], [], [null]));
            });
            // TODO spy on .compile and return RenderProtoViewRef, same for compileHost
            rootProtoView = createRootProtoView(directiveResolver, MainComponent);
        });
        test_lib_1.describe('serialize template', function () {
            function captureTemplate(template) {
                tplResolver.setView(MainComponent, template);
                var compiler = createCompiler([createRenderProtoView()], [rootProtoView, createProtoView()]);
                return compiler.compileInHost(MainComponent)
                    .then(function (_) {
                    test_lib_1.expect(renderCompileRequests.length).toBe(1);
                    return renderCompileRequests[0];
                });
            }
            function captureDirective(directive) {
                return captureTemplate(new viewAnn.View({ template: '<div></div>', directives: [directive] }))
                    .then(function (renderTpl) {
                    test_lib_1.expect(renderTpl.directives.length).toBe(1);
                    return renderTpl.directives[0];
                });
            }
            test_lib_1.it('should fill the componentId', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureTemplate(new viewAnn.View({ template: '<div></div>' }))
                    .then(function (renderTpl) {
                    test_lib_1.expect(renderTpl.componentId).toEqual(lang_1.stringify(MainComponent));
                    async.done();
                });
            }));
            test_lib_1.it('should fill inline template', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureTemplate(new viewAnn.View({ template: '<div></div>' }))
                    .then(function (renderTpl) {
                    test_lib_1.expect(renderTpl.template).toEqual('<div></div>');
                    async.done();
                });
            }));
            test_lib_1.it('should fill templateAbsUrl given inline templates', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                cmpUrlMapper.setComponentUrl(MainComponent, '/cmp/main.js');
                captureTemplate(new viewAnn.View({ template: '<div></div>' }))
                    .then(function (renderTpl) {
                    test_lib_1.expect(renderTpl.templateAbsUrl).toEqual('http://www.app.com/cmp/main.js');
                    async.done();
                });
            }));
            test_lib_1.it('should not fill templateAbsUrl given no inline template or template url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                cmpUrlMapper.setComponentUrl(MainComponent, '/cmp/main.js');
                captureTemplate(new viewAnn.View({ template: null, templateUrl: null }))
                    .then(function (renderTpl) {
                    test_lib_1.expect(renderTpl.templateAbsUrl).toBe(null);
                    async.done();
                });
            }));
            test_lib_1.it('should fill templateAbsUrl given url template', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                cmpUrlMapper.setComponentUrl(MainComponent, '/cmp/main.js');
                captureTemplate(new viewAnn.View({ templateUrl: 'tpl/main.html' }))
                    .then(function (renderTpl) {
                    test_lib_1.expect(renderTpl.templateAbsUrl).toEqual('http://www.app.com/cmp/tpl/main.html');
                    async.done();
                });
            }));
            test_lib_1.it('should fill styleAbsUrls given styleUrls', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                cmpUrlMapper.setComponentUrl(MainComponent, '/cmp/main.js');
                captureTemplate(new viewAnn.View({ styleUrls: ['css/1.css', 'css/2.css'] }))
                    .then(function (renderTpl) {
                    test_lib_1.expect(renderTpl.styleAbsUrls)
                        .toEqual(['http://www.app.com/cmp/css/1.css', 'http://www.app.com/cmp/css/2.css']);
                    async.done();
                });
            }));
            test_lib_1.it('should fill directive.id', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(MainComponent)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.id).toEqual(lang_1.stringify(MainComponent));
                    async.done();
                });
            }));
            test_lib_1.it('should fill directive.selector', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(MainComponent)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.selector).toEqual('main-comp');
                    async.done();
                });
            }));
            test_lib_1.it('should fill directive.type for components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(MainComponent)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.type).toEqual(renderApi.DirectiveMetadata.COMPONENT_TYPE);
                    async.done();
                });
            }));
            test_lib_1.it('should fill directive.type for dynamic components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(SomeDynamicComponentDirective)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.type).toEqual(renderApi.DirectiveMetadata.COMPONENT_TYPE);
                    async.done();
                });
            }));
            test_lib_1.it('should fill directive.type for decorator directives', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(SomeDirective)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.type).toEqual(renderApi.DirectiveMetadata.DIRECTIVE_TYPE);
                    async.done();
                });
            }));
            test_lib_1.it('should set directive.compileChildren to false for other directives', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(MainComponent)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.compileChildren).toEqual(true);
                    async.done();
                });
            }));
            test_lib_1.it('should set directive.compileChildren to true for decorator directives', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(SomeDirective)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.compileChildren).toEqual(true);
                    async.done();
                });
            }));
            test_lib_1.it('should set directive.compileChildren to false for decorator directives', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(IgnoreChildrenDirective)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.compileChildren).toEqual(false);
                    async.done();
                });
            }));
            test_lib_1.it('should set directive.hostListeners', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(DirectiveWithEvents)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.hostListeners)
                        .toEqual(collection_1.MapWrapper.createFromStringMap({ 'someEvent': 'someAction' }));
                    async.done();
                });
            }));
            test_lib_1.it('should set directive.hostProperties', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(DirectiveWithProperties)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.hostProperties)
                        .toEqual(collection_1.MapWrapper.createFromStringMap({ 'someProp': 'someExp' }));
                    async.done();
                });
            }));
            test_lib_1.it('should set directive.bind', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(DirectiveWithBind)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.properties).toEqual(['a: b']);
                    async.done();
                });
            }));
            test_lib_1.it('should read @Attribute', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(DirectiveWithAttributes)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.readAttributes).toEqual(['someAttr']);
                    async.done();
                });
            }));
        });
        test_lib_1.describe('call ProtoViewFactory', function () {
            test_lib_1.it('should pass the ProtoViewDto', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
                var renderProtoView = createRenderProtoView();
                var expectedProtoView = createProtoView();
                var compiler = createCompiler([renderProtoView], [rootProtoView, expectedProtoView]);
                compiler.compileInHost(MainComponent)
                    .then(function (_) {
                    var request = protoViewFactory.requests[1];
                    test_lib_1.expect(request[1]).toBe(renderProtoView);
                    async.done();
                });
            }));
            test_lib_1.it('should pass the component binding', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
                var compiler = createCompiler([createRenderProtoView()], [rootProtoView, createProtoView()]);
                compiler.compileInHost(MainComponent)
                    .then(function (_) {
                    var request = protoViewFactory.requests[1];
                    test_lib_1.expect(request[0].key.token).toBe(MainComponent);
                    async.done();
                });
            }));
            test_lib_1.it('should pass the directive bindings', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>', directives: [SomeDirective] }));
                var compiler = createCompiler([createRenderProtoView()], [rootProtoView, createProtoView()]);
                compiler.compileInHost(MainComponent)
                    .then(function (_) {
                    var request = protoViewFactory.requests[1];
                    var binding = request[2][0];
                    test_lib_1.expect(binding.key.token).toBe(SomeDirective);
                    async.done();
                });
            }));
            test_lib_1.it('should use the protoView of the ProtoViewFactory', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
                var compiler = createCompiler([createRenderProtoView()], [rootProtoView, createProtoView()]);
                compiler.compileInHost(MainComponent)
                    .then(function (protoViewRef) {
                    test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef)).toBe(rootProtoView);
                    async.done();
                });
            }));
        });
        test_lib_1.it('should load nested components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
            tplResolver.setView(NestedComponent, new viewAnn.View({ template: '<div></div>' }));
            var mainProtoView = createProtoView([createComponentElementBinder(directiveResolver, NestedComponent)]);
            var nestedProtoView = createProtoView();
            var renderPvDtos = [
                createRenderProtoView([createRenderComponentElementBinder(0)]),
                createRenderProtoView()
            ];
            var compiler = createCompiler(renderPvDtos, [rootProtoView, mainProtoView, nestedProtoView]);
            compiler.compileInHost(MainComponent)
                .then(function (protoViewRef) {
                test_lib_1.expect(originalRenderProtoViewRefs(view_ref_1.internalProtoView(protoViewRef)))
                    .toEqual([rootProtoView.render, [mainProtoView.render, [nestedProtoView.render]]]);
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef).elementBinders[0].nestedProtoView)
                    .toBe(mainProtoView);
                test_lib_1.expect(mainProtoView.elementBinders[0].nestedProtoView).toBe(nestedProtoView);
                async.done();
            });
        }));
        test_lib_1.it('should load nested components in viewcontainers', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
            tplResolver.setView(NestedComponent, new viewAnn.View({ template: '<div></div>' }));
            var viewportProtoView = createProtoView([createComponentElementBinder(directiveResolver, NestedComponent)], renderApi.ViewType.EMBEDDED);
            var mainProtoView = createProtoView([createViewportElementBinder(viewportProtoView)]);
            var nestedProtoView = createProtoView();
            var renderPvDtos = [
                createRenderProtoView([
                    createRenderViewportElementBinder(createRenderProtoView([createRenderComponentElementBinder(0)], renderApi.ViewType.EMBEDDED))
                ]),
                createRenderProtoView()
            ];
            var compiler = createCompiler(renderPvDtos, [rootProtoView, mainProtoView, nestedProtoView]);
            compiler.compileInHost(MainComponent)
                .then(function (protoViewRef) {
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef).elementBinders[0].nestedProtoView)
                    .toBe(mainProtoView);
                test_lib_1.expect(originalRenderProtoViewRefs(view_ref_1.internalProtoView(protoViewRef)))
                    .toEqual([rootProtoView.render, [mainProtoView.render, null]]);
                test_lib_1.expect(viewportProtoView.elementBinders[0].nestedProtoView).toBe(nestedProtoView);
                test_lib_1.expect(originalRenderProtoViewRefs(viewportProtoView))
                    .toEqual([viewportProtoView.render, [nestedProtoView.render]]);
                async.done();
            });
        }));
        test_lib_1.it('should cache compiled host components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
            var mainPv = createProtoView();
            var compiler = createCompiler([createRenderProtoView([])], [rootProtoView, mainPv]);
            compiler.compileInHost(MainComponent)
                .then(function (protoViewRef) {
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef).elementBinders[0].nestedProtoView)
                    .toBe(mainPv);
                return compiler.compileInHost(MainComponent);
            })
                .then(function (protoViewRef) {
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef).elementBinders[0].nestedProtoView)
                    .toBe(mainPv);
                async.done();
            });
        }));
        test_lib_1.it('should not bind directives for cached components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            // set up the cache with the test proto view
            var mainPv = createProtoView();
            var cache = new compiler_1.CompilerCache();
            cache.setHost(MainComponent, mainPv);
            // create the spy resolver
            var reader = new SpyDirectiveResolver();
            // create the compiler
            var compiler = new compiler_1.Compiler(reader, cache, tplResolver, cmpUrlMapper, new url_resolver_1.UrlResolver(), renderCompiler, protoViewFactory, new app_root_url_1.AppRootUrl("http://www.app.com"));
            compiler.compileInHost(MainComponent)
                .then(function (protoViewRef) {
                // the test should have failed if the resolver was called, so we're good
                async.done();
            });
        }));
        test_lib_1.it('should cache compiled nested components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
            tplResolver.setView(MainComponent2, new viewAnn.View({ template: '<div></div>' }));
            tplResolver.setView(NestedComponent, new viewAnn.View({ template: '<div></div>' }));
            var rootProtoView2 = createRootProtoView(directiveResolver, MainComponent2);
            var mainPv = createProtoView([createComponentElementBinder(directiveResolver, NestedComponent)]);
            var nestedPv = createProtoView([]);
            var compiler = createCompiler([createRenderProtoView(), createRenderProtoView(), createRenderProtoView()], [rootProtoView, mainPv, nestedPv, rootProtoView2, mainPv]);
            compiler.compileInHost(MainComponent)
                .then(function (protoViewRef) {
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef)
                    .elementBinders[0]
                    .nestedProtoView.elementBinders[0]
                    .nestedProtoView)
                    .toBe(nestedPv);
                return compiler.compileInHost(MainComponent2);
            })
                .then(function (protoViewRef) {
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef)
                    .elementBinders[0]
                    .nestedProtoView.elementBinders[0]
                    .nestedProtoView)
                    .toBe(nestedPv);
                async.done();
            });
        }));
        test_lib_1.it('should re-use components being compiled', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
            var renderProtoViewCompleter = async_1.PromiseWrapper.completer();
            var expectedProtoView = createProtoView();
            var compiler = createCompiler([renderProtoViewCompleter.promise], [rootProtoView, rootProtoView, expectedProtoView]);
            var result = async_1.PromiseWrapper.all([
                compiler.compileInHost(MainComponent),
                compiler.compileInHost(MainComponent),
                renderProtoViewCompleter.promise
            ]);
            renderProtoViewCompleter.resolve(createRenderProtoView());
            result.then(function (protoViewRefs) {
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRefs[0]).elementBinders[0].nestedProtoView)
                    .toBe(expectedProtoView);
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRefs[1]).elementBinders[0].nestedProtoView)
                    .toBe(expectedProtoView);
                async.done();
            });
        }));
        test_lib_1.it('should throw on unconditional recursive components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
            var mainProtoView = createProtoView([createComponentElementBinder(directiveResolver, MainComponent)]);
            var compiler = createCompiler([createRenderProtoView([createRenderComponentElementBinder(0)])], [rootProtoView, mainProtoView]);
            async_1.PromiseWrapper.catchError(compiler.compileInHost(MainComponent), function (e) {
                test_lib_1.expect(function () { throw e; })
                    .toThrowError("Unconditional component cycle in " + lang_1.stringify(MainComponent));
                async.done();
                return null;
            });
        }));
        test_lib_1.it('should allow recursive components that are connected via an embedded ProtoView', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
            var viewportProtoView = createProtoView([createComponentElementBinder(directiveResolver, MainComponent)], renderApi.ViewType.EMBEDDED);
            var mainProtoView = createProtoView([createViewportElementBinder(viewportProtoView)]);
            var renderPvDtos = [
                createRenderProtoView([
                    createRenderViewportElementBinder(createRenderProtoView([createRenderComponentElementBinder(0)], renderApi.ViewType.EMBEDDED))
                ]),
                createRenderProtoView()
            ];
            var compiler = createCompiler(renderPvDtos, [rootProtoView, mainProtoView]);
            compiler.compileInHost(MainComponent)
                .then(function (protoViewRef) {
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef).elementBinders[0].nestedProtoView)
                    .toBe(mainProtoView);
                test_lib_1.expect(mainProtoView.elementBinders[0]
                    .nestedProtoView.elementBinders[0]
                    .nestedProtoView)
                    .toBe(mainProtoView);
                // In case of a cycle, don't merge the embedded proto views into the component!
                test_lib_1.expect(originalRenderProtoViewRefs(view_ref_1.internalProtoView(protoViewRef)))
                    .toEqual([rootProtoView.render, [mainProtoView.render, null]]);
                test_lib_1.expect(originalRenderProtoViewRefs(viewportProtoView))
                    .toEqual([viewportProtoView.render, [mainProtoView.render, null]]);
                async.done();
            });
        }));
        test_lib_1.it('should throw on recursive components that are connected via an embedded ProtoView with <ng-content>', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
            var viewportProtoView = createProtoView([createComponentElementBinder(directiveResolver, MainComponent)], renderApi.ViewType.EMBEDDED, true);
            var mainProtoView = createProtoView([createViewportElementBinder(viewportProtoView)]);
            var renderPvDtos = [
                createRenderProtoView([
                    createRenderViewportElementBinder(createRenderProtoView([createRenderComponentElementBinder(0)], renderApi.ViewType.EMBEDDED))
                ]),
                createRenderProtoView()
            ];
            var compiler = createCompiler(renderPvDtos, [rootProtoView, mainProtoView]);
            async_1.PromiseWrapper.catchError(compiler.compileInHost(MainComponent), function (e) {
                test_lib_1.expect(function () { throw e; })
                    .toThrowError("<ng-content> is used within the recursive path of " + lang_1.stringify(MainComponent));
                async.done();
                return null;
            });
        }));
        test_lib_1.it('should create host proto views', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
            var rootProtoView = createProtoView([createComponentElementBinder(directiveResolver, MainComponent)], renderApi.ViewType.HOST);
            var mainProtoView = createProtoView();
            var compiler = createCompiler([createRenderProtoView()], [rootProtoView, mainProtoView]);
            compiler.compileInHost(MainComponent)
                .then(function (protoViewRef) {
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef)).toBe(rootProtoView);
                test_lib_1.expect(rootProtoView.elementBinders[0].nestedProtoView).toBe(mainProtoView);
                async.done();
            });
        }));
        test_lib_1.it('should throw for non component types', function () {
            var compiler = createCompiler([], []);
            test_lib_1.expect(function () { return compiler.compileInHost(SomeDirective); })
                .toThrowError("Could not load '" + lang_1.stringify(SomeDirective) + "' because it is not a component.");
        });
    });
}
exports.main = main;
function createDirectiveBinding(directiveResolver, type) {
    var annotation = directiveResolver.resolve(type);
    return element_injector_1.DirectiveBinding.createFromType(type, annotation);
}
function createProtoView(elementBinders, type, isEmbeddedFragment) {
    if (elementBinders === void 0) { elementBinders = null; }
    if (type === void 0) { type = null; }
    if (isEmbeddedFragment === void 0) { isEmbeddedFragment = false; }
    if (lang_1.isBlank(type)) {
        type = renderApi.ViewType.COMPONENT;
    }
    var pv = new view_1.AppProtoView(type, isEmbeddedFragment, new renderApi.RenderProtoViewRef(), null, null, new collection_1.Map(), null);
    if (lang_1.isBlank(elementBinders)) {
        elementBinders = [];
    }
    pv.elementBinders = elementBinders;
    return pv;
}
function createComponentElementBinder(directiveResolver, type) {
    var binding = createDirectiveBinding(directiveResolver, type);
    return new element_binder_1.ElementBinder(0, null, 0, null, binding);
}
function createViewportElementBinder(nestedProtoView) {
    var elBinder = new element_binder_1.ElementBinder(0, null, 0, null, null);
    elBinder.nestedProtoView = nestedProtoView;
    return elBinder;
}
function createRenderProtoView(elementBinders, type) {
    if (elementBinders === void 0) { elementBinders = null; }
    if (type === void 0) { type = null; }
    if (lang_1.isBlank(type)) {
        type = renderApi.ViewType.COMPONENT;
    }
    if (lang_1.isBlank(elementBinders)) {
        elementBinders = [];
    }
    return new renderApi.ProtoViewDto({ elementBinders: elementBinders, type: type, render: new renderApi.RenderProtoViewRef() });
}
function createRenderComponentElementBinder(directiveIndex) {
    return new renderApi.ElementBinder({ directives: [new renderApi.DirectiveBinder({ directiveIndex: directiveIndex })] });
}
function createRenderViewportElementBinder(nestedProtoView) {
    return new renderApi.ElementBinder({ nestedProtoView: nestedProtoView });
}
function createRootProtoView(directiveResolver, type) {
    return createProtoView([createComponentElementBinder(directiveResolver, type)], renderApi.ViewType.HOST);
}
var MainComponent = (function () {
    function MainComponent() {
    }
    MainComponent = __decorate([
        annotations_1.Component({ selector: 'main-comp' }), 
        __metadata('design:paramtypes', [])
    ], MainComponent);
    return MainComponent;
})();
var MainComponent2 = (function () {
    function MainComponent2() {
    }
    MainComponent2 = __decorate([
        annotations_1.Component({ selector: 'main-comp2' }), 
        __metadata('design:paramtypes', [])
    ], MainComponent2);
    return MainComponent2;
})();
var NestedComponent = (function () {
    function NestedComponent() {
    }
    NestedComponent = __decorate([
        annotations_1.Component({ selector: 'nested' }), 
        __metadata('design:paramtypes', [])
    ], NestedComponent);
    return NestedComponent;
})();
var RecursiveComponent = (function () {
    function RecursiveComponent() {
    }
    return RecursiveComponent;
})();
var SomeDynamicComponentDirective = (function () {
    function SomeDynamicComponentDirective() {
    }
    SomeDynamicComponentDirective = __decorate([
        annotations_1.Component({ selector: 'some-dynamic' }), 
        __metadata('design:paramtypes', [])
    ], SomeDynamicComponentDirective);
    return SomeDynamicComponentDirective;
})();
var SomeDirective = (function () {
    function SomeDirective() {
    }
    SomeDirective = __decorate([
        annotations_1.Directive({ selector: 'some' }), 
        __metadata('design:paramtypes', [])
    ], SomeDirective);
    return SomeDirective;
})();
var IgnoreChildrenDirective = (function () {
    function IgnoreChildrenDirective() {
    }
    IgnoreChildrenDirective = __decorate([
        annotations_1.Directive({ compileChildren: false }), 
        __metadata('design:paramtypes', [])
    ], IgnoreChildrenDirective);
    return IgnoreChildrenDirective;
})();
var DirectiveWithEvents = (function () {
    function DirectiveWithEvents() {
    }
    DirectiveWithEvents = __decorate([
        annotations_1.Directive({ host: { '(someEvent)': 'someAction' } }), 
        __metadata('design:paramtypes', [])
    ], DirectiveWithEvents);
    return DirectiveWithEvents;
})();
var DirectiveWithProperties = (function () {
    function DirectiveWithProperties() {
    }
    DirectiveWithProperties = __decorate([
        annotations_1.Directive({ host: { '[someProp]': 'someExp' } }), 
        __metadata('design:paramtypes', [])
    ], DirectiveWithProperties);
    return DirectiveWithProperties;
})();
var DirectiveWithBind = (function () {
    function DirectiveWithBind() {
    }
    DirectiveWithBind = __decorate([
        annotations_1.Directive({ properties: ['a: b'] }), 
        __metadata('design:paramtypes', [])
    ], DirectiveWithBind);
    return DirectiveWithBind;
})();
var DirectiveWithAttributes = (function () {
    function DirectiveWithAttributes(someAttr) {
    }
    DirectiveWithAttributes = __decorate([
        annotations_1.Directive({ selector: 'directive-with-accts' }),
        __param(0, annotations_1.Attribute('someAttr')), 
        __metadata('design:paramtypes', [String])
    ], DirectiveWithAttributes);
    return DirectiveWithAttributes;
})();
var SpyRenderCompiler = (function (_super) {
    __extends(SpyRenderCompiler, _super);
    function SpyRenderCompiler() {
        _super.call(this, api_1.RenderCompiler);
    }
    SpyRenderCompiler.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyRenderCompiler = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(api_1.RenderCompiler), 
        __metadata('design:paramtypes', [])
    ], SpyRenderCompiler);
    return SpyRenderCompiler;
})(test_lib_1.SpyObject);
var SpyDirectiveResolver = (function (_super) {
    __extends(SpyDirectiveResolver, _super);
    function SpyDirectiveResolver() {
        _super.call(this, directive_resolver_1.DirectiveResolver);
    }
    SpyDirectiveResolver.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyDirectiveResolver = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(directive_resolver_1.DirectiveResolver), 
        __metadata('design:paramtypes', [])
    ], SpyDirectiveResolver);
    return SpyDirectiveResolver;
})(test_lib_1.SpyObject);
var FakeViewResolver = (function (_super) {
    __extends(FakeViewResolver, _super);
    function FakeViewResolver() {
        _super.call(this);
        this._cmpViews = new collection_1.Map();
    }
    FakeViewResolver.prototype.resolve = function (component) {
        // returns null for dynamic components
        return this._cmpViews.has(component) ? this._cmpViews.get(component) : null;
    };
    FakeViewResolver.prototype.setView = function (component, view) { this._cmpViews.set(component, view); };
    return FakeViewResolver;
})(view_resolver_1.ViewResolver);
var FakeProtoViewFactory = (function (_super) {
    __extends(FakeProtoViewFactory, _super);
    function FakeProtoViewFactory(results) {
        _super.call(this, null);
        this.results = results;
        this.requests = [];
    }
    FakeProtoViewFactory.prototype.createAppProtoViews = function (componentBinding, renderProtoView, directives) {
        this.requests.push([componentBinding, renderProtoView, directives]);
        return collectEmbeddedPvs(collection_1.ListWrapper.removeAt(this.results, 0));
    };
    return FakeProtoViewFactory;
})(proto_view_factory_1.ProtoViewFactory);
var MergedRenderProtoViewRef = (function (_super) {
    __extends(MergedRenderProtoViewRef, _super);
    function MergedRenderProtoViewRef(originals) {
        _super.call(this);
        this.originals = originals;
    }
    return MergedRenderProtoViewRef;
})(renderApi.RenderProtoViewRef);
function originalRenderProtoViewRefs(appProtoView) {
    return appProtoView.mergeMapping.renderProtoViewRef.originals;
}
function collectEmbeddedPvs(pv, target) {
    if (target === void 0) { target = null; }
    if (lang_1.isBlank(target)) {
        target = [];
    }
    target.push(pv);
    pv.elementBinders.forEach(function (elementBinder) {
        if (elementBinder.hasEmbeddedProtoView()) {
            collectEmbeddedPvs(elementBinder.nestedProtoView, target);
        }
    });
    return target;
}
//# sourceMappingURL=compiler_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
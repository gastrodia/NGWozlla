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
// TODO(tbosch): clang-format screws this up, see https://github.com/angular/clang-format/issues/11.
// Enable clang-format here again when this is fixed.
// clang-format off
var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var element_injector_1 = require('angular2/src/core/compiler/element_injector');
var dirAnn = require('angular2/src/core/annotations_impl/annotations');
var annotations_1 = require('angular2/annotations');
var di_1 = require('angular2/di');
var view_1 = require('angular2/src/core/compiler/view');
var view_container_ref_1 = require('angular2/src/core/compiler/view_container_ref');
var template_ref_1 = require('angular2/src/core/compiler/template_ref');
var element_ref_1 = require('angular2/src/core/compiler/element_ref');
var change_detection_1 = require('angular2/src/change_detection/change_detection');
var query_list_1 = require('angular2/src/core/compiler/query_list');
var DummyView = (function (_super) {
    __extends(DummyView, _super);
    function DummyView() {
        _super.call(this, view_1.AppView);
        this.changeDetector = null;
    }
    DummyView.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    DummyView = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(view_1.AppView), 
        __metadata('design:paramtypes', [])
    ], DummyView);
    return DummyView;
})(test_lib_1.SpyObject);
var DummyElementRef = (function (_super) {
    __extends(DummyElementRef, _super);
    function DummyElementRef() {
        _super.call(this, element_ref_1.ElementRef);
        this.boundElementIndex = 0;
    }
    DummyElementRef.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    DummyElementRef = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(element_ref_1.ElementRef), 
        __metadata('design:paramtypes', [])
    ], DummyElementRef);
    return DummyElementRef;
})(test_lib_1.SpyObject);
var SimpleDirective = (function () {
    function SimpleDirective() {
    }
    SimpleDirective = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SimpleDirective);
    return SimpleDirective;
})();
var SimpleService = (function () {
    function SimpleService() {
    }
    return SimpleService;
})();
var SomeOtherDirective = (function () {
    function SomeOtherDirective() {
    }
    SomeOtherDirective = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SomeOtherDirective);
    return SomeOtherDirective;
})();
var _constructionCount = 0;
var CountingDirective = (function () {
    function CountingDirective() {
        this.count = _constructionCount;
        _constructionCount += 1;
    }
    CountingDirective = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CountingDirective);
    return CountingDirective;
})();
var FancyCountingDirective = (function (_super) {
    __extends(FancyCountingDirective, _super);
    function FancyCountingDirective() {
        _super.call(this);
    }
    FancyCountingDirective = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FancyCountingDirective);
    return FancyCountingDirective;
})(CountingDirective);
var NeedsDirective = (function () {
    function NeedsDirective(dependency) {
        this.dependency = dependency;
    }
    NeedsDirective = __decorate([
        di_1.Injectable(),
        __param(0, di_1.Self()), 
        __metadata('design:paramtypes', [SimpleDirective])
    ], NeedsDirective);
    return NeedsDirective;
})();
var OptionallyNeedsDirective = (function () {
    function OptionallyNeedsDirective(dependency) {
        this.dependency = dependency;
    }
    OptionallyNeedsDirective = __decorate([
        di_1.Injectable(),
        __param(0, di_1.Self()),
        __param(0, di_1.Optional()), 
        __metadata('design:paramtypes', [SimpleDirective])
    ], OptionallyNeedsDirective);
    return OptionallyNeedsDirective;
})();
var NeeedsDirectiveFromHost = (function () {
    function NeeedsDirectiveFromHost(dependency) {
        this.dependency = dependency;
    }
    NeeedsDirectiveFromHost = __decorate([
        di_1.Injectable(),
        __param(0, di_1.Host()), 
        __metadata('design:paramtypes', [SimpleDirective])
    ], NeeedsDirectiveFromHost);
    return NeeedsDirectiveFromHost;
})();
var NeedsDirectiveFromHostShadowDom = (function () {
    function NeedsDirectiveFromHostShadowDom(dependency) {
        this.dependency = dependency;
    }
    NeedsDirectiveFromHostShadowDom = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [SimpleDirective])
    ], NeedsDirectiveFromHostShadowDom);
    return NeedsDirectiveFromHostShadowDom;
})();
var NeedsService = (function () {
    function NeedsService(service) {
        this.service = service;
    }
    NeedsService = __decorate([
        di_1.Injectable(),
        __param(0, di_1.Inject("service")), 
        __metadata('design:paramtypes', [Object])
    ], NeedsService);
    return NeedsService;
})();
var NeedsServiceFromHost = (function () {
    function NeedsServiceFromHost(service) {
        this.service = service;
    }
    NeedsServiceFromHost = __decorate([
        di_1.Injectable(),
        __param(0, di_1.Host()),
        __param(0, di_1.Inject("service")), 
        __metadata('design:paramtypes', [Object])
    ], NeedsServiceFromHost);
    return NeedsServiceFromHost;
})();
var HasEventEmitter = (function () {
    function HasEventEmitter() {
        this.emitter = "emitter";
    }
    return HasEventEmitter;
})();
var HasHostAction = (function () {
    function HasHostAction() {
        this.hostActionName = "hostAction";
    }
    return HasHostAction;
})();
var NeedsAttribute = (function () {
    function NeedsAttribute(typeAttribute, titleAttribute, fooAttribute) {
        this.typeAttribute = typeAttribute;
        this.titleAttribute = titleAttribute;
        this.fooAttribute = fooAttribute;
    }
    NeedsAttribute = __decorate([
        __param(0, annotations_1.Attribute('type')),
        __param(1, annotations_1.Attribute('title')),
        __param(2, annotations_1.Attribute('foo')), 
        __metadata('design:paramtypes', [String, String, String])
    ], NeedsAttribute);
    return NeedsAttribute;
})();
var NeedsAttributeNoType = (function () {
    function NeedsAttributeNoType(fooAttribute) {
        this.fooAttribute = fooAttribute;
    }
    NeedsAttributeNoType = __decorate([
        di_1.Injectable(),
        __param(0, annotations_1.Attribute('foo')), 
        __metadata('design:paramtypes', [Object])
    ], NeedsAttributeNoType);
    return NeedsAttributeNoType;
})();
var NeedsQuery = (function () {
    function NeedsQuery(query) {
        this.query = query;
    }
    NeedsQuery = __decorate([
        di_1.Injectable(),
        __param(0, annotations_1.Query(CountingDirective)), 
        __metadata('design:paramtypes', [query_list_1.QueryList])
    ], NeedsQuery);
    return NeedsQuery;
})();
var NeedsQueryByVarBindings = (function () {
    function NeedsQueryByVarBindings(query) {
        this.query = query;
    }
    NeedsQueryByVarBindings = __decorate([
        di_1.Injectable(),
        __param(0, annotations_1.Query("one,two")), 
        __metadata('design:paramtypes', [query_list_1.QueryList])
    ], NeedsQueryByVarBindings);
    return NeedsQueryByVarBindings;
})();
var NeedsElementRef = (function () {
    function NeedsElementRef(ref) {
        this.elementRef = ref;
    }
    NeedsElementRef = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [element_ref_1.ElementRef])
    ], NeedsElementRef);
    return NeedsElementRef;
})();
var NeedsViewContainer = (function () {
    function NeedsViewContainer(vc) {
        this.viewContainer = vc;
    }
    NeedsViewContainer = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [view_container_ref_1.ViewContainerRef])
    ], NeedsViewContainer);
    return NeedsViewContainer;
})();
var NeedsTemplateRef = (function () {
    function NeedsTemplateRef(ref) {
        this.templateRef = ref;
    }
    NeedsTemplateRef = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [template_ref_1.TemplateRef])
    ], NeedsTemplateRef);
    return NeedsTemplateRef;
})();
var OptionallyInjectsTemplateRef = (function () {
    function OptionallyInjectsTemplateRef(ref) {
        this.templateRef = ref;
    }
    OptionallyInjectsTemplateRef = __decorate([
        di_1.Injectable(),
        __param(0, di_1.Optional()), 
        __metadata('design:paramtypes', [template_ref_1.TemplateRef])
    ], OptionallyInjectsTemplateRef);
    return OptionallyInjectsTemplateRef;
})();
var DirectiveNeedsChangeDetectorRef = (function () {
    function DirectiveNeedsChangeDetectorRef(cdr) {
        this.changeDetectorRef = cdr;
    }
    DirectiveNeedsChangeDetectorRef = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [change_detection_1.ChangeDetectorRef])
    ], DirectiveNeedsChangeDetectorRef);
    return DirectiveNeedsChangeDetectorRef;
})();
var ComponentNeedsChangeDetectorRef = (function () {
    function ComponentNeedsChangeDetectorRef(cdr) {
        this.changeDetectorRef = cdr;
    }
    ComponentNeedsChangeDetectorRef = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [change_detection_1.ChangeDetectorRef])
    ], ComponentNeedsChangeDetectorRef);
    return ComponentNeedsChangeDetectorRef;
})();
var A_Needs_B = (function () {
    function A_Needs_B(dep) {
    }
    return A_Needs_B;
})();
var B_Needs_A = (function () {
    function B_Needs_A(dep) {
    }
    return B_Needs_A;
})();
var DirectiveWithDestroy = (function () {
    function DirectiveWithDestroy() {
        this.onDestroyCounter = 0;
    }
    DirectiveWithDestroy.prototype.onDestroy = function () { this.onDestroyCounter++; };
    return DirectiveWithDestroy;
})();
var TestNode = (function (_super) {
    __extends(TestNode, _super);
    function TestNode(parent, message) {
        _super.call(this, parent);
        this.message = message;
    }
    TestNode.prototype.toString = function () { return this.message; };
    return TestNode;
})(element_injector_1.TreeNode);
function main() {
    var defaultPreBuiltObjects = new element_injector_1.PreBuiltObjects(null, new DummyView(), new DummyElementRef(), null);
    // An injector with more than 10 bindings will switch to the dynamic strategy
    var dynamicBindings = [];
    for (var i = 0; i < 20; i++) {
        dynamicBindings.push(di_1.bind(i).toValue(i));
    }
    function createPei(parent, index, bindings, distance, hasShadowRoot, dirVariableBindings) {
        if (distance === void 0) { distance = 1; }
        if (hasShadowRoot === void 0) { hasShadowRoot = false; }
        if (dirVariableBindings === void 0) { dirVariableBindings = null; }
        var directiveBinding = collection_1.ListWrapper.map(bindings, function (b) {
            if (b instanceof element_injector_1.DirectiveBinding)
                return b;
            if (b instanceof di_1.Binding)
                return element_injector_1.DirectiveBinding.createFromBinding(b, null);
            return element_injector_1.DirectiveBinding.createFromType(b, null);
        });
        return element_injector_1.ProtoElementInjector.create(parent, index, directiveBinding, hasShadowRoot, distance, dirVariableBindings);
    }
    function humanize(tree, names) {
        var lookupName = function (item) {
            return collection_1.ListWrapper.last(collection_1.ListWrapper.find(names, function (pair) { return pair[0] === item; }));
        };
        if (tree.children.length == 0)
            return lookupName(tree);
        var children = tree.children.map(function (m) { return humanize(m, names); });
        return [lookupName(tree), children];
    }
    function injector(bindings, imperativelyCreatedInjector, isComponent, preBuiltObjects, attributes, dirVariableBindings) {
        if (imperativelyCreatedInjector === void 0) { imperativelyCreatedInjector = null; }
        if (isComponent === void 0) { isComponent = false; }
        if (preBuiltObjects === void 0) { preBuiltObjects = null; }
        if (attributes === void 0) { attributes = null; }
        if (dirVariableBindings === void 0) { dirVariableBindings = null; }
        var proto = createPei(null, 0, bindings, 0, isComponent, dirVariableBindings);
        proto.attributes = attributes;
        var inj = proto.instantiate(null);
        var preBuilt = lang_1.isPresent(preBuiltObjects) ? preBuiltObjects : defaultPreBuiltObjects;
        inj.hydrate(imperativelyCreatedInjector, null, preBuilt);
        return inj;
    }
    function parentChildInjectors(parentBindings, childBindings, parentPreBuildObjects, imperativelyCreatedInjector) {
        if (parentPreBuildObjects === void 0) { parentPreBuildObjects = null; }
        if (imperativelyCreatedInjector === void 0) { imperativelyCreatedInjector = null; }
        if (lang_1.isBlank(parentPreBuildObjects))
            parentPreBuildObjects = defaultPreBuiltObjects;
        var protoParent = createPei(null, 0, parentBindings);
        var parent = protoParent.instantiate(null);
        parent.hydrate(null, null, parentPreBuildObjects);
        var protoChild = createPei(protoParent, 1, childBindings, 1, false);
        var child = protoChild.instantiate(parent);
        child.hydrate(imperativelyCreatedInjector, null, defaultPreBuiltObjects);
        return child;
    }
    function hostShadowInjectors(hostBindings, shadowBindings, imperativelyCreatedInjector) {
        if (imperativelyCreatedInjector === void 0) { imperativelyCreatedInjector = null; }
        var protoHost = createPei(null, 0, hostBindings, 0, true);
        var host = protoHost.instantiate(null);
        host.hydrate(null, null, defaultPreBuiltObjects);
        var protoShadow = createPei(null, 0, shadowBindings, 0, false);
        var shadow = protoShadow.instantiate(null);
        shadow.hydrate(imperativelyCreatedInjector, host, null);
        return shadow;
    }
    test_lib_1.describe('TreeNodes', function () {
        var root, firstParent, lastParent, node;
        /*
         Build a tree of the following shape:
         root
          - p1
             - c1
             - c2
          - p2
            - c3
         */
        test_lib_1.beforeEach(function () {
            root = new TestNode(null, 'root');
            var p1 = firstParent = new TestNode(root, 'p1');
            var p2 = lastParent = new TestNode(root, 'p2');
            node = new TestNode(p1, 'c1');
            new TestNode(p1, 'c2');
            new TestNode(p2, 'c3');
        });
        // depth-first pre-order.
        function walk(node, f) {
            if (lang_1.isBlank(node))
                return f;
            f(node);
            collection_1.ListWrapper.forEach(node.children, function (n) { return walk(n, f); });
        }
        function logWalk(node) {
            var log = '';
            walk(node, function (n) { log += (log.length != 0 ? ', ' : '') + n.toString(); });
            return log;
        }
        test_lib_1.it('should support listing children', function () { test_lib_1.expect(logWalk(root)).toEqual('root, p1, c1, c2, p2, c3'); });
        test_lib_1.it('should support removing the first child node', function () {
            firstParent.remove();
            test_lib_1.expect(firstParent.parent).toEqual(null);
            test_lib_1.expect(logWalk(root)).toEqual('root, p2, c3');
        });
        test_lib_1.it('should support removing the last child node', function () {
            lastParent.remove();
            test_lib_1.expect(logWalk(root)).toEqual('root, p1, c1, c2');
        });
        test_lib_1.it('should support moving a node at the end of children', function () {
            node.remove();
            root.addChild(node);
            test_lib_1.expect(logWalk(root)).toEqual('root, p1, c2, p2, c3, c1');
        });
        test_lib_1.it('should support moving a node in the beginning of children', function () {
            node.remove();
            lastParent.addChildAfter(node, null);
            test_lib_1.expect(logWalk(root)).toEqual('root, p1, c2, p2, c1, c3');
        });
        test_lib_1.it('should support moving a node in the middle of children', function () {
            node.remove();
            lastParent.addChildAfter(node, firstParent);
            test_lib_1.expect(logWalk(root)).toEqual('root, p1, c2, c1, p2, c3');
        });
    });
    test_lib_1.describe("ProtoElementInjector", function () {
        test_lib_1.describe("direct parent", function () {
            test_lib_1.it("should return parent proto injector when distance is 1", function () {
                var distance = 1;
                var protoParent = createPei(null, 0, []);
                var protoChild = createPei(protoParent, 0, [], distance, false);
                test_lib_1.expect(protoChild.directParent()).toEqual(protoParent);
            });
            test_lib_1.it("should return null otherwise", function () {
                var distance = 2;
                var protoParent = createPei(null, 0, []);
                var protoChild = createPei(protoParent, 0, [], distance, false);
                test_lib_1.expect(protoChild.directParent()).toEqual(null);
            });
        });
        test_lib_1.describe('inline strategy', function () {
            test_lib_1.it("should allow for direct access using getBindingAtIndex", function () {
                var proto = createPei(null, 0, [di_1.bind(SimpleDirective).toClass(SimpleDirective)]);
                test_lib_1.expect(proto.getBindingAtIndex(0)).toBeAnInstanceOf(element_injector_1.DirectiveBinding);
                test_lib_1.expect(function () { return proto.getBindingAtIndex(-1); }).toThrowError('Index -1 is out-of-bounds.');
                test_lib_1.expect(function () { return proto.getBindingAtIndex(10); }).toThrowError('Index 10 is out-of-bounds.');
            });
        });
        test_lib_1.describe('dynamic strategy', function () {
            test_lib_1.it("should allow for direct access using getBindingAtIndex", function () {
                var proto = createPei(null, 0, dynamicBindings);
                test_lib_1.expect(proto.getBindingAtIndex(0)).toBeAnInstanceOf(element_injector_1.DirectiveBinding);
                test_lib_1.expect(function () { return proto.getBindingAtIndex(-1); }).toThrowError('Index -1 is out-of-bounds.');
                test_lib_1.expect(function () { return proto.getBindingAtIndex(dynamicBindings.length - 1); }).not.toThrow();
                test_lib_1.expect(function () { return proto.getBindingAtIndex(dynamicBindings.length); })
                    .toThrowError("Index " + dynamicBindings.length + " is out-of-bounds.");
            });
        });
        test_lib_1.describe('event emitters', function () {
            test_lib_1.it('should return a list of event accessors', function () {
                var binding = element_injector_1.DirectiveBinding.createFromType(HasEventEmitter, new dirAnn.Directive({ events: ['emitter'] }));
                var inj = createPei(null, 0, [binding]);
                test_lib_1.expect(inj.eventEmitterAccessors.length).toEqual(1);
                var accessor = inj.eventEmitterAccessors[0][0];
                test_lib_1.expect(accessor.eventName).toEqual('emitter');
                test_lib_1.expect(accessor.getter(new HasEventEmitter())).toEqual('emitter');
            });
            test_lib_1.it('should allow a different event vs field name', function () {
                var binding = element_injector_1.DirectiveBinding.createFromType(HasEventEmitter, new dirAnn.Directive({ events: ['emitter: publicEmitter'] }));
                var inj = createPei(null, 0, [binding]);
                test_lib_1.expect(inj.eventEmitterAccessors.length).toEqual(1);
                var accessor = inj.eventEmitterAccessors[0][0];
                test_lib_1.expect(accessor.eventName).toEqual('publicEmitter');
                test_lib_1.expect(accessor.getter(new HasEventEmitter())).toEqual('emitter');
            });
            test_lib_1.it('should return a list of hostAction accessors', function () {
                var binding = element_injector_1.DirectiveBinding.createFromType(HasEventEmitter, new dirAnn.Directive({ host: { '@hostActionName': 'onAction' } }));
                var inj = createPei(null, 0, [binding]);
                test_lib_1.expect(inj.hostActionAccessors.length).toEqual(1);
                var accessor = inj.hostActionAccessors[0][0];
                test_lib_1.expect(accessor.methodName).toEqual('onAction');
                test_lib_1.expect(accessor.getter(new HasHostAction())).toEqual('hostAction');
            });
        });
        test_lib_1.describe(".create", function () {
            test_lib_1.it("should collect bindings from all directives", function () {
                var pei = createPei(null, 0, [
                    element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Component({ bindings: [di_1.bind('injectable1').toValue('injectable1')] })),
                    element_injector_1.DirectiveBinding.createFromType(SomeOtherDirective, new dirAnn.Component({
                        bindings: [di_1.bind('injectable2').toValue('injectable2')]
                    }))
                ]);
                test_lib_1.expect(pei.getBindingAtIndex(0).key.token).toBe(SimpleDirective);
                test_lib_1.expect(pei.getBindingAtIndex(1).key.token).toBe(SomeOtherDirective);
                test_lib_1.expect(pei.getBindingAtIndex(2).key.token).toEqual("injectable1");
                test_lib_1.expect(pei.getBindingAtIndex(3).key.token).toEqual("injectable2");
            });
            test_lib_1.it("should collect view bindings from the component", function () {
                var pei = createPei(null, 0, [element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Component({
                        viewBindings: [di_1.bind('injectable1').toValue('injectable1')]
                    }))], 0, true);
                test_lib_1.expect(pei.getBindingAtIndex(0).key.token).toBe(SimpleDirective);
                test_lib_1.expect(pei.getBindingAtIndex(1).key.token).toEqual("injectable1");
            });
            test_lib_1.it("should flatten nested arrays", function () {
                var pei = createPei(null, 0, [
                    element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Component({
                        viewBindings: [[[di_1.bind('view').toValue('view')]]],
                        bindings: [[[di_1.bind('host').toValue('host')]]]
                    }))
                ], 0, true);
                test_lib_1.expect(pei.getBindingAtIndex(0).key.token).toBe(SimpleDirective);
                test_lib_1.expect(pei.getBindingAtIndex(1).key.token).toEqual("view");
                test_lib_1.expect(pei.getBindingAtIndex(2).key.token).toEqual("host");
            });
            test_lib_1.it('should support an arbitrary number of bindings', function () {
                var pei = createPei(null, 0, dynamicBindings);
                for (var i = 0; i < dynamicBindings.length; i++) {
                    test_lib_1.expect(pei.getBindingAtIndex(i).key.token).toBe(i);
                }
            });
        });
    });
    test_lib_1.describe("ElementInjector", function () {
        test_lib_1.describe("instantiate", function () {
            test_lib_1.it("should create an element injector", function () {
                var protoParent = createPei(null, 0, []);
                var protoChild1 = createPei(protoParent, 1, []);
                var protoChild2 = createPei(protoParent, 2, []);
                var p = protoParent.instantiate(null);
                var c1 = protoChild1.instantiate(p);
                var c2 = protoChild2.instantiate(p);
                test_lib_1.expect(humanize(p, [[p, 'parent'], [c1, 'child1'], [c2, 'child2']]))
                    .toEqual(["parent", ["child1", "child2"]]);
            });
            test_lib_1.describe("direct parent", function () {
                test_lib_1.it("should return parent injector when distance is 1", function () {
                    var distance = 1;
                    var protoParent = createPei(null, 0, []);
                    var protoChild = createPei(protoParent, 1, [], distance);
                    var p = protoParent.instantiate(null);
                    var c = protoChild.instantiate(p);
                    test_lib_1.expect(c.directParent()).toEqual(p);
                });
                test_lib_1.it("should return null otherwise", function () {
                    var distance = 2;
                    var protoParent = createPei(null, 0, []);
                    var protoChild = createPei(protoParent, 1, [], distance);
                    var p = protoParent.instantiate(null);
                    var c = protoChild.instantiate(p);
                    test_lib_1.expect(c.directParent()).toEqual(null);
                });
            });
        });
        test_lib_1.describe("hasBindings", function () {
            test_lib_1.it("should be true when there are bindings", function () {
                var p = createPei(null, 0, [SimpleDirective]);
                test_lib_1.expect(p.hasBindings).toBeTruthy();
            });
            test_lib_1.it("should be false otherwise", function () {
                var p = createPei(null, 0, []);
                test_lib_1.expect(p.hasBindings).toBeFalsy();
            });
        });
        test_lib_1.describe("hasInstances", function () {
            test_lib_1.it("should be false when no directives are instantiated", function () { test_lib_1.expect(injector([]).hasInstances()).toBe(false); });
            test_lib_1.it("should be true when directives are instantiated", function () { test_lib_1.expect(injector([SimpleDirective]).hasInstances()).toBe(true); });
        });
        [{ strategy: 'inline', bindings: [] }, { strategy: 'dynamic',
                bindings: dynamicBindings }].forEach(function (context) {
            var extraBindings = context['bindings'];
            test_lib_1.describe(context['strategy'] + " strategy", function () {
                test_lib_1.describe("hydrate", function () {
                    test_lib_1.it("should instantiate directives that have no dependencies", function () {
                        var bindings = collection_1.ListWrapper.concat([SimpleDirective], extraBindings);
                        var inj = injector(bindings);
                        test_lib_1.expect(inj.get(SimpleDirective)).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should instantiate directives that depend on an arbitrary number of directives", function () {
                        var bindings = collection_1.ListWrapper.concat([SimpleDirective, NeedsDirective], extraBindings);
                        var inj = injector(bindings);
                        var d = inj.get(NeedsDirective);
                        test_lib_1.expect(d).toBeAnInstanceOf(NeedsDirective);
                        test_lib_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should instantiate bindings that have dependencies with set visibility", function () {
                        var childInj = parentChildInjectors(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Component({
                                bindings: [di_1.bind('injectable1').toValue('injectable1')]
                            }))], extraBindings), [element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Component({
                                bindings: [
                                    di_1.bind('injectable1')
                                        .toValue('new-injectable1'),
                                    di_1.bind('injectable2')
                                        .toFactory(function (val) { return (val + "-injectable2"); }, [[new di_1.InjectMetadata('injectable1'), new di_1.SkipSelfMetadata()]])
                                ]
                            }))]);
                        test_lib_1.expect(childInj.get('injectable2')).toEqual('injectable1-injectable2');
                    });
                    test_lib_1.it("should instantiate bindings that have dependencies", function () {
                        var bindings = [
                            di_1.bind('injectable1')
                                .toValue('injectable1'),
                            di_1.bind('injectable2')
                                .toFactory(function (val) { return (val + "-injectable2"); }, ['injectable1'])
                        ];
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Directive({ bindings: bindings }))], extraBindings));
                        test_lib_1.expect(inj.get('injectable2')).toEqual('injectable1-injectable2');
                    });
                    test_lib_1.it("should instantiate viewBindings that have dependencies", function () {
                        var viewBindings = [
                            di_1.bind('injectable1')
                                .toValue('injectable1'),
                            di_1.bind('injectable2')
                                .toFactory(function (val) { return (val + "-injectable2"); }, ['injectable1'])
                        ];
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Component({
                                viewBindings: viewBindings }))], extraBindings), null, true);
                        test_lib_1.expect(inj.get('injectable2')).toEqual('injectable1-injectable2');
                    });
                    test_lib_1.it("should instantiate components that depend on viewBindings bindings", function () {
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(NeedsService, new dirAnn.Component({
                                viewBindings: [di_1.bind('service').toValue('service')]
                            }))], extraBindings), null, true);
                        test_lib_1.expect(inj.get(NeedsService).service).toEqual('service');
                    });
                    test_lib_1.it("should instantiate bindings lazily", function () {
                        var created = false;
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Component({
                                bindings: [di_1.bind('service').toFactory(function () { return created = true; })]
                            }))], extraBindings), null, true);
                        test_lib_1.expect(created).toBe(false);
                        inj.get('service');
                        test_lib_1.expect(created).toBe(true);
                    });
                    test_lib_1.it("should instantiate view bindings lazily", function () {
                        var created = false;
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Component({
                                viewBindings: [di_1.bind('service').toFactory(function () { return created = true; })]
                            }))], extraBindings), null, true);
                        test_lib_1.expect(created).toBe(false);
                        inj.get('service');
                        test_lib_1.expect(created).toBe(true);
                    });
                    test_lib_1.it("should not instantiate other directives that depend on viewBindings bindings", function () {
                        var directiveAnnotation = new dirAnn.Component({
                            viewBindings: collection_1.ListWrapper.concat([di_1.bind("service").toValue("service")], extraBindings)
                        });
                        var componentDirective = element_injector_1.DirectiveBinding.createFromType(SimpleDirective, directiveAnnotation);
                        test_lib_1.expect(function () { injector([componentDirective, NeedsService], null); })
                            .toThrowError(test_lib_1.containsRegexp("No provider for service! (" + lang_1.stringify(NeedsService) + " -> service)"));
                    });
                    test_lib_1.it("should instantiate directives that depend on bindings bindings of other directives", function () {
                        var shadowInj = hostShadowInjectors(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Component({
                                bindings: [di_1.bind('service').toValue('hostService')] }))], extraBindings), collection_1.ListWrapper.concat([NeedsService], extraBindings));
                        test_lib_1.expect(shadowInj.get(NeedsService).service).toEqual('hostService');
                    });
                    test_lib_1.it("should instantiate directives that depend on imperatively created injector bindings (bootstrap)", function () {
                        var imperativelyCreatedInjector = di_1.Injector.resolveAndCreate([
                            di_1.bind("service").toValue('appService')
                        ]);
                        var inj = injector([NeedsService], imperativelyCreatedInjector);
                        test_lib_1.expect(inj.get(NeedsService).service).toEqual('appService');
                        test_lib_1.expect(function () { return injector([NeedsServiceFromHost], imperativelyCreatedInjector); }).toThrowError();
                    });
                    test_lib_1.it("should instantiate directives that depend on imperatively created injector bindings (root injector)", function () {
                        var imperativelyCreatedInjector = di_1.Injector.resolveAndCreate([
                            di_1.bind("service").toValue('appService')
                        ]);
                        var inj = hostShadowInjectors([SimpleDirective], [NeedsService, NeedsServiceFromHost], imperativelyCreatedInjector);
                        test_lib_1.expect(inj.get(NeedsService).service).toEqual('appService');
                        test_lib_1.expect(inj.get(NeedsServiceFromHost).service).toEqual('appService');
                    });
                    test_lib_1.it("should instantiate directives that depend on imperatively created injector bindings (child injector)", function () {
                        var imperativelyCreatedInjector = di_1.Injector.resolveAndCreate([
                            di_1.bind("service").toValue('appService')
                        ]);
                        var inj = parentChildInjectors([], [NeedsService, NeedsServiceFromHost], null, imperativelyCreatedInjector);
                        test_lib_1.expect(inj.get(NeedsService).service).toEqual('appService');
                        test_lib_1.expect(inj.get(NeedsServiceFromHost).service).toEqual('appService');
                    });
                    test_lib_1.it("should prioritize viewBindings over bindings for the same binding", function () {
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(NeedsService, new dirAnn.Component({
                                bindings: [di_1.bind('service').toValue('hostService')],
                                viewBindings: [di_1.bind('service').toValue('viewService')] }))], extraBindings), null, true);
                        test_lib_1.expect(inj.get(NeedsService).service).toEqual('viewService');
                    });
                    test_lib_1.it("should not instantiate a directive in a view that has an ancestor dependency on bindings" +
                        " bindings of a decorator directive", function () {
                        test_lib_1.expect(function () {
                            hostShadowInjectors(collection_1.ListWrapper.concat([
                                SimpleDirective,
                                element_injector_1.DirectiveBinding.createFromType(SomeOtherDirective, new dirAnn.Directive({
                                    bindings: [di_1.bind('service').toValue('hostService')] }))], extraBindings), collection_1.ListWrapper.concat([NeedsServiceFromHost], extraBindings));
                        }).toThrowError(new RegExp("No provider for service!"));
                    });
                    test_lib_1.it("should instantiate directives that depend on pre built objects", function () {
                        var templateRef = new template_ref_1.TemplateRef(new DummyElementRef());
                        var bindings = collection_1.ListWrapper.concat([NeedsTemplateRef], extraBindings);
                        var inj = injector(bindings, null, false, new element_injector_1.PreBuiltObjects(null, null, null, templateRef));
                        test_lib_1.expect(inj.get(NeedsTemplateRef).templateRef).toEqual(templateRef);
                    });
                    test_lib_1.it("should get directives", function () {
                        var child = hostShadowInjectors(collection_1.ListWrapper.concat([SomeOtherDirective, SimpleDirective], extraBindings), [NeedsDirectiveFromHostShadowDom]);
                        var d = child.get(NeedsDirectiveFromHostShadowDom);
                        test_lib_1.expect(d).toBeAnInstanceOf(NeedsDirectiveFromHostShadowDom);
                        test_lib_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should get directives from the host", function () {
                        var child = parentChildInjectors(collection_1.ListWrapper.concat([SimpleDirective], extraBindings), [NeeedsDirectiveFromHost]);
                        var d = child.get(NeeedsDirectiveFromHost);
                        test_lib_1.expect(d).toBeAnInstanceOf(NeeedsDirectiveFromHost);
                        test_lib_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should throw when a dependency cannot be resolved", function () {
                        test_lib_1.expect(function () { return injector(collection_1.ListWrapper.concat([NeeedsDirectiveFromHost], extraBindings)); })
                            .toThrowError(test_lib_1.containsRegexp("No provider for " + lang_1.stringify(SimpleDirective) + "! (" + lang_1.stringify(NeeedsDirectiveFromHost) + " -> " + lang_1.stringify(SimpleDirective) + ")"));
                    });
                    test_lib_1.it("should inject null when an optional dependency cannot be resolved", function () {
                        var inj = injector(collection_1.ListWrapper.concat([OptionallyNeedsDirective], extraBindings));
                        var d = inj.get(OptionallyNeedsDirective);
                        test_lib_1.expect(d.dependency).toEqual(null);
                    });
                    test_lib_1.it("should accept bindings instead of types", function () {
                        var inj = injector(collection_1.ListWrapper.concat([di_1.bind(SimpleDirective).toClass(SimpleDirective)], extraBindings));
                        test_lib_1.expect(inj.get(SimpleDirective)).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should allow for direct access using getDirectiveAtIndex", function () {
                        var bindings = collection_1.ListWrapper.concat([di_1.bind(SimpleDirective).toClass(SimpleDirective)], extraBindings);
                        var inj = injector(bindings);
                        var firsIndexOut = bindings.length > 10 ? bindings.length : 10;
                        test_lib_1.expect(inj.getDirectiveAtIndex(0)).toBeAnInstanceOf(SimpleDirective);
                        test_lib_1.expect(function () { return inj.getDirectiveAtIndex(-1); }).toThrowError('Index -1 is out-of-bounds.');
                        test_lib_1.expect(function () { return inj.getDirectiveAtIndex(firsIndexOut); })
                            .toThrowError("Index " + firsIndexOut + " is out-of-bounds.");
                    });
                    test_lib_1.it("should instantiate directives that depend on the containing component", function () {
                        var directiveBinding = element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Component());
                        var shadow = hostShadowInjectors(collection_1.ListWrapper.concat([directiveBinding], extraBindings), [NeeedsDirectiveFromHost]);
                        var d = shadow.get(NeeedsDirectiveFromHost);
                        test_lib_1.expect(d).toBeAnInstanceOf(NeeedsDirectiveFromHost);
                        test_lib_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should not instantiate directives that depend on other directives in the containing component's ElementInjector", function () {
                        var directiveBinding = element_injector_1.DirectiveBinding.createFromType(SomeOtherDirective, new dirAnn.Component());
                        test_lib_1.expect(function () {
                            hostShadowInjectors(collection_1.ListWrapper.concat([directiveBinding, SimpleDirective], extraBindings), [NeedsDirective]);
                        })
                            .toThrowError(test_lib_1.containsRegexp("No provider for " + lang_1.stringify(SimpleDirective) + "! (" + lang_1.stringify(NeedsDirective) + " -> " + lang_1.stringify(SimpleDirective) + ")"));
                    });
                });
                test_lib_1.describe("lifecycle", function () {
                    test_lib_1.it("should call onDestroy on directives subscribed to this event", function () {
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(DirectiveWithDestroy, new dirAnn.Directive({ lifecycle: [annotations_1.LifecycleEvent.onDestroy] }))], extraBindings));
                        var destroy = inj.get(DirectiveWithDestroy);
                        inj.dehydrate();
                        test_lib_1.expect(destroy.onDestroyCounter).toBe(1);
                    });
                    test_lib_1.it("should work with services", function () {
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Directive({ bindings: [SimpleService] }))], extraBindings));
                        inj.dehydrate();
                    });
                    test_lib_1.it("should notify queries", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                        var inj = injector(collection_1.ListWrapper.concat([NeedsQuery], extraBindings));
                        var query = inj.get(NeedsQuery).query;
                        query.add(new CountingDirective()); // this marks the query as dirty
                        query.onChange(function () { return async.done(); });
                        inj.onAllChangesDone();
                    }));
                    test_lib_1.it("should not notify inherited queries", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                        var child = parentChildInjectors(collection_1.ListWrapper.concat([NeedsQuery], extraBindings), []);
                        var query = child.parent.get(NeedsQuery).query;
                        var calledOnChange = false;
                        query.onChange(function () {
                            // make sure the callback is called only once
                            test_lib_1.expect(calledOnChange).toEqual(false);
                            test_lib_1.expect(query.length).toEqual(2);
                            calledOnChange = true;
                            async.done();
                        });
                        query.add(new CountingDirective());
                        child.onAllChangesDone(); // this does not notify the query
                        query.add(new CountingDirective());
                        child.parent.onAllChangesDone();
                    }));
                });
                test_lib_1.describe('static attributes', function () {
                    test_lib_1.it('should be injectable', function () {
                        var attributes = new Map();
                        attributes.set('type', 'text');
                        attributes.set('title', '');
                        var inj = injector(collection_1.ListWrapper.concat([NeedsAttribute], extraBindings), null, false, null, attributes);
                        var needsAttribute = inj.get(NeedsAttribute);
                        test_lib_1.expect(needsAttribute.typeAttribute).toEqual('text');
                        test_lib_1.expect(needsAttribute.titleAttribute).toEqual('');
                        test_lib_1.expect(needsAttribute.fooAttribute).toEqual(null);
                    });
                    test_lib_1.it('should be injectable without type annotation', function () {
                        var attributes = new Map();
                        attributes.set('foo', 'bar');
                        var inj = injector(collection_1.ListWrapper.concat([NeedsAttributeNoType], extraBindings), null, false, null, attributes);
                        var needsAttribute = inj.get(NeedsAttributeNoType);
                        test_lib_1.expect(needsAttribute.fooAttribute).toEqual('bar');
                    });
                });
                test_lib_1.describe("refs", function () {
                    test_lib_1.it("should inject ElementRef", function () {
                        var inj = injector(collection_1.ListWrapper.concat([NeedsElementRef], extraBindings));
                        test_lib_1.expect(inj.get(NeedsElementRef).elementRef).toBe(defaultPreBuiltObjects.elementRef);
                    });
                    test_lib_1.it("should inject ChangeDetectorRef of the component's view into the component", function () {
                        var cd = new change_detection_1.DynamicChangeDetector(null, null, null, [], []);
                        var view = new DummyView();
                        var childView = new DummyView();
                        childView.changeDetector = cd;
                        view.spy('getNestedView').andReturn(childView);
                        var binding = element_injector_1.DirectiveBinding.createFromType(ComponentNeedsChangeDetectorRef, new dirAnn.Component());
                        var inj = injector(collection_1.ListWrapper.concat([binding], extraBindings), null, true, new element_injector_1.PreBuiltObjects(null, view, new DummyElementRef(), null));
                        test_lib_1.expect(inj.get(ComponentNeedsChangeDetectorRef).changeDetectorRef).toBe(cd.ref);
                    });
                    test_lib_1.it("should inject ChangeDetectorRef of the containing component into directives", function () {
                        var cd = new change_detection_1.DynamicChangeDetector(null, null, null, [], []);
                        var view = new DummyView();
                        view.changeDetector = cd;
                        var binding = element_injector_1.DirectiveBinding.createFromType(DirectiveNeedsChangeDetectorRef, new dirAnn.Directive());
                        var inj = injector(collection_1.ListWrapper.concat([binding], extraBindings), null, false, new element_injector_1.PreBuiltObjects(null, view, new DummyElementRef(), null));
                        test_lib_1.expect(inj.get(DirectiveNeedsChangeDetectorRef).changeDetectorRef).toBe(cd.ref);
                    });
                    test_lib_1.it('should inject ViewContainerRef', function () {
                        var inj = injector(collection_1.ListWrapper.concat([NeedsViewContainer], extraBindings));
                        test_lib_1.expect(inj.get(NeedsViewContainer).viewContainer).toBeAnInstanceOf(view_container_ref_1.ViewContainerRef);
                    });
                    test_lib_1.it("should inject TemplateRef", function () {
                        var templateRef = new template_ref_1.TemplateRef(new DummyElementRef());
                        var inj = injector(collection_1.ListWrapper.concat([NeedsTemplateRef], extraBindings), null, false, new element_injector_1.PreBuiltObjects(null, null, null, templateRef));
                        test_lib_1.expect(inj.get(NeedsTemplateRef).templateRef).toEqual(templateRef);
                    });
                    test_lib_1.it("should throw if there is no TemplateRef", function () {
                        test_lib_1.expect(function () { return injector(collection_1.ListWrapper.concat([NeedsTemplateRef], extraBindings)); })
                            .toThrowError("No provider for TemplateRef! (" + lang_1.stringify(NeedsTemplateRef) + " -> TemplateRef)");
                    });
                    test_lib_1.it('should inject null if there is no TemplateRef when the dependency is optional', function () {
                        var inj = injector(collection_1.ListWrapper.concat([OptionallyInjectsTemplateRef], extraBindings));
                        var instance = inj.get(OptionallyInjectsTemplateRef);
                        test_lib_1.expect(instance.templateRef).toBeNull();
                    });
                });
                test_lib_1.describe('queries', function () {
                    var preBuildObjects = defaultPreBuiltObjects;
                    test_lib_1.beforeEach(function () { _constructionCount = 0; });
                    function expectDirectives(query, type, expectedIndex) {
                        var currentCount = 0;
                        collection_1.iterateListLike(query, function (i) {
                            test_lib_1.expect(i).toBeAnInstanceOf(type);
                            test_lib_1.expect(i.count).toBe(expectedIndex[currentCount]);
                            currentCount += 1;
                        });
                    }
                    test_lib_1.it('should be injectable', function () {
                        var inj = injector(collection_1.ListWrapper.concat([NeedsQuery], extraBindings), null, false, preBuildObjects);
                        test_lib_1.expect(inj.get(NeedsQuery).query).toBeAnInstanceOf(query_list_1.QueryList);
                    });
                    test_lib_1.it('should contain directives on the same injector', function () {
                        var inj = injector(collection_1.ListWrapper.concat([
                            NeedsQuery,
                            CountingDirective
                        ], extraBindings), null, false, preBuildObjects);
                        expectDirectives(inj.get(NeedsQuery).query, CountingDirective, [0]);
                    });
                    test_lib_1.it('should contain multiple directives from the same injector', function () {
                        var inj = injector(collection_1.ListWrapper.concat([
                            NeedsQuery,
                            CountingDirective,
                            FancyCountingDirective,
                            di_1.bind(CountingDirective).toAlias(FancyCountingDirective)
                        ], extraBindings), null, false, preBuildObjects);
                        test_lib_1.expect(inj.get(NeedsQuery).query.length).toEqual(2);
                        test_lib_1.expect(inj.get(NeedsQuery).query.first).toBeAnInstanceOf(CountingDirective);
                        test_lib_1.expect(inj.get(NeedsQuery).query.last).toBeAnInstanceOf(FancyCountingDirective);
                    });
                    test_lib_1.it('should contain multiple directives from the same injector after linking', function () {
                        var inj = parentChildInjectors([], collection_1.ListWrapper.concat([
                            NeedsQuery,
                            CountingDirective,
                            FancyCountingDirective,
                            di_1.bind(CountingDirective).toAlias(FancyCountingDirective)
                        ], extraBindings));
                        var parent = inj.parent;
                        inj.unlink();
                        inj.link(parent);
                        test_lib_1.expect(inj.get(NeedsQuery).query.length).toEqual(2);
                        test_lib_1.expect(inj.get(NeedsQuery).query.first).toBeAnInstanceOf(CountingDirective);
                        test_lib_1.expect(inj.get(NeedsQuery).query.last).toBeAnInstanceOf(FancyCountingDirective);
                    });
                    test_lib_1.it('should contain the element when no directives are bound to the var binding', function () {
                        var dirs = [NeedsQueryByVarBindings];
                        var dirVariableBindings = collection_1.MapWrapper.createFromStringMap({
                            "one": null // element
                        });
                        var inj = injector(collection_1.ListWrapper.concat(dirs, extraBindings), null, false, preBuildObjects, null, dirVariableBindings);
                        test_lib_1.expect(inj.get(NeedsQueryByVarBindings).query.first).toBe(defaultPreBuiltObjects.elementRef);
                    });
                    test_lib_1.it('should contain directives on the same injector when querying by variable bindings' +
                        'in the order of var bindings specified in the query', function () {
                        var dirs = [NeedsQueryByVarBindings, NeedsDirective, SimpleDirective];
                        var dirVariableBindings = collection_1.MapWrapper.createFromStringMap({
                            "one": 2,
                            "two": 1 // 1 is the index of NeedsDirective
                        });
                        var inj = injector(collection_1.ListWrapper.concat(dirs, extraBindings), null, false, preBuildObjects, null, dirVariableBindings);
                        // NeedsQueryByVarBindings queries "one,two", so SimpleDirective should be before NeedsDirective
                        test_lib_1.expect(inj.get(NeedsQueryByVarBindings).query.first).toBeAnInstanceOf(SimpleDirective);
                        test_lib_1.expect(inj.get(NeedsQueryByVarBindings).query.last).toBeAnInstanceOf(NeedsDirective);
                    });
                    // Dart's restriction on static types in (a is A) makes this feature hard to implement.
                    // Current proposal is to add second parameter the Query constructor to take a
                    // comparison function to support user-defined definition of matching.
                    //it('should support super class directives', () => {
                    //  var inj = injector([NeedsQuery, FancyCountingDirective], null, null, preBuildObjects);
                    //
                    //  expectDirectives(inj.get(NeedsQuery).query, FancyCountingDirective, [0]);
                    //});
                    test_lib_1.it('should contain directives on the same and a child injector in construction order', function () {
                        var protoParent = createPei(null, 0, [NeedsQuery, CountingDirective]);
                        var protoChild = createPei(protoParent, 1, collection_1.ListWrapper.concat([CountingDirective], extraBindings));
                        var parent = protoParent.instantiate(null);
                        var child = protoChild.instantiate(parent);
                        parent.hydrate(null, null, preBuildObjects);
                        child.hydrate(null, null, preBuildObjects);
                        expectDirectives(parent.get(NeedsQuery).query, CountingDirective, [0, 1]);
                    });
                    test_lib_1.it('should reflect unlinking an injector', function () {
                        var protoParent = createPei(null, 0, [NeedsQuery, CountingDirective]);
                        var protoChild = createPei(protoParent, 1, collection_1.ListWrapper.concat([CountingDirective], extraBindings));
                        var parent = protoParent.instantiate(null);
                        var child = protoChild.instantiate(parent);
                        parent.hydrate(null, null, preBuildObjects);
                        child.hydrate(null, null, preBuildObjects);
                        child.unlink();
                        expectDirectives(parent.get(NeedsQuery).query, CountingDirective, [0]);
                    });
                    test_lib_1.it('should reflect moving an injector as a last child', function () {
                        var protoParent = createPei(null, 0, [NeedsQuery, CountingDirective]);
                        var protoChild1 = createPei(protoParent, 1, [CountingDirective]);
                        var protoChild2 = createPei(protoParent, 1, collection_1.ListWrapper.concat([CountingDirective], extraBindings));
                        var parent = protoParent.instantiate(null);
                        var child1 = protoChild1.instantiate(parent);
                        var child2 = protoChild2.instantiate(parent);
                        parent.hydrate(null, null, preBuildObjects);
                        child1.hydrate(null, null, preBuildObjects);
                        child2.hydrate(null, null, preBuildObjects);
                        child1.unlink();
                        child1.link(parent);
                        var queryList = parent.get(NeedsQuery).query;
                        expectDirectives(queryList, CountingDirective, [0, 2, 1]);
                    });
                    test_lib_1.it('should reflect moving an injector as a first child', function () {
                        var protoParent = createPei(null, 0, [NeedsQuery, CountingDirective]);
                        var protoChild1 = createPei(protoParent, 1, [CountingDirective]);
                        var protoChild2 = createPei(protoParent, 1, collection_1.ListWrapper.concat([CountingDirective], extraBindings));
                        var parent = protoParent.instantiate(null);
                        var child1 = protoChild1.instantiate(parent);
                        var child2 = protoChild2.instantiate(parent);
                        parent.hydrate(null, null, preBuildObjects);
                        child1.hydrate(null, null, preBuildObjects);
                        child2.hydrate(null, null, preBuildObjects);
                        child2.unlink();
                        child2.linkAfter(parent, null);
                        var queryList = parent.get(NeedsQuery).query;
                        expectDirectives(queryList, CountingDirective, [0, 2, 1]);
                    });
                    test_lib_1.it('should support two concurrent queries for the same directive', function () {
                        var protoGrandParent = createPei(null, 0, [NeedsQuery]);
                        var protoParent = createPei(null, 0, [NeedsQuery]);
                        var protoChild = createPei(protoParent, 1, collection_1.ListWrapper.concat([CountingDirective], extraBindings));
                        var grandParent = protoGrandParent.instantiate(null);
                        var parent = protoParent.instantiate(grandParent);
                        var child = protoChild.instantiate(parent);
                        grandParent.hydrate(null, null, preBuildObjects);
                        parent.hydrate(null, null, preBuildObjects);
                        child.hydrate(null, null, preBuildObjects);
                        var queryList1 = grandParent.get(NeedsQuery).query;
                        var queryList2 = parent.get(NeedsQuery).query;
                        expectDirectives(queryList1, CountingDirective, [0]);
                        expectDirectives(queryList2, CountingDirective, [0]);
                        child.unlink();
                        expectDirectives(queryList1, CountingDirective, []);
                        expectDirectives(queryList2, CountingDirective, []);
                    });
                });
            });
        });
    });
}
exports.main = main;
var ContextWithHandler = (function () {
    function ContextWithHandler(handler) {
        this.handler = handler;
    }
    return ContextWithHandler;
})();
//# sourceMappingURL=element_injector_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
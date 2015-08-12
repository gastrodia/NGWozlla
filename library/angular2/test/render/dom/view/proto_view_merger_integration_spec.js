'use strict';var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/facade/lang');
var dom_testbed_1 = require('../dom_testbed');
var api_1 = require('angular2/src/render/api');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var util_1 = require('angular2/src/render/dom/util');
var template_cloner_1 = require('angular2/src/render/dom/template_cloner');
var proto_view_1 = require('angular2/src/render/dom/view/proto_view');
var proto_view_builder_1 = require('angular2/src/render/dom/view/proto_view_builder');
var element_schema_registry_1 = require('angular2/src/render/dom/schema/element_schema_registry');
function main() {
    test_lib_1.describe('ProtoViewMerger integration test', function () {
        test_lib_1.beforeEachBindings(function () { return [dom_testbed_1.DomTestbed]; });
        test_lib_1.describe('component views', function () {
            test_lib_1.it('should merge a component view', runAndAssert('root', ['a'], ['<root class="ng-binding" idx="0">a</root>']));
            test_lib_1.it('should merge component views with interpolation at root level', runAndAssert('root', ['{{a}}'], ['<root class="ng-binding" idx="0">{0}</root>']));
            test_lib_1.it('should merge component views with interpolation not at root level', runAndAssert('root', ['<div>{{a}}</div>'], [
                '<root class="ng-binding" idx="0"><div class="ng-binding" idx="1">{0}</div></root>'
            ]));
            test_lib_1.it('should merge component views with bound elements', runAndAssert('root', ['<div #a></div>'], [
                '<root class="ng-binding" idx="0"><div #a="" class="ng-binding" idx="1"></div></root>'
            ]));
        });
        test_lib_1.describe('embedded views', function () {
            test_lib_1.it('should merge embedded views as fragments', runAndAssert('root', ['<template>a</template>'], [
                '<root class="ng-binding" idx="0"><template class="ng-binding" idx="1"></template></root>',
                'a'
            ]));
            test_lib_1.it('should merge embedded views with interpolation at root level', runAndAssert('root', ['<template>{{a}}</template>'], [
                '<root class="ng-binding" idx="0"><template class="ng-binding" idx="1"></template></root>',
                '{0}'
            ]));
            test_lib_1.it('should merge embedded views with interpolation not at root level', runAndAssert('root', ['<div *ng-if>{{a}}</div>'], [
                '<root class="ng-binding" idx="0"><template class="ng-binding" idx="1" ng-if=""></template></root>',
                '<div *ng-if="" class="ng-binding" idx="2">{0}</div>'
            ]));
            test_lib_1.it('should merge embedded views with bound elements', runAndAssert('root', ['<div *ng-if #a></div>'], [
                '<root class="ng-binding" idx="0"><template class="ng-binding" idx="1" ng-if=""></template></root>',
                '<div #a="" *ng-if="" class="ng-binding" idx="2"></div>'
            ]));
        });
        test_lib_1.describe('projection', function () {
            test_lib_1.it('should remove text nodes if there is no ng-content', runAndAssert('root', ['<a>b</a>', ''], ['<root class="ng-binding" idx="0"><a class="ng-binding" idx="1"></a></root>']));
            test_lib_1.it('should project static text', runAndAssert('root', ['<a>b</a>', 'A(<ng-content></ng-content>)'], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1">A(<!--[-->b<!--]-->)</a></root>'
            ]));
            test_lib_1.it('should project text interpolation', runAndAssert('root', ['<a>{{b}}</a>', 'A(<ng-content></ng-content>)'], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1">A(<!--[-->{0}<!--]-->)</a></root>'
            ]));
            test_lib_1.it('should project text interpolation to elements without bindings', runAndAssert('root', ['<a>{{b}}</a>', '<div><ng-content></ng-content></div>'], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1"><div class="ng-binding"><!--[-->{0}<!--]--></div></a></root>'
            ]));
            test_lib_1.it('should project elements', runAndAssert('root', ['<a><div></div></a>', 'A(<ng-content></ng-content>)'], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1">A(<!--[--><div></div><!--]-->)</a></root>'
            ]));
            test_lib_1.it('should project elements using the selector', runAndAssert('root', [
                '<a><div class="x">a</div><span></span><div class="x">b</div></a>',
                'A(<ng-content select=".x"></ng-content>)'
            ], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1">A(<!--[--><div class="x">a</div><div class="x">b</div><!--]-->)</a></root>'
            ]));
            test_lib_1.it('should reproject', runAndAssert('root', ['<a>x</a>', 'A(<b><ng-content></ng-content></b>)', 'B(<ng-content></ng-content>)'], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1">A(<b class="ng-binding" idx="2">B(<!--[--><!--[-->x<!--]--><!--]-->)</b>)</a></root>'
            ]));
            test_lib_1.it('should reproject text interpolation to sibling text nodes', runAndAssert('root', [
                '<a>{{x}}</a>',
                '<b>A(<ng-content></ng-content>)</b>)',
                'B(<ng-content></ng-content>)'
            ], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1"><b class="ng-binding" idx="2">B(<!--[-->A(<!--[-->{0}<!--]-->)<!--]-->)</b>)</a></root>'
            ]));
            test_lib_1.it('should reproject by combining selectors', runAndAssert('root', [
                '<a><div class="x"></div><div class="x y"></div><div class="y"></div></a>',
                'A(<b><ng-content select=".x"></ng-content></b>)',
                'B(<ng-content select=".y"></ng-content>)'
            ], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1">A(<b class="ng-binding" idx="2">B(<!--[--><div class="x y"></div><!--]-->)</b>)</a></root>'
            ]));
            test_lib_1.it('should keep non projected embedded views as fragments (so that they can be moved manually)', runAndAssert('root', ['<a><template class="x">b</template></a>', ''], ['<root class="ng-binding" idx="0"><a class="ng-binding" idx="1"></a></root>', 'b']));
            test_lib_1.it('should project embedded views and match the template element', runAndAssert('root', ['<a><template class="x">b</template></a>', 'A(<ng-content></ng-content>)'], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1">A(<!--[--><template class="x ng-binding" idx="2"></template><!--]-->)</a></root>',
                'b'
            ]));
            test_lib_1.it('should project nodes using the ng-content in embedded views', runAndAssert('root', ['<a>b</a>', 'A(<ng-content *ng-if></ng-content>)'], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1">A(<template class="ng-binding" idx="2" ng-if=""></template>)</a></root>',
                '<!--[-->b<!--]-->'
            ]));
            test_lib_1.it('should allow to use wildcard selector after embedded view with non wildcard selector', runAndAssert('root', [
                '<a><div class="x">a</div>b</a>',
                'A(<ng-content select=".x" *ng-if></ng-content>, <ng-content></ng-content>)'
            ], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1">A(<template class="ng-binding" idx="2" ng-if=""></template>, <!--[-->b<!--]-->)</a></root>',
                '<!--[--><div class="x">a</div><!--]-->'
            ]));
        });
        test_lib_1.describe('composition', function () {
            test_lib_1.it('should merge multiple component views', runAndAssert('root', ['<a></a><b></b>', 'c', 'd'], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1">c</a><b class="ng-binding" idx="2">d</b></root>'
            ]));
            test_lib_1.it('should merge multiple embedded views as fragments', runAndAssert('root', ['<div *ng-if></div><span *ng-for></span>'], [
                '<root class="ng-binding" idx="0"><template class="ng-binding" idx="1" ng-if=""></template><template class="ng-binding" idx="2" ng-for=""></template></root>',
                '<div *ng-if=""></div>',
                '<span *ng-for=""></span>'
            ]));
            test_lib_1.it('should merge nested embedded views as fragments', runAndAssert('root', ['<div *ng-if><span *ng-for></span></div>'], [
                '<root class="ng-binding" idx="0"><template class="ng-binding" idx="1" ng-if=""></template></root>',
                '<div *ng-if=""><template class="ng-binding" idx="2" ng-for=""></template></div>',
                '<span *ng-for=""></span>'
            ]));
        });
        test_lib_1.describe('element index mapping should be grouped by view and view depth first', function () {
            test_lib_1.it('should map component views correctly', runAndAssert('root', ['<a></a><b></b>', '<c></c>'], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1"><c class="ng-binding" idx="3"></c></a><b class="ng-binding" idx="2"></b></root>'
            ]));
            test_lib_1.it('should map moved projected elements correctly', runAndAssert('root', [
                '<a><b></b><c></c></a>',
                '<ng-content select="c"></ng-content><ng-content select="b"></ng-content>'
            ], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1"><!--[--><c class="ng-binding" idx="3"></c><!--]--><!--[--><b class="ng-binding" idx="2"></b><!--]--></a></root>'
            ]));
        });
        test_lib_1.describe('text index mapping should be grouped by view and view depth first', function () {
            test_lib_1.it('should map component views correctly', runAndAssert('root', ['<a></a>{{b}}', '{{c}}'], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1">{1}</a>{0}</root>'
            ]));
            test_lib_1.it('should map moved projected elements correctly', runAndAssert('root', [
                '<a><div x>{{x}}</div><div y>{{y}}</div></a>',
                '<ng-content select="[y]"></ng-content><ng-content select="[x]"></ng-content>'
            ], [
                '<root class="ng-binding" idx="0"><a class="ng-binding" idx="1"><!--[--><div class="ng-binding" idx="3" y="">{1}</div><!--]--><!--[--><div class="ng-binding" idx="2" x="">{0}</div><!--]--></a></root>'
            ]));
        });
        test_lib_1.describe('native shadow dom support', function () {
            test_lib_1.it('should keep the non projected light dom and wrap the component view into a shadow-root element', runAndAssert('native-root', ['<a>b</a>', 'c'], [
                '<native-root class="ng-binding" idx="0"><shadow-root><a class="ng-binding" idx="1"><shadow-root>c</shadow-root>b</a></shadow-root></native-root>'
            ]));
        });
        test_lib_1.describe('host attributes', function () {
            test_lib_1.it('should set host attributes while merging', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed, template_cloner_1.TemplateCloner], function (async, tb, cloner) {
                tb.compiler.compileHost(rootDirective('root'))
                    .then(function (rootProtoViewDto) {
                    var builder = new proto_view_builder_1.ProtoViewBuilder(dom_adapter_1.DOM.createTemplate(''), api_1.ViewType.COMPONENT, api_1.ViewEncapsulation.NONE);
                    builder.setHostAttribute('a', 'b');
                    var componentProtoViewDto = builder.build(new element_schema_registry_1.ElementSchemaRegistry(), cloner);
                    tb.merge([rootProtoViewDto, componentProtoViewDto])
                        .then(function (mergeMappings) {
                        var domPv = proto_view_1.resolveInternalDomProtoView(mergeMappings.mergedProtoViewRef);
                        test_lib_1.expect(test_lib_1.stringifyElement(templateRoot(domPv)))
                            .toEqual('<template><root a="b" class="ng-binding"></root></template>');
                        async.done();
                    });
                });
            }));
        });
    });
}
exports.main = main;
function templateRoot(pv) {
    return pv.cloneableTemplate;
}
function runAndAssert(hostElementName, componentTemplates, expectedFragments) {
    var useNativeEncapsulation = hostElementName.startsWith('native-');
    var rootComp = rootDirective(hostElementName);
    return test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed, template_cloner_1.TemplateCloner], function (async, tb, cloner) {
        tb.compileAndMerge(rootComp, componentTemplates.map(function (template) { return componentView(template, useNativeEncapsulation ?
            api_1.ViewEncapsulation.NATIVE :
            api_1.ViewEncapsulation.NONE); }))
            .then(function (mergeMappings) {
            test_lib_1.expect(stringify(cloner, mergeMappings)).toEqual(expectedFragments);
            async.done();
        });
    });
}
function rootDirective(hostElementName) {
    return api_1.DirectiveMetadata.create({ id: 'rootComp', type: api_1.DirectiveMetadata.COMPONENT_TYPE, selector: hostElementName });
}
function componentView(template, encapsulation) {
    if (encapsulation === void 0) { encapsulation = api_1.ViewEncapsulation.NONE; }
    return new api_1.ViewDefinition({
        componentId: 'someComp',
        template: template,
        directives: [aComp, bComp, cComp],
        encapsulation: encapsulation
    });
}
function stringify(cloner, protoViewMergeMapping) {
    var testView = util_1.cloneAndQueryProtoView(cloner, proto_view_1.resolveInternalDomProtoView(protoViewMergeMapping.mergedProtoViewRef), false);
    for (var i = 0; i < protoViewMergeMapping.mappedElementIndices.length; i++) {
        var renderElIdx = protoViewMergeMapping.mappedElementIndices[i];
        if (lang_1.isPresent(renderElIdx)) {
            dom_adapter_1.DOM.setAttribute(testView.boundElements[renderElIdx], 'idx', "" + i);
        }
    }
    for (var i = 0; i < protoViewMergeMapping.mappedTextIndices.length; i++) {
        var renderTextIdx = protoViewMergeMapping.mappedTextIndices[i];
        if (lang_1.isPresent(renderTextIdx)) {
            dom_adapter_1.DOM.setText(testView.boundTextNodes[renderTextIdx], "{" + i + "}");
        }
    }
    test_lib_1.expect(protoViewMergeMapping.fragmentCount).toEqual(testView.fragments.length);
    return testView.fragments.map(function (nodes) { return nodes.map(function (node) { return test_lib_1.stringifyElement(node); }).join(''); });
}
var aComp = api_1.DirectiveMetadata.create({ id: 'aComp', type: api_1.DirectiveMetadata.COMPONENT_TYPE, selector: 'a' });
var bComp = api_1.DirectiveMetadata.create({ id: 'bComp', type: api_1.DirectiveMetadata.COMPONENT_TYPE, selector: 'b' });
var cComp = api_1.DirectiveMetadata.create({ id: 'cComp', type: api_1.DirectiveMetadata.COMPONENT_TYPE, selector: 'c' });
//# sourceMappingURL=proto_view_merger_integration_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
'use strict';var test_lib_1 = require('angular2/test_lib');
var text_interpolation_parser_1 = require('angular2/src/render/dom/compiler/text_interpolation_parser');
var compile_pipeline_1 = require('angular2/src/render/dom/compiler/compile_pipeline');
var change_detection_1 = require('angular2/src/change_detection/change_detection');
var pipeline_spec_1 = require('./pipeline_spec');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var api_1 = require('angular2/src/render/api');
function main() {
    test_lib_1.describe('TextInterpolationParser', function () {
        function createPipeline() {
            return new compile_pipeline_1.CompilePipeline([new pipeline_spec_1.IgnoreChildrenStep(), new text_interpolation_parser_1.TextInterpolationParser(new change_detection_1.Parser(new change_detection_1.Lexer()))]);
        }
        function createViewDefinition() {
            return new api_1.ViewDefinition({ componentId: 'someComponent' });
        }
        function process(templateString) {
            var compileElements = createPipeline().processElements(dom_adapter_1.DOM.createTemplate(templateString), api_1.ViewType.COMPONENT, createViewDefinition());
            return compileElements[0].inheritedProtoView;
        }
        function assertRootTextBinding(protoViewBuilder, nodeIndex, expression) {
            var node = dom_adapter_1.DOM.childNodes(dom_adapter_1.DOM.templateAwareRoot(protoViewBuilder.rootElement))[nodeIndex];
            test_lib_1.expect(protoViewBuilder.rootTextBindings.get(node).source).toEqual(expression);
        }
        function assertElementTextBinding(elementBinderBuilder, nodeIndex, expression) {
            var node = dom_adapter_1.DOM.childNodes(dom_adapter_1.DOM.templateAwareRoot(elementBinderBuilder.element))[nodeIndex];
            test_lib_1.expect(elementBinderBuilder.textBindings.get(node).source).toEqual(expression);
        }
        test_lib_1.it('should find root text interpolations', function () {
            var result = process('{{expr1}}{{expr2}}<div></div>{{expr3}}');
            assertRootTextBinding(result, 0, "{{expr1}}{{expr2}}");
            assertRootTextBinding(result, 2, "{{expr3}}");
        });
        test_lib_1.it('should find text interpolation in normal elements', function () {
            var result = process('<div>{{expr1}}<span></span>{{expr2}}</div>');
            assertElementTextBinding(result.elements[0], 0, "{{expr1}}");
            assertElementTextBinding(result.elements[0], 2, "{{expr2}}");
        });
        test_lib_1.it('should allow multiple expressions', function () {
            var result = process('<div>{{expr1}}{{expr2}}</div>');
            assertElementTextBinding(result.elements[0], 0, "{{expr1}}{{expr2}}");
        });
        test_lib_1.it('should not interpolate when compileChildren is false', function () {
            var results = process('<div>{{included}}<span ignore-children>{{excluded}}</span></div>');
            assertElementTextBinding(results.elements[0], 0, "{{included}}");
            test_lib_1.expect(results.elements.length).toBe(1);
            test_lib_1.expect(results.elements[0].textBindings.size).toBe(1);
        });
        test_lib_1.it('should allow fixed text before, in between and after expressions', function () {
            var result = process('<div>a{{expr1}}b{{expr2}}c</div>');
            assertElementTextBinding(result.elements[0], 0, "a{{expr1}}b{{expr2}}c");
        });
        test_lib_1.it('should escape quotes in fixed parts', function () {
            var result = process("<div>'\"a{{expr1}}</div>");
            assertElementTextBinding(result.elements[0], 0, "'\"a{{expr1}}");
        });
    });
}
exports.main = main;
//# sourceMappingURL=text_interpolation_parser_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
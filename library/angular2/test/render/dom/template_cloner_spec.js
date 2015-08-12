'use strict';var test_lib_1 = require('angular2/test_lib');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var template_cloner_1 = require('angular2/src/render/dom/template_cloner');
function main() {
    test_lib_1.describe('TemplateCloner', function () {
        var cloner;
        var bigTemplate;
        var smallTemplate;
        test_lib_1.beforeEach(function () {
            cloner = new template_cloner_1.TemplateCloner(1);
            bigTemplate = dom_adapter_1.DOM.createTemplate('a<div></div>');
            smallTemplate = dom_adapter_1.DOM.createTemplate('a');
        });
        test_lib_1.describe('prepareForClone', function () {
            test_lib_1.it('should use a reference for small templates', function () { test_lib_1.expect(cloner.prepareForClone(smallTemplate)).toBe(smallTemplate); });
            test_lib_1.it('should use a reference if the max element count is -1', function () {
                cloner = new template_cloner_1.TemplateCloner(-1);
                test_lib_1.expect(cloner.prepareForClone(bigTemplate)).toBe(bigTemplate);
            });
            test_lib_1.it('should use a string for big templates', function () {
                test_lib_1.expect(cloner.prepareForClone(bigTemplate)).toEqual(dom_adapter_1.DOM.getInnerHTML(bigTemplate));
            });
        });
        test_lib_1.describe('cloneTemplate', function () {
            function shouldReturnTemplateContentNodes(template, importIntoDoc) {
                var clone = cloner.cloneContent(cloner.prepareForClone(template), importIntoDoc);
                test_lib_1.expect(clone).not.toBe(dom_adapter_1.DOM.content(template));
                test_lib_1.expect(dom_adapter_1.DOM.getText(dom_adapter_1.DOM.firstChild(clone))).toEqual('a');
            }
            test_lib_1.it('should return template.content nodes (small template, no import)', function () { shouldReturnTemplateContentNodes(smallTemplate, false); });
            test_lib_1.it('should return template.content nodes (small template, import)', function () { shouldReturnTemplateContentNodes(smallTemplate, true); });
            test_lib_1.it('should return template.content nodes (big template, no import)', function () { shouldReturnTemplateContentNodes(bigTemplate, false); });
            test_lib_1.it('should return template.content nodes (big template, import)', function () { shouldReturnTemplateContentNodes(bigTemplate, true); });
        });
    });
}
exports.main = main;
//# sourceMappingURL=template_cloner_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
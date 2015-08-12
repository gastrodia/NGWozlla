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
var test_lib_1 = require('angular2/test_lib');
var directive_resolver_1 = require('angular2/src/core/compiler/directive_resolver');
var annotations_1 = require('angular2/annotations');
var dirAnn = require('angular2/src/core/annotations_impl/annotations');
var SomeDirective = (function () {
    function SomeDirective() {
    }
    SomeDirective = __decorate([
        annotations_1.Directive({ selector: 'someDirective' }), 
        __metadata('design:paramtypes', [])
    ], SomeDirective);
    return SomeDirective;
})();
var SomeChildDirective = (function (_super) {
    __extends(SomeChildDirective, _super);
    function SomeChildDirective() {
        _super.apply(this, arguments);
    }
    SomeChildDirective = __decorate([
        annotations_1.Directive({ selector: 'someChildDirective' }), 
        __metadata('design:paramtypes', [])
    ], SomeChildDirective);
    return SomeChildDirective;
})(SomeDirective);
var SomeDirectiveWithoutAnnotation = (function () {
    function SomeDirectiveWithoutAnnotation() {
    }
    return SomeDirectiveWithoutAnnotation;
})();
function main() {
    test_lib_1.describe("DirectiveResolver", function () {
        var reader;
        test_lib_1.beforeEach(function () { reader = new directive_resolver_1.DirectiveResolver(); });
        test_lib_1.it('should read out the Directive annotation', function () {
            var directiveMetadata = reader.resolve(SomeDirective);
            test_lib_1.expect(directiveMetadata).toEqual(new dirAnn.Directive({ selector: 'someDirective' }));
        });
        test_lib_1.it('should throw if not matching annotation is found', function () {
            test_lib_1.expect(function () { reader.resolve(SomeDirectiveWithoutAnnotation); })
                .toThrowError('No Directive annotation found on SomeDirectiveWithoutAnnotation');
        });
        test_lib_1.it('should not read parent class Directive annotations', function () {
            var directiveMetadata = reader.resolve(SomeChildDirective);
            test_lib_1.expect(directiveMetadata).toEqual(new dirAnn.Directive({ selector: 'someChildDirective' }));
        });
    });
}
exports.main = main;
//# sourceMappingURL=directive_metadata_reader_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
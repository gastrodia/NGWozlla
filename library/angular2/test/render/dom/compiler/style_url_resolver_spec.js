'use strict';var test_lib_1 = require('angular2/test_lib');
var style_url_resolver_1 = require('angular2/src/render/dom/compiler/style_url_resolver');
var url_resolver_1 = require('angular2/src/services/url_resolver');
function main() {
    test_lib_1.describe('StyleUrlResolver', function () {
        var styleUrlResolver;
        test_lib_1.beforeEach(function () { styleUrlResolver = new style_url_resolver_1.StyleUrlResolver(new url_resolver_1.UrlResolver()); });
        test_lib_1.it('should resolve "url()" urls', function () {
            var css = "\n      .foo {\n        background-image: url(\"double.jpg\");\n        background-image: url('simple.jpg');\n        background-image: url(noquote.jpg);\n      }";
            var expectedCss = "\n      .foo {\n        background-image: url('http://ng.io/double.jpg');\n        background-image: url('http://ng.io/simple.jpg');\n        background-image: url('http://ng.io/noquote.jpg');\n      }";
            var resolvedCss = styleUrlResolver.resolveUrls(css, 'http://ng.io');
            test_lib_1.expect(resolvedCss).toEqual(expectedCss);
        });
        test_lib_1.it('should resolve "@import" urls', function () {
            var css = "\n      @import '1.css';\n      @import \"2.css\";\n      ";
            var expectedCss = "\n      @import 'http://ng.io/1.css';\n      @import 'http://ng.io/2.css';\n      ";
            var resolvedCss = styleUrlResolver.resolveUrls(css, 'http://ng.io');
            test_lib_1.expect(resolvedCss).toEqual(expectedCss);
        });
        test_lib_1.it('should resolve "@import url()" urls', function () {
            var css = "\n      @import url('3.css');\n      @import url(\"4.css\");\n      @import url(5.css);\n      ";
            var expectedCss = "\n      @import url('http://ng.io/3.css');\n      @import url('http://ng.io/4.css');\n      @import url('http://ng.io/5.css');\n      ";
            var resolvedCss = styleUrlResolver.resolveUrls(css, 'http://ng.io');
            test_lib_1.expect(resolvedCss).toEqual(expectedCss);
        });
        test_lib_1.it('should support media query in "@import"', function () {
            var css = "\n      @import 'print.css' print;\n      @import url(print.css) print;\n      ";
            var expectedCss = "\n      @import 'http://ng.io/print.css' print;\n      @import url('http://ng.io/print.css') print;\n      ";
            var resolvedCss = styleUrlResolver.resolveUrls(css, 'http://ng.io');
            test_lib_1.expect(resolvedCss).toEqual(expectedCss);
        });
        test_lib_1.it('should not strip quotes from inlined SVG styles', function () {
            var css = "\n      .selector {\n        background:rgb(55,71,79) url('data:image/svg+xml;utf8,<?xml version=\"1.0\"?>');\n        background:rgb(55,71,79) url(\"data:image/svg+xml;utf8,<?xml version='1.0'?>\");\n        background:rgb(55,71,79) url(\"/some/data:image\");\n      }\n      ";
            var expectedCss = "\n      .selector {\n        background:rgb(55,71,79) url('data:image/svg+xml;utf8,<?xml version=\"1.0\"?>');\n        background:rgb(55,71,79) url(\"data:image/svg+xml;utf8,<?xml version='1.0'?>\");\n        background:rgb(55,71,79) url('http://ng.io/some/data:image');\n      }\n      ";
            var resolvedCss = styleUrlResolver.resolveUrls(css, 'http://ng.io');
            test_lib_1.expect(resolvedCss).toEqual(expectedCss);
        });
    });
}
exports.main = main;
//# sourceMappingURL=style_url_resolver_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
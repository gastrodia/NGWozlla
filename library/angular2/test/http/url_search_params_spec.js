'use strict';var test_lib_1 = require('angular2/test_lib');
var url_search_params_1 = require('angular2/src/http/url_search_params');
function main() {
    test_lib_1.describe('URLSearchParams', function () {
        test_lib_1.it('should conform to spec', function () {
            var paramsString = "q=URLUtils.searchParams&topic=api";
            var searchParams = new url_search_params_1.URLSearchParams(paramsString);
            // Tests borrowed from example at
            // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
            // Compliant with spec described at https://url.spec.whatwg.org/#urlsearchparams
            test_lib_1.expect(searchParams.has("topic")).toBe(true);
            test_lib_1.expect(searchParams.has("foo")).toBe(false);
            test_lib_1.expect(searchParams.get("topic")).toEqual("api");
            test_lib_1.expect(searchParams.getAll("topic")).toEqual(["api"]);
            test_lib_1.expect(searchParams.get("foo")).toBe(null);
            searchParams.append("topic", "webdev");
            test_lib_1.expect(searchParams.getAll("topic")).toEqual(["api", "webdev"]);
            test_lib_1.expect(searchParams.toString()).toEqual("q=URLUtils.searchParams&topic=api&topic=webdev");
            searchParams.delete("topic");
            test_lib_1.expect(searchParams.toString()).toEqual("q=URLUtils.searchParams");
        });
    });
}
exports.main = main;
//# sourceMappingURL=url_search_params_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
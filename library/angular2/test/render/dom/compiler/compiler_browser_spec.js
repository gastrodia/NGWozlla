'use strict';/*
* Runs compiler tests using in-browser DOM adapter.
*/
var compiler_common_tests_1 = require('./compiler_common_tests');
function main() {
    compiler_common_tests_1.runCompilerCommonTests();
}
exports.main = main;
//# sourceMappingURL=compiler_browser_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
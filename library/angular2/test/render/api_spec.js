'use strict';var api_1 = require('angular2/src/render/api');
var collection_1 = require('angular2/src/facade/collection');
var test_lib_1 = require('angular2/test_lib');
function main() {
    test_lib_1.describe('Metadata', function () {
        test_lib_1.describe('host', function () {
            test_lib_1.it('should parse host configuration', function () {
                var md = api_1.DirectiveMetadata.create({
                    host: collection_1.MapWrapper.createFromPairs([
                        ['(event)', 'eventVal'],
                        ['[prop]', 'propVal'],
                        ['@action', 'actionVal'],
                        ['attr', 'attrVal']
                    ])
                });
                test_lib_1.expect(md.hostListeners).toEqual(collection_1.MapWrapper.createFromPairs([['event', 'eventVal']]));
                test_lib_1.expect(md.hostProperties).toEqual(collection_1.MapWrapper.createFromPairs([['prop', 'propVal']]));
                test_lib_1.expect(md.hostActions).toEqual(collection_1.MapWrapper.createFromPairs([['action', 'actionVal']]));
                test_lib_1.expect(md.hostAttributes).toEqual(collection_1.MapWrapper.createFromPairs([['attr', 'attrVal']]));
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=api_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
'use strict';var collection_1 = require('angular2/src/facade/collection');
var api_1 = require('angular2/src/render/api');
var convert_1 = require('angular2/src/render/dom/convert');
var test_lib_1 = require('angular2/test_lib');
function main() {
    test_lib_1.describe('convert', function () {
        test_lib_1.it('directiveMetadataToMap', function () {
            var someComponent = new api_1.DirectiveMetadata({
                compileChildren: false,
                hostListeners: collection_1.MapWrapper.createFromPairs([['LKey', 'LVal']]),
                hostProperties: collection_1.MapWrapper.createFromPairs([['PKey', 'PVal']]),
                hostActions: collection_1.MapWrapper.createFromPairs([['AcKey', 'AcVal']]),
                hostAttributes: collection_1.MapWrapper.createFromPairs([['AtKey', 'AtVal']]),
                id: 'someComponent',
                properties: ['propKey: propVal'],
                readAttributes: ['read1', 'read2'],
                selector: 'some-comp',
                type: api_1.DirectiveMetadata.COMPONENT_TYPE,
                exportAs: 'aaa',
                callOnDestroy: true,
                callOnChange: true,
                callOnCheck: true,
                callOnInit: true,
                callOnAllChangesDone: true,
                events: ['onFoo', 'onBar'],
                changeDetection: 'CHECK_ONCE'
            });
            var map = convert_1.directiveMetadataToMap(someComponent);
            test_lib_1.expect(map.get('compileChildren')).toEqual(false);
            test_lib_1.expect(map.get('hostListeners')).toEqual(collection_1.MapWrapper.createFromPairs([['LKey', 'LVal']]));
            test_lib_1.expect(map.get('hostProperties')).toEqual(collection_1.MapWrapper.createFromPairs([['PKey', 'PVal']]));
            test_lib_1.expect(map.get('hostActions')).toEqual(collection_1.MapWrapper.createFromPairs([['AcKey', 'AcVal']]));
            test_lib_1.expect(map.get('hostAttributes')).toEqual(collection_1.MapWrapper.createFromPairs([['AtKey', 'AtVal']]));
            test_lib_1.expect(map.get('id')).toEqual('someComponent');
            test_lib_1.expect(map.get('properties')).toEqual(['propKey: propVal']);
            test_lib_1.expect(map.get('readAttributes')).toEqual(['read1', 'read2']);
            test_lib_1.expect(map.get('selector')).toEqual('some-comp');
            test_lib_1.expect(map.get('type')).toEqual(api_1.DirectiveMetadata.COMPONENT_TYPE);
            test_lib_1.expect(map.get('callOnDestroy')).toEqual(true);
            test_lib_1.expect(map.get('callOnCheck')).toEqual(true);
            test_lib_1.expect(map.get('callOnChange')).toEqual(true);
            test_lib_1.expect(map.get('callOnInit')).toEqual(true);
            test_lib_1.expect(map.get('callOnAllChangesDone')).toEqual(true);
            test_lib_1.expect(map.get('exportAs')).toEqual('aaa');
            test_lib_1.expect(map.get('events')).toEqual(['onFoo', 'onBar']);
            test_lib_1.expect(map.get('changeDetection')).toEqual('CHECK_ONCE');
        });
        test_lib_1.it('mapToDirectiveMetadata', function () {
            var map = collection_1.MapWrapper.createFromPairs([
                ['compileChildren', false],
                ['hostProperties', collection_1.MapWrapper.createFromPairs([['PKey', 'testVal']])],
                ['hostListeners', collection_1.MapWrapper.createFromPairs([['LKey', 'testVal']])],
                ['hostActions', collection_1.MapWrapper.createFromPairs([['AcKey', 'testVal']])],
                ['hostAttributes', collection_1.MapWrapper.createFromPairs([['AtKey', 'testVal']])],
                ['id', 'testId'],
                ['properties', ['propKey: propVal']],
                ['readAttributes', ['readTest1', 'readTest2']],
                ['selector', 'testSelector'],
                ['type', api_1.DirectiveMetadata.DIRECTIVE_TYPE],
                ['exportAs', 'aaa'],
                ['callOnDestroy', true],
                ['callOnCheck', true],
                ['callOnInit', true],
                ['callOnChange', true],
                ['callOnAllChangesDone', true],
                ['events', ['onFoo', 'onBar']],
                ['changeDetection', 'CHECK_ONCE']
            ]);
            var meta = convert_1.directiveMetadataFromMap(map);
            test_lib_1.expect(meta.compileChildren).toEqual(false);
            test_lib_1.expect(meta.hostProperties).toEqual(collection_1.MapWrapper.createFromPairs([['PKey', 'testVal']]));
            test_lib_1.expect(meta.hostListeners).toEqual(collection_1.MapWrapper.createFromPairs([['LKey', 'testVal']]));
            test_lib_1.expect(meta.hostActions).toEqual(collection_1.MapWrapper.createFromPairs([['AcKey', 'testVal']]));
            test_lib_1.expect(meta.hostAttributes).toEqual(collection_1.MapWrapper.createFromPairs([['AtKey', 'testVal']]));
            test_lib_1.expect(meta.id).toEqual('testId');
            test_lib_1.expect(meta.properties).toEqual(['propKey: propVal']);
            test_lib_1.expect(meta.readAttributes).toEqual(['readTest1', 'readTest2']);
            test_lib_1.expect(meta.selector).toEqual('testSelector');
            test_lib_1.expect(meta.type).toEqual(api_1.DirectiveMetadata.DIRECTIVE_TYPE);
            test_lib_1.expect(meta.exportAs).toEqual('aaa');
            test_lib_1.expect(meta.callOnDestroy).toEqual(true);
            test_lib_1.expect(meta.callOnCheck).toEqual(true);
            test_lib_1.expect(meta.callOnInit).toEqual(true);
            test_lib_1.expect(meta.callOnChange).toEqual(true);
            test_lib_1.expect(meta.callOnAllChangesDone).toEqual(true);
            test_lib_1.expect(meta.events).toEqual(['onFoo', 'onBar']);
            test_lib_1.expect(meta.changeDetection).toEqual('CHECK_ONCE');
        });
    });
}
exports.main = main;
//# sourceMappingURL=convert_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var test_lib_1 = require('angular2/test_lib');
var view_loader_1 = require('angular2/src/render/dom/compiler/view_loader');
var style_inliner_1 = require('angular2/src/render/dom/compiler/style_inliner');
var style_url_resolver_1 = require('angular2/src/render/dom/compiler/style_url_resolver');
var url_resolver_1 = require('angular2/src/services/url_resolver');
var async_1 = require('angular2/src/facade/async');
var xhr_1 = require('angular2/src/render/xhr');
var xhr_mock_1 = require('angular2/src/render/xhr_mock');
var api_1 = require('angular2/src/render/api');
function main() {
    test_lib_1.describe('ViewLoader', function () {
        var loader;
        var xhr, styleUrlResolver, urlResolver;
        test_lib_1.beforeEach(function () {
            xhr = new xhr_mock_1.MockXHR();
            urlResolver = new url_resolver_1.UrlResolver();
            styleUrlResolver = new style_url_resolver_1.StyleUrlResolver(urlResolver);
            var styleInliner = new style_inliner_1.StyleInliner(xhr, styleUrlResolver, urlResolver);
            loader = new view_loader_1.ViewLoader(xhr, styleInliner, styleUrlResolver);
        });
        test_lib_1.describe('html', function () {
            test_lib_1.it('should load inline templates', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                loader.load(new api_1.ViewDefinition({ template: 'template template' }))
                    .then(function (el) {
                    test_lib_1.expect(el.template).toEqual('template template');
                    async.done();
                });
            }));
            test_lib_1.it('should load templates through XHR', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                xhr.expect('http://ng.io/foo.html', 'xhr template');
                loader.load(new api_1.ViewDefinition({ templateAbsUrl: 'http://ng.io/foo.html' }))
                    .then(function (el) {
                    test_lib_1.expect(el.template).toEqual('xhr template');
                    async.done();
                });
                xhr.flush();
            }));
            test_lib_1.it('should resolve urls in styles', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                xhr.expect('http://ng.io/foo.html', '<style>.foo { background-image: url("double.jpg"); }</style>');
                loader.load(new api_1.ViewDefinition({ templateAbsUrl: 'http://ng.io/foo.html' }))
                    .then(function (el) {
                    test_lib_1.expect(el.template).toEqual('');
                    test_lib_1.expect(el.styles)
                        .toEqual([".foo { background-image: url('http://ng.io/double.jpg'); }"]);
                    async.done();
                });
                xhr.flush();
            }));
            test_lib_1.it('should inline styles', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var xhr = new FakeXHR();
                xhr.reply('http://ng.io/foo.html', '<style>@import "foo.css";</style>');
                xhr.reply('http://ng.io/foo.css', '/* foo.css */');
                var styleInliner = new style_inliner_1.StyleInliner(xhr, styleUrlResolver, urlResolver);
                var loader = new view_loader_1.ViewLoader(xhr, styleInliner, styleUrlResolver);
                loader.load(new api_1.ViewDefinition({ templateAbsUrl: 'http://ng.io/foo.html' }))
                    .then(function (el) {
                    test_lib_1.expect(el.template).toEqual('');
                    test_lib_1.expect(el.styles).toEqual(["/* foo.css */\n"]);
                    async.done();
                });
            }));
            test_lib_1.it('should throw when no template is defined', function () {
                test_lib_1.expect(function () { return loader.load(new api_1.ViewDefinition({ template: null, templateAbsUrl: null })); })
                    .toThrowError('View should have either the templateUrl or template property set');
            });
            test_lib_1.it('should return a rejected Promise when XHR loading fails', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                xhr.expect('http://ng.io/foo.html', null);
                async_1.PromiseWrapper.then(loader.load(new api_1.ViewDefinition({ templateAbsUrl: 'http://ng.io/foo.html' })), function (_) { throw 'Unexpected response'; }, function (error) {
                    test_lib_1.expect(error.message).toEqual('Failed to fetch url "http://ng.io/foo.html"');
                    async.done();
                });
                xhr.flush();
            }));
            test_lib_1.it('should replace $baseUrl in attributes with the template base url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                xhr.expect('http://ng.io/path/foo.html', '<img src="$baseUrl/logo.png">');
                loader.load(new api_1.ViewDefinition({ templateAbsUrl: 'http://ng.io/path/foo.html' }))
                    .then(function (el) {
                    test_lib_1.expect(el.template).toEqual('<img src="http://ng.io/path/logo.png">');
                    async.done();
                });
                xhr.flush();
            }));
        });
        test_lib_1.describe('css', function () {
            test_lib_1.it('should load inline styles', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                loader.load(new api_1.ViewDefinition({ template: 'html', styles: ['style 1', 'style 2'] }))
                    .then(function (el) {
                    test_lib_1.expect(el.template).toEqual('html');
                    test_lib_1.expect(el.styles).toEqual(['style 1', 'style 2']);
                    async.done();
                });
            }));
            test_lib_1.it('should resolve urls in inline styles', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                xhr.expect('http://ng.io/foo.html', 'html');
                loader.load(new api_1.ViewDefinition({
                    templateAbsUrl: 'http://ng.io/foo.html',
                    styles: ['.foo { background-image: url("double.jpg"); }']
                }))
                    .then(function (el) {
                    test_lib_1.expect(el.template).toEqual('html');
                    test_lib_1.expect(el.styles)
                        .toEqual([".foo { background-image: url('http://ng.io/double.jpg'); }"]);
                    async.done();
                });
                xhr.flush();
            }));
            test_lib_1.it('should load templates through XHR', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                xhr.expect('http://ng.io/foo.html', 'xhr template');
                xhr.expect('http://ng.io/foo-1.css', '1');
                xhr.expect('http://ng.io/foo-2.css', '2');
                loader.load(new api_1.ViewDefinition({
                    templateAbsUrl: 'http://ng.io/foo.html',
                    styles: ['i1'],
                    styleAbsUrls: ['http://ng.io/foo-1.css', 'http://ng.io/foo-2.css']
                }))
                    .then(function (el) {
                    test_lib_1.expect(el.template).toEqual('xhr template');
                    test_lib_1.expect(el.styles).toEqual(['i1', '1', '2']);
                    async.done();
                });
                xhr.flush();
            }));
            test_lib_1.it('should inline styles', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var xhr = new FakeXHR();
                xhr.reply('http://ng.io/foo.html', '<p>template</p>');
                xhr.reply('http://ng.io/foo.css', '/* foo.css */');
                var styleInliner = new style_inliner_1.StyleInliner(xhr, styleUrlResolver, urlResolver);
                var loader = new view_loader_1.ViewLoader(xhr, styleInliner, styleUrlResolver);
                loader.load(new api_1.ViewDefinition({ templateAbsUrl: 'http://ng.io/foo.html', styles: ['@import "foo.css";'] }))
                    .then(function (el) {
                    test_lib_1.expect(el.template).toEqual("<p>template</p>");
                    test_lib_1.expect(el.styles).toEqual(["/* foo.css */\n"]);
                    async.done();
                });
            }));
            test_lib_1.it('should return a rejected Promise when XHR loading fails', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                xhr.expect('http://ng.io/foo.css', null);
                async_1.PromiseWrapper.then(loader.load(new api_1.ViewDefinition({ template: '', styleAbsUrls: ['http://ng.io/foo.css'] })), function (_) { throw 'Unexpected response'; }, function (error) {
                    test_lib_1.expect(error.message).toEqual('Failed to fetch url "http://ng.io/foo.css"');
                    async.done();
                });
                xhr.flush();
            }));
        });
    });
}
exports.main = main;
var SomeComponent = (function () {
    function SomeComponent() {
    }
    return SomeComponent;
})();
var FakeXHR = (function (_super) {
    __extends(FakeXHR, _super);
    function FakeXHR() {
        _super.call(this);
        this._responses = new Map();
    }
    FakeXHR.prototype.get = function (url) {
        return this._responses.has(url) ? async_1.PromiseWrapper.resolve(this._responses.get(url)) :
            async_1.PromiseWrapper.reject('xhr error', null);
    };
    FakeXHR.prototype.reply = function (url, response) { this._responses.set(url, response); };
    return FakeXHR;
})(xhr_1.XHR);
//# sourceMappingURL=view_loader_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
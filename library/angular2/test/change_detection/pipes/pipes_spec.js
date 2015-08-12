'use strict';var test_lib_1 = require('angular2/test_lib');
var di_1 = require('angular2/di');
var pipes_1 = require('angular2/src/change_detection/pipes/pipes');
var APipe = (function () {
    function APipe() {
    }
    APipe.prototype.transform = function (a, b) { };
    APipe.prototype.onDestroy = function () { };
    return APipe;
})();
var AnotherPipe = (function () {
    function AnotherPipe() {
    }
    AnotherPipe.prototype.transform = function (a, b) { };
    AnotherPipe.prototype.onDestroy = function () { };
    return AnotherPipe;
})();
function main() {
    test_lib_1.describe("pipe registry", function () {
        var injector;
        test_lib_1.beforeEach(function () { injector = di_1.Injector.resolveAndCreate([]); });
        test_lib_1.it("should instantiate a pipe", function () {
            var r = new pipes_1.Pipes({ "type": APipe }, injector);
            test_lib_1.expect(r.get("type", null)).toBeAnInstanceOf(APipe);
        });
        test_lib_1.it("should instantiate a new pipe every time", function () {
            var r = new pipes_1.Pipes({ "type": APipe }, injector);
            var p1 = r.get("type", null);
            var p2 = r.get("type", null);
            test_lib_1.expect(p1).not.toBe(p2);
        });
        test_lib_1.it("should throw when no matching type", function () {
            var r = new pipes_1.Pipes({}, null);
            test_lib_1.expect(function () { return r.get("unknown", null); }).toThrowError("Cannot find pipe 'unknown'.");
        });
        test_lib_1.describe('.create()', function () {
            test_lib_1.it("should create a new Pipes object", function () {
                var pipes = pipes_1.Pipes.create({ 'pipe': APipe }, null);
                test_lib_1.expect(pipes.config).toEqual({ 'pipe': APipe });
            });
            test_lib_1.it("should merge pipes config", function () {
                var pipes1 = pipes_1.Pipes.create({ 'pipe': APipe, 'pipe1': APipe }, null);
                var pipes2 = pipes_1.Pipes.create({ 'pipe': AnotherPipe, 'pipe2': AnotherPipe }, null, pipes1);
                test_lib_1.expect(pipes2.config).toEqual({ 'pipe': AnotherPipe, 'pipe1': APipe, 'pipe2': AnotherPipe });
            });
            test_lib_1.it("should not change parent's config", function () {
                var pipes1 = pipes_1.Pipes.create({ 'pipe': APipe, 'pipe1': APipe }, null);
                pipes_1.Pipes.create({ 'pipe': AnotherPipe, 'pipe2': AnotherPipe }, null, pipes1);
                test_lib_1.expect(pipes1.config).toEqual({ 'pipe': APipe, 'pipe1': APipe });
            });
        });
        test_lib_1.describe(".extend()", function () {
            test_lib_1.it('should create a factory that prepend new pipes to old', function () {
                var pipes1 = pipes_1.Pipes.create({ 'pipe': APipe, 'pipe1': APipe }, null);
                var binding = pipes_1.Pipes.extend({ 'pipe': AnotherPipe, 'pipe2': AnotherPipe });
                var pipes = binding.toFactory(pipes1, injector);
                test_lib_1.expect(pipes.config).toEqual({ 'pipe': AnotherPipe, 'pipe1': APipe, 'pipe2': AnotherPipe });
            });
            test_lib_1.it('should throw if calling extend when creating root injector', function () {
                var injector = di_1.Injector.resolveAndCreate([pipes_1.Pipes.extend({ 'pipe': APipe })]);
                test_lib_1.expect(function () { return injector.get(pipes_1.Pipes); })
                    .toThrowErrorWith("Cannot extend Pipes without a parent injector");
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=pipes_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
'use strict';var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/facade/lang');
var exception_handler_1 = require('angular2/src/core/exception_handler');
var _CustomException = (function () {
    function _CustomException() {
        this.context = "some context";
    }
    _CustomException.prototype.toString = function () { return "custom"; };
    return _CustomException;
})();
function main() {
    test_lib_1.describe('ExceptionHandler', function () {
        test_lib_1.it("should output exception", function () {
            var e = exception_handler_1.ExceptionHandler.exceptionToString(new lang_1.BaseException("message!"));
            test_lib_1.expect(e).toContain("message!");
        });
        test_lib_1.it("should output stackTrace", function () {
            var e = exception_handler_1.ExceptionHandler.exceptionToString(new lang_1.BaseException("message!"), "stack!");
            test_lib_1.expect(e).toContain("stack!");
        });
        test_lib_1.it("should join a long stackTrace", function () {
            var e = exception_handler_1.ExceptionHandler.exceptionToString(new lang_1.BaseException("message!"), ["stack1", "stack2"]);
            test_lib_1.expect(e).toContain("stack1");
            test_lib_1.expect(e).toContain("stack2");
        });
        test_lib_1.it("should output reason when present", function () {
            var e = exception_handler_1.ExceptionHandler.exceptionToString(new lang_1.BaseException("message!"), null, "reason!");
            test_lib_1.expect(e).toContain("reason!");
        });
        test_lib_1.describe("context", function () {
            test_lib_1.it("should print context", function () {
                var e = exception_handler_1.ExceptionHandler.exceptionToString(new lang_1.BaseException("message!", null, null, "context!"));
                test_lib_1.expect(e).toContain("context!");
            });
            test_lib_1.it("should print nested context", function () {
                var original = new lang_1.BaseException("message!", null, null, "context!");
                var e = exception_handler_1.ExceptionHandler.exceptionToString(new lang_1.BaseException("message", original));
                test_lib_1.expect(e).toContain("context!");
            });
            test_lib_1.it("should not print context when the passed-in exception is not a BaseException", function () {
                var e = exception_handler_1.ExceptionHandler.exceptionToString(new _CustomException());
                test_lib_1.expect(e).not.toContain("context");
            });
        });
        test_lib_1.describe('original exception', function () {
            test_lib_1.it("should print original exception message if available (original is BaseException)", function () {
                var realOriginal = new lang_1.BaseException("inner");
                var original = new lang_1.BaseException("wrapped", realOriginal);
                var e = exception_handler_1.ExceptionHandler.exceptionToString(new lang_1.BaseException("wrappedwrapped", original));
                test_lib_1.expect(e).toContain("inner");
            });
            test_lib_1.it("should print original exception message if available (original is not BaseException)", function () {
                var realOriginal = new _CustomException();
                var original = new lang_1.BaseException("wrapped", realOriginal);
                var e = exception_handler_1.ExceptionHandler.exceptionToString(new lang_1.BaseException("wrappedwrapped", original));
                test_lib_1.expect(e).toContain("custom");
            });
        });
        test_lib_1.describe('original stack', function () {
            test_lib_1.it("should print original stack if available", function () {
                var realOriginal = new lang_1.BaseException("inner");
                var original = new lang_1.BaseException("wrapped", realOriginal, "originalStack");
                var e = exception_handler_1.ExceptionHandler.exceptionToString(new lang_1.BaseException("wrappedwrapped", original, "wrappedStack"));
                test_lib_1.expect(e).toContain("originalStack");
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=exception_handler_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();
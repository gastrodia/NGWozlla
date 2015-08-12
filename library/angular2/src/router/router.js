'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var async_1 = require('angular2/src/facade/async');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var route_lifecycle_reflector_1 = require('./route_lifecycle_reflector');
var _resolveToTrue = async_1.PromiseWrapper.resolve(true);
var _resolveToFalse = async_1.PromiseWrapper.resolve(false);
/**
 * # Router
 * The router is responsible for mapping URLs to components.
 *
 * You can see the state of the router by inspecting the read-only field `router.navigating`.
 * This may be useful for showing a spinner, for instance.
 *
 * ## Concepts
 * Routers and component instances have a 1:1 correspondence.
 *
 * The router holds reference to a number of "outlets." An outlet is a placeholder that the
 * router dynamically fills in depending on the current URL.
 *
 * When the router navigates from a URL, it must first recognizes it and serialize it into an
 * `Instruction`.
 * The router uses the `RouteRegistry` to get an `Instruction`.
 */
var Router = (function () {
    // todo(jeffbcross): rename _registry to registry since it is accessed from subclasses
    // todo(jeffbcross): rename _pipeline to pipeline since it is accessed from subclasses
    function Router(registry, _pipeline, parent, hostComponent) {
        this.registry = registry;
        this._pipeline = _pipeline;
        this.parent = parent;
        this.hostComponent = hostComponent;
        this.navigating = false;
        this._currentInstruction = null;
        this._currentNavigation = _resolveToTrue;
        this._outlet = null;
        this._subject = new async_1.EventEmitter();
    }
    /**
     * Constructs a child router. You probably don't need to use this unless you're writing a reusable
     * component.
     */
    Router.prototype.childRouter = function (hostComponent) { return new ChildRouter(this, hostComponent); };
    /**
     * Register an object to notify of route changes. You probably don't need to use this unless
     * you're writing a reusable component.
     */
    Router.prototype.registerOutlet = function (outlet) {
        // TODO: sibling routes
        this._outlet = outlet;
        if (lang_1.isPresent(this._currentInstruction)) {
            return outlet.commit(this._currentInstruction);
        }
        return _resolveToTrue;
    };
    /**
     * Dynamically update the routing configuration and trigger a navigation.
     *
     * # Usage
     *
     * ```
     * router.config([
     *   { 'path': '/', 'component': IndexComp },
     *   { 'path': '/user/:id', 'component': UserComp },
     * ]);
     * ```
     */
    Router.prototype.config = function (definitions) {
        var _this = this;
        definitions.forEach(function (routeDefinition) {
            _this.registry.config(_this.hostComponent, routeDefinition, _this instanceof RootRouter);
        });
        return this.renavigate();
    };
    /**
     * Navigate to a URL. Returns a promise that resolves when navigation is complete.
     *
     * If the given URL begins with a `/`, router will navigate absolutely.
     * If the given URL does not begin with `/`, the router will navigate relative to this component.
     */
    Router.prototype.navigate = function (url, _skipLocationChange) {
        var _this = this;
        if (_skipLocationChange === void 0) { _skipLocationChange = false; }
        return this._currentNavigation = this._currentNavigation.then(function (_) {
            _this.lastNavigationAttempt = url;
            _this._startNavigating();
            return _this._afterPromiseFinishNavigating(_this.recognize(url).then(function (matchedInstruction) {
                if (lang_1.isBlank(matchedInstruction)) {
                    return false;
                }
                return _this._reuse(matchedInstruction)
                    .then(function (_) { return _this._canActivate(matchedInstruction); })
                    .then(function (result) {
                    if (!result) {
                        return false;
                    }
                    return _this._canDeactivate(matchedInstruction)
                        .then(function (result) {
                        if (result) {
                            return _this.commit(matchedInstruction, _skipLocationChange)
                                .then(function (_) {
                                _this._emitNavigationFinish(matchedInstruction.accumulatedUrl);
                                return true;
                            });
                        }
                    });
                });
            }));
        });
    };
    Router.prototype._emitNavigationFinish = function (url) { async_1.ObservableWrapper.callNext(this._subject, url); };
    Router.prototype._afterPromiseFinishNavigating = function (promise) {
        var _this = this;
        return async_1.PromiseWrapper.catchError(promise.then(function (_) { return _this._finishNavigating(); }), function (err) {
            _this._finishNavigating();
            throw err;
        });
    };
    Router.prototype._reuse = function (instruction) {
        var _this = this;
        if (lang_1.isBlank(this._outlet)) {
            return _resolveToFalse;
        }
        return this._outlet.canReuse(instruction)
            .then(function (result) {
            instruction.reuse = result;
            if (lang_1.isPresent(_this._outlet.childRouter) && lang_1.isPresent(instruction.child)) {
                return _this._outlet.childRouter._reuse(instruction.child);
            }
        });
    };
    Router.prototype._canActivate = function (instruction) {
        return canActivateOne(instruction, this._currentInstruction);
    };
    Router.prototype._canDeactivate = function (instruction) {
        var _this = this;
        if (lang_1.isBlank(this._outlet)) {
            return _resolveToTrue;
        }
        var next;
        if (lang_1.isPresent(instruction) && instruction.reuse) {
            next = _resolveToTrue;
        }
        else {
            next = this._outlet.canDeactivate(instruction);
        }
        return next.then(function (result) {
            if (result == false) {
                return false;
            }
            if (lang_1.isPresent(_this._outlet.childRouter)) {
                return _this._outlet.childRouter._canDeactivate(lang_1.isPresent(instruction) ? instruction.child :
                    null);
            }
            return true;
        });
    };
    /**
     * Updates this router and all descendant routers according to the given instruction
     */
    Router.prototype.commit = function (instruction, _skipLocationChange) {
        if (_skipLocationChange === void 0) { _skipLocationChange = false; }
        this._currentInstruction = instruction;
        if (lang_1.isPresent(this._outlet)) {
            return this._outlet.commit(instruction);
        }
        return _resolveToTrue;
    };
    Router.prototype._startNavigating = function () { this.navigating = true; };
    Router.prototype._finishNavigating = function () { this.navigating = false; };
    /**
     * Subscribe to URL updates from the router
     */
    Router.prototype.subscribe = function (onNext) {
        async_1.ObservableWrapper.subscribe(this._subject, onNext);
    };
    /**
     * Removes the contents of this router's outlet and all descendant outlets
     */
    Router.prototype.deactivate = function (instruction) {
        if (lang_1.isPresent(this._outlet)) {
            return this._outlet.deactivate(instruction);
        }
        return _resolveToTrue;
    };
    /**
     * Given a URL, returns an instruction representing the component graph
     */
    Router.prototype.recognize = function (url) {
        return this.registry.recognize(url, this.hostComponent);
    };
    /**
     * Navigates to either the last URL successfully navigated to, or the last URL requested if the
     * router has yet to successfully navigate.
     */
    Router.prototype.renavigate = function () {
        if (lang_1.isBlank(this.lastNavigationAttempt)) {
            return this._currentNavigation;
        }
        return this.navigate(this.lastNavigationAttempt);
    };
    /**
     * Generate a URL from a component name and optional map of parameters. The URL is relative to the
     * app's base href.
     */
    Router.prototype.generate = function (linkParams) {
        var normalizedLinkParams = splitAndFlattenLinkParams(linkParams);
        var first = collection_1.ListWrapper.first(normalizedLinkParams);
        var rest = collection_1.ListWrapper.slice(normalizedLinkParams, 1);
        var router = this;
        // The first segment should be either '.' (generate from parent) or '' (generate from root).
        // When we normalize above, we strip all the slashes, './' becomes '.' and '/' becomes ''.
        if (first == '') {
            while (lang_1.isPresent(router.parent)) {
                router = router.parent;
            }
        }
        else if (first == '..') {
            router = router.parent;
            while (collection_1.ListWrapper.first(rest) == '..') {
                rest = collection_1.ListWrapper.slice(rest, 1);
                router = router.parent;
                if (lang_1.isBlank(router)) {
                    throw new lang_1.BaseException("Link \"" + collection_1.ListWrapper.toJSON(linkParams) + "\" has too many \"../\" segments.");
                }
            }
        }
        else if (first != '.') {
            throw new lang_1.BaseException("Link \"" + collection_1.ListWrapper.toJSON(linkParams) + "\" must start with \"/\", \"./\", or \"../\"");
        }
        if (rest[rest.length - 1] == '') {
            collection_1.ListWrapper.removeLast(rest);
        }
        if (rest.length < 1) {
            var msg = "Link \"" + collection_1.ListWrapper.toJSON(linkParams) + "\" must include a route name.";
            throw new lang_1.BaseException(msg);
        }
        var url = '';
        if (lang_1.isPresent(router.parent) && lang_1.isPresent(router.parent._currentInstruction)) {
            url = router.parent._currentInstruction.capturedUrl;
        }
        return url + '/' + this.registry.generate(rest, router.hostComponent);
    };
    return Router;
})();
exports.Router = Router;
var RootRouter = (function (_super) {
    __extends(RootRouter, _super);
    function RootRouter(registry, pipeline, location, hostComponent) {
        var _this = this;
        _super.call(this, registry, pipeline, null, hostComponent);
        this._location = location;
        this._location.subscribe(function (change) { return _this.navigate(change['url'], lang_1.isPresent(change['pop'])); });
        this.registry.configFromComponent(hostComponent, true);
        this.navigate(location.path());
    }
    RootRouter.prototype.commit = function (instruction, _skipLocationChange) {
        var _this = this;
        if (_skipLocationChange === void 0) { _skipLocationChange = false; }
        var promise = _super.prototype.commit.call(this, instruction);
        if (!_skipLocationChange) {
            promise = promise.then(function (_) { _this._location.go(instruction.accumulatedUrl); });
        }
        return promise;
    };
    return RootRouter;
})(Router);
exports.RootRouter = RootRouter;
var ChildRouter = (function (_super) {
    __extends(ChildRouter, _super);
    function ChildRouter(parent, hostComponent) {
        _super.call(this, parent.registry, parent._pipeline, parent, hostComponent);
        this.parent = parent;
    }
    ChildRouter.prototype.navigate = function (url, _skipLocationChange) {
        if (_skipLocationChange === void 0) { _skipLocationChange = false; }
        // Delegate navigation to the root router
        return this.parent.navigate(url, _skipLocationChange);
    };
    return ChildRouter;
})(Router);
/*
 * Given: ['/a/b', {c: 2}]
 * Returns: ['', 'a', 'b', {c: 2}]
 */
var SLASH = new RegExp('/');
function splitAndFlattenLinkParams(linkParams) {
    return collection_1.ListWrapper.reduce(linkParams, function (accumulation, item) {
        if (lang_1.isString(item)) {
            return collection_1.ListWrapper.concat(accumulation, lang_1.StringWrapper.split(item, SLASH));
        }
        accumulation.push(item);
        return accumulation;
    }, []);
}
function canActivateOne(nextInstruction, currentInstruction) {
    var next = _resolveToTrue;
    if (lang_1.isPresent(nextInstruction.child)) {
        next = canActivateOne(nextInstruction.child, lang_1.isPresent(currentInstruction) ? currentInstruction.child : null);
    }
    return next.then(function (res) {
        if (res == false) {
            return false;
        }
        if (nextInstruction.reuse) {
            return true;
        }
        var hook = route_lifecycle_reflector_1.getCanActivateHook(nextInstruction.component);
        if (lang_1.isPresent(hook)) {
            return hook(nextInstruction, currentInstruction);
        }
        return true;
    });
}
//# sourceMappingURL=router.js.map
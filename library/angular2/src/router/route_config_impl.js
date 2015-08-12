'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
var lang_1 = require('angular2/src/facade/lang');
/**
 * You use the RouteConfig annotation to add routes to a component.
 *
 * Supported keys:
 * - `path` (required)
 * - `component`,  `redirectTo` (requires exactly one of these)
 * - `as` (optional)
 */
var RouteConfig = (function () {
    function RouteConfig(configs) {
        this.configs = configs;
    }
    RouteConfig = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [Object])
    ], RouteConfig);
    return RouteConfig;
})();
exports.RouteConfig = RouteConfig;
var Route = (function () {
    function Route(_a) {
        var path = _a.path, component = _a.component, as = _a.as;
        this.path = path;
        this.component = component;
        this.as = as;
        this.loader = null;
        this.redirectTo = null;
    }
    Route = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [Object])
    ], Route);
    return Route;
})();
exports.Route = Route;
var AsyncRoute = (function () {
    function AsyncRoute(_a) {
        var path = _a.path, loader = _a.loader, as = _a.as;
        this.path = path;
        this.loader = loader;
        this.as = as;
    }
    AsyncRoute = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [Object])
    ], AsyncRoute);
    return AsyncRoute;
})();
exports.AsyncRoute = AsyncRoute;
var Redirect = (function () {
    function Redirect(_a) {
        var path = _a.path, redirectTo = _a.redirectTo;
        this.as = null;
        this.path = path;
        this.redirectTo = redirectTo;
    }
    Redirect = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [Object])
    ], Redirect);
    return Redirect;
})();
exports.Redirect = Redirect;
//# sourceMappingURL=route_config_impl.js.map
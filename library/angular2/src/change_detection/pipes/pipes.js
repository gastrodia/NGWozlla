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
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var di_1 = require('angular2/di');
var change_detector_ref_1 = require('../change_detector_ref');
var Pipes = (function () {
    function Pipes(config, injector) {
        this.injector = injector;
        this.config = config;
    }
    Pipes.prototype.get = function (type, cdRef) {
        var typeOrBinding = this.config[type];
        if (lang_1.isBlank(typeOrBinding)) {
            throw new lang_1.BaseException("Cannot find pipe '" + type + "'.");
        }
        // this is a temporary workaround and will be removed
        return this.injector.resolveAndCreateChild([di_1.bind(change_detector_ref_1.ChangeDetectorRef).toValue(cdRef)])
            .resolveAndInstantiate(typeOrBinding);
    };
    /**
     * Takes a {@link Pipes} config object and returns a binding used to extend the
     * inherited {@link Pipes} instance with the provided config and return a new
     * {@link Pipes} instance.
     *
     * The provided config is merged with the {@link Pipes} instance.
     *
     * # Example
     *
     * ```
     * @Component({
     *   viewBindings: [
     *     Pipes.extend({
     *       'bithdayFormat': BirthdayFormat
     *     })
     *   ]
     * })
     * ```
     */
    Pipes.extend = function (config) {
        return new di_1.Binding(Pipes, {
            toFactory: function (pipes, injector) {
                if (lang_1.isBlank(pipes)) {
                    // Typically would occur when calling Pipe.extend inside of dependencies passed to
                    // bootstrap(), which would override default pipes instead of extending them.
                    throw new lang_1.BaseException('Cannot extend Pipes without a parent injector');
                }
                return Pipes.create(config, injector, pipes);
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[Pipes, new di_1.SkipSelfMetadata(), new di_1.OptionalMetadata()], di_1.Injector]
        });
    };
    Pipes.create = function (config, injector, pipes) {
        if (pipes === void 0) { pipes = null; }
        if (lang_1.isPresent(pipes)) {
            return new Pipes(collection_1.StringMapWrapper.merge(pipes.config, config), injector);
        }
        else {
            return new Pipes(config, injector);
        }
    };
    Pipes = __decorate([
        di_1.Injectable(),
        lang_1.CONST(), 
        __metadata('design:paramtypes', [Object, di_1.Injector])
    ], Pipes);
    return Pipes;
})();
exports.Pipes = Pipes;
//# sourceMappingURL=pipes.js.map
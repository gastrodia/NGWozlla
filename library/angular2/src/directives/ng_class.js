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
var annotations_1 = require('angular2/annotations');
var core_1 = require('angular2/core');
var api_1 = require('angular2/src/render/api');
var change_detection_1 = require('angular2/change_detection');
var collection_1 = require('angular2/src/facade/collection');
/**
 * Adds and removes CSS classes based on an {expression} value.
 *
 * The result of expression is used to add and remove CSS classes using the following logic,
 * based on expression's value type:
 * - {string} - all the CSS classes (space - separated) are added
 * - {Array} - all the CSS classes (Array elements) are added
 * - {Object} - each key corresponds to a CSS class name while values
 * are interpreted as {boolean} expression. If a given expression
 * evaluates to {true} a corresponding CSS class is added - otherwise
 * it is removed.
 *
 * # Example:
 *
 * ```
 * <div class="message" [ng-class]="{error: errorCount > 0}">
 *     Please check errors.
 * </div>
 * ```
 */
var NgClass = (function () {
    function NgClass(_iterableDiffers, _keyValueDiffers, _ngEl, _renderer) {
        this._iterableDiffers = _iterableDiffers;
        this._keyValueDiffers = _keyValueDiffers;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
    }
    Object.defineProperty(NgClass.prototype, "rawClass", {
        set: function (v) {
            this._cleanupClasses(this._rawClass);
            if (lang_1.isString(v)) {
                v = v.split(' ');
            }
            this._rawClass = v;
            if (lang_1.isPresent(v)) {
                if (collection_1.isListLikeIterable(v)) {
                    this._differ = this._iterableDiffers.find(v).create(null);
                    this._mode = 'iterable';
                }
                else {
                    this._differ = this._keyValueDiffers.find(v).create(null);
                    this._mode = 'keyValue';
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    NgClass.prototype.onCheck = function () {
        if (lang_1.isPresent(this._differ)) {
            var changes = this._differ.diff(this._rawClass);
            if (lang_1.isPresent(changes)) {
                if (this._mode == 'iterable') {
                    this._applyIterableChanges(changes);
                }
                else {
                    this._applyKeyValueChanges(changes);
                }
            }
        }
    };
    NgClass.prototype.onDestroy = function () { this._cleanupClasses(this._rawClass); };
    NgClass.prototype._cleanupClasses = function (rawClassVal) {
        var _this = this;
        if (lang_1.isPresent(rawClassVal)) {
            if (collection_1.isListLikeIterable(rawClassVal)) {
                collection_1.ListWrapper.forEach(rawClassVal, function (className) { _this._toggleClass(className, false); });
            }
            else {
                collection_1.StringMapWrapper.forEach(rawClassVal, function (expVal, className) {
                    if (expVal)
                        _this._toggleClass(className, false);
                });
            }
        }
    };
    NgClass.prototype._applyKeyValueChanges = function (changes) {
        var _this = this;
        changes.forEachAddedItem(function (record) { _this._toggleClass(record.key, record.currentValue); });
        changes.forEachChangedItem(function (record) { _this._toggleClass(record.key, record.currentValue); });
        changes.forEachRemovedItem(function (record) {
            if (record.previousValue) {
                _this._toggleClass(record.key, false);
            }
        });
    };
    NgClass.prototype._applyIterableChanges = function (changes) {
        var _this = this;
        changes.forEachAddedItem(function (record) { _this._toggleClass(record.item, true); });
        changes.forEachRemovedItem(function (record) { _this._toggleClass(record.item, false); });
    };
    NgClass.prototype._toggleClass = function (className, enabled) {
        this._renderer.setElementClass(this._ngEl, className, enabled);
    };
    NgClass = __decorate([
        annotations_1.Directive({
            selector: '[ng-class]',
            lifecycle: [annotations_1.LifecycleEvent.onCheck, annotations_1.LifecycleEvent.onDestroy],
            properties: ['rawClass: ng-class']
        }), 
        __metadata('design:paramtypes', [change_detection_1.IterableDiffers, change_detection_1.KeyValueDiffers, core_1.ElementRef, api_1.Renderer])
    ], NgClass);
    return NgClass;
})();
exports.NgClass = NgClass;
//# sourceMappingURL=ng_class.js.map
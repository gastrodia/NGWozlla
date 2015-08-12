'use strict';/**
 * @module
 * @description
 *
 * Annotations provide the additional information that Angular requires in order to run your
 * application. This module
 * contains {@link Component}, {@link Directive}, and {@link View} annotations, as well as
 * the {@link Host} annotation that is used by Angular to resolve dependencies.
 *
 */
var annotations_1 = require('./src/core/annotations/annotations');
exports.ComponentAnnotation = annotations_1.ComponentAnnotation;
exports.DirectiveAnnotation = annotations_1.DirectiveAnnotation;
exports.LifecycleEvent = annotations_1.LifecycleEvent;
var view_1 = require('angular2/src/core/annotations/view');
exports.ViewAnnotation = view_1.ViewAnnotation;
exports.ViewEncapsulation = view_1.ViewEncapsulation;
var di_1 = require('angular2/src/core/annotations/di');
exports.QueryAnnotation = di_1.QueryAnnotation;
exports.AttributeAnnotation = di_1.AttributeAnnotation;
var decorators_1 = require('angular2/src/util/decorators');
exports.Class = decorators_1.Class;
var decorators_2 = require('angular2/src/core/annotations/decorators');
exports.Attribute = decorators_2.Attribute;
exports.Component = decorators_2.Component;
exports.Directive = decorators_2.Directive;
exports.View = decorators_2.View;
exports.Query = decorators_2.Query;
exports.ViewQuery = decorators_2.ViewQuery;
//# sourceMappingURL=annotations.js.map
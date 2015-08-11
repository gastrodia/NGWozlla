/// <reference path="../../typings/angular2/angular2.d.ts"/>
import {Type} from '../../deps/angular/modules/angular2/src/facade/lang';
import {ApplicationRef} from '../../deps/angular/modules/angular2/src/core/application';
import {Promise, PromiseWrapper} from '../../deps/angular/modules/angular2/src/facade/async';
import {bind, Binding} from '../../deps/angular/modules/angular2/di';
import {Renderer} from '../../deps/angular/modules/angular2/src/render/api';
import {bootstrap as angularBootstrap} from '../../deps/angular/modules/angular2/src/core/application';
import {WozllaEngineRenderer} from './renderer';
export type BindingList = List<Type | Binding | List<any>>;
export function wozllaEngineBootstrap(appComponentType: any,componentInjectableBindings: BindingList = null): Promise<ApplicationRef> {
  let wozllaEngineBindings: BindingList = [
      WozllaEngineRenderer,
      bind(Renderer).toAlias(WozllaEngineRenderer)
  ];
  let augmentedBindings = wozllaEngineBindings.concat(componentInjectableBindings);

  return angularBootstrap(appComponentType, augmentedBindings)
}

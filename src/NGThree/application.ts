import {Type} from 'angular2/angular2';
import {ApplicationRef} from 'angular2/angular2';
import {Promise} from 'es6-promise';
import {bind, Binding} from 'angular2/angular2';
import {Renderer} from 'angular2/angular2';
import {RenderCompiler} from 'angular2/src/render/api';

import {bootstrap as angularBootstrap} from 'angular2/angular2';
import {ThreeRenderer} from './renderer';
import {ThreeRenderCompiler} from './compiler';

export type BindingList = List<Type | Binding | List<any>>;
export function threeBootstrap(appComponentType: any,componentInjectableBindings: BindingList = null): Promise<ApplicationRef> {
  //WozllaEngineDomAdapter.makeCurrent();
  let wozllaEngineBindings: BindingList = [
      ThreeRenderer,
      bind(Renderer).toAlias(ThreeRenderer),
      ThreeRenderCompiler,
      bind(RenderCompiler).toAlias(ThreeRenderCompiler)
  ];
  let augmentedBindings = wozllaEngineBindings.concat(componentInjectableBindings);

  return angularBootstrap(appComponentType, augmentedBindings)
}

import {Type} from 'angular2/angular2';
import {ApplicationRef} from 'angular2/angular2';
import {Promise} from 'es6-promise';
import {bind, Binding} from 'angular2/angular2';
import {Renderer} from 'angular2/angular2';
import {bootstrap as angularBootstrap} from 'angular2/angular2';
import {WozllaEngineRenderer} from './renderer';
import {WozllaTemplateCloner} from './template_cloner';

export type BindingList = List<Type | Binding | List<any>>;
export function wozllaEngineBootstrap(appComponentType: any,componentInjectableBindings: BindingList = null): Promise<ApplicationRef> {
  //WozllaEngineDomAdapter.makeCurrent();
  let wozllaEngineBindings: BindingList = [
      WozllaEngineRenderer,
      WozllaTemplateCloner,
      bind(Renderer).toAlias(WozllaEngineRenderer)
  ];
  let augmentedBindings = wozllaEngineBindings.concat(componentInjectableBindings);

  return angularBootstrap(appComponentType, augmentedBindings)
}

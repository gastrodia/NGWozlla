import {Parse5DomAdapter} from '../../deps/angular/modules/angular2/src/dom/parse5_adapter';
import {setRootDomAdapter} from '../../deps/angular/modules/angular2/src/dom/dom_adapter';

export class NativeScriptDomAdapter extends Parse5DomAdapter {

  hasProperty(element, name: string) {
      //TODO: actually check if the property exists.
      return true;
  }

}

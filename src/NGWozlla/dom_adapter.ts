import {Parse5DomAdapter} from 'angular2/dom';
import {setRootDomAdapter} from 'angular2/dom';

export class NativeScriptDomAdapter extends Parse5DomAdapter {

  hasProperty(element, name: string) {
      //TODO: actually check if the property exists.
      return true;
  }

}

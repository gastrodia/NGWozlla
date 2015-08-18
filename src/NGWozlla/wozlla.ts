import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';
export var DOM = new BrowserDomAdapter();

export const NG_BINDING_CLASS_SELECTOR = '.ng-binding';
export const NG_BINDING_CLASS = 'ng-binding';

export const EVENT_TARGET_SEPARATOR = ':';

export const NG_CONTENT_ELEMENT_NAME = 'ng-content';
export const NG_SHADOW_ROOT_ELEMENT_NAME = 'shadow-root';

import $ = require('jquery');


export class WozllaView{
    constructor(private protoView: any, private inplaceElement: HTMLElement){
      console.log('WozllaView Init..!')
    }

    getTemplateStr(){
      var template = <any>this.protoView.cloneableTemplate.innerHTML;
      console.log(template);
    }

    getDomTree():Node{
        var cloneableTemplate = (<any>this.protoView).cloneableTemplate;
        var isSingleElementChild = (<any>this.protoView).isSingleElementChild;
        var templateContent = DOM.content(cloneableTemplate);
        templateContent = DOM.importIntoDoc(templateContent);
        var treeContent = DOM.clone(templateContent);
        return treeContent;
    }

    run(){
      var domTree = this.getDomTree();
      var $dom = $(domTree);
      console.log($dom.find('wozlla-button'));
    }
}

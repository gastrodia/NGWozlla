  import {Injectable} from 'angular2/angular2';
  import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';
  import {
      Renderer,
      RenderEventDispatcher,
      RenderElementRef,
      RenderProtoViewRef,
      RenderViewRef,
      RenderFragmentRef,
      RenderViewWithFragments
  } from 'angular2/angular2';

import {DomProtoView} from 'angular2/src/render/dom/view/proto_view';

export const NG_BINDING_CLASS_SELECTOR = '.ng-binding';
export const NG_BINDING_CLASS = 'ng-binding';

export const EVENT_TARGET_SEPARATOR = ':';

export const NG_CONTENT_ELEMENT_NAME = 'ng-content';
export const NG_SHADOW_ROOT_ELEMENT_NAME = 'shadow-root';
export class DomProtoViewRef extends RenderProtoViewRef {
  constructor(public _protoView: DomProtoView) { super(); }
}
export var DOM = new BrowserDomAdapter();


  @Injectable()
  export class WozllaEngineRenderer extends Renderer {
      _document;
      constructor() {
          super();
          console.log('WozllaEngineRenderer created');
          this._document = document;
      }

      createRootHostView(hostProtoViewRef: RenderProtoViewRef,
                          fragmentCount: number,
                          hostElementSelector: string):any /*RenderViewWithFragments*/ {
          console.log("WozllaEngineRenderer.createRootHostView");
          var element = DOM.querySelector(this._document, hostElementSelector);
          var hostProtoView = (<DomProtoViewRef>hostProtoViewRef)._protoView;
          this._createView(hostProtoView, element)
      }

      _createView(protoView: DomProtoView, inplaceElement: HTMLElement): RenderViewWithFragments {
        var cloneableTemplate = (<any>protoView).cloneableTemplate;
        var isSingleElementChild = (<any>protoView).isSingleElementChild;

        var templateContent = DOM.content(cloneableTemplate);
        console.log('templateContent',templateContent);
        var templateContentFull = DOM.importIntoDoc(templateContent);
        console.log('templateContentFull',templateContentFull);
        var clonedTemplate = DOM.clone(templateContentFull);
        console.log('clonedTemplate',clonedTemplate);
        var bindings;
        if (isSingleElementChild) {
          var rootElement = DOM.firstChild(clonedTemplate);
          var rootHasBinding = DOM.hasClass(rootElement, NG_BINDING_CLASS);
          var dynamicElementList = DOM.getElementsByClassName(rootElement, NG_BINDING_CLASS);
          bindings = dynamicElementList;
        } else {
          dynamicElementList = DOM.querySelectorAll(clonedTemplate, NG_BINDING_CLASS_SELECTOR);
          bindings = dynamicElementList;
        }


        console.log('#########################');
        console.log(cloneableTemplate);
        console.log(isSingleElementChild);
        console.log(bindings);
        console.log('#########################');


        var frag;
        return frag;
      }

      detachFreeHostView(parentHostViewRef: RenderViewRef, hostViewRef: RenderViewRef) {
          console.log("WozllaEngineRenderer.detachFreeHostView");
          console.log(arguments);
      }

      createView(protoViewRef: RenderProtoViewRef, fragmentCount: number): any {
          console.log("WozllaEngineRenderer.createView");
          console.log(arguments);
      }

      destroyView(viewRef: RenderViewRef) {
          console.log("WozllaEngineRenderer.destroyView");
          console.log(arguments);
      }

      attachFragmentAfterFragment(previousFragmentRef: RenderFragmentRef, fragmentRef: RenderFragmentRef) {
          console.log("WozllaEngineRenderer.attachFragmentAfterFragment");
          console.log(arguments);
      }

      attachFragmentAfterElement(location: RenderElementRef, fragmentRef: RenderFragmentRef) {
          console.log("WozllaEngineRenderer.attachFragmentAfterElement");
          console.log(arguments);
      }

      private attachFragmentAfter(anchorNode: any, fragmentNodes:any) {
          console.log('WozllaEngineRenderer.attachFragmentAfter');
          console.log(arguments);
      }

      detachFragment(fragmentRef: RenderFragmentRef) {
          console.log('WozllaEngineRenderer.detachFragment');
          console.log(arguments);
      }

      hydrateView(viewRef: RenderViewRef) {
          console.log("WozllaEngineRenderer.hydrateView ");
          console.log(arguments);
              console.log(this);
      }

      dehydrateView(viewRef: RenderViewRef) {
          console.log("WozllaEngineRenderer.dehydrateView");
          console.log(arguments);
      }

      setElementProperty(location: RenderElementRef, propertyName: string, propertyValue: any) {
          console.log("WozllaEngineRenderer.setElementProperty " + propertyName + " = " + propertyValue);
          console.log(arguments);
      }

      setElementAttribute(location: RenderElementRef, attributeName: string, attributeValue: string) {
          console.log("WozllaEngineRenderer.setElementAttribute " + attributeName + " = " + attributeValue);
          console.log(arguments);
      }

      getNativeElementSync(location: RenderElementRef): any {
          console.log("WozllaEngineRenderer.getNativeElementSync");
          console.log(arguments);
      }

      /**
      * Calls a method on an element.
      */
      invokeElementMethod(location: RenderElementRef, methodName: string, args: List<any>) {
          console.log("WozllaEngineRenderer.invokeElementMethod " + methodName + " " + args);
          console.log(arguments);
      }

      setText(viewRef: RenderViewRef, textNodeIndex: number, text: string) {
          console.log("WozllaEngineRenderer.setText ");
          console.log(arguments);
      }

      setEventDispatcher(viewRef: RenderViewRef, dispatcher: RenderEventDispatcher) {
          console.log("WozllaEngineRenderer.setEventDispatcher ");
          console.log(arguments);
      }


  }

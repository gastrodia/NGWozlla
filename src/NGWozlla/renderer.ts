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
import {DomView} from 'angular2/src/render/dom/view/view';


export const NG_BINDING_CLASS_SELECTOR = '.ng-binding';
export const NG_BINDING_CLASS = 'ng-binding';

export const EVENT_TARGET_SEPARATOR = ':';

export const NG_CONTENT_ELEMENT_NAME = 'ng-content';
export const NG_SHADOW_ROOT_ELEMENT_NAME = 'shadow-root';
export class DomProtoViewRef extends RenderProtoViewRef {
  constructor(public _protoView: DomProtoView) { super(); }
}
export var DOM = new BrowserDomAdapter();

export function isPresent(obj: any): boolean {
  return obj !== undefined && obj !== null;
}

export function isBlank(obj: any): boolean {
  return obj === undefined || obj === null;
}

function moveChildNodes(source: Node, target: Node) {
  var currChild = DOM.firstChild(source);
  while (isPresent(currChild)) {
    var nextChild = DOM.nextSibling(currChild);
    DOM.appendChild(target, currChild);
    currChild = nextChild;
  }
}

function moveNodesAfterSibling(sibling, nodes) {
  if (nodes.length > 0 && isPresent(DOM.parentElement(sibling))) {
    for (var i = 0; i < nodes.length; i++) {
      DOM.insertBefore(sibling, nodes[i]);
    }
    DOM.insertBefore(nodes[nodes.length - 1], sibling);
  }
}

export function resolveInternalDomProtoView(protoViewRef: RenderProtoViewRef): DomProtoView {
  return (<DomProtoViewRef>protoViewRef)._protoView;
}

export function resolveInternalDomFragment(fragmentRef: RenderFragmentRef): Node[] {
  return (<DomFragmentRef>fragmentRef)._nodes;
}

export function resolveInternalDomView(viewRef: RenderViewRef): DomView {
  return (<DomViewRef>viewRef)._view;
}


export class DomViewRef extends RenderViewRef {
  constructor(public _view: DomView) { super(); }
}

export class DomFragmentRef extends RenderFragmentRef {
  constructor(public _nodes: Node[]) { super(); }
}


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
                        hostElementSelector: string):RenderViewWithFragments {
        console.log("WozllaEngineRenderer.createRootHostView");
        var element = DOM.querySelector(this._document, hostElementSelector);
        var hostProtoView = resolveInternalDomProtoView(hostProtoViewRef);
        return this._createView(hostProtoView, element)
    }


    detachFreeHostView(parentHostViewRef: RenderViewRef, hostViewRef: RenderViewRef) {
        console.log("WozllaEngineRenderer.detachFreeHostView");
    }

    createView(protoViewRef: RenderProtoViewRef, fragmentCount: number): any {
        console.log("WozllaEngineRenderer.createView");
        var protoView = resolveInternalDomProtoView(protoViewRef);
        return this._createView(protoView,null);
    }

    destroyView(viewRef: RenderViewRef) {
        console.log("WozllaEngineRenderer.destroyView");
    }

    attachFragmentAfterFragment(previousFragmentRef: RenderFragmentRef, fragmentRef: RenderFragmentRef) {
        console.log("WozllaEngineRenderer.attachFragmentAfterFragment");
        var previousFragmentNodes = resolveInternalDomFragment(previousFragmentRef);
        if (previousFragmentNodes.length > 0) {
          var sibling = previousFragmentNodes[previousFragmentNodes.length - 1];
          moveNodesAfterSibling(sibling, resolveInternalDomFragment(fragmentRef));
        }
    }

    attachFragmentAfterElement(elementRef: RenderElementRef, fragmentRef: RenderFragmentRef) {
      console.log("WozllaEngineRenderer.attachFragmentAfterElement");
      if (isBlank(elementRef.renderBoundElementIndex)) {
        return;
      }
      var parentView = resolveInternalDomView(elementRef.renderView);
      var element = parentView.boundElements[elementRef.renderBoundElementIndex];
      moveNodesAfterSibling(element, resolveInternalDomFragment(fragmentRef));
    }

    private attachFragmentAfter(anchorNode: any, fragmentNodes:any) {
        console.log('WozllaEngineRenderer.attachFragmentAfter');
    }

    detachFragment(fragmentRef: RenderFragmentRef) {
        console.log('WozllaEngineRenderer.detachFragment');
    }

    hydrateView(viewRef: RenderViewRef) {
        console.log("WozllaEngineRenderer.hydrateView ");
    }

    dehydrateView(viewRef: RenderViewRef) {
        console.log("WozllaEngineRenderer.dehydrateView");
    }

    setElementProperty(location: RenderElementRef, propertyName: string, propertyValue: any) {
        console.log("WozllaEngineRenderer.setElementProperty " + propertyName + " = " + propertyValue);
    }

    setElementAttribute(location: RenderElementRef, attributeName: string, attributeValue: string) {
        console.log("WozllaEngineRenderer.setElementAttribute " + attributeName + " = " + attributeValue);
    }


    getNativeElementSync(location: RenderElementRef): any {
        console.log("WozllaEngineRenderer.getNativeElementSync");
        if (isBlank(location.renderBoundElementIndex)) {
          return null;
        }
        return resolveInternalDomView(location.renderView)
            .boundElements[location.renderBoundElementIndex];
    }

    /**
    * Calls a method on an element.
    */
    invokeElementMethod(location: RenderElementRef, methodName: string, args: List<any>) {
        console.log("WozllaEngineRenderer.invokeElementMethod " + methodName + " " + args);
    }

    setText(viewRef: RenderViewRef, textNodeIndex: number, text: string) {
        console.log("WozllaEngineRenderer.setText ");
        if (isBlank(textNodeIndex)) {
          return;
        }
        var view = resolveInternalDomView(viewRef);
        DOM.setText(view.boundTextNodes[textNodeIndex], text);
    }

    setEventDispatcher(viewRef: RenderViewRef, dispatcher: RenderEventDispatcher) {
        console.log("WozllaEngineRenderer.setEventDispatcher ");
    }



    _createView(protoView: DomProtoView, inplaceElement: HTMLElement): RenderViewWithFragments {
      var cloneableTemplate = (<any>protoView).cloneableTemplate;
      var isSingleElementChild = (<any>protoView).isSingleElementChild;
      var templateContent = DOM.content(cloneableTemplate);
      templateContent = DOM.importIntoDoc(templateContent);
      templateContent = DOM.clone(templateContent);

      var boundElements;
      if (isSingleElementChild) {
        var rootElement = DOM.firstChild(templateContent);
        var rootHasBinding = DOM.hasClass(rootElement, NG_BINDING_CLASS);
        var dynamicElementList = DOM.getElementsByClassName(rootElement, NG_BINDING_CLASS);
        boundElements = dynamicElementList;
      } else {
        dynamicElementList = DOM.querySelectorAll(templateContent, NG_BINDING_CLASS_SELECTOR);
        boundElements = dynamicElementList;
      }

      var rootTextNodeIndices = (<any>protoView).rootTextNodeIndices;
      var elementBinders = (<any>protoView).elementBinders;
      var boundTextNodes = [];

      if (rootTextNodeIndices.length > 0) {
        var rootChildNodes = DOM.childNodes(templateContent);
        for (var i = 0; i < rootTextNodeIndices.length; i++) {
          boundTextNodes.push(rootChildNodes[rootTextNodeIndices[i]]);
        }
      }
      for (var i = 0; i < elementBinders.length; i++) {
        var binder = elementBinders[i];
        var element: Node = boundElements[i];
        if (binder.textNodeIndices.length > 0) {
          var childNodes = DOM.childNodes(element);
          for (var j = 0; j < binder.textNodeIndices.length; j++) {
            boundTextNodes.push(childNodes[binder.textNodeIndices[j]]);
          }
        }
      }


      var fragments = [];
      var fragmentsRootNodeCount = (<any>protoView).fragmentsRootNodeCount;
      var childNode = DOM.firstChild(templateContent);
      for (var fragmentIndex = 0; fragmentIndex < fragmentsRootNodeCount.length; fragmentIndex++) {
        var fragment = [fragmentsRootNodeCount[fragmentIndex]];
        fragments.push(fragment);
        // Note: the 2nd, 3rd, ... fragments are separated by each other via a '|'
        if (fragmentIndex >= 1) {
          childNode = DOM.nextSibling(childNode);
        }
        for (var i = 0; i < fragment.length; i++) {
          fragment[i] = childNode;
          childNode = DOM.nextSibling(childNode);
        }
      }





      // adopt inplaceElement
      if (isPresent(inplaceElement)) {
        if (fragmentsRootNodeCount[0] !== 1) {
          console.log('Root proto views can only contain one element!');
        }
        DOM.clearNodes(inplaceElement);
        var tempRoot = fragments[0][0];
        moveChildNodes(tempRoot, inplaceElement);
        if (boundElements.length > 0 && boundElements[0] === tempRoot) {
          boundElements[0] = inplaceElement;
        }
        fragments[0][0] = inplaceElement;
      }

      var view = new DomView(protoView, boundTextNodes, boundElements);


      return new RenderViewWithFragments(
          new DomViewRef(view), fragments.map(nodes => new DomFragmentRef(nodes)));

    }

}

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



  import {WozllaTemplateCloner} from './template_cloner';
  @Injectable()
  export class WozllaEngineRenderer extends Renderer {
      constructor(private _templateCloner: WozllaTemplateCloner) {
          super();
          console.log('WozllaEngineRenderer created');
      }

      createRootHostView(hostProtoViewRef: RenderProtoViewRef,
                          fragmentCount: number,
                          hostElementSelector: string):any /*RenderViewWithFragments*/ {
          console.log("WozllaEngineRenderer.createRootHostView");
          console.log(arguments);
          var hostProtoView = (<any>hostProtoViewRef)._protoView;
          console.log('hostProtoView',hostProtoView);
          console.log('this._templateCloner',this._templateCloner);

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

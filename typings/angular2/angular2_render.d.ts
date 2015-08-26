
declare module 'angular2/src/render/api'{
  class EventBinding{
    constructor(fullName:string,source:any)
  }
  enum PropertyBindingType{
      PROPERTY,
      ATTRIBUTE,
      CLASS,
      STYLE
  }
  class ElementPropertyBinding {
    constructor(type:PropertyBindingType,source:any,property:string,unit:string)
  }
  class RenderElementBinder{
    index:number;
    parentIndex:number;
    distanceToParent:number;
    directives: List<DirectiveBinder>;
    nestedProtoView:ProtoViewDto;
    propertyBindings:List<ElementPropertyBinding>;
    variableBindings:Map<string,string>;
    eventBindings:List<EventBinding>;
    readAttributes:Map<string,string>;
    constructor({index,parentIndex,distanceToParent,directives,nestedProtoView,propertyBindings,
                 variableBindings,eventBindings,readAttributes}:{
      index?:number,
      parentIndex?:number,
      distanceToParent?:number,
      directives?:List<DirectiveBinder>,
      nestedProtoView?:ProtoViewDto,
      propertyBindings?:List<ElementPropertyBinding>,
      variableBindings?:Map<string,string>,
      eventBindings?:List<EventBinding>,
      readAttributes?:Map<string,string>
    })
  }

  class DirectiveBinder{
    directiveIndex:number;
    propertyBindings:Map<string,any>;
    eventBindings:List<EventBinding>;
    hostPropertyBindings:List<ElementPropertyBinding>;
    constructor({directiveIndex,propertyBindings,eventBindings,hostPropertyBindings}:{
      directiveIndex?: number,
      propertyBindings?: Map<string, any>,
      eventBindings?: List<EventBinding>,
      hostPropertyBindings?: List<ElementPropertyBinding>
    })
  }

  enum ViewType{
   // A view that contains the host element with bound component directive.
    // Contains a COMPONENT view
    HOST,
    // The view of the component
    // Can contain 0 to n EMBEDDED views
    COMPONENT,
    // A view that is embedded into another View via a <template> element
    // inside of a COMPONENT view
    EMBEDDED
  }

  class ProtoViewDto{
    render:RenderProtoViewRef;
    elementBinders:List<RenderElementBinder>;
    variableBindings:Map<string,string>;
    type:ViewType;
    textBindings:List<any>;
    transitiveNgContentCount:number;
    constructor({render, elementBinders, variableBindings, type, textBindings,
               transitiveNgContentCount}: {
      render?: RenderProtoViewRef,
      elementBinders?: List<RenderElementBinder>,
      variableBindings?: Map<string, string>,
      type?: ViewType,
      textBindings?: List<any>,
      transitiveNgContentCount?: number
    })
  }

  class RenderDirectiveMetadata{
    id:any;
    selector:string;
    compileChildren:boolean;
    events:List<string>;
    properties:List<string>;
    readAttributes:List<string>;
    type:number;
    callOnDestroy:boolean;
    callOnChange:boolean;
    callOnCheck:boolean;
    callOnInit:boolean;
    callOnAllChangesDone:boolean;
    changeDetection:string;
    exportAs:string;
    hostListeners:Map<string,string>;
    hostProperties:Map<string,string>;
    hostAttributes:Map<string,string>;
    hostActions:Map<string,string>;
    static _hostRegExp;

    constructor({id, selector, compileChildren, events, hostListeners, hostProperties, hostAttributes,
               hostActions, properties, readAttributes, type, callOnDestroy, callOnChange,
               callOnCheck, callOnInit, callOnAllChangesDone, changeDetection, exportAs}: {
      id?: string,
      selector?: string,
      compileChildren?: boolean,
      events?: List<string>,
      hostListeners?: Map<string, string>,
      hostProperties?: Map<string, string>,
      hostAttributes?: Map<string, string>,
      hostActions?: Map<string, string>,
      properties?: List<string>,
      readAttributes?: List<string>,
      type?: number,
      callOnDestroy?: boolean,
      callOnChange?: boolean,
      callOnCheck?: boolean,
      callOnInit?: boolean,
      callOnAllChangesDone?: boolean,
      changeDetection?: string,
      exportAs?: string
    })

    static create({id, selector, compileChildren, events, host, properties, readAttributes, type,
                   callOnDestroy, callOnChange, callOnCheck, callOnInit, callOnAllChangesDone,
                   changeDetection, exportAs}: {
      id?: string,
      selector?: string,
      compileChildren?: boolean,
      events?: List<string>,
      host?: Map<string, string>,
      properties?: List<string>,
      readAttributes?: List<string>,
      type?: number,
      callOnDestroy?: boolean,
      callOnChange?: boolean,
      callOnCheck?: boolean,
      callOnInit?: boolean,
      callOnAllChangesDone?: boolean,
      changeDetection?: string,
      exportAs?: string
    }): RenderDirectiveMetadata;
  }

  enum ViewEncapsulation {
  /**
   * Emulate scoping of styles by preprocessing the style rules
   * and adding additional attributes to elements. This is the default.
   */
  EMULATED,
  /**
   * Uses the native mechanism of the renderer. For the DOM this means creating a ShadowRoot.
   */
    NATIVE,
    NONE
  }

  class ViewDefinition{
    componentId:string;
    templateAbsUrl:string;
    template:string;
    directives:List<RenderDirectiveMetadata>;
    styleAbsUrls:List<string>;
    styles:List<string>;
    encapsulation:ViewEncapsulation;
   constructor({componentId, templateAbsUrl, template, styleAbsUrls, styles, directives,
             encapsulation}: {
      componentId?: string,
      templateAbsUrl?: string,
      template?: string,
      styleAbsUrls?: List<string>,
      styles?: List<string>,
      directives?: List<RenderDirectiveMetadata>,
      encapsulation?: ViewEncapsulation
    })
  }

  class RenderProtoViewMergeMapping{
    constructor(mergedProtoViewRef: RenderProtoViewRef,
              // Number of fragments in the merged ProtoView.
              // Fragments are stored in depth first order of nested ProtoViews.
              fragmentCount: number,
              // Mapping from app element index to render element index.
              // Mappings of nested ProtoViews are in depth first order, with all
              // indices for one ProtoView in a consecuitve block.
              mappedElementIndices: number[],
              // Number of bound render element.
              // Note: This could be more than the original ones
              // as we might have bound a new element for projecting bound text nodes.
              mappedElementCount: number,
              // Mapping from app text index to render text index.
              // Mappings of nested ProtoViews are in depth first order, with all
              // indices for one ProtoView in a consecuitve block.
              mappedTextIndices: number[],
              // Mapping from view index to app element index
              hostElementIndicesByViewIndex: number[],
              // Number of contained views by view index
              nestedViewCountByViewIndex: number[]);
  }


  class RenderProtoViewRef{}
  class RenderFragmentRef{}
  class RenderViewRef{}

  class RenderCompiler{
    /**
   * Creats a ProtoViewDto that contains a single nested component with the given componentId.
   */
  compileHost(directiveMetadata: RenderDirectiveMetadata): Promise<ProtoViewDto>;

  /**
   * Compiles a single DomProtoView. Non recursive so that
   * we don't need to serialize all possible components over the wire,
   * but only the needed ones based on previous calls.
   */
  compile(view: ViewDefinition): Promise<ProtoViewDto>;

  /**
   * Merges ProtoViews.
   * The first entry of the array is the protoview into which all the other entries of the array
   * should be merged.
   * If the array contains other arrays, they will be merged before processing the parent array.
   * The array must contain an entry for every component and embedded ProtoView of the first entry.
   * @param protoViewRefs List of ProtoViewRefs or nested
   * @return the merge result
   */
  mergeProtoViewsRecursively(
      protoViewRefs: List<RenderProtoViewRef | List<any>>): Promise<RenderProtoViewMergeMapping>;
  }

  class RenderViewWithFragments {
    constructor(viewRef: RenderViewRef,fragmentRefs: RenderFragmentRef[])
  }

  interface RenderElementRef {
    /**
     * Reference to the `RenderViewRef` where the `RenderElementRef` is inside of.
     */
    renderView: RenderViewRef;
    /**
     * Index of the element inside the `RenderViewRef`.
     *
     * This is used internally by the Angular framework to locate elements.
     */
    renderBoundElementIndex: number;
  }

  class Renderer{
     /**
   * Creates a root host view that includes the given element.
   * Note that the fragmentCount needs to be passed in so that we can create a result
   * synchronously even when dealing with webworkers!
   *
   * @param {RenderProtoViewRef} hostProtoViewRef a RenderProtoViewRef of type
   * ProtoViewDto.HOST_VIEW_TYPE
   * @param {any} hostElementSelector css selector for the host element (will be queried against the
   * main document)
   * @return {RenderViewWithFragments} the created view including fragments
   */
  createRootHostView(hostProtoViewRef: RenderProtoViewRef, fragmentCount: number,
                     hostElementSelector: string): RenderViewWithFragments;
  /**
   * Creates a regular view out of the given ProtoView.
   * Note that the fragmentCount needs to be passed in so that we can create a result
   * synchronously even when dealing with webworkers!
   */
  createView(protoViewRef: RenderProtoViewRef, fragmentCount: number): RenderViewWithFragments ;

  /**
   * Destroys the given view after it has been dehydrated and detached
   */
  destroyView(viewRef: RenderViewRef);

  /**
   * Attaches a fragment after another fragment.
   */
  attachFragmentAfterFragment(previousFragmentRef: RenderFragmentRef,
                              fragmentRef: RenderFragmentRef);

  /**
   * Attaches a fragment after an element.
   */
  attachFragmentAfterElement(elementRef: RenderElementRef, fragmentRef: RenderFragmentRef);

  /**
   * Detaches a fragment.
   */
  detachFragment(fragmentRef: RenderFragmentRef);

  /**
   * Hydrates a view after it has been attached. Hydration/dehydration is used for reusing views
   * inside of the view pool.
   */
  hydrateView(viewRef: RenderViewRef) ;

  /**
   * Dehydrates a view after it has been attached. Hydration/dehydration is used for reusing views
   * inside of the view pool.
   */
  dehydrateView(viewRef: RenderViewRef) ;

  /**
   * Returns the native element at the given location.
   * Attention: In a WebWorker scenario, this should always return null!
   */
  getNativeElementSync(location: RenderElementRef);

  /**
   * Sets a property on an element.
   */
  setElementProperty(location: RenderElementRef, propertyName: string, propertyValue: any);

  /**
   * Sets an attribute on an element.
   */
  setElementAttribute(location: RenderElementRef, attributeName: string, attributeValue: string) ;

  /**
   * Sets a class on an element.
   */
  setElementClass(location: RenderElementRef, className: string, isAdd: boolean);

  /**
   * Sets a style on an element.
   */
  setElementStyle(location: RenderElementRef, styleName: string, styleValue: string) ;

  /**
   * Calls a method on an element.
   */
  invokeElementMethod(location: RenderElementRef, methodName: string, args: List<any>);

  /**
   * Sets the value of a text node.
   */
  setText(viewRef: RenderViewRef, textNodeIndex: number, text: string) ;

  /**
   * Sets the dispatcher for all events of the given view
   */
  setEventDispatcher(viewRef: RenderViewRef, dispatcher: RenderEventDispatcher) ;
  }

  /**
 * A dispatcher for all events happening in a view.
 */
 interface RenderEventDispatcher {
  /**
   * Called when an event was triggered for a on-* attribute on an element.
   * @param {Map<string, any>} locals Locals to be used to evaluate the
   *   event expressions
   */
  dispatchRenderEvent(elementIndex: number, eventName: string, locals: Map<string, any>);
}
}


declare module 'angular2/src/render/dom/compiler/selector'{
  class CssSelector{
    parse(selector:any):Array<any>
  }
}

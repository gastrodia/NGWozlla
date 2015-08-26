now we know we can write a bootstrap function and bind Render to myRender boot angular2
,so we can render parse domTree to any object we need.

like:
 * domTree -> jquery ->Wozlla
 * domTree -> jquery ->three.js

but in if we change data, the objects you that you created is not change at the same time;

maybe we can use setElementProperty and any other render method to update value of three.js objects

but it will be compex

so I want to understand how dom_render and dom_complier works
there are extends api/render and Complier ,load by di system so i think we can write a new Complier get meta data of Application layer

it is a heavy work

  . as same method bind RenderCompiler to alias ThreeRenderCompiler(extends RenderCompiler)
  then get compileHost call and directiveMetadata


core/Complier.compileInHost call  /render/dom/complier.compileHost
/render/dom/complier.compileHost:
```javascript

  compileHost(directiveMetadata: DirectiveMetadata): Promise<ProtoViewDto> {
    let hostViewDef = new ViewDefinition({
      componentId: directiveMetadata.id,
      templateAbsUrl: null, template: null,
      styles: null,
      styleAbsUrls: null,
      directives: [directiveMetadata],
      encapsulation: ViewEncapsulation.NONE
    });

    let selector = CssSelector.parse(directiveMetadata.selector)[0];
    let hostTemplate = selector.getMatchingElementTemplate();
    let templateAndStyles = new TemplateAndStyles(hostTemplate, []);

    return this._compileView(hostViewDef, templateAndStyles, ViewType.HOST);
  }

```
by import CssSelector we can get hostTemplate ,very easy!
and then how to get the child element of root?

1.complileHost Finally return is a ProtoViewDto

```javascript
  build(schemaRegistry: ElementSchemaRegistry, templateCloner: TemplateCloner): api.ProtoViewDto {
    var domElementBinders = [];

    var apiElementBinders = [];
    var textNodeExpressions = [];
    var rootTextNodeIndices = [];
    var transitiveNgContentCount = this.ngContentCount;
    queryBoundTextNodeIndices(DOM.content(this.rootElement), this.rootTextBindings,
                              (node, nodeIndex, expression) => {
                                textNodeExpressions.push(expression);
                                rootTextNodeIndices.push(nodeIndex);
                              });

    ListWrapper.forEach(this.elements, (ebb: ElementBinderBuilder) => {
      var directiveTemplatePropertyNames = new Set();
      var apiDirectiveBinders = ListWrapper.map(ebb.directives, (dbb: DirectiveBuilder) => {
        ebb.eventBuilder.merge(dbb.eventBuilder);
        ListWrapper.forEach(dbb.templatePropertyNames,
                            (name) => directiveTemplatePropertyNames.add(name));
        return new api.DirectiveBinder({
          directiveIndex: dbb.directiveIndex,
          propertyBindings: dbb.propertyBindings,
          eventBindings: dbb.eventBindings,
          hostPropertyBindings: buildElementPropertyBindings(schemaRegistry, ebb.element, true,
                                                             dbb.hostPropertyBindings, null)
        });
      });
      var nestedProtoView = isPresent(ebb.nestedProtoView) ?
                                ebb.nestedProtoView.build(schemaRegistry, templateCloner) :
                                null;
      if (isPresent(nestedProtoView)) {
        transitiveNgContentCount += nestedProtoView.transitiveNgContentCount;
      }
      var parentIndex = isPresent(ebb.parent) ? ebb.parent.index : -1;
      var textNodeIndices = [];
      queryBoundTextNodeIndices(ebb.element, ebb.textBindings, (node, nodeIndex, expression) => {
        textNodeExpressions.push(expression);
        textNodeIndices.push(nodeIndex);
      });
      apiElementBinders.push(new api.ElementBinder({
        index: ebb.index,
        parentIndex: parentIndex,
        distanceToParent: ebb.distanceToParent,
        directives: apiDirectiveBinders,
        nestedProtoView: nestedProtoView,
        propertyBindings:
            buildElementPropertyBindings(schemaRegistry, ebb.element, isPresent(ebb.componentId),
                                         ebb.propertyBindings, directiveTemplatePropertyNames),
        variableBindings: ebb.variableBindings,
        eventBindings: ebb.eventBindings,
        readAttributes: ebb.readAttributes
      }));
      domElementBinders.push(new DomElementBinder({
        textNodeIndices: textNodeIndices,
        hasNestedProtoView: isPresent(nestedProtoView) || isPresent(ebb.componentId),
        hasNativeShadowRoot: false,
        eventLocals: new LiteralArray(ebb.eventBuilder.buildEventLocals()),
        localEvents: ebb.eventBuilder.buildLocalEvents(),
        globalEvents: ebb.eventBuilder.buildGlobalEvents()
      }));
    });
    var rootNodeCount = DOM.childNodes(DOM.content(this.rootElement)).length;
    return new api.ProtoViewDto({
      render: new DomProtoViewRef(DomProtoView.create(
          templateCloner, this.type, this.rootElement, this.viewEncapsulation, [rootNodeCount],
          rootTextNodeIndices, domElementBinders, this.hostAttributes)),
      type: this.type,
      elementBinders: apiElementBinders,
      variableBindings: this.variableBindings,
      textBindings: textNodeExpressions,
      transitiveNgContentCount: transitiveNgContentCount
    });
  }

```

in mergeProtoViewsRecursively Finally return is :
modules/angular2/src/render/dom/view/proto_view_merger.ts  [view on github]

```javascript
var mergedProtoView =
      DomProtoView.create(templateCloner, mainProtoView.original.type, rootElement,
                          mainProtoView.original.encapsulation, fragmentsRootNodeCount,
                          rootTextNodeIndices, mergedElementBinders, new Map());
  return new RenderProtoViewMergeMapping(new DomProtoViewRef(mergedProtoView),
                                         fragmentsRootNodeCount.length, mappedElementIndices,
                                         mergedBoundElements.length, mappedTextIndices,
                                         hostElementIndicesByViewIndex, nestedViewCounts);
```

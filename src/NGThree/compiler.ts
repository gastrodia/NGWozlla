import {Injectable,Renderer} from 'angular2/angular2';
import {RenderCompiler} from 'angular2/src/render/api';
import {CssSelector} from 'angular2/src/render/dom/compiler/selector';
import {PromiseWrapper, Promise} from 'angular2/src/facade/async';
import * as api from 'angular2/src/render/api';

export class ThreeRenderCompiler extends RenderCompiler{
  /**
     * Creats a ProtoViewDto that contains a single nested component with the given componentId.
     */
    compileHost(directiveMetadata: any): any {
      console.log('ThreeRenderCompiler.compileHost')
      console.log(directiveMetadata)

      let selector = (<any>CssSelector).parse(<any>directiveMetadata.selector)[0];
      let hostTemplate = selector.getMatchingElementTemplate();
      console.log(hostTemplate);

      return (<any>PromiseWrapper).resolve(new (<any>api).ProtoViewDto({
        render: {
          template:hostTemplate
        },
        type: (<any>api).ViewType.HOST,
        elementBinders: [],
        variableBindings: [],
        textBindings: [],
        transitiveNgContentCount: 0
      }));


    }

    /**
     * Compiles a single DomProtoView. Non recursive so that
     * we don't need to serialize all possible components over the wire,
     * but only the needed ones based on previous calls.
     */
    compile(view: any): any {
      console.log('ThreeRenderCompiler.compile')
      return null; }

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
        protoViewRefs: List<any | List<any>>): any {
          console.log('ThreeRenderCompiler.mergeProtoViewsRecursively')
      return  (<any>PromiseWrapper).resolve(new (<any>api).RenderProtoViewMergeMapping(
        protoViewRefs,
        0, [],
        0, [],
        [], 0
      ));
    }
}

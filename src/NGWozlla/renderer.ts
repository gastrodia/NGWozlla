import {Injectable} from 'angular2/angular2';
import {
    Renderer,
    RenderEventDispatcher,
    RenderElementRef,
    RenderProtoViewRef,
    RenderViewRef,
    RenderFragmentRef,
    RenderViewWithFragments
} from 'angular2/angular2';

//import {TemplateCloner} from 'angular2/render/dom';

@Injectable()
export class WozllaEngineRenderer extends Renderer {
    constructor() {
        super();
        console.log('WozllaEngineRenderer created');
    }


}

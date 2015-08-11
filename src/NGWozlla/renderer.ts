import {Injectable} from 'angular2/angular2';
import {
    Renderer,
    RenderEventDispatcher,
    RenderElementRef,
    RenderProtoViewRef,
    RenderViewRef,
    RenderFragmentRef,
    RenderViewWithFragments
} from '../../deps/angular/modules/angular2/src/render/api';

import {TemplateCloner} from '../../deps/angular/modules/angular2/src/render/dom/template_cloner';

@Injectable()
export class WozllaEngineRenderer extends Renderer {
    constructor(private _templateCloner: TemplateCloner) {
        super();
        console.log('WozllaEngineRenderer created');
    }


}

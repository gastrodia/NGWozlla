import { OpaqueToken } from "angular2/di";
import { RenderElementRef, RenderViewRef } from "angular2/src/render/api";
export declare const ON_WEB_WORKER: OpaqueToken;
export declare class WebWorkerElementRef implements RenderElementRef {
    renderView: RenderViewRef;
    renderBoundElementIndex: number;
    constructor(renderView: RenderViewRef, renderBoundElementIndex: number);
}

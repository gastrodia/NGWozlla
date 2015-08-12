import { Promise } from 'angular2/src/facade/async';
import { DomRenderer } from 'angular2/src/render/dom/dom_renderer';
import { DefaultDomCompiler } from 'angular2/src/render/dom/compiler/compiler';
import { RenderViewWithFragments, RenderFragmentRef, RenderViewRef, ProtoViewDto, ViewDefinition, DirectiveMetadata, RenderElementRef, RenderProtoViewMergeMapping, RenderProtoViewRef } from 'angular2/src/render/api';
export declare class TestRootView {
    viewRef: RenderViewRef;
    fragments: RenderFragmentRef[];
    hostElement: Element;
    events: List<List<any>>;
    constructor(viewWithFragments: RenderViewWithFragments);
}
export declare class TestRenderElementRef implements RenderElementRef {
    renderView: RenderViewRef;
    renderBoundElementIndex: number;
    constructor(renderView: RenderViewRef, renderBoundElementIndex: number);
}
export declare function elRef(renderView: RenderViewRef, boundElementIndex: number): TestRenderElementRef;
export declare function rootNodes(view: RenderViewRef): void;
export declare class DomTestbed {
    renderer: DomRenderer;
    compiler: DefaultDomCompiler;
    rootEl: any;
    constructor(renderer: DomRenderer, compiler: DefaultDomCompiler, document: any);
    compile(host: DirectiveMetadata, componentViews: ViewDefinition[]): Promise<ProtoViewDto[]>;
    merge(protoViews: List<ProtoViewDto | RenderProtoViewRef>): Promise<RenderProtoViewMergeMapping>;
    compileAndMerge(host: DirectiveMetadata, componentViews: ViewDefinition[]): Promise<RenderProtoViewMergeMapping>;
    _createTestView(viewWithFragments: RenderViewWithFragments): TestRootView;
    createView(protoView: RenderProtoViewMergeMapping): TestRootView;
    triggerEvent(elementRef: RenderElementRef, eventName: string): void;
}

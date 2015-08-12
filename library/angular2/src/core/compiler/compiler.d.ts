import { Binding } from 'angular2/di';
import { Type } from 'angular2/src/facade/lang';
import { Promise } from 'angular2/src/facade/async';
import { DirectiveResolver } from './directive_resolver';
import { AppProtoView } from './view';
import { ProtoViewRef } from './view_ref';
import { ViewResolver } from './view_resolver';
import { ComponentUrlMapper } from './component_url_mapper';
import { ProtoViewFactory } from './proto_view_factory';
import { UrlResolver } from 'angular2/src/services/url_resolver';
import { AppRootUrl } from 'angular2/src/services/app_root_url';
import * as renderApi from 'angular2/src/render/api';
/**
 * Cache that stores the AppProtoView of the template of a component.
 * Used to prevent duplicate work and resolve cyclic dependencies.
 */
export declare class CompilerCache {
    _cache: Map<Type, AppProtoView>;
    _hostCache: Map<Type, AppProtoView>;
    set(component: Type, protoView: AppProtoView): void;
    get(component: Type): AppProtoView;
    setHost(component: Type, protoView: AppProtoView): void;
    getHost(component: Type): AppProtoView;
    clear(): void;
}
/**
 *
 * ## URL Resolution
 *
 * ```
 * var appRootUrl: AppRootUrl = ...;
 * var componentUrlMapper: ComponentUrlMapper = ...;
 * var urlResolver: UrlResolver = ...;
 *
 * var componentType: Type = ...;
 * var componentAnnotation: ComponentAnnotation = ...;
 * var viewAnnotation: ViewAnnotation = ...;
 *
 * // Resolving a URL
 *
 * var url = viewAnnotation.templateUrl;
 * var componentUrl = componentUrlMapper.getUrl(componentType);
 * var componentResolvedUrl = urlResolver.resolve(appRootUrl.value, componentUrl);
 * var templateResolvedUrl = urlResolver.resolve(componetResolvedUrl, url);
 * ```
 */
export declare class Compiler {
    private _reader;
    private _compilerCache;
    private _compiling;
    private _viewResolver;
    private _componentUrlMapper;
    private _urlResolver;
    private _appUrl;
    private _render;
    private _protoViewFactory;
    /**
     * @private
     */
    constructor(reader: DirectiveResolver, cache: CompilerCache, viewResolver: ViewResolver, componentUrlMapper: ComponentUrlMapper, urlResolver: UrlResolver, render: renderApi.RenderCompiler, protoViewFactory: ProtoViewFactory, appUrl: AppRootUrl);
    private _bindDirective(directiveTypeOrBinding);
    compileInHost(componentTypeOrBinding: Type | Binding): Promise<ProtoViewRef>;
    private _compile(componentBinding, componentPath);
    private _removeDuplicatedDirectives(directives);
    private _compileNestedProtoViews(appProtoViews, componentType, componentPath);
    private _mergeProtoView(appProtoView);
    private _collectMergeRenderProtoViews(appProtoView);
    private _collectComponentElementBinders(appProtoView);
    private _buildRenderTemplate(component, view, directives);
    private _flattenDirectives(template);
    private _flattenList(tree, out);
    private static _isValidDirective(value);
    private static _assertTypeIsComponent(directiveBinding);
}

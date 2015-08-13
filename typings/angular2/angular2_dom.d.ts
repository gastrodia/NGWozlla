declare module dom{
  class DomAdapter{
    hasProperty(element, name: string): boolean;
    setProperty(el: Element, name: string, value: any)
    getProperty(el: Element, name: string): any
    invoke(el: Element, methodName: string, args: List<any>): any

    logError(error)
    log(error)
    logGroup(error)
    logGroupEnd()

    /**
     * Maps attribute names to their corresponding property names for cases
     * where attribute name doesn't match property name.
     */


    parse(templateHtml: string)
    query(selector: string): any
    querySelector(el, selector: string): HTMLElement
    querySelectorAll(el, selector: string): List<any>
    on(el, evt, listener)
    onAndCancel(el, evt, listener): Function
    dispatchEvent(el, evt)
    createMouseEvent(eventType): any
    createEvent(eventType: string): any
    preventDefault(evt)
    isPrevented(evt): boolean
    getInnerHTML(el): string
    getOuterHTML(el): string
    nodeName(node): string
    nodeValue(node): string
    type(node): string
    content(node): any
    firstChild(el): Node
    nextSibling(el): Node
    parentElement(el): Node
    childNodes(el): List<Node>
    childNodesAsList(el): List<Node>
    clearNodes(el)
    appendChild(el, node)
    removeChild(el, node)
    replaceChild(el, newNode, oldNode)
    remove(el): Node
    insertBefore(el, node)
    insertAllBefore(el, nodes)
    insertAfter(el, node)
    setInnerHTML(el, value)
    getText(el): string
    setText(el, value: string)
    getValue(el): string
    setValue(el, value: string)
    getChecked(el): boolean
    setChecked(el, value: boolean)
    createComment(text: string): any
    createTemplate(html): HTMLElement
    createElement(tagName, doc): HTMLElement
    createTextNode(text: string, docl): Text
    createScriptTag(attrName: string, attrValue: string, doc): HTMLElement
    createStyleElement(css: string, doc): HTMLStyleElement
    createShadowRoot(el): any
    getShadowRoot(el): any
    getHost(el): any
    getDistributedNodes(el): List<Node>
    clone /*<T extends Node>*/ (node: Node /*T*/): Node /*T*/
    getElementsByClassName(element, name: string): List<HTMLElement>
    getElementsByTagName(element, name: string): List<HTMLElement>
    classList(element): List<any>
    addClass(element, classname: string)
    removeClass(element, classname: string)
    hasClass(element, classname: string): boolean
    setStyle(element, stylename: string, stylevalue: string)
    removeStyle(element, stylename: string)
    getStyle(element, stylename: string): string
    tagName(element): string
    attributeMap(element): Map<string, string>
    hasAttribute(element, attribute: string): boolean
    getAttribute(element, attribute: string): string
    setAttribute(element, name: string, value: string)
    removeAttribute(element, attribute: string)
    templateAwareRoot(el)
    createHtmlDocument(): HTMLDocument
    defaultDoc(): HTMLDocument
    getBoundingClientRect(el)
    getTitle(): string
    setTitle(newTitle: string)
    elementMatches(n, selector: string): boolean
    isTemplateElement(el: any): boolean
    isTextNode(node): boolean
    isCommentNode(node): boolean
    isElementNode(node): boolean
    hasShadowRoot(node): boolean
    isShadowRoot(node): boolean
    importIntoDoc /*<T extends Node>*/ (node: Node /*T*/): Node /*T*/
    adoptNode /*<T extends Node>*/ (node: Node /*T*/): Node /*T*/
    isPageRule(rule): boolean
    isStyleRule(rule): boolean
    isMediaRule(rule): boolean
    isKeyframesRule(rule): boolean
    getHref(element): string
    getEventKey(event): string
    resolveAndSetHref(element, baseUrl: string, href: string)
    cssToRules(css: string): List<any>
    supportsDOMEvents(): boolean
    supportsNativeShadowDOM(): boolean
    getGlobalEventTarget(target: string): any
    getHistory(): History
    getLocation(): Location
    getBaseHref(): string
    setData(element, name: string, value: string)
    getData(element, name: string): string
    setGlobalVar(name: string, value: any)
  }

 class Parse5DomAdapter extends DomAdapter{}
 class BrowserDomAdapter  extends DomAdapter{}
 function setRootDomAdapter(adapter: DomAdapter)

}


declare module "angular2/src/dom/browser_adapter" {
  export = dom;
}

declare module 'angular2/src/render/dom/view/view'{
  class DomView{
    boundElements
    boundTextNodes
    constructor(proto: any, boundTextNodes: List<Node>,
              boundElements: Element[])
  }
}

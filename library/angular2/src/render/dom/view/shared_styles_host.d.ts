export declare class SharedStylesHost {
    protected _styles: string[];
    protected _stylesSet: Set<string>;
    constructor();
    addStyles(styles: string[]): void;
    protected onStylesAdded(additions: string[]): void;
    getAllStyles(): string[];
}
export declare class DomSharedStylesHost extends SharedStylesHost {
    private _hostNodes;
    constructor(doc: any);
    _addStylesToHost(styles: string[], host: Node): void;
    addHost(hostNode: Node): void;
    removeHost(hostNode: Node): void;
    onStylesAdded(additions: string[]): void;
}

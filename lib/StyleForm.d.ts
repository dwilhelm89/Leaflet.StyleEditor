interface StyleFormOptions {
    styleEditorDiv: any;
    styleEditorInterior: any;
}
export default class StyleForm {
    private styleEditor;
    private util;
    options: StyleFormOptions;
    constructor(options: StyleFormOptions);
    addDOMEvents(): void;
    clearForm(): void;
    createMarkerForm(): void;
    createGeometryForm(): void;
    showMarkerForm(): void;
    showGeometryForm(): void;
    fireChangeEvent(element: any): void;
    lostFocus(e: any): void;
}
export {};

import { StyleEditorControl } from './Control';
declare module 'leaflet' {
    type StyleEditor = StyleEditorControl;
    let StyleEditor: typeof StyleEditorControl;
    let styleEditor: (...args: ConstructorParameters<typeof StyleEditorControl>) => StyleEditorControl;
}
export * from './Control';

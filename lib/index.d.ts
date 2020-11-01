import 'leaflet';
import { StyleEditorImpl } from './StyleEditorImpl';
import { StyleEditorControl } from './StyleEditorControl';
import { StyleEditorOptions } from './options';
declare module 'leaflet' {
    type StyleEditor = StyleEditorImpl;
    let StyleEditor: typeof StyleEditorImpl;
    let styleEditor: (...args: ConstructorParameters<typeof StyleEditor>) => StyleEditor;
    module Control {
        type StyleEditor = StyleEditorControl;
        let StyleEditor: typeof StyleEditorControl;
    }
    module control {
        let styleEditor: (options: StyleEditorOptions) => StyleEditorControl;
    }
    interface MarkerOptions {
        iconColor?: string;
        iconSize?: string;
        popupContent?: string;
    }
    interface StyleableLayer extends Layer {
        options?: any;
    }
}
export default L;

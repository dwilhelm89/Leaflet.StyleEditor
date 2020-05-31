import 'leaflet';
import { StyleEditorImpl } from './StyleEditorImpl';
import { StyleEditorControl } from './StyleEditorControl';
import { StyleEditorControlOptions } from './options';
declare module 'leaflet' {
    type StyleEditor = StyleEditorImpl;
    let StyleEditor: typeof StyleEditorImpl;
    let styleEditor: (...args: ConstructorParameters<typeof StyleEditor>) => StyleEditor;
    module Control {
        type StyleEditor = StyleEditorControl;
        let StyleEditor: typeof StyleEditorControl;
    }
    module control {
        let styleEditor: (options: StyleEditorControlOptions) => StyleEditorControl;
    }
    interface MarkerOptions {
        iconColor?: String;
        iconSize?: String;
    }
}
export default L;

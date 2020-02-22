import 'leaflet';
import { StyleEditorClass } from './StyleEditorClass';
import { StyleEditorControl, StyleEditorControlOptions } from './StyleEditorControl';
declare module 'leaflet' {
    type StyleEditor = StyleEditorClass;
    let StyleEditor: typeof StyleEditorClass;
    let styleEditor: (...args: ConstructorParameters<typeof StyleEditorClass>) => StyleEditorClass;
    module Control {
        type StyleEditor = StyleEditorControl;
        let StyleEditor: typeof StyleEditorControl;
    }
    module control {
        let styleEditor: (options: StyleEditorControlOptions) => StyleEditorControl;
    }
}
export default L;

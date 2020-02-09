import 'leaflet';
import { StyleEditorClass } from './StyleEditorClass';
import { StyleEditorControlClass } from './StyleEditorControlClass';
declare module 'leaflet' {
    type StyleEditor = StyleEditorClass;
    let StyleEditor: typeof StyleEditorClass;
    let styleEditor: (...args: ConstructorParameters<typeof StyleEditorClass>) => StyleEditorClass;
    module Control {
        type StyleEditor = StyleEditorControlClass;
        let StyleEditor: typeof StyleEditorControlClass;
    }
    module control {
        let styleEditor: () => StyleEditorControlClass;
    }
}
export default L;

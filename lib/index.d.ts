import 'leaflet';
import * as SE from './StyleEditor';
import { StyleEditorControl } from './StyleEditorControl';
import { StyleEditorOptions } from './options';
import * as SEForm from './forms';
import * as SEFormElements from './formElements';
import * as SEMarker from './marker';
declare module 'leaflet' {
    type StyleEditor = SE.StyleEditor;
    let StyleEditor: typeof SE.StyleEditor;
    let styleEditor: (...args: ConstructorParameters<typeof StyleEditor>) => StyleEditor;
    namespace StyleEditorClasses {
        namespace Forms {
            type Form = SEForm.Form;
            let Form: typeof SEForm.Form;
            type MarkerForm = SEForm.MarkerForm;
            let MarkerForm: typeof SEForm.MarkerForm;
            type PathForm = SEForm.PathForm;
            let PathForm: typeof SEForm.PathForm;
            type FillableForm = SEForm.FillableForm;
            let FillableForm: typeof SEForm.FillableForm;
        }
        module FormElements {
            type ColorElement = SEFormElements.ColorElement;
            let ColorElement: typeof SEFormElements.ColorElement;
            type DashElement = SEFormElements.DashElement;
            let DashElement: typeof SEFormElements.DashElement;
            type FormElement = SEFormElements.FormElement;
            let FormElement: typeof SEFormElements.FormElement;
            type IconElement = SEFormElements.IconElement;
            let IconElement: typeof SEFormElements.IconElement;
            type OpacityElement = SEFormElements.OpacityElement;
            let OpacityElement: typeof SEFormElements.OpacityElement;
            type PopupContentElement = SEFormElements.PopupContentElement;
            let PopupContentElement: typeof SEFormElements.PopupContentElement;
            type SizeElement = SEFormElements.SizeElement;
            let SizeElement: typeof SEFormElements.SizeElement;
            type WeightElement = SEFormElements.WeightElement;
            let WeightElement: typeof SEFormElements.WeightElement;
        }
        module Marker {
            type DefaultMarker = SEMarker.DefaultMarker;
            let DefaultMarker: typeof SEMarker.DefaultMarker;
            type Marker = SEMarker.Marker;
            let Marker: typeof SEMarker.Marker;
        }
    }
    module Control {
        type StyleEditor = StyleEditorControl;
        let StyleEditor: typeof StyleEditorControl;
    }
    module control {
        let styleEditor: (options: StyleEditorOptions) => StyleEditorControl;
    }
    module Marker {
        type DefaultMarker = SEMarker.DefaultMarker;
        let DefaultMarker: typeof SEMarker.DefaultMarker;
        type Marker = SEMarker.Marker;
        let Marker: typeof SEMarker.Marker;
    }
    interface StyleableLayer extends Layer {
        options?: any;
    }
}
export default L;

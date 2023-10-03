import * as SE from './StyleEditor';
import { StyleEditorControl } from './StyleEditorControl';
import { StyleEditorOptions } from './options';
import * as SEForm from './forms';
import * as SEFormElements from './formElements';
import L from 'leaflet';

import '../css/Leaflet.StyleEditor.css'

declare module 'leaflet' {
  type StyleEditor = SE.StyleEditor;
  var StyleEditor: typeof SE.StyleEditor;
  var styleEditor: (
    ...args: ConstructorParameters<typeof StyleEditor>
  ) => StyleEditor;

  namespace StyleEditorClasses {
    type Form = SEForm.Form;
    var Form: typeof SEForm.Form;
    module FormElements {
      type ColorElement = SEFormElements.ColorElement;
      var ColorElement: typeof SEFormElements.ColorElement;

      type DashElement = SEFormElements.DashElement;
      var DashElement: typeof SEFormElements.DashElement;

      type FormElement = SEFormElements.FormElement;
      var FormElement: typeof SEFormElements.FormElement;

      type IconElement = SEFormElements.IconElement;
      var IconElement: typeof SEFormElements.IconElement;

      type OpacityElement = SEFormElements.OpacityElement;
      var OpacityElement: typeof SEFormElements.OpacityElement;

      type PopupContentElement = SEFormElements.PopupContentElement;
      var PopupContentElement: typeof SEFormElements.PopupContentElement;

      type WeightElement = SEFormElements.WeightElement;
      var WeightElement: typeof SEFormElements.WeightElement;
    }
  }

  module Control {
    type StyleEditor = StyleEditorControl;
    var StyleEditor: typeof StyleEditorControl;
  }

  module control {
    var styleEditor: (options: StyleEditorOptions) => StyleEditorControl;
  }
}

L.StyleEditor = SE.StyleEditor;
L.styleEditor = function (map: L.Map, options: StyleEditorOptions) {
  return new SE.StyleEditor(map, options);
};

L.Control.StyleEditor = StyleEditorControl;
L.control.styleEditor = function (options: StyleEditorOptions) {
  return new StyleEditorControl(options);
};

L.StyleEditorClasses = {
  Form: SEForm.Form,
  FormElements: {
    ColorElement: SEFormElements.ColorElement,
    DashElement: SEFormElements.DashElement,
    FormElement: SEFormElements.FormElement,
    IconElement: SEFormElements.IconElement,
    OpacityElement: SEFormElements.OpacityElement,
    PopupContentElement: SEFormElements.PopupContentElement,
    WeightElement: SEFormElements.WeightElement,
  },
};

export default L;

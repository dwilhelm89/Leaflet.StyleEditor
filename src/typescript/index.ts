import * as SE from './StyleEditor';
import { StyleEditorControl } from './StyleEditorControl';
import { StyleEditorOptions } from './options';
import * as SEForm from './forms';
import * as SEFormElements from './formElements';
import * as SEMarker from './marker';
import L from 'leaflet';

import '../css/Leaflet.StyleEditor.css'

declare module 'leaflet' {
  type StyleEditor = SE.StyleEditor;
  var StyleEditor: typeof SE.StyleEditor;
  var styleEditor: (
    ...args: ConstructorParameters<typeof StyleEditor>
  ) => StyleEditor;

  var asdf: string;

  namespace StyleEditorClasses {
    namespace Forms {
      type Form = SEForm.Form;
      var Form: typeof SEForm.Form;

      type MarkerForm = SEForm.MarkerForm;
      var MarkerForm: typeof SEForm.MarkerForm;
      type PathForm = SEForm.PathForm;
      var PathForm: typeof SEForm.PathForm;

      type FillableForm = SEForm.FillableForm;
      var FillableForm: typeof SEForm.FillableForm;
    }

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

      type SizeElement = SEFormElements.SizeElement;
      var SizeElement: typeof SEFormElements.SizeElement;

      type WeightElement = SEFormElements.WeightElement;
      var WeightElement: typeof SEFormElements.WeightElement;
    }

    module Marker {
      type DefaultMarker = SEMarker.DefaultMarker;
      var DefaultMarker: typeof SEMarker.DefaultMarker;

      type Marker = SEMarker.Marker;
      var Marker: typeof SEMarker.Marker;
    }
  }

  module Control {
    type StyleEditor = StyleEditorControl;
    var StyleEditor: typeof StyleEditorControl;
  }

  module control {
    var styleEditor: (options: StyleEditorOptions) => StyleEditorControl;
  }

  module Marker {
    type DefaultMarker = SEMarker.DefaultMarker;
    var DefaultMarker: typeof SEMarker.DefaultMarker;

    type Marker = SEMarker.Marker;
    var Marker: typeof SEMarker.Marker;
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
  Forms: {
    Form: SEForm.Form,
    MarkerForm: SEForm.MarkerForm,
    PathForm: SEForm.PathForm,
    FillableForm: SEForm.FillableForm,
  },
  FormElements: {
    ColorElement: SEFormElements.ColorElement,
    DashElement: SEFormElements.DashElement,
    FormElement: SEFormElements.FormElement,
    IconElement: SEFormElements.IconElement,
    OpacityElement: SEFormElements.OpacityElement,
    PopupContentElement: SEFormElements.PopupContentElement,
    SizeElement: SEFormElements.SizeElement,
    WeightElement: SEFormElements.WeightElement,
  },
  Marker: {
    Marker: SEMarker.Marker,
    DefaultMarker: SEMarker.DefaultMarker,
  },
};

L.asdf = 'qwer';

export default L;

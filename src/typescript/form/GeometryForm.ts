import 'leaflet'
import Form, { FormOptions } from './Form'
import ColorElement from '../formElements/ColorElement'
import DashElement from '../formElements/DashElement'
import OpacityElement from '../formElements/OpacityElement'
import PopupContentElement from '../formElements/PopupContentElement'
import WeightElement from '../formElements/WeightElement'
import FormElement from '../formElements/FormElement'

class GeometryFormOptions extends FormOptions {
  formOptionKey = 'geometry'
  formElements: Record<string, FormElement>

  constructor() {
    super()
    this.formElements = {
      'color': new ColorElement(),
      'opacity': new OpacityElement(),
      'weight': new WeightElement(),
      'dashArray': new DashElement(),
      'fillColor': new ColorElement(),
      'fillOpacity': new OpacityElement(),
      'popupContent': new PopupContentElement()
    }
  }
}


/** Form used to enable modification of a Geometry */
export default class GeometryForm extends Form {

  options = new GeometryFormOptions()

  /** show the fillOptions (fillColor and fillOpacity) only if the Element can be filled */
  showFormElements() {
    for (let i = 0; i < this.options.initializedElements.length; i++) {
      if (this.options.initializedElements[i].options.styleOption.indexOf('fill') === 0) {
        if (this.util.fillCurrentElement()) {
          this.showFormElement(this.options.initializedElements[i])
        } else {
          this.options.initializedElements[i].hide()
        }
      } else {
        this.showFormElement(this.options.initializedElements[i])
      }
    }
  }
}

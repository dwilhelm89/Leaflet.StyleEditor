import { Form } from './Form'
import ColorElement from '../formElements/ColorElement'
import DashElement from '../formElements/DashElement'
import OpacityElement from '../formElements/OpacityElement'
import PopupContentElement from '../formElements/PopupContentElement'
import WeightElement from '../formElements/WeightElement'
import { FormElementOptions } from '../formElements/FormElement'

/** Form used to enable modification of a Geometry */
export class GeometryForm extends Form {

  constructor(parentUiElement: HTMLElement, options: FormElementOptions) {
    super(
      parentUiElement,
      {
        'color': ColorElement,
        'opacity': OpacityElement,
        'weight': WeightElement,
        'dashArray': DashElement,
        'fillColor': ColorElement,
        'fillOpacity': OpacityElement,
        'popupContent': PopupContentElement
      },
      options
    )
  }

  /** show the fillOptions (fillColor and fillOpacity) only if the Element can be filled */
  showFormElements(currentElement) {
    for (let i = 0; i < this.initializedElements.length; i++) {
      if (this.initializedElements[i].options.styleOption.indexOf('fill') === 0) {
        if (currentElement.options.fill) {
          this.showFormElement(this.initializedElements[i])
        } else {
          this.initializedElements[i].hide()
        }
      } else {
        this.showFormElement(this.initializedElements[i])
      }
    }
  }
}

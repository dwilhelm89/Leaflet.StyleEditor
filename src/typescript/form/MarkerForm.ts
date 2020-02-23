import { Form } from './Form'
import IconElement from '../formElements/IconElement'
import ColorElement from '../formElements/ColorElement'
import SizeElement from '../formElements/SizeElement'
import PopupContentElement from '../formElements/PopupContentElement'
import { FormElementOptions } from '../formElements/FormElement'

/** Form used to enable modification of a Geometry */
export default class MarkerForm extends Form {

  constructor(parentUiElement: HTMLElement, options: FormElementOptions) {
    super(
      parentUiElement,
      {
        'icon': IconElement,
        'color': ColorElement,
        'size': SizeElement,
        'popupContent': PopupContentElement
      },
      options
    )
  }
}

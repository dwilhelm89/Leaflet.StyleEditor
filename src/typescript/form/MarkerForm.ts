import {Form} from '.'
import FormElement from '../formElements/FormElement'
import IconElement from '../formElements/IconElement'
import ColorElement from '../formElements/ColorElement'
import SizeElement from '../formElements/SizeElement'
import PopupContentElement from '../formElements/PopupContentElement'

/** Form used to enable modification of a Geometry */
export default class MarkerForm extends Form {
  formOptionKey = 'marker'
  formElements: Record<string, FormElement> = {
    'icon': new IconElement(),
    'color': new ColorElement(),
    'size': new SizeElement(),
    'popupContent': new PopupContentElement()
  }
}

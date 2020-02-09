import { ColorElement, FormElement, IconElement, SizeElement, PopupContentElement } from '../formElements'
import { StyleEditor } from '../Leaflet.StyleEditor'
import {Form} from '.'

/** Form used to enable modification of a Geometry */
export default class MarkerForm extends Form {
  formOptionKey = 'marker'
  formElements: Record<string, FormElement> = {
    'icon': new IconElement(this.styleEditor),
    'color': new ColorElement(this.styleEditor),
    'size': new SizeElement(this.styleEditor),
    'popupContent': new PopupContentElement(this.styleEditor)
  }
}

import { Form } from '.'
import L from '..'
import { ColorElement, FormElementClass, SizeElement, PopupContentElement, IconElement } from '../formElements'


/** Form used to enable modification of a Geometry */
export class MarkerForm extends Form {

  whenToShow(layers: L.StyleableLayer[]): Boolean {
    return layers.some(layer => layer instanceof L.Marker)
  }

  formOptionsKey = 'marker'
  formElements: Record<string, FormElementClass> = {
    'icon': IconElement,
    'color': ColorElement,
    'size': SizeElement,
    'popupContent': PopupContentElement
  }
}

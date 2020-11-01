import { Form } from '.'
import { ColorElement, FormElementClass, SizeElement, PopupContentElement, IconElement } from '../formElements'
import { StyleEditorImpl } from '../StyleEditorImpl'


/** Form used to enable modification of a Geometry */
export class MarkerForm extends Form {

  formOptionsKey = 'marker'
  formElements: Record<string, FormElementClass> = {
    'icon': IconElement,
    'color': ColorElement,
    'size': SizeElement,
    'popupContent': PopupContentElement
  }
}

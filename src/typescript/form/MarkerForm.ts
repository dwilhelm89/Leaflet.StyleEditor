import { Form } from '.'
import { ColorElement, FormElementClass}  from '../formElements'

const formOptionKey = 'marker'
const formElements: Record<string, FormElementClass> = {
  //'icon': new IconElement(),
  'color': ColorElement
  //'size': new SizeElement(),
  //'popupContent': new PopupContentElement()
}

/** Form used to enable modification of a Geometry */
export class MarkerForm extends Form {

  constructor(parentUiElement: HTMLElement) {
    super(formOptionKey, parentUiElement, formElements)
  }
}

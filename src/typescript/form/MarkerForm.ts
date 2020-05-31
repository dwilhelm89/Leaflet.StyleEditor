import { Form } from '.'
import { ColorElement, FormElementClass, SizeElement, PopupContentElement, IconElement}  from '../formElements'
import { StyleEditorImpl } from '../StyleEditorImpl'

const formOptionKey = 'marker'
const formElements: Record<string, FormElementClass> = {
  'icon': IconElement,
  'color': ColorElement,
  'size': SizeElement,
  'popupContent': PopupContentElement
}

/** Form used to enable modification of a Geometry */
export class MarkerForm extends Form {

  constructor(styleEditor: StyleEditorImpl, parentUiElement: HTMLElement) {
    super(styleEditor, formOptionKey, parentUiElement, formElements)
  }
}

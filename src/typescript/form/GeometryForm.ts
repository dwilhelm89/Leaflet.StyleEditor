import { Form } from '.'
import L from '..'
import { ColorElement, OpacityElement, WeightElement, DashElement, PopupContentElement } from '../formElements'

/** Form used to enable modification of a Geometry */
export class GeometryForm extends Form {
  formOptionsKey = 'geometry'
  formElements = {
    'color': ColorElement,
    'opacity': OpacityElement,
    'weight': WeightElement,
    'dashArray': DashElement,
    'fillColor': ColorElement,
    'fillOpacity': OpacityElement,
    'popupContent': PopupContentElement
  }

  whenToShow(layers: L.StyleableLayer[]): Boolean {
    return layers.some(layer => layer instanceof L.Path)
  }

  /** show the fillOptions (fillColor and fillOpacity) only if the Element can be filled */
  showFormElement() {
    super.showFormElement()
    const showFillOptions = this.util.canCurrentLayersBeFilled()

    Object.entries(this.initializedElements).forEach(([key, formElement]) => {
      if (!showFillOptions && key.startsWith('fill')) {
        formElement.hide()
      } else {
        this.showOrHideFormElement(formElement)
      } 
    })
  }
}

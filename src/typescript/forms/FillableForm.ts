import { Form } from '.'
import L from '..'
import { ColorElement, OpacityElement, WeightElement, DashElement, PopupContentElement } from '../formElements'

/** Form used to enable modification of a Geometry */
export class FillableForm extends Form {
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
    return layers.some(layer => layer instanceof L.Polygon || layer instanceof L.CircleMarker)
  }
}

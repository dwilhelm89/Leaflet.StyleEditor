import { Form } from '.'
import { ColorElement, OpacityElement, WeightElement, DashElement, PopupContentElement } from '../formElements'
import { StyleableLayer, Polygon, CircleMarker } from 'leaflet'

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

  whenToShow(layers: StyleableLayer[]): Boolean {
    return layers.some(layer => layer instanceof Polygon || layer instanceof CircleMarker)
  }
}

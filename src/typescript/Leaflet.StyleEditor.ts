import L, { ControlPosition } from 'leaflet'
import DefaultMarker from './marker/DefaultMarker'
import {GeometryForm, MarkerForm} from './form'
import LeafletOptions from './interfaces/LeafletOptions'

require('../css/Leaflet.StyleEditor.css')

export class StyleEditor implements LeafletOptions {
  
  map: L.Map & HTMLElement
  position = 'topleft' as ControlPosition 
  colorRamp =['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad',
    '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b',
    '#bdc3c7', '#7f8c8d']
  defaultColor = null
  markerType = new DefaultMarker(this)
  markers = null
  defaultMarkerIcon = null
  defaultMarkerColor = null
  geometryForm = new GeometryForm(this)
  markerForm = new MarkerForm(this)
  ignoreLayerTypes = []
  forms = {}
  openOnLeafletDraw = true
  openOnLeafletEditable = true
  showTooltip = true
  strings = {
    cancel: 'Cancel',
    cancelTitle: 'Cancel Styling',
    tooltip: 'Click on the element you want to style',
    tooltipNext: 'Choose another element you want to style'
  }
  useGrouping = true
  styleEditorEventPrefix = 'styleeditor:'
  // internal
  currentElement = null
  _editLayers = []
}


L.Marker.include({
  styleEditor: {
    type: 'Marker'
  }
})

L.Polygon.include({
  styleEditor: {
    type: 'Polygon'
  }
})

L.Polyline.include({
  styleEditor: {
    type: 'Polyline'
  }
})

L.Rectangle.include({
  styleEditor: {
    type: 'Rectangle'
  }
})

export default L

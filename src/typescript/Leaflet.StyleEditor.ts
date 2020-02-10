import L from 'leaflet'
import DefaultMarker from './marker/DefaultMarker'
import {GeometryForm, MarkerForm} from './form'
import LeafletOptions from './interfaces/LeafletOptions'

require('../dist/css/Leaflet.StyleEditor.min.css')

export class StyleEditor {
  currentElement: any = null // TODO type
  private _editLayers: L.Layer[] = []
  private _layerGroups: L.LayerGroup[] = []
  
  map?: L.Map

  options: LeafletOptions

  markerForm = new MarkerForm(this)
  geometryForm = new GeometryForm(this)

  constructor(options?: LeafletOptions) {
    this.options = options
  }

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

L as any

L.control.styleEditor = function (options) {
  if (!options) {
    options = {}
  }
  return new L.Control.StyleEditor(options)
}

export default L

import L from 'leaflet'
import {GeometryForm, MarkerForm} from './form'
import LeafletOptions from './interfaces/LeafletOptions'

require('../css/Leaflet.StyleEditor.css')

export class StyleEditor {
  currentElement: any = null // TODO type
  private _editLayers: L.Layer[] = []
  private _layerGroups: L.LayerGroup[] = []
  
  map?: L.Map

  options: LeafletOptions

  markerForm = new MarkerForm()
  geometryForm = new GeometryForm()

  constructor(options?: LeafletOptions) {
    this.options = options
  }

}

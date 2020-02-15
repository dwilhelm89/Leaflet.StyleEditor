import 'leaflet'
import { StyleEditorControl } from './Control'

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

L.Control.StyleEditor = StyleEditorControl

L.control.styleEditor = function (options) {
  if (!options) {
    options = {}
  }
  return new L.Control.StyleEditor(options)
}

export default L

import L from 'leaflet'
import { StyleEditor } from './StyleEditor'
import Util from './Util'

interface StyleFormOptions {
  styleEditorDiv,
  styleEditorInterior
}


export default class StyleForm {
  private styleEditor: StyleEditor
  private util = Util.getInstance()

  options: StyleFormOptions

  constructor(options: StyleFormOptions) {
    this.options = options
    this.createMarkerForm()
    this.createGeometryForm()

    this.addDOMEvents()
  }

  addDOMEvents() {
    L.DomEvent.addListener(this.styleEditor.map as any, 'click', this.lostFocus, this)
    L.DomEvent.addListener(this.options.styleEditorDiv, 'click', this.lostFocus, this)
  }

  clearForm() {
    this.styleEditor.markerForm.hide()
    this.styleEditor.geometryForm.hide()
  }

  createMarkerForm() {
    let markerDiv = L.DomUtil.create(
      'div', 'leaflet-styleeditor-interior-marker', this.options.styleEditorInterior)
    this.styleEditor.markerForm.create(markerDiv)
  }

  createGeometryForm() {
    let markerDiv = L.DomUtil.create(
      'div', 'leaflet-styleeditor-interior-geometry', this.options.styleEditorInterior)
    this.styleEditor.geometryForm.create(markerDiv)
  }

  showMarkerForm() {
    this.clearForm()
    this.styleEditor.markerForm.show()
  }

  showGeometryForm() {
    this.clearForm()
    this.styleEditor.geometryForm.show()
  }

  fireChangeEvent(element) {
    this.util.fireChangeEvent(element)
  }

  lostFocus(e) {
    let parent = e.target
    for (let i = 0; i < 10; i++) {
      if (!parent) {
        break
      }
      if (!!parent.className && L.DomUtil.hasClass(parent, 'leaflet-styleeditor-interior')) {
        return
      }
      parent = parent.parentNode
    }

    this.styleEditor.markerForm.lostFocus()
    this.styleEditor.geometryForm.lostFocus()
  }
}

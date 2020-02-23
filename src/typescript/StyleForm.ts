import { Util }  from './Util'
import { Map } from 'leaflet'

export class StyleForm {
  private util = Util.getInstance()

  markerForm
  geometryForm
  map
  styleEditorInterior
  styleEditorDiv

  constructor(map: Map, styleEditorDiv: HTMLElement,  styleEditorInterior: HTMLElement, markerForm, geometryForm) {
    this.map = map
    this.styleEditorDiv = styleEditorDiv
    this.styleEditorInterior = styleEditorInterior

    this.markerForm = markerForm
    this.geometryForm = geometryForm

    this.createMarkerForm()
    this.createGeometryForm()

    this.addDOMEvents()
  }

  addDOMEvents() {
    L.DomEvent.addListener(this.map as any, 'click', this.lostFocus, this)
    L.DomEvent.addListener(this.styleEditorDiv, 'click', this.lostFocus, this)
  }

  clearForm() {
    this.markerForm.hide()
    this.geometryForm.hide()
  }

  createMarkerForm() {
    let markerDiv = L.DomUtil.create(
      'div', 'leaflet-styleeditor-interior-marker', this.styleEditorInterior)
    this.markerForm.create(markerDiv)
  }

  createGeometryForm() {
    let markerDiv = L.DomUtil.create(
      'div', 'leaflet-styleeditor-interior-geometry', this.styleEditorInterior)
    this.geometryForm.create(markerDiv)
  }

  showMarkerForm() {
    this.clearForm()
    this.markerForm.show()
  }

  showGeometryForm() {
    this.clearForm()
    this.geometryForm.show()
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

    this.markerForm.lostFocus()
    this.geometryForm.lostFocus()
  }
}

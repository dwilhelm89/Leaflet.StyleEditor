import { Util } from './Util'
import { Map } from 'leaflet'
import { Form, FormClass} from './form'

export class StyleForm {
  private util = Util.getInstance()

  markerForm: Form
  geometryForm: Form
  map: Map
  styleEditorInterior: HTMLElement
  styleEditorDiv: HTMLElement

  constructor(map: Map, styleEditorDiv: HTMLElement, styleEditorInterior: HTMLElement, markerForm: FormClass, geometryForm: FormClass) {
    this.map = map
    this.styleEditorDiv = styleEditorDiv
    this.styleEditorInterior = styleEditorInterior

    this.markerForm = this.createMarkerForm(markerForm)
    this.geometryForm = this.createGeometryForm(geometryForm)

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

  createMarkerForm(markerForm: FormClass): Form {
    let markerDiv = L.DomUtil.create(
      'div', 'leaflet-styleeditor-interior-marker', this.styleEditorInterior)
    return new markerForm(markerDiv)
  }

  createGeometryForm(geometryForm: FormClass): Form {
    let markerDiv = L.DomUtil.create(
      'div', 'leaflet-styleeditor-interior-geometry', this.styleEditorInterior)
    return new geometryForm(markerDiv)
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

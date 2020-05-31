import { Form } from './form'
import { StyleEditorClass } from './StyleEditorClass'
import { StyleEditorImpl } from './StyleEditorImpl'

export class StyleForm extends StyleEditorClass {

  markerForm: Form
  geometryForm: Form
  map: L.Map
  styleEditorInterior: HTMLElement
  styleEditorDiv: HTMLElement

  constructor(styleEditor: StyleEditorImpl) {
    super(styleEditor)
    
    this.markerForm = this.createMarkerForm()
    this.geometryForm = this.createGeometryForm()

    this.addDOMEvents()
  }

  addDOMEvents() {
    L.DomEvent.addListener(this.map as any, 'click', this.lostFocus, this)
    L.DomEvent.addListener(this.styleEditor.editorUI, 'click', this.lostFocus, this)
  }

  clearForm() {
    this.markerForm.hide()
    this.geometryForm.hide()
  }

  createMarkerForm(): Form {
    const markerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-marker', this.styleEditor.interiorEditorUI)
    const markerForm = new this.styleEditor.options.markerForm(this.styleEditor, markerDiv)
    markerForm.create()
    return markerForm
  }

  createGeometryForm(): Form {
    const markerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-geometry', this.styleEditor.interiorEditorUI)
    const markerForm = new this.styleEditor.options.geometryForm(this.styleEditor, markerDiv)
    markerForm.create()
    return markerForm
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

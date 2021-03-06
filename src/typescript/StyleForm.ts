import { Form } from './form'
import { StyleEditorClass } from './StyleEditorClass'
import { StyleEditorImpl } from './StyleEditorImpl'

export class StyleForm extends StyleEditorClass {

  map: L.Map
  styleEditorInterior: HTMLElement
  styleEditorDiv: HTMLElement

  constructor(styleEditor: StyleEditorImpl) {
    super(styleEditor)
    
    this.clearForm()

    this.addDOMEvents()
  }

  addDOMEvents() {
    L.DomEvent.addListener(this.map as any, 'click', this.lostFocus, this)
    L.DomEvent.addListener(this.styleEditor.editorUI, 'click', this.lostFocus, this)
  }

  clearForm() {
  }

  show() {
    if (this.styleEditor.getCurrentMarker().length > 0) {
      this.showMarkerForm()
    } else {
      this.showGeometryForm()
    }
  }

  showMarkerForm() {
    this.clearForm()
  }

  showGeometryForm() {
    this.clearForm()
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

  }
}

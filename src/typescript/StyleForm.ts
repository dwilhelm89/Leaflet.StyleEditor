import { Form } from './form'
import { StyleEditorClass } from './StyleEditorClass'
import { StyleEditorImpl } from './StyleEditorImpl'

export class StyleForm extends StyleEditorClass {

  map: L.Map
  styleEditorInterior: HTMLElement
  styleEditorDiv: HTMLElement
  forms: Form[] = []

  constructor(styleEditor: StyleEditorImpl) {
    super(styleEditor)
    
    this.createForms()

    this.addDOMEvents()
  }

  addDOMEvents() {
    L.DomEvent.addListener(this.map as any, 'click', this.lostFocus, this)
    L.DomEvent.addListener(this.styleEditor.editorUI, 'click', this.lostFocus, this)
  }

  createForms() {
    Object.values(this.styleEditor.options.forms).forEach(formClass =>{
      const form = new formClass(this.styleEditor, this.styleEditor.interiorEditorUI)
      form.create()
      this.forms.push(form)
    })
  }

  show() {
    // hide all forms
    this.forms.forEach(form => {
      form.hide()
    })
    // show first form
    this.forms.forEach(form => {
      if(form.whenToShow(this.styleEditor.getCurrentLayers())) {
        form.show()
        return
      }
    })
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

import { Form } from './forms'
import { StyleEditorClass } from './StyleEditorClass'
import { StyleEditor } from './StyleEditor'
import { DomEvent, DomUtil } from 'leaflet'

export class StyleForm extends StyleEditorClass {

  styleEditorInterior: HTMLElement
  styleEditorDiv: HTMLElement
  forms: Form[] = []

  constructor(styleEditor: StyleEditor) {
    super(styleEditor)
    
    this.createForms()

    this.addDOMEvents()
  }

  addDOMEvents() {
    DomEvent.addListener(this.map as any, 'click', this.lostFocus, this)
    DomEvent.addListener(this.styleEditor.editorUI, 'click', this.lostFocus, this)
  }

  createForms() {
    this.styleEditor.options.forms.forEach(formClass =>{
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
    this.forms.some(form => {
      const show = form.whenToShow(this.styleEditor.getCurrentLayers())
      if (show) {
        form.show()
        return true
      }
    })
  }


  private lostFocus(e) {
    let parent = e.target
    for (let i = 0; i < 10; i++) {
      if (!parent) {
        break
      }
      if (!!parent.className && DomUtil.hasClass(parent, 'leaflet-styleeditor-interior')) {
        return
      }
      parent = parent.parentNode
    }

  }
}

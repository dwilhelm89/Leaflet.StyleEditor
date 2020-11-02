import { Form } from '../form'
import { StyleEditorClass } from '../StyleEditorClass'

export interface FormElementClass {
  new(parentForm: Form, parentUiElement: HTMLElement, styleOption: string): FormElement
}

/** FormElements are part of a Form for a specific styling option (i.e. color) */
export abstract class FormElement extends StyleEditorClass {

  styleOption: string
  protected title: string
  protected uiElement: HTMLElement
  protected parentForm: Form
  
  constructor(parentForm: Form, parentUiElement: HTMLElement, styleOption: string) {
    super(parentForm.styleEditor)
    this.styleOption = styleOption
    // if no title is given use styling option
    this.parentForm = parentForm
    this.create(parentUiElement)
  }

  /** create uiElement and content */
  private create(parentUiElement: HTMLElement) {
    this.uiElement =
      L.DomUtil.create('div', 'leaflet-styleeditor-uiElement', parentUiElement)
    this.createTitle()
    this.createContent()
  }

  /** create title */
  createTitle() {
    let title = L.DomUtil.create('label', 'leaflet-styleeditor-label', this.uiElement)
    title.innerHTML = this.title || this.styleOption.charAt(0).toUpperCase() + this.styleOption.slice(1)
  }

  /** create content (where the actual modification takes place) */
  createContent() {
  }

  /** style the FormElement and show it */
  show() {
    this.style()
    this.showForm()
  }

  /** show the FormElement */
  showForm() {
    this.util.showElement(this.uiElement)
  }

  /** hide the FormElement */
  hide() {
    this.util.hideElement(this.uiElement)
  }

  /** style the FormElement */
  style() {}

  /** what to do when lost focus */
  lostFocus() {
  }

  /** set style - used when the FormElement wants to change the styling option */
  setStyle(value: string) {
    const layers = this.parentForm.styleEditor.getCurrentLayers()
    // update layers
    for (let i = 0; i < layers.length; i++) {
      let layer = layers[i]
      if (layer instanceof L.Marker) {
        new this.styleEditor.options.markerType(this.styleEditor).setStyle(this.styleOption, value)
      } else if (layer instanceof L.Path) {
        let newStyle: Record<string, string> = {}
        newStyle[this.styleOption] = value
        layer.setStyle(newStyle)
        layer.options[this.styleOption] = value
      }

      // fire event for changed layer
      this.util.fireEvent('changed', layer)
    }

    // notify form styling value has changed
    this.parentForm.style()
  }

}

import { Util } from '../Util'
import { Form } from '../form'

export interface FormElementClass {
  new(parentForm: Form, parentUiElement: HTMLElement): FormElement
}

/** FormElements are part of a Form for a specific styling option (i.e. color) */
export abstract class FormElement {

  styleOption: string
  protected title: string
  protected util = Util.getInstance()
  protected uiElement: HTMLElement
  protected parentForm: Form

  /* TODO
  // if no title is given use styling option
  if(!this.options.title && !!this.options.styleOption) {
  this.options.title = this.options.styleOption.charAt(0).toUpperCase() + this.options.styleOption.slice(1)
}*/

  constructor(styleOption: string, parentForm: Form, parentUiElement: HTMLElement, title?: string) {
    this.styleOption = styleOption
    this.title = title || styleOption
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
    title.innerHTML = this.title + ':'
  }

  /** create content (where the actual modification takes place) */
  createContent() {
  }

  /** style the FormElement and show it */
  show(currentElement?) {
    this.style(currentElement)
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
  style(currentElement) {
  }

  /** what to do when lost focus */
  lostFocus() {
  }

  /** set style - used when the FormElement wants to change the styling option */
  setStyle(value: string, currentElement?) {
    // check whether a layer is part of a layerGroup
    let layers = L.Layer[currentElement]
    if (currentElement instanceof L.LayerGroup) {
      layers = currentElement.getLayers
    }

    // update layer (or all layers of a layerGroup)
    for (let i = 0; i < layers.length; i++) {
      let layer = layers[i]
      if (layer instanceof L.Marker) {
        //TODO layer.setStyle(currentElement, this.options.styleOption, value)
      } else {
        let newStyle: Record<string, string> = {}
        newStyle[this.styleOption] = value
        layer.setStyle(newStyle)
        layer.options[this.styleOption] = value
      }

      // fire event for changed layer
      this.util.fireChangeEvent(layer)
    }

    // notify form styling value has changed
    this.parentForm.style()
  }

}

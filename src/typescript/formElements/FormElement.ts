import { Util } from '../Util'
import { Form } from '../form/Form'

export class FormElementOptions {
  title?: string
  styleOption: string
  parentUiElement: HTMLElement
  parentForm: Form
}

/** FormElements are part of a Form for a specific styling option (i.e. color) */
export class FormElement {

  protected util = Util.getInstance()
  options: FormElementOptions // TODO protect?

  private uiElement: HTMLElement

  constructor(options: FormElementOptions) {
    if (options.title === undefined) {
      options.title = options.styleOption.charAt(0).toUpperCase() + options.styleOption.slice(1)
    }
    this.options = options
    this.create(options.parentUiElement, options.title)
  }
  /** create uiElement and content */
  create(parentUiElement: HTMLElement, title: string) {
    this.uiElement =
      L.DomUtil.create('div', 'leaflet-styleeditor-uiElement', parentUiElement)
    this.createTitle(title)
    this.createContent()
  }

  /** create title */
  createTitle(title: string) {
    let titleUiElement = L.DomUtil.create('label', 'leaflet-styleeditor-label', this.uiElement)
    titleUiElement.innerHTML = title + ':'
  }

  /** create content (where the actual modification takes place) */
  createContent() {
  }

  /** style the FormElement and show it */
  show() {
    //this.style(currentElement)
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
  setStyle(currentElement, value) {
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
        let newStyle = {}
        newStyle[this.options.styleOption] = value
        layer.setStyle(newStyle)
        layer.options[this.options.styleOption] = value
      }

      // fire event for changed layer
      this.util.fireChangeEvent(layer)
    }

    // notify form styling value has changed
    this.options.parentForm.style(currentElement)
  }

}

import L from 'leaflet'
import FormElementOptions from './FormElementOptions'
import Util from '../Util'

/** FormElements are part of a Form for a specific styling option (i.e. color) */
export default class FormElement {

  protected util = Util.getInstance()

  options: FormElementOptions

  /* TODO
  // if no title is given use styling option
  if(!this.options.title && !!this.options.styleOption) {
  this.options.title = this.options.styleOption.charAt(0).toUpperCase() + this.options.styleOption.slice(1)
}*/

  /** create uiElement and content */
  create(parentUiElement) {
    this.options.uiElement =
      L.DomUtil.create('div', 'leaflet-styleeditor-uiElement', parentUiElement)
    this.createTitle()
    this.createContent()
  }

  /** create title */
  createTitle() {
    let title = L.DomUtil.create('label', 'leaflet-styleeditor-label', this.options.uiElement)
    title.innerHTML = this.options.title + ':'
  }

  /** create content (where the actual modification takes place) */
  createContent() {
  }

  /** style the FormElement and show it */
  show(currentElement) {
    this.style(currentElement)
    this.showForm()
  }

  /** show the FormElement */
  showForm() {
    this.util.showElement(this.options.uiElement)
  }

  /** hide the FormElement */
  hide() {
    this.util.hideElement(this.options.uiElement)
  }

  /** style the FormElement */
  style(currentElement) {
  }

  /** what to do when lost focus */
  lostFocus() {
  }

  /** set style - used when the FormElement wants to change the styling option */
  setStyle(value) {
    let currentElement = this.util.getCurrentElement()
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
    this.options.parentForm.style()
  }

}

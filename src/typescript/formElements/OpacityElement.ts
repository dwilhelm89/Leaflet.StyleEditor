import L from 'leaflet'
import FormElement from './FormElement'
import FormElementOptions from './FormElementOptions'

interface OpacityElementOptions extends FormElementOptions {
  label,
  slider: HTMLInputElement
}

/**
 * FormElement used to style opacity
 */
export default class OpacityFormElement extends FormElement {

  options: OpacityElementOptions

  /** create number input box */
  createContent() {
    this.options.label = L.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.options.uiElement)

    let slider= L.DomUtil.create('input', 'leaflet-styleeditor-input',
      this.options.uiElement) as HTMLInputElement 
    slider.type = 'range'
    slider.max = String(1)
    slider.min = String(0)
    slider.step = String(0.01)
    slider.value = String(0.5)

    // add event listeners
    L.DomEvent.addListener(slider, 'change', this._setStyle, this)
    L.DomEvent.addListener(slider, 'input', this._setStyle, this)
    L.DomEvent.addListener(slider, 'keyup', this._setStyle, this)
    L.DomEvent.addListener(slider, 'mouseup', this._setStyle, this)
  }

  /** set correct value */
  style() {
    this.options.slider.value = this.util.getStyle(this.options.styleOption)
    this.options.label.innerText = 100 * parseInt(this.options.slider.value) + '%'
  }

  /** communicate opacity value */
  _setStyle() {
    this.setStyle(this.options.slider.value)
  }
}


import L from 'leaflet'
import FormElement from './FormElement'
import FormElementOptions from './FormElementOptions'

interface WeightElementOptions extends FormElementOptions {
  label,
  weight: HTMLInputElement
}

/**
 * FormElement used to style weight
 */
export default class WeigthElement extends FormElement {

  options: WeightElementOptions

  /** create number input box */
  createContent() {
    this.options.label = L.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.options.uiElement)

    let weight: HTMLInputElement = L.DomUtil.create('input', 'leaflet-styleeditor-input',
      this.options.uiElement) as HTMLInputElement
    weight.type = 'range'
    weight.min = String(0)
    weight.max = String(20)
    weight.step = String(1)
    weight.value = String(4)

    this.options.weight = weight

    // add event listeners
    L.DomEvent.addListener(weight, 'change', this._setStyle, this)
    L.DomEvent.addListener(weight, 'input', this._setStyle, this)
    L.DomEvent.addListener(weight, 'keyup', this._setStyle, this)
    L.DomEvent.addListener(weight, 'mouseup', this._setStyle, this)
  }

  /** set correct value */
  style() {
    this.options.weight.value = this.util.getStyle(this.options.styleOption)
    this.options.label.innerText = this.options.weight.value
  }

  /** communicate weight value */
  _setStyle() {
    this.setStyle(this.options.weight.value)
  }
}

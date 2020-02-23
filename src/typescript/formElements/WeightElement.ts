import { FormElement, FormElementOptions } from './FormElement'

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
    this.options.label = L.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.options.parentUiElement)

    let weight: HTMLInputElement = L.DomUtil.create('input', 'leaflet-styleeditor-input',
      this.options.parentUiElement) as HTMLInputElement
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
    this.options.weight.value = this.util.getStyle(undefined, this.options.styleOption) // TODO Remove undefined
    this.options.label.innerText = this.options.weight.value
  }

  /** communicate weight value */
  _setStyle(currentElement) {
    this.setStyle(currentElement, this.options.weight.value)
  }
}

import { FormElement } from "."

/**
 * FormElement used to style weight
 */
export class WeightElement extends FormElement {

  private label: HTMLSpanElement
  private weight: HTMLInputElement

  /** create number input box */
  createContent() {
    this.label = L.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.uiElement)

    this.weight = L.DomUtil.create('input', 'leaflet-styleeditor-input',    this.uiElement) as HTMLInputElement
    this.weight.type = 'range'
    this.weight.min = '0'
    this.weight.max = '20'
    this.weight.step = '1'
    this.weight.value = '4'

    // add event listeners
    L.DomEvent.addListener(this.weight, 'change', this._setStyle, this)
    L.DomEvent.addListener(this.weight, 'input', this._setStyle, this)
    L.DomEvent.addListener(this.weight, 'keyup', this._setStyle, this)
    L.DomEvent.addListener(this.weight, 'mouseup', this._setStyle, this)
  }

  /** set correct value */
  style() {
    this.weight.value = this.util.getStyle(this.styleOption)
    this.label.innerText = this.weight.value
  }

  /** communicate weight value */
  _setStyle() {
    this.setStyle(this.weight.value)
  }
}

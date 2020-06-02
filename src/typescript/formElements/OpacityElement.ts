import { FormElement } from "."

/**
 * FormElement used to style opacity
 */
export class OpacityElement extends FormElement {

  private label: HTMLSpanElement
  private slider: HTMLInputElement

  /** create number input box */
  createContent() {
    this.label = L.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.uiElement)

    this.slider = L.DomUtil.create('input', 'leaflet-styleeditor-input', this.uiElement) as HTMLInputElement
    this.slider.type = 'range'
    this.slider.max = '1'
    this.slider.min = '0'
    this.slider.step = '0.01'
    this.slider.value = '0.5'

    // add event listeners
    L.DomEvent.addListener(this.slider, 'change', this._setStyle, this)
    L.DomEvent.addListener(this.slider, 'input', this._setStyle, this)
    L.DomEvent.addListener(this.slider, 'keyup', this._setStyle, this)
    L.DomEvent.addListener(this.slider, 'mouseup', this._setStyle, this)
  }

  /** set correct value */
  style() {
    this.slider.value = this.util.getStyle(this.styleOption)
    this.label.innerText = Math.round(100 * parseFloat(this.slider.value)).toString() + '%'
  }

  /** communicate opacity value */
  _setStyle() {
    this.setStyle(this.slider.value)
  }
}

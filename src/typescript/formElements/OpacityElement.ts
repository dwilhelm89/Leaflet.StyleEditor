import { DomEvent, DomUtil } from "leaflet"
import { FormElement } from "."

/**
 * FormElement used to style opacity
 */
export class OpacityElement extends FormElement {

  private label: HTMLSpanElement
  private slider: HTMLInputElement

  /** create number input box */
  createContent() {
    this.label = DomUtil.create('span', 'leaflet-styleeditor-input-span', this.uiElement)

    this.slider = DomUtil.create('input', 'leaflet-styleeditor-input', this.uiElement) as HTMLInputElement
    this.slider.type = 'range'
    this.slider.max = '1'
    this.slider.min = '0'
    this.slider.step = '0.01'
    this.slider.value = '0.5'

    // add event listeners
    DomEvent.addListener(this.slider, 'change', this.updateStyle, this)
    DomEvent.addListener(this.slider, 'input', this.updateStyle, this)
    DomEvent.addListener(this.slider, 'keyup', this.updateStyle, this)
    DomEvent.addListener(this.slider, 'mouseup', this.updateStyle, this)
  }

  /** set correct value */
  style() {
    this.slider.value = this.util.getStyle(this.styleOption)
    this.label.innerText = Math.round(100 * parseFloat(this.slider.value)).toString() + '%'
  }

  /** communicate opacity value */
  private updateStyle() {
    this.setStyle(this.slider.value)
  }
}

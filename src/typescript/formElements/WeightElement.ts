import { DomEvent, DomUtil } from "leaflet"
import { FormElement } from "."

/**
 * FormElement used to style weight
 */
export class WeightElement extends FormElement {

  private label: HTMLSpanElement
  private weight: HTMLInputElement

  /** create number input box */
  createContent() {
    this.label = DomUtil.create('span', 'leaflet-styleeditor-input-span', this.uiElement)

    this.weight = DomUtil.create('input', 'leaflet-styleeditor-input',    this.uiElement) as HTMLInputElement
    this.weight.type = 'range'
    this.weight.min = '0'
    this.weight.max = '20'
    this.weight.step = '1'
    this.weight.value = '4'

    // add event listeners
    DomEvent.addListener(this.weight, 'change', this.updateStyle, this)
    DomEvent.addListener(this.weight, 'input', this.updateStyle, this)
    DomEvent.addListener(this.weight, 'keyup', this.updateStyle, this)
    DomEvent.addListener(this.weight, 'mouseup', this.updateStyle, this)
  }

  /** set correct value */
  style() {
    this.weight.value = this.util.getStyle(this.styleOption)
    this.label.innerText = this.weight.value
  }

  /** communicate weight value */
  private updateStyle() {
    this.setStyle(this.weight.value)
  }
}

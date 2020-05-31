import { FormElement } from './FormElement'
import { MarkerForm } from '../form/MarkerForm'

/**
 *  FormElement used to style the color
 */
export class ColorElement extends FormElement {
  private colorPickerDiv: HTMLElement

  title = "color"

  createContent() {
    this.colorPickerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-colorpicker',
      this.uiElement)
    this.getColorRamp().forEach(this.setSelectCallback, this)
  }

  /** create of get already created colorRamp */
  private getColorRamp() {
    // if markers have own colorRamp use it
    if (this.parentForm instanceof MarkerForm) {
      const mt = new this.styleEditor.options.markerType(this.styleEditor)
      if (!!mt.colorRamp) {
        return mt.colorRamp
      }
    }
    return this.styleEditor.options.colorRamp
  }

  /** define what to do when color is changed */
  private setSelectCallback(color) {
    let elem = L.DomUtil.create('div', 'leaflet-styleeditor-color', this.colorPickerDiv)
    elem.style.backgroundColor = color
    L.DomEvent.addListener(elem, 'click', this.selectColor, this)
  }

  /** set style for chosen color */
  private selectColor(event) {
    event.stopPropagation()
    this.setStyle(
      this.util.rgbToHex(
        event.target.style.backgroundColor
      )
    )
  }
}

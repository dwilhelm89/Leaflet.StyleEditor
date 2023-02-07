import { FormElement } from './FormElement'
import { MarkerForm } from '../forms/MarkerForm'
import { DomEvent, DomUtil } from 'leaflet'

const selectedColorClass: string = 'leaflet-styleeditor-color-selected'
const selectedColorIdPrefix: string  = 'leaflet-styleeditor-color-'

/**
 *  FormElement used to style the color
 */
export class ColorElement extends FormElement {
  private colorPickerDiv: HTMLElement
  private colorRampDivs: HTMLElement[]

  title = "color"

  createContent(): void {
    this.colorRampDivs = []
    this.colorPickerDiv = DomUtil.create('div', 'leaflet-styleeditor-colorpicker', this.uiElement)
    this.getColorRamp().forEach(this.createAndSetSelectCallback, this)
  }

  style(): void {
    this.colorRampDivs.forEach(div => {
      DomUtil.removeClass(div, selectedColorClass) 
    })
    const layerWithColor = this.styleEditor.getCurrentLayers().find(layer => {
      return layer.options.color
    })
    if (!layerWithColor) return
    debugger
    const color = layerWithColor.options[this.styleOption]
    const colorRampElement = DomUtil.get(selectedColorIdPrefix + color)
    if(colorRampElement) {
      DomUtil.addClass(colorRampElement, selectedColorClass) 
    }
  }

  /** create of get already created colorRamp */
  private getColorRamp() {
    // if markers have own colorRamp use it
    if (this.parentForm instanceof MarkerForm) {
      const markerType = new this.styleEditor.options.markerType(this.styleEditor)
      if (!!markerType.colorRamp) {
        return markerType.colorRamp
      }
    }
    return this.styleEditor.options.colorRamp
  }

  /** define what to do when color is changed */
  private createAndSetSelectCallback(color) {
    let element = DomUtil.create('div', 'leaflet-styleeditor-color', this.colorPickerDiv)
    element.id = selectedColorIdPrefix + color
    element.style.backgroundColor = color
    DomEvent.addListener(element, 'click', this.selectColor, this)
    this.colorRampDivs.push(element)
  }

  /** set style for chosen color */
  private selectColor(event: Event) {
    event.stopPropagation()
    if (event.target instanceof HTMLElement) {
      this.setStyle(
        this.util.rgbToHex(
          event.target.style.backgroundColor
        )
      )
    }
  }
}

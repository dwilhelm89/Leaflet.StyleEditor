import { FormElement } from './FormElement'
import { Form } from '../form'

interface ColorElementOptions {
  colorRamp
}

const title = "color"
const styleOption = "color"
/**
 *  FormElement used to style the color
 */
export default class ColorElement extends FormElement {

  private colorPickerDiv: HTMLElement

  constructor(parentForm: Form, parentUiElement: HTMLElement) {
    super(styleOption, parentForm, parentUiElement, title)
  }

  createContent() {
    this.colorPickerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-colorpicker',
      this.uiElement)
    this.getColorRamp().forEach(this.setSelectCallback, this)
  }

  /** create of get already created colorRamp */
  private getColorRamp() {
    /* TODO
    if (!this.options.colorRamp) {
      // if markers have own colorRamp use it
      if (this.options.parentForm instanceof MarkerForm && !!this.styleEditor.options.markerType.options.colorRamp) {
        this.options.colorRamp = this.styleEditor.options.markerType.options.colorRamp
        // else use the default
      } else {
        this.options.colorRamp = this.styleEditor.options.colorRamp
      }
    }
    return this.options.colorRamp */
    return ['#000']
  }

  /** define what to do when color is changed */
  private setSelectCallback(color) {
    let elem = L.DomUtil.create('div', 'leaflet-styleeditor-color', this.colorPickerDiv)
    elem.style.backgroundColor = color
    L.DomEvent.addListener(elem, 'click', this.selectColor, this)
  }

  /** set style for chosen color */
  private selectColor(e) {
    e.stopPropagation()
    this.setStyle(
      this.util.rgbToHex(
        e.target.style.backgroundColor
      )
    )

    // marker styling needs additional function calls
    if (e.target instanceof L.Marker) {
      // TODO this.styleEditor.options.markerType.setNewMarker(e)
    }
  }
}

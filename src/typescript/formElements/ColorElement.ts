import L from 'leaflet'
import FormElement from './FormElement'
import FormElementOptions from './FormElementOptions'
import {MarkerForm} from '../form'

interface ColorElementOptions extends FormElementOptions {
    uiElement,
    colorPickerDiv,
    colorRamp,
}

/**
 *  FormElement used to style the color
 */
export default class ColorElement extends FormElement {

  options: ColorElementOptions

  createContent() {
    this.options.colorPickerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-colorpicker',
      this.options.uiElement)
    this._getColorRamp().forEach(this._setSelectCallback, this)
  }

  /** create of get already created colorRamp */
  _getColorRamp() {
    if (!this.options.colorRamp) {
      // if markers have own colorRamp use it
      if (this.options.parentForm instanceof MarkerForm && !!this.styleEditor.markerType.options.colorRamp) {
        this.options.colorRamp = this.styleEditor.markerType.options.colorRamp
        // else use the default
      } else {
        this.options.colorRamp = this.styleEditor.colorRamp
      }
    }
    return this.options.colorRamp
  }

  /** define what to do when color is changed */
  _setSelectCallback(color) {
    let elem = L.DomUtil.create('div', 'leaflet-styleeditor-color', this.options.colorPickerDiv)
    elem.style.backgroundColor = color
    L.DomEvent.addListener(elem, 'click', this._selectColor, this)
  }

  /** set style for chosen color */
  _selectColor(e) {
    e.stopPropagation()
    this.setStyle(
      this.util.rgbToHex(
        e.target.style.backgroundColor
      )
    )

    // marker styling needs additional function calls
    if (this.styleEditor.currentElement.target instanceof L.Marker) {
      this.styleEditor.markerType.setNewMarker()
    }
  }
}

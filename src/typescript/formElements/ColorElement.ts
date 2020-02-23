import {FormElement, FormElementOptions } from './FormElement'

interface ColorElementOptions extends FormElementOptions {
  colorPickerDiv,
  colorRamp,
}

const DefaultOptions = {
  colorRamp: ['#fff']
}

/**
 *  FormElement used to style the color
 */
export default class ColorElement extends FormElement {

  options: ColorElementOptions

  constructor(options : FormElementOptions) {
    super({ ...DefaultOptions, ...options })
  }

  createContent() {
    this.options.colorPickerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-colorpicker',
      this.options.parentUiElement)
    this._getColorRamp().forEach(this._setSelectCallback, this)
  }

  /** create of get already created colorRamp */
  _getColorRamp() {
    /* TODO
    if (!this.options.colorRamp) {
      // if markers have own colorRamp use it
      if (this.options.parentForm instanceof MarkerForm && !!this.styleEditor.options.markerType.options.colorRamp) {
        this.options.colorRamp = this.styleEditor.options.markerType.options.colorRamp
        // else use the default
      } else {
        this.options.colorRamp = this.styleEditor.options.colorRamp
      }
    }*/
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
      e.target,
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

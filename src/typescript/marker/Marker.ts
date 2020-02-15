import L from 'leaflet'

import { MarkerForm } from '../form'
import Util from '../Util'
import MarkerOptions from './MarkerOptions'
import { IconOptions, Size } from '../types'

/**
 * The Base class for different markers
 */
export class Marker {
  protected util = Util.getInstance()

  constructor() {
    if (this.options.selectIconClass !== '' && !this.options.selectIconClass.startsWith('leaflet-styleeditor-select-image')) {
      this.options.selectIconClass = 'leaflet-styleeditor-select-image-' + this.options.selectIconClass
    }
  }

  /** define markerForm used to style the Marker */
  markerForm = new MarkerForm()

  options: MarkerOptions

  /** create new Marker and show it */
  setNewMarker(currentElement) {
    let newIcon = this._createMarkerIcon(currentElement)
    currentElement = currentElement.target
    currentElement.setIcon(newIcon)
    if (currentElement instanceof L.LayerGroup) {
      currentElement.eachLayer(function (layer) {
        const layer2 = layer as any // TODO find out where getElement comes from…
        L.DomUtil.addClass(layer2.getElement(), 'leaflet-styleeditor-marker-selected')
      })
    } else {
      L.DomUtil.addClass(currentElement.getElement(), 'leaflet-styleeditor-marker-selected')
    }
  }

  /** set styling options */
  setStyle(currentElement, styleOption, value) {
    if (styleOption !== 'icon') {
      styleOption = 'icon' + styleOption.charAt(0).toUpperCase() + styleOption.slice(1)
    }
    this.setIconOptions(currentElement, styleOption, value)
    this.setNewMarker(currentElement)
  }

  /** create HTML used to */
  createSelectHTML(parentUiElement, iconOptions, icon) {}

  /** get the current iconOptions
   *  if not set set them
   */
  getIconOptions(currentElement) {
    try {
      this.options.iconOptions = currentElement.target.options.icon.options
    } catch (e) {
      // if a new marker is created it may be the currentItem is still set, but is no marker
    }

    if (Object.keys(this.options.iconOptions).length > 0) {
      return this.options.iconOptions
    }

    this.options.iconOptions.iconColor = this._getDefaultMarkerColor()
    this.options.iconOptions.iconSize = Size.Small 
    this.options.iconOptions.icon = this.util.getDefaultMarkerForColor(this.options.iconOptions.iconColor)

    this.options.iconOptions = this._ensureMarkerIcon(this.options.iconOptions)
    return this.options.iconOptions
  }

  resetIconOptions(currentElement) {
    Object.keys(this.getIconOptions(currentElement)).forEach((key) =>
      this.setStyle(currentElement, key, this.options.iconOptions[key])
    )
  }

  setIconOptions(currentElement, key, value) {
    let iconOptions = this.getIconOptions(currentElement)
    iconOptions[key] = value
  }

  /** call createMarkerIcon with the correct iconOptions */
  _createMarkerIcon(currentElement) {
    let iconOptions = this.getIconOptions(currentElement)
    return this.createMarkerIcon(iconOptions)
  }

  createMarkerIcon(iconOptions: IconOptions, iconClass?: string) {}

  /** check that the icon set in the iconOptions exists
   *  else set default icon
   */
  _ensureMarkerIcon(iconOptions) {
    let markers = this.util.getMarkersForColor(iconOptions.iconColor)

    if (markers.includes(iconOptions.icon)) {
      return iconOptions
    }

    iconOptions.icon = this.util.getDefaultMarkerForColor(iconOptions.iconColor)
    return iconOptions
  }

  /** return default marker color
   *
   * will return the first of the following which is set and supported by the markers
   * 1. styleEditorOptions.defaultMarkerColor
   * 2. styleEditorOptions.defaultColor
   * 3. first color of the marker's colorRamp which is in the styleeditor.colorRamp
   * 4. first color of the marker's colorRamp
   * */
  _getDefaultMarkerColor() {
    let markerTypeColorRamp: string[] = this.options.colorRamp
    let generalColorRamp: string[] = ["#000"] // TODO this.styleEditor.options.colorRamp
    let intersectedColorRamp: string[] = []

    if (typeof markerTypeColorRamp !== 'undefined' && markerTypeColorRamp !== null) {
      intersectedColorRamp = markerTypeColorRamp.filter((n) => generalColorRamp.includes(n))
      if (intersectedColorRamp.length === 0) {
        intersectedColorRamp = markerTypeColorRamp
      }
    } else {
      intersectedColorRamp = generalColorRamp
    }

    let color = "#000" //TOOD this.styleEditor.options.defaultMarkerColor
    if (color !== null && intersectedColorRamp.includes(color)) {
      color = null
    }

    if (color === null) {
      color = "#000" // TODO this.styleEditor.options.defaultColor
      if (color !== null && !intersectedColorRamp.includes(color)) {
        color = null
      }

      if (color === null) {
        color = intersectedColorRamp[0]
      }
    }
    return this.util.rgbToHex(color)
  }

}

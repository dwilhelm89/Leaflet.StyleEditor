import L from 'leaflet'

import { MarkerForm } from '../form'
import Util from '../Util'
import { StyleEditor } from '../Leaflet.StyleEditor'
import MarkerOptions from './MarkerOptions'
import { IconOptions, Size } from '../types'

/**
 * The Base class for different markers
 */
export default abstract class Marker {
  protected util = Util.getInstance()
  protected styleEditor: StyleEditor

  constructor(styleEditor: StyleEditor) {
    this.styleEditor = styleEditor
    
    if (this.options.selectIconClass !== '' && !this.options.selectIconClass.startsWith('leaflet-styleeditor-select-image')) {
      this.options.selectIconClass = 'leaflet-styleeditor-select-image-' + this.options.selectIconClass
    }
  }

  /** define markerForm used to style the Marker */
  markerForm = new MarkerForm(this.styleEditor)

  options: MarkerOptions

  /** create new Marker and show it */
  setNewMarker() {
    let newIcon = this._createMarkerIcon()
    let currentElement = this.styleEditor.currentElement.target
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
  setStyle(styleOption, value) {
    if (styleOption !== 'icon') {
      styleOption = 'icon' + styleOption.charAt(0).toUpperCase() + styleOption.slice(1)
    }
    this.setIconOptions(styleOption, value)
    this.setNewMarker()
  }

  /** create HTML used to */
  abstract createSelectHTML(parentUiElement, iconOptions, icon)

  /** get the current iconOptions
   *  if not set set them
   */
  getIconOptions() {
    try {
      this.options.iconOptions = this.styleEditor.currentElement.target.options.icon.options
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

  resetIconOptions() {
    Object.keys(this.getIconOptions()).forEach((key) =>
      this.setStyle(key, this.options.iconOptions[key])
    )
  }

  setIconOptions(key, value) {
    let iconOptions = this.getIconOptions()
    iconOptions[key] = value
  }

  /** call createMarkerIcon with the correct iconOptions */
  _createMarkerIcon() {
    let iconOptions = this.getIconOptions()
    return this.createMarkerIcon(iconOptions)
  }

  abstract createMarkerIcon(iconOptions: IconOptions, iconClass?: string)

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
    let markerTypeColorRamp = this.options.colorRamp
    let generalColorRamp = this.styleEditor.options.colorRamp
    let intersectedColorRamp = []

    if (typeof markerTypeColorRamp !== 'undefined' && markerTypeColorRamp !== null) {
      intersectedColorRamp = markerTypeColorRamp.filter((n) => generalColorRamp.includes(n))
      if (intersectedColorRamp.length === 0) {
        intersectedColorRamp = markerTypeColorRamp
      }
    } else {
      intersectedColorRamp = generalColorRamp
    }

    let color = this.styleEditor.options.defaultMarkerColor
    if (color !== null && intersectedColorRamp.includes(color)) {
      color = null
    }

    if (color === null) {
      color = this.styleEditor.options.defaultColor
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

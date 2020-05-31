import { StyleEditorClass } from '../StyleEditorClass'
import { StyleEditorImpl } from '../StyleEditorImpl'
import { MarkerOptions } from './'

/**
 * The Base class for different markers
 */
export interface MarkerClass {
  new(styleEditor: StyleEditorImpl): Marker
}

export abstract class Marker extends StyleEditorClass {

  size = {
    'small': [20, 50],
    'medium': [30, 70],
    'large': [35, 90]
  }

  selectIconSize: []
  colorRamp?: []
  selectIconClass: string

  defaultMarkerIcon?: L.Icon
  markers: string[]

  constructor(styleEditor: StyleEditorImpl, selectIconClass: string) {
    super(styleEditor)
    /** set standard icon */
    if (selectIconClass !== '' && !selectIconClass.startsWith('leaflet-styleeditor-select-image')) {
      this.selectIconClass = 'leaflet-styleeditor-select-image-' + selectIconClass
    }
  }

  /** create new Marker and show it */
  setNewMarker(markerOptions: MarkerOptions) {
    let newIcon = this.createMarkerIcon(markerOptions)
    this.styleEditor.getCurrentLayers().forEach((currentElement) => {
      if (currentElement instanceof L.Marker) {
        currentElement.setIcon(newIcon)
        if (currentElement instanceof L.LayerGroup) {
          currentElement.eachLayer(function (layer) {
            if (layer instanceof L.Marker)
              L.DomUtil.addClass(layer.getElement(), 'leaflet-styleeditor-marker-selected')
          })
        } else {
          L.DomUtil.addClass(currentElement.getElement(), 'leaflet-styleeditor-marker-selected')
        }
      }
    })
  }

  /** set styling options */
  setStyle(styleOption, value) {
    if (styleOption !== 'icon') {
      styleOption = 'icon' + styleOption.charAt(0).toUpperCase() + styleOption.slice(1)
    }
    this.setNewMarker(this.getNewMarkerOptions(styleOption, value))
  }

  /** create HTML used to */
  createSelectHTML(parentUiElement, iconOptions, icon) {
  }

  /** get the current iconOptions
   *  if not set set them
   */
  getIconOptions(): MarkerOptions {
    let markerOptions = {} as MarkerOptions

    const layers = this.styleEditor.getCurrentLayers()
    const marker = layers.find((layer) => layer instanceof L.Marker) as L.Marker
    if (marker) {
      markerOptions = marker.options.icon.options
    }

    if (Object.keys(markerOptions).length > 0) {
      return markerOptions
    }

    markerOptions.iconColor = this._getDefaultMarkerColor()
    markerOptions.iconSize = this.size.small
    markerOptions.icon = this.util.getDefaultMarkerForColor(markerOptions.iconColor)

    markerOptions = this._ensureMarkerIcon(markerOptions)
    return markerOptions
  }

  getNewMarkerOptions(key, value): MarkerOptions {
    let iconOptions = this.getIconOptions()
    iconOptions[key] = value
    return iconOptions
  }

  abstract createMarkerIcon(iconOptions: MarkerOptions)

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
    let markerTypeColorRamp = this.colorRamp
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
    if (color !== null && !intersectedColorRamp.includes(color)) {
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

  /** return size as keyword */
  sizeToName(size) {
    let keys = Object.keys(this.size)

    if (typeof size === 'string') {
      if (size === 's') {
        size = 'small'
      } else if (size === 'm') {
        size = 'medium'
      } else if (size === 'l') {
        size = 'large'
      }

      for (let i = 0; i < keys.length; i++) {
        if (this.size[keys[i]] === size) {
          return keys[i]
        }
      }
    }

    let values = Object.values(this.size)
    for (let i = 0; i < values.length; i++) {
      if (JSON.stringify(size) === JSON.stringify(values[i])) {
        return keys[i]
      }
    }

    return keys[0]
  }

  /** return size as [x,y] */
  sizeToPixel(size) {
    size = this.sizeToName(size)
    return this.size[size]
  }
}

/**
 * Helper functions used throuhgout the project
 */

import { StyleEditorImpl } from "./StyleEditorImpl"

 export class UtilOptions {
  defaultColor
  styleEditorEventPrefix: string
 }

export class Util {

  map: L.Map
  options: UtilOptions
  styleEditor: StyleEditorImpl

  constructor(styleEditor: StyleEditorImpl) {
    this.styleEditor = styleEditor
    this.map = styleEditor.map
    this.options = styleEditor.options
  }

// TODO element type
  fireEvent(eventName: string, element: any) {
    this.map.fireEvent(
      this.options.styleEditorEventPrefix + eventName,
      element
    )
  }

// TODO element type
  /** fire an event if Leaflet.StyleEditor changed something */
  fireChangeEvent(element: any) {
    this.fireEvent('changed', element)
  }

  /** hide the given element */
  hideElement(element: HTMLElement) {
    if (element) {
      L.DomUtil.addClass(element, 'leaflet-styleeditor-hidden')
    }
  }

  /** convert rgb to hex of a color
   * @param {string} rgb - rgb representation of the color
   * @param {boolean} noHash - define if return value should not include hash
   */
  rgbToHex(rgb: string, noHash: Boolean = false) {
    if (!rgb) {
      rgb = this.options.defaultColor
      if (rgb.indexOf('#') !== 0) {
        rgb = '#' + rgb
      }
    }

    if (rgb.indexOf('#') === 0) {
      if (noHash) {
        rgb.replace('#', '')
      }
      return rgb
    }

    if (rgb.indexOf('(') < 0) {
      return '#' + rgb
    }

    let rgbArray = rgb.substring(4).replace(')', '').split(',')
    let withoutHash = this._componentToHex(parseInt(rgbArray[0], 10)) + this._componentToHex(parseInt(rgbArray[1], 10)) +
      this._componentToHex(parseInt(rgbArray[2], 10))

    if (noHash) {
      return withoutHash
    }
    return '#' + withoutHash
  }

  /** get current style of current element */
  getStyle(option) {
    debugger
    /* TODO?!?!?
    let style = this.styleEditor.getCurrentLayers()[0].options[option]
    if (style) {
      return style
    }
*/
    return null
  }

  /** set new style to current element */
  setStyle(currentElement, option, value) {
    if (currentElement instanceof L.Marker) {
      new this.styleEditor.options.markerType(this.styleEditor).setStyle(option, value)
    } else {
      let newStyle = {}
      newStyle[option] = value
      currentElement.setStyle(newStyle)
    }

    this.fireChangeEvent(currentElement)
  }

  /** show hidden element */
  showElement(element) {
    if (element) {
      L.DomUtil.removeClass(element, 'leaflet-styleeditor-hidden')
    }
  }

  /** helper function to convert color to hex */
  _componentToHex(color) {
    let hex = color.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  /** get the markers for a specific color **/
  getMarkersForColor(color) {
    color = this.rgbToHex(color)

    let markers = new this.styleEditor.options.markerType(this.styleEditor).markers
    let controlMarkers = this.styleEditor.options.markers

    if (!Array.isArray(markers)) {
      // if color is specified return specific markers
      if (Object.keys(markers).includes(color)) {
        markers = markers[color]
      } else {
        markers = markers['default']
      }
    }

    if (controlMarkers !== null) {
      if (!Array.isArray(controlMarkers)) {
        let keys = Object.keys(controlMarkers)
        if (keys.includes(color)) {
          controlMarkers = controlMarkers[color]
        } else if (keys.includes('default')) {
          controlMarkers = controlMarkers['default']
        } else {
          controlMarkers = markers
        }
      }

      return markers.filter((n) => controlMarkers.includes(n))
    }
    return markers
  }

  /** get default marker for specific color **/
  getDefaultMarkerForColor(color) {
    color = this.rgbToHex(color)

    let markers = this.getMarkersForColor(color)

    let defMarkers = []

    let defaultMarker = this.styleEditor.options.defaultMarkerIcon
    if (defaultMarker !== null) {
      if (typeof defaultMarker === 'string') {
        defMarkers.push(defaultMarker)
      }
      if (Object.keys(defaultMarker).includes(color)) {
        defMarkers.push(defaultMarker[color])
      }
    }

    defaultMarker = new this.styleEditor.options.markerType(this.styleEditor).defaultMarkerIcon
    if (defaultMarker !== undefined) {
      if (typeof defaultMarker === 'string') {
        defMarkers.push(defaultMarker)
      }
      if (Object.keys(defaultMarker).includes(color)) {
        defMarkers.push(defaultMarker[color])
      }
    }

    defMarkers.filter((n) => markers.includes(n))
    if (defMarkers.length > 0) {
      return defMarkers[0]
    }

    return markers[0]
  }
}

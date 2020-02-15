import L from 'leaflet'
import { StyleEditor } from './StyleEditor'

/**
 * Helper functions used throuhgout the project
 */

export default class Util {
  private static instance: Util
  private styleEditor: StyleEditor

  private constructor(styleEditor: StyleEditor) {
    this.styleEditor = styleEditor
  }

  public static createInstance(styleEditor: StyleEditor) {
    Util.instance = new Util(styleEditor)
  }

  public static getInstance(): Util {
    return Util.instance;
  }

// TODO element type
  fireEvent(eventName: string, element: any) {
    this.styleEditor.map.fireEvent(
      this.styleEditor.options.styleEditorEventPrefix + eventName,
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
      rgb = this.styleEditor.options.defaultColor
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

  /** get element selected to be styled */
  getCurrentElement() {
    if (!this.styleEditor.currentElement) {
      return null
    }
    if (this.styleEditor.currentElement.target !== undefined) {
      return this.styleEditor.currentElement.target
    }
    return this.styleEditor.currentElement
  }

  /** set which element is selected to be styled */
  setCurrentElement(currentElement) {
    this.styleEditor.currentElement.target = currentElement
  }

  /** does current element have the fill option */
  fillCurrentElement() {
    return this.getCurrentElement().options.fill
  }

  /** get current style of current element */
  getStyle(option) {
    let currentElement = this.getCurrentElement()
    let style = currentElement.options[option]
    if (style) {
      return style
    }
    return null
  }

  /** set new style to current element */
  setStyle(option, value) {
    let currentElement = this.getCurrentElement()
    if (currentElement instanceof L.Marker) {
      this.styleEditor.options.markerType.setStyle(currentElement, option, value)
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

    let markers = this.styleEditor.options.markerType.options.markers
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

    defaultMarker = this.styleEditor.options.markerType.options.defaultMarkerIcon
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

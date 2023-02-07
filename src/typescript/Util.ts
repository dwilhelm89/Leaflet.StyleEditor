/**
 * Helper functions used throuhgout the project
 */

import { DomUtil, Map, Marker as LMarker} from "leaflet"
import { StyleEditor } from "./StyleEditor"

export class UtilOptions {
  defaultColor?: string // TODO color
  styleEditorEventPrefix: string
}

export class Util {

  map: Map
  options: UtilOptions
  styleEditor: StyleEditor

  constructor(styleEditor: StyleEditor) {
    this.styleEditor = styleEditor
    this.map = styleEditor.map
    this.options = styleEditor.options
  }

  // TODO element type
  fireEvent(eventName: string, element?: any) {
    this.map.fireEvent(
      this.options.styleEditorEventPrefix + eventName,
      element
    )
  }

  /** hide the given element */
  hideElement(element: HTMLElement) {
    if (element) {
      DomUtil.addClass(element, 'leaflet-styleeditor-hidden')
    }
  }

  /** convert rgb to hex of a color
   * @param {string} rgb - rgb representation of the color
   * @param {boolean} noHash - define if return value should not include hash
   */
  rgbToHex(rgb: string, noHash: Boolean = false) {
    var color : string | undefined = rgb
    if (!color) {
      color = this.options.defaultColor
      if (color && color.indexOf('#') !== 0) {
        color = '#' + color
      }
    }

    if (color && color.indexOf('#') === 0) {
      if (noHash) {
        color.replace('#', '')
      }
      return color
    }

    if (color && color.indexOf('(') < 0) {
      return '#' + color
    }

    let rgbArray = color?.substring(4)?.replace(')', '')?.split(',') || []
    let withoutHash = this.componentToHex(parseInt(rgbArray[0], 10)) + this.componentToHex(parseInt(rgbArray[1], 10)) +
      this.componentToHex(parseInt(rgbArray[2], 10))

    if (noHash) {
      return withoutHash
    }
    return '#' + withoutHash
  }

  /** get current style of current element */
  getStyle(option) {
    const layers = this.styleEditor.getCurrentLayers()
    if (layers.length > 0) {
      let style = layers[0].options[option]
      if (style) {
        return style
      }
    }

    return null
  }

  /** set new style to current element */
  setStyle(currentElement, option, value) {
    if (currentElement instanceof LMarker) {
      new this.styleEditor.options.markerType(this.styleEditor).setStyle(option, value)
    } else {
      let newStyle = {}
      newStyle[option] = value
      currentElement.setStyle(newStyle)
    }

    this.fireEvent('changed', currentElement)
  }

  /** show hidden element */
  showElement(element) {
    if (element) {
      DomUtil.removeClass(element, 'leaflet-styleeditor-hidden')
    }
  }

  /** helper function to convert color to hex */
  private componentToHex(color) {
    let hex = color.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  /** get the markers for a specific color **/
  public getIconsForColor(color: string) : string[] {
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

    if (controlMarkers) {
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
  // TODO return color
  getDefaultMarkerForColor(color: string): string {
    color = this.rgbToHex(color)

    let markers = this.getIconsForColor(color)

    let defMarkers: string[] = []

    let defaultMarker: string | Record<string, string> | undefined 
      = this.styleEditor.options.defaultMarkerIcon

    if (defaultMarker) {
      if (typeof defaultMarker === 'string') {
        defMarkers.push(defaultMarker)
      }
      if (Object.keys(defaultMarker).includes(color)) {
        defMarkers.push(defaultMarker[color])
      }
    }

    defaultMarker = new this.styleEditor.options.markerType(this.styleEditor).defaultMarkerIcon
    if (defaultMarker) {
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

  canCurrentLayersBeFilled(): Boolean {
    return this.styleEditor.getCurrentLayers().find((layer) => layer.options.fill) != undefined
  }
}

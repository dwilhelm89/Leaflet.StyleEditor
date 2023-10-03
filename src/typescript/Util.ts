/**
 * Helper functions used throuhgout the project
 */

import {
  DomUtil,
  Layer,
  LayerGroup,
  Map,
} from 'leaflet';
import Color from 'ts-color-class'
import { StyleEditor } from './StyleEditor';
import { ShowForLayerFun } from './options/StyleEditorOptions';

export class Util {
  private styleEditor: StyleEditor;
  private map: Map;
  private eventPrefix: string;

  public constructor(
    styleEditor: StyleEditor,
    map: Map,
    eventPrefix: string,
  ) {
    this.styleEditor = styleEditor;
    this.map = map;
    this.eventPrefix = eventPrefix;
  }

  public fireEvent(eventName: string, element?: Layer): void {
    this.map.fireEvent(this.eventPrefix + eventName, element);
  }

  /** hide the given element */
  public hideElement(element: HTMLElement): void {
    if (element) {
      DomUtil.addClass(element, 'leaflet-styleeditor-hidden');
    }
  }

  /** get current style of current element */
  public getStyle(option: string): string {
    const layer: Layer = this.styleEditor.currentLayer
    if(layer === undefined) {
      return null
    }

    const layers: Layer[] = (this.styleEditor.currentLayer instanceof LayerGroup) ? (layer as LayerGroup).getLayers() : [layer]
    if (layers.length > 0) {
      const style = layers[0].options[option];
      if (style) {
        return style;
      }
    }

    return null;
  }

  /** show hidden element */
  public showElement(element): void {
    if (element) {
      DomUtil.removeClass(element, 'leaflet-styleeditor-hidden');
    }
  }

  /** get the markers for a specific color **/
  public getIconsForColor(color: Color): string[] {
    const colorHex = new Color(color).getHex();

    let markers = new this.styleEditor.options.markerType(this.styleEditor)
      .markers;
    let controlMarkers = this.styleEditor.options.markers;

    if (!Array.isArray(markers)) {
      // if color is specified return specific markers
      if (Object.keys(markers).includes(colorHex)) {
        markers = markers[colorHex];
      } else {
        markers = markers['default'];
      }
    }

    if (controlMarkers) {
      if (!Array.isArray(controlMarkers)) {
        const keys = Object.keys(controlMarkers);
        if (keys.includes(colorHex)) {
          controlMarkers = controlMarkers[colorHex];
        } else if (keys.includes('default')) {
          controlMarkers = controlMarkers['default'];
        } else {
          controlMarkers = markers;
        }
      }

      return markers.filter((n) => controlMarkers.includes(n));
    }
    return markers;
  }

  /** get default marker for specific color **/
  // TODO return color
  getDefaultMarkerForColor(color: Color): string {
    const colorHex: string = new Color(color).getHex();

    const markers = this.getIconsForColor(color);

    const defMarkers: string[] = [];

    let defaultMarker: string | Record<string, string> | undefined =
      this.styleEditor.options.defaultMarkerIcon;

    if (defaultMarker) {
      if (typeof defaultMarker === 'string') {
        defMarkers.push(defaultMarker);
      }
      if (Object.keys(defaultMarker).includes(colorHex)) {
        defMarkers.push(defaultMarker[colorHex]);
      }
    }

    defaultMarker = new this.styleEditor.options.markerType(this.styleEditor)
      .defaultMarkerIcon;
    if (defaultMarker) {
      if (typeof defaultMarker === 'string') {
        defMarkers.push(defaultMarker);
      }
      if (Object.keys(defaultMarker).includes(color)) {
        defMarkers.push(defaultMarker[color]);
      }
    }

    defMarkers.filter((n) => markers.includes(n));
    if (defMarkers.length > 0) {
      return defMarkers[0];
    }

    return markers[0];
  }

  public getColorRampForLayer(layer: Layer): string[] {
    const firstMatchingColorRamp: string [] = this.styleEditor.options.colorRamp.find(
      ([_, showForLayer]: [string[], ShowForLayerFun?]) => showForLayer?.(layer) ?? true
    )?.[0]

    if (layer instanceof L.Marker) {
      const markerColorRamp: string [] = new this.styleEditor.options.markerType(this.styleEditor).colorRamp ?? firstMatchingColorRamp
      const filteredColors: string[] = firstMatchingColorRamp.filter((color: string) => markerColorRamp.includes(color))
      return filteredColors.length > 0 ? filteredColors : firstMatchingColorRamp
    } else {
      return firstMatchingColorRamp;
    }
  }

}

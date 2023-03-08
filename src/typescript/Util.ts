/**
 * Helper functions used throuhgout the project
 */

import Color from 'colorjs.io';
import {
  DomUtil,
  Map,
  StyleableLayer,
} from 'leaflet';
import { StyleEditor } from './StyleEditor';

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

  public fireEvent(eventName: string, element?: StyleableLayer): void {
    this.map.fireEvent(this.eventPrefix + eventName, element);
  }

  /** hide the given element */
  public hideElement(element: HTMLElement): void {
    if (element) {
      DomUtil.addClass(element, 'leaflet-styleeditor-hidden');
    }
  }

  /** get current style of current element */
  public getStyle(option): unknown {
    const layers = this.styleEditor.getCurrentLayers();
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
  public getIconsForColor(color: string): string[] {
    color = new Color(color).toString({format: 'hex'});

    let markers = new this.styleEditor.options.markerType(this.styleEditor)
      .markers;
    let controlMarkers = this.styleEditor.options.markers;

    if (!Array.isArray(markers)) {
      // if color is specified return specific markers
      if (Object.keys(markers).includes(color)) {
        markers = markers[color];
      } else {
        markers = markers['default'];
      }
    }

    if (controlMarkers) {
      if (!Array.isArray(controlMarkers)) {
        const keys = Object.keys(controlMarkers);
        if (keys.includes(color)) {
          controlMarkers = controlMarkers[color];
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
  getDefaultMarkerForColor(color: string): string {
    color = new Color(color).toString({format: 'hex'});

    const markers = this.getIconsForColor(color);

    const defMarkers: string[] = [];

    let defaultMarker: string | Record<string, string> | undefined =
      this.styleEditor.options.defaultMarkerIcon;

    if (defaultMarker) {
      if (typeof defaultMarker === 'string') {
        defMarkers.push(defaultMarker);
      }
      if (Object.keys(defaultMarker).includes(color)) {
        defMarkers.push(defaultMarker[color]);
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

  canCurrentLayersBeFilled(): Boolean {
    return (
      this.styleEditor.getCurrentLayers().find((layer) => layer.options.fill) !=
      undefined
    );
  }
}

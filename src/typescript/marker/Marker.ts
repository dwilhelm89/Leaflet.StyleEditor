import { StyleEditorClass } from '../StyleEditorClass';
import { StyleEditor } from '../StyleEditor';
import { MarkerOptions } from './';
import { Marker as LMarker, LayerGroup, DomUtil } from 'leaflet';

/**
 * The Base class for different markers
 */
export type MarkerClass = new (styleEditor: StyleEditor) => Marker;

export abstract class Marker extends StyleEditorClass {
  public size = {
    small: [20, 50],
    medium: [30, 70],
    large: [35, 90],
  };

  public colorRamp?: string[];

  public defaultMarkerIcon?: string;
  public abstract markers: string[];

  public constructor(styleEditor: StyleEditor, markerName: string) {
    super(styleEditor);
    this.markerName = markerName;
  }

  /** set styling options */
  public setStyle(styleOption, value) {
    if (styleOption !== 'icon') {
      styleOption =
        'icon' + styleOption.charAt(0).toUpperCase() + styleOption.slice(1);
    }
    this.setNewMarker(this.getNewMarkerOptions(styleOption, value));
  }

  public createSelectHTML(parentUiElement: HTMLElement, iconOptions, icon): void {
    parentUiElement.appendChild(this.getSelectHTML(iconOptions, icon));
    parentUiElement.classList.add(
      'leaflet-styleeditor-select-' + this.markerName
    );
  }

  /** get the current iconOptions
   *  if not set set them
   */
  public getIconOptions(): MarkerOptions {
    let markerOptions: MarkerOptions = {};

    const layers = this.styleEditor.getCurrentLayers();
    const marker = layers.find((layer) => layer instanceof LMarker) as LMarker;
    if (marker) {
      markerOptions = marker?.options?.icon?.options || {};
    }

    if (Object.keys(markerOptions).length > 0) {
      return markerOptions;
    }

    markerOptions.iconColor = this.getDefaultMarkerColor();
    markerOptions.iconSize = 'small';
    markerOptions.icon = this.util.getDefaultMarkerForColor(
      markerOptions.iconColor
    );

    markerOptions = this.ensureMarkerIcon(markerOptions);
    return markerOptions;
  }

  /** return size as keyword */
  protected sizeToName(size: string): string {
    if (typeof size === 'string') {
      if (size === 's') {
        size = 'small';
      } else if (size === 'm') {
        size = 'medium';
      } else if (size === 'l') {
        size = 'large';
      }
      return size;
    }

    const keys = Object.keys(this.size);
    const values = Object.values(this.size);

    for (let i = 0; i < values.length; i++) {
      if (JSON.stringify(size) === JSON.stringify(values[i])) {
        return keys[i];
      }
    }

    return keys[0];
  }

  /** return default marker color
   *
   * will return the first of the following which is set and supported by the markers
   * 1. styleEditorOptions.defaultMarkerColor
   * 2. styleEditorOptions.defaultColor
   * 3. first color of the marker's colorRamp which is in the styleeditor.colorRamp
   * 4. first color of the marker's colorRamp
   */
  private getDefaultMarkerColor() {
    const markerTypeColorRamp = this.colorRamp;
    const generalColorRamp = this.styleEditor.options.colorRamp;
    let intersectedColorRamp: string[] = [];

    if (
      typeof markerTypeColorRamp !== 'undefined' &&
      markerTypeColorRamp !== null
    ) {
      intersectedColorRamp = markerTypeColorRamp.filter((n) =>
        generalColorRamp.includes(n)
      );
      if (intersectedColorRamp.length === 0) {
        intersectedColorRamp = markerTypeColorRamp;
      }
    } else {
      intersectedColorRamp = generalColorRamp;
    }

    let color = this.styleEditor.options.defaultMarkerColor;
    if (color && !intersectedColorRamp.includes(color)) {
      color = undefined;
    }

    if (!color) {
      color = this.styleEditor.options.defaultColor;
      if (color && !intersectedColorRamp.includes(color)) {
        color = undefined;
      }

      if (!color) {
        color = intersectedColorRamp[0];
      }
    }
    return this.util.rgbToHex(color);
  }

  /** create new Marker and show it */
  private setNewMarker(markerOptions: MarkerOptions) {
    const newIcon = this.createMarkerIcon(markerOptions);
    this.styleEditor.getCurrentLayers().forEach((currentElement) => {
      if (currentElement instanceof LMarker) {
        currentElement.setIcon(newIcon);
        if (currentElement instanceof LayerGroup) {
          currentElement.eachLayer((layer) => {
            if (layer instanceof LMarker) {
              const element = layer.getElement();
              if (element) {
                DomUtil.addClass(
                  element,
                  'leaflet-styleeditor-marker-selected'
                );
              }
            }
          });
        } else {
          const element = currentElement.getElement();
          if (element) {
            DomUtil.addClass(element, 'leaflet-styleeditor-marker-selected');
          }
        }
      }
    });
  }

  private getNewMarkerOptions(key, value): MarkerOptions {
    const iconOptions = this.getIconOptions();
    iconOptions[key] = value;
    return iconOptions;
  }

  /** check that the icon set in the iconOptions exists
   *  else set default icon
   */
  private ensureMarkerIcon(iconOptions) {
    const markers = this.util.getIconsForColor(iconOptions.iconColor);

    if (markers.includes(iconOptions.icon)) {
      return iconOptions;
    }

    iconOptions.icon = this.util.getDefaultMarkerForColor(
      iconOptions.iconColor
    );
    return iconOptions;
  }

  public abstract createMarkerIcon(iconOptions: MarkerOptions);
  public abstract getSelectHTML(iconOptions, icon): HTMLElement;

}

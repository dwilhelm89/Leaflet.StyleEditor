import { ControlOptions, Layer, Marker, Path } from 'leaflet';
import { LeafletStyleEditorStrings } from '../types';
import { DefaultMarker, MarkerClass } from '../marker';
import { ColorElement, DashElement, FormElementClass, IconElement, OpacityElement, PopupContentElement, SizeElement, WeightElement } from '../formElements';

export interface StyleEditorOptions extends ControlOptions {
  colorRamp: string[]; // TODO colors
  defaultColor?: string; // TODO color

  markerType: MarkerClass;
  markers?: string[] | Record<string, string[]>; // TODO better types with colors
  defaultMarkerIcon?: string | Record<string, string>; // TODO add color
  defaultMarkerColor?: string; // TODO color

  formElements: [ string, FormElementClass, ((layer: Layer) => boolean)? ][];

  openOnLeafletDraw: boolean;
  openOnLeafletEditable: boolean;

  styleEditorEventPrefix: string;

  strings: LeafletStyleEditorStrings;
  layerAddEvents: string[];
  showTooltip: boolean;
  ignoreLayerTypes: string[];
  useGrouping: boolean;
}

export const DEFAULT_STYLE_EDITOR_OPTIONS: StyleEditorOptions = {
  position: 'topleft',

  colorRamp: [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#ecf0f1',
    '#95a5a6',
    '#f39c12',
    '#d35400',
    '#c0392b',
    '#bdc3c7',
    '#7f8c8d',
  ],

  formElements: [
    [ 'icon', IconElement],
    [ 'color', ColorElement],
    [ 'size', SizeElement],
    [ 'opacity', OpacityElement],
    [ 'weight', WeightElement],
    [ 'dashArray', DashElement],
    [ 'fillColor', ColorElement],
    [ 'fillOpacity', OpacityElement],
    [ 'popupContent', PopupContentElement],
  ],

  markerType: DefaultMarker,

  ignoreLayerTypes: [],

  layerAddEvents: ['draw:created', 'editable:created'],
  openOnLeafletDraw: true,
  openOnLeafletEditable: true,

  showTooltip: true,

  strings: {
    title: 'Style Editor',
    cancel: 'cancel',
    cancelTitle: 'cancel',
    tooltip: 'Click on the element you want to style',
    hide: 'Hide Style Editor',
  },

  useGrouping: false,

  styleEditorEventPrefix: 'styleeditor:',
};

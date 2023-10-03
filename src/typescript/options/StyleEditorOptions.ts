import { ControlOptions, Layer, Path } from 'leaflet';
import { LeafletStyleEditorStrings } from '../types';
import { ColorElement, DashElement, FormElementClass, IconElement, OpacityElement, PopupContentElement, WeightElement } from '../formElements';
import { RemoteMakiMarker, StyleEditorMarker } from '../marker/Icon';

export type ShowForLayerFun = (layer: Layer) => boolean

export type ColorRamp = [ string[], ShowForLayerFun? ][]; // TODO colors

export interface StyleEditorOptions extends ControlOptions {
  colorRamp: ColorRamp,
  defaultColor?: string; // TODO color

  marker: typeof StyleEditorMarker,

  formElements: [ string, FormElementClass, ShowForLayerFun? ][];

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

  marker: RemoteMakiMarker,

  colorRamp: [
    [[
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
    ]],
  ],

  formElements: [
    [ 'icon', IconElement ],
    [ 'color', ColorElement ],
    [ 'opacity', OpacityElement ],
    [ 'weight', WeightElement ],
    [ 'dashArray', DashElement ],
    [ 'fillColor', ColorElement, (layer: Layer) => layer instanceof Path && layer.options.fill ],
    [ 'fillOpacity', OpacityElement, (layer: Layer) => layer instanceof Path && layer.options.fill ],
    [ 'popupContent', PopupContentElement ],
  ],

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

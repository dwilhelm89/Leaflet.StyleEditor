import { Strings } from '../types'
import { MarkerForm, FormClass, GeometryForm } from '../form'
import { DefaultMarker, MarkerClass } from '../marker'

export interface StyleEditorClassOptions extends L.ControlOptions {
  colorRamp
  defaultColor

  markerForm: FormClass
  markerType: MarkerClass
  markers
  defaultMarkerIcon
  defaultMarkerColor

  forms
  geometryForm: FormClass

  openOnLeafletDraw
  openOnLeafletEditable

  styleEditorEventPrefix

  strings: Strings
  events: [],
  showTooltip: Boolean
  ignoreLayerTypes: string[]
  useGrouping: Boolean
}

export const DefaultStyleEditorClassOptions: StyleEditorClassOptions = {
  position: 'topleft',

  colorRamp: ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad',
    '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b',
    '#bdc3c7', '#7f8c8d'],
  defaultColor: null,

  markerType: DefaultMarker,
  markers: null,
  defaultMarkerIcon: null,
  defaultMarkerColor: null,

  markerForm: MarkerForm,
  geometryForm: GeometryForm,

  ignoreLayerTypes: [],

  forms: {},

  events: [],
  openOnLeafletDraw: true,
  openOnLeafletEditable: true,

  showTooltip: true,

  strings: {
    tooltip: 'Click on the element you want to style',
    hide: 'Hide Style Editor',
  },

  useGrouping: true,

  styleEditorEventPrefix: 'styleeditor:',
}


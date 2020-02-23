import { StyleForm } from './StyleForm'
import { DefaultMarker } from './marker'
import { GeometryForm, MarkerForm } from './form'
import L from '.'
import { Util } from './Util'

export interface StyleEditorControlOptions extends L.ControlOptions {
  position
  colorRamp
  defaultColor

  markerForm
  markerType
  markers
  defaultMarkerIcon
  defaultMarkerColor

  forms
  geometryForm

  openOnLeafletDraw
  openOnLeafletEditable

  styleEditorEventPrefix

  strings: {
    cancel: string
    cancelTitle: string
    tooltip: string
    tooltipNext: string
  },
  events: [],
  showTooltip: Boolean
  ignoreLayerTypes: string[]
  useGrouping: Boolean
}

const DefaultOptions: StyleEditorControlOptions = {
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
    cancel: 'Cancel',
    cancelTitle: 'Cancel Styling',
    tooltip: 'Click on the element you want to style',
    tooltipNext: 'Choose another element you want to style'
  },
  useGrouping: true,

  styleEditorEventPrefix: 'styleeditor:',
}

export class StyleEditorControl extends L.Control {
  options: StyleEditorControlOptions

  private map: L.Map
  private cancelUI: HTMLElement
  private controlUI: HTMLElement
  private editorUI: HTMLElement
  private tooltipUI: HTMLElement

  constructor(options: StyleEditorControlOptions) {
    const opt: StyleEditorControlOptions= { ...DefaultOptions, ...options }
    super(opt)
    this.options = opt
  }

  onAdd(map: L.Map): HTMLElement {
    // create Control element
    Util.createInstance(map, this.options)
    const controlUI = this.controlUI = L.DomUtil.create('div', 'leaflet-control-styleeditor leaflet-control leaflet-bar')
    const controlDiv = L.DomUtil.create('a', 'leaflet-control-styleeditor-interior', controlUI)
    controlDiv.title = 'Style Editor'

    const cancelUI = this.cancelUI = L.DomUtil.create('div', 'leaflet-control-styleeditor-cancel leaflet-styleeditor-hidden', controlUI)
    cancelUI.innerHTML = this.options.strings.cancel
    cancelUI.title = this.options.strings.cancelTitle

    const editorUI = this.editorUI = L.DomUtil.create('div', 'leaflet-styleeditor', map.getContainer())

    const styleEditorHeader = L.DomUtil.create('div', 'leaflet-styleeditor-header', editorUI)
    const styleEditorInterior = L.DomUtil.create('div', 'leaflet-styleeditor-interior', editorUI)

    const buttonNext = L.DomUtil.create('button', 'leaflet-styleeditor-button styleeditor-nextBtn', styleEditorHeader)
    buttonNext.title = this.options.strings.tooltipNext

    const tooltipWrapper = L.DomUtil.create('div', 'leaflet-styleeditor-tooltip-wrapper', map.getContainer())
    const tooltip = this.tooltipUI = L.DomUtil.create('div', 'leaflet-styleeditor-tooltip', tooltipWrapper)
    tooltip.innerHTML = this.options.strings.tooltip

    // do not propagate scrolling events on the ui to the map
    L.DomEvent.disableScrollPropagation(controlUI)
    L.DomEvent.disableScrollPropagation(editorUI)
    L.DomEvent.disableScrollPropagation(controlUI)
    L.DomEvent.disableScrollPropagation(cancelUI)
    L.DomEvent.disableScrollPropagation(buttonNext)

    // do not propagate click events on the ui to the map
    L.DomEvent.disableClickPropagation(controlUI)
    L.DomEvent.disableClickPropagation(editorUI)
    L.DomEvent.disableClickPropagation(controlUI)
    L.DomEvent.disableClickPropagation(cancelUI)
    L.DomEvent.disableClickPropagation(buttonNext)

    // toggle UI visibility
    L.DomEvent.on(controlUI, 'click', this.toggle)

    // select next layer to style
    L.DomEvent.on(buttonNext, 'click', this.onNext)

    this.addEventListeners(map)

    new StyleForm(map, editorUI, styleEditorInterior, new this.options.markerForm(), new this.options.geometryForm())

    return controlUI
  }

  addEventListeners(map: L.Map) {
    this.options.events.forEach(event =>
      map.on(event, this.onEvent)
    )
  }

  onEvent(event: L.LeafletEvent) {
    // TODO
  }

  onNext(event: Event) {
    this.hideEditor()

    if (L.DomUtil.hasClass(this.controlUI, 'enabled')) {
      this.showTooltip()
    }

    event.stopPropagation()
  }

  toggle() {
    if (L.DomUtil.hasClass(this.controlUI, 'enabled')) {
      this.disable()
    } else {
      this.enable()
    }
  }

  enable(layer?: L.Layer) {
    if (this.layerIsIgnored(layer)) {
      return
    }

    L.DomUtil.addClass(this.controlUI, 'enabled')
    this.map.eachLayer(this.addEditClickEvents, this)
    this.showCancelButton()
    this.showTooltip()

    if (layer !== undefined) {
      if (this.isEnabled()) {
        this.removeIndicators()
      }
      //this.initChangeStyle({ target: layer })
    }
  }

  removeIndicators() {
    const children = this.map.getPanes().markerPane.children
    for (let index = 0; index < children.length; index++) {
      const element = children[index] as HTMLEmbedElement
      L.DomUtil.removeClass(element, 'leaflet-styleeditor-marker-selected')
    }
  }

  addEditClickEvents(layer) {
    if (this.layerIsIgnored(layer)) {
      return
    }
    if (this.options.useGrouping && layer instanceof L.LayerGroup) {
      //this.options._layerGroups.push(layer)
    } else if (layer instanceof L.Marker || layer instanceof L.Path) {
      //let evt = layer.on('click', this.initChangeStyle, this)
      //this.options._editLayers.push(evt)
    }
  }

  private layerIsIgnored(layer) {
    if (layer === undefined) {
      return false
    }
    return this.options.ignoreLayerTypes.some(
      layerType => layer.styleEditor && layer.styleEditor.type.toUpperCase() === layerType.toUpperCase()
    )
  }

  isEnabled() {
    return L.DomUtil.hasClass(this.controlUI, 'enabled')
  }

  disable() {
    if (this.isEnabled()) {
      /*      this.options._editLayers.forEach(this.removeEditClickEvents, this)
            this.options._editLayers = []
            this.options._layerGroups = [] */
      this.hideEditor()
      this.hideCancelButton()
      this.hideTooltip()
      L.DomUtil.removeClass(this.controlUI, 'enabled')
    }
  }

  hideEditor() {
    if (L.DomUtil.hasClass(this.controlUI, 'editor-enabled')) {
      this.removeIndicators()
      L.DomUtil.removeClass(this.controlUI, 'editor-enabled')
      this.fireEvent('hidden')
    }
  }

  showCancelButton() {
    L.DomUtil.removeClass(this.cancelUI, 'leaflet-styleeditor-hidden')
  }

  hideCancelButton() {
    L.DomUtil.addClass(this.cancelUI, 'leaflet-styleeditor-hidden')
  }

  showEditor() {
    if (!L.DomUtil.hasClass(this.controlUI, 'editor-enabled')) {
      L.DomUtil.addClass(this.controlUI, 'editor-enabled')
      this.fireEvent('visible')
    }
  }

  showTooltip() {
    L.DomUtil.addClass(this.tooltipUI, 'leaflet-styleeditor-hidden')
  }

  hideTooltip() {
    L.DomUtil.removeClass(this.tooltipUI, 'leaflet-styleeditor-hidden')
  }

  fireEvent(eventName: String) {
  }

}

import { StyleForm } from './StyleForm'
import { Util } from './Util'
import { StyleEditorOptions, DefaultStyleEditorOptions } from './options'
import { StyleEditorControl } from './StyleEditorControl'
import { Layer, LayerEvent, LeafletMouseEvent } from 'leaflet'

// TODO merge STYLEFORM AND STYLE EDITORIMPL? or seperate better? 
export class StyleEditorImpl extends L.Class {
  controls: StyleEditorControl[] = []
  // TODO event? LAyer?!
  currentLayer: L.Layer | L.LayerGroup

  options: StyleEditorOptions
  util: Util

  map: L.Map
  editorUI: HTMLElement
  interiorEditorUI: HTMLElement
  tooltipUI: HTMLElement

  styleForm: StyleForm

  isEnabled: Boolean = false

  constructor(map: L.Map, options: StyleEditorOptions, control?: StyleEditorControl) {
    super()

    this.map = map

    this.options = { ...DefaultStyleEditorOptions, ...options }
    this.util = new Util(this)

    this.createUi()

    if(control) {
      this.addControl(control)
    }
  }

  createUi() {
    const editorUI = this.editorUI = L.DomUtil.create('div', 'leaflet-styleeditor', this.map.getContainer())

    const styleEditorHeader = L.DomUtil.create('div', 'leaflet-styleeditor-header', editorUI)
    this.interiorEditorUI = L.DomUtil.create('div', 'leaflet-styleeditor-interior', editorUI)

    const buttonNext = L.DomUtil.create('button', 'leaflet-styleeditor-button styleeditor-hideBtn', styleEditorHeader)
    buttonNext.title = this.options.strings.hide

    const tooltipWrapper = this.tooltipUI = L.DomUtil.create('div', 'leaflet-styleeditor-tooltip-wrapper', this.map.getContainer())
    const tooltip = L.DomUtil.create('div', 'leaflet-styleeditor-tooltip', tooltipWrapper)
    tooltip.innerHTML = this.options.strings.tooltip

    // do not propagate scrolling events on the ui to the map
    L.DomEvent.disableScrollPropagation(editorUI)
    L.DomEvent.disableScrollPropagation(buttonNext)

    // do not propagate click events on the ui to the map
    L.DomEvent.disableClickPropagation(editorUI)
    L.DomEvent.disableClickPropagation(buttonNext)

    // select next layer to style
    L.DomEvent.on(buttonNext, 'click', this.onNext, this)

    this.addEventListeners(this.map)

    this.styleForm = new StyleForm(this)
  }

  addEventListeners(map: L.Map) {
    this.options.layerAddEvents.forEach(event => {
      map.on(event, this.onLayerAddEvent, this)
    })
  }

  onLayerAddEvent(event: L.LayerEvent) {
    this.enable()
    this.addClickEvent(event.layer)
    this.showEditor(event.layer)
  }

  onNext(event: Event) {
    this.hideEditor()
    this.showTooltip()
    event.stopPropagation()
  }


  removeIndicators() {
    const children = this.map.getPanes().markerPane.children
    for (let index = 0; index < children.length; index++) {
      const element = children[index] as HTMLEmbedElement
      L.DomUtil.removeClass(element, 'leaflet-styleeditor-marker-selected')
    }
  }

  addClickEvents() {
    // TODO add to newly added layers?!
    this.map.eachLayer(this.addClickEvent, this)
  }

  addClickEvent(layer: L.Layer) {
    if (this.layerIsIgnored(layer)) {
      return
    }
    if (this.options.useGrouping && !(layer instanceof L.LayerGroup)) {
      return
    }
    if(!this.options.useGrouping && layer instanceof L.LayerGroup) {
      return
    }
      
    layer.on('click', this.onLayerClick, this)
  }

  removeClickEvents() {
    this.map.eachLayer(this.removeClickEvent, this)
  }

  removeClickEvent(layer: L.Layer) {
    layer.off('click', this.onLayerClick, this)
  }

  private layerIsIgnored(layer) {
    if (layer === undefined) {
      return false
    }
    return this.options.ignoreLayerTypes.some(
      layerType => layer.styleEditor && layer.styleEditor.type.toUpperCase() === layerType.toUpperCase()
    )
  }

  hideEditor() {
    L.DomUtil.removeClass(this.editorUI, 'editor-enabled')
    this.removeIndicators()
    this.util.fireEvent('hidden')
  }

  onLayerClick(event: LeafletMouseEvent) {
    console.log(event)
    this.showEditor(event.target)
  }

  showEditor(layer?: Layer) {
    if (layer) {
      this.currentLayer = layer
    }
    if (this.currentLayer) {
      L.DomUtil.addClass(this.editorUI, 'editor-enabled')
    }
    this.util.fireEvent('visible')
    this.styleForm.show()
  }

  showTooltip() {
    L.DomUtil.removeClass(this.tooltipUI, 'leaflet-styleeditor-hidden')
  }

  hideTooltip() {
    L.DomUtil.addClass(this.tooltipUI, 'leaflet-styleeditor-hidden')
  }

  enable() {
    if(!this.isEnabled) {
      this.isEnabled = true
      this.controls.forEach(control => control.enable())
      this.addClickEvents()
      this.showTooltip()
      this.showEditor()
    }
  }

  disable() {
    if(this.isEnabled) {
      this.controls.forEach(control => control.disable())
      this.removeClickEvents()
      this.hideTooltip()
      this.hideEditor()
      this.isEnabled = false
    }
  }

  // get current layers
  getCurrentLayers(): L.StyleableLayer[] {
    if (!this.currentLayer) {
      return []
    } else if (this.options.useGrouping && this.currentLayer instanceof L.LayerGroup) {
      return this.currentLayer.getLayers()
  } else {
      return [this.currentLayer]
    }
  }

  getCurrentMarker() {
    return this.getCurrentLayers().filter((layer) => layer instanceof L.Marker)
  }

  addControl(control: StyleEditorControl): number {
    return this.controls.push(control)
  }
}

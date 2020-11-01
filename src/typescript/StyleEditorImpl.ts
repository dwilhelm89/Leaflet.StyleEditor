import { StyleForm } from './StyleForm'
import { Util } from './Util'
import { StyleEditorOptions, DefaultStyleEditorOptions } from './options'
import { LeafletEvent } from 'leaflet'

// TODO merge STYLEFORM AND STYLE EDITORIMPL? or seperate better? 
export class StyleEditorImpl extends L.Class {

  // TODO event? LAyer?!
  currentElement: LeafletEvent // TODO why private?

  options: StyleEditorOptions
  util: Util

  map: L.Map
  editorUI: HTMLElement
  interiorEditorUI: HTMLElement
  tooltipUI: HTMLElement

  styleForm: StyleForm

  constructor(map: L.Map, options: StyleEditorOptions) {
    super()

    this.map = map

    this.options = { ...DefaultStyleEditorOptions, ...options }
    this.util = new Util(this)

    this.createUi()
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
    this.options.events.forEach(event =>
      map.on(event, this.onEvent)
    )
  }

  onEvent(event: L.LeafletEvent) {
    // TODO
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
    if (this.options.useGrouping && layer instanceof L.LayerGroup) {
      layer.on('click', this.showEditor, this)
    } else if (layer instanceof L.Marker || layer instanceof L.Path) {
      layer.on('click', this.showEditor, this)
    }
  }

  removeClickEvents() {
    this.map.eachLayer(this.removeClickEvent, this)
  }

  removeClickEvent(layer: L.Layer) {
    layer.off('click', this.showEditor, this)
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
    this.fireEvent('hidden')
  }

  // TODO what type is event?!
  // TODO move to FORM?
  showEditor(event? : LeafletEvent) {
    if (event) {
      this.currentElement = event
    }
    if (this.currentElement) {
      L.DomUtil.addClass(this.editorUI, 'editor-enabled')
    }
    this.fireEvent('visible')
    this.styleForm.show()
  }

  showTooltip() {
    L.DomUtil.removeClass(this.tooltipUI, 'leaflet-styleeditor-hidden')
  }

  hideTooltip() {
    L.DomUtil.addClass(this.tooltipUI, 'leaflet-styleeditor-hidden')
  }

  fireEvent(eventName: String, layer?: L.Layer) {
  }

  enable() {
    this.addClickEvents()
    this.showTooltip()
    this.showEditor()
  }

  disable() {
    this.removeClickEvents()
    this.hideTooltip()
    this.hideEditor()
  }

  // get current layers
  getCurrentLayers(): L.StyleableLayer[] {
    if (!this.currentElement) {
      return []
    } else if (this.options.useGrouping && this.currentElement.target instanceof L.LayerGroup) {
      return this.currentElement.target.getLayers()
  } else {
      return [this.currentElement.target]
    }
  }

  getCurrentMarker() {
    return this.getCurrentLayers().filter((layer) => layer instanceof L.Marker)
  }

}

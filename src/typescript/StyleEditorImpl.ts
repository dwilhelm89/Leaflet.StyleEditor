import { StyleForm } from './StyleForm'
import { Util } from './Util'
import { StyleEditorOptions, DefaultStyleEditorOptions } from './options'

export class StyleEditorImpl extends L.Class {

  // TODO event? LAyer?!
  private currentElement

  options: StyleEditorOptions
  util: Util

  map: L.Map
  editorUI: HTMLElement
  interiorEditorUI: HTMLElement
  tooltipUI: HTMLElement

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
    const styleEditorInterior = this.interiorEditorUI = L.DomUtil.create('div', 'leaflet-styleeditor-interior', editorUI)

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

    new StyleForm(this)
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
    this.map.eachLayer(this.addClickEvent, this)
  }

  addClickEvent(layer: L.Layer) {
    if (this.layerIsIgnored(layer)) {
      return
    }
    if (this.options.useGrouping && layer instanceof L.LayerGroup) {
      //this.options._layerGroups.push(layer)
    } else if (layer instanceof L.Marker || layer instanceof L.Path) {
      //let evt = layer.on('click', this.initChangeStyle, this)
      //this.options._editLayers.push(evt)
    }
    layer.on('click', this.showEditor, this)
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
  showEditor(event?) {
    if (event) {
      this.currentElement = event
    }
    L.DomUtil.addClass(this.editorUI, 'editor-enabled')
    this.fireEvent('visible')
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

  getCurrentLayers(): L.Layer[] {
    // TODO !!!! currentelemnt target?!
    if (this.currentElement.target instanceof L.LayerGroup)
      return this.currentElement.target.getLayers()
    else
      return [this.currentElement.target]
  }

  getCurrentMarker(): L.Marker[] {
    return this.getCurrentLayers().filter((layer) => { layer instanceof L.Marker }) as L.Marker[]
  }

}

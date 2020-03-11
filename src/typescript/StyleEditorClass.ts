import { StyleForm } from './StyleForm'
import { Util } from './Util'
import { StyleEditorOptions, DefaultStyleEditorOptions } from './options'
import { Map } from 'leaflet'

export class StyleEditorClass extends L.Class {
  options: StyleEditorOptions

  private map: L.Map
  private editorUI: HTMLElement
  private tooltipUI: HTMLElement

  constructor(map: Map, options: StyleEditorOptions) {
    super()
    
    this.map = map
    this.options = { ...DefaultStyleEditorOptions, ...options }
    Util.createInstance(map, this.options)
  
    this.createUi()
  }

  createUi() {
    const editorUI = this.editorUI = L.DomUtil.create('div', 'leaflet-styleeditor', this.map.getContainer())

    const styleEditorHeader = L.DomUtil.create('div', 'leaflet-styleeditor-header', editorUI)
    const styleEditorInterior = L.DomUtil.create('div', 'leaflet-styleeditor-interior', editorUI)

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

    new StyleForm(this.map, editorUI, styleEditorInterior, this.options.markerForm, this.options.geometryForm)
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

  hideEditor() {
    L.DomUtil.removeClass(this.editorUI, 'editor-enabled')
    this.removeIndicators()
    this.fireEvent('hidden')
  }

  showEditor() {
    L.DomUtil.addClass(this.editorUI, 'editor-enabled')
    this.fireEvent('visible')
  }

  showTooltip() {
    L.DomUtil.removeClass(this.tooltipUI, 'leaflet-styleeditor-hidden')
  }

  hideTooltip() {
    L.DomUtil.addClass(this.tooltipUI, 'leaflet-styleeditor-hidden')
  }

  fireEvent(eventName: String) {
  }

  enable() {
    //TODO this.addClickEvents()
    this.showTooltip()
    this.showEditor()
  }

  disable() {
    //TODO this.removeClickEvents()
    this.hideTooltip()
    this.hideEditor()
  }

}


export interface StyleEditorControlOptions extends L.ControlOptions {
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


export class StyleEditorControl extends L.Control {
  options: StyleEditorControlOptions

  private map: L.Map
  private cancelUI: HTMLElement
  private controlUI: HTMLElement
  private editorUI: HTMLElement
  private tooltipUI: HTMLElement

  constructor(options: StyleEditorControlOptions) {
    super(options)
    this.options = options
  }

  onAdd(map: L.Map): HTMLElement {
    // create Control element
    const controlUI = this.controlUI = L.DomUtil.create('div', 'leaflet-control-styleeditor leaflet-control leaflet-bar')
    const controlDiv = L.DomUtil.create('a', 'leaflet-control-styleeditor-interior', controlUI)
    controlDiv.title = 'Style Editor'

    const cancelUI = this.cancelUI = L.DomUtil.create('div', 'leaflet-control-styleeditor-cancel leaflet-styleeditor-hidden', controlUI)
    cancelUI.innerHTML = this.options.strings.cancel
    cancelUI.title = this.options.strings.cancelTitle

    const editorUI = this.editorUI = L.DomUtil.create('div', 'leaflet-styleeditor', map.getContainer())

    const styleEditorHeader = L.DomUtil.create('div', 'leaflet-styleeditor-header', editorUI)
    L.DomUtil.create('div', 'leaflet-styleeditor-interior', editorUI)

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
    /*
        this.options.styleForm = new L.StyleForm({
          styleEditorDiv: styleEditorDiv,
          styleEditorInterior: styleEditorInterior,
          styleEditorOptions: this.options
        })
    */
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

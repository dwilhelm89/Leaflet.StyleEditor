import { Map } from "leaflet";
import { StyleEditorImpl } from "./StyleEditorImpl";
import { StyleEditorControlOptions, StyleEditorOptions, StyleEditorClassOptions, DefaultStyleEditorControlOptions, DefaultStyleEditorClassOptions } from './options'

/**
 * StyleEditorControl creates a { L.Control }
 * which enables the user to enable and disable Leaflet.StyleEditor
 */
export class StyleEditorControl extends L.Control {
  options: StyleEditorControlOptions

  private styleEditor: StyleEditorImpl
  private styleEditorClassOptions: StyleEditorClassOptions

  constructor(styleEditorOptions: StyleEditorOptions)
  constructor(options: StyleEditorControlOptions, styleEditor: StyleEditorImpl)
  constructor(options?: StyleEditorControlOptions, styleEditor?: StyleEditorImpl, styleEditorOptions?: StyleEditorOptions) {
    super()
    if (styleEditorOptions === undefined) {
      this.options = { ...DefaultStyleEditorControlOptions, ...options }
      this.styleEditor = styleEditor
    } else {
      this.options = { ...DefaultStyleEditorControlOptions, ...styleEditorOptions as StyleEditorControlOptions }
      this.styleEditorClassOptions = { ...DefaultStyleEditorClassOptions, ...styleEditorOptions as StyleEditorClassOptions }
    }
  }

  private isEnabled = false
  private cancelUI: HTMLElement

  /**
   * Create the Control element and its HTMLElements
   * @param map the map where the control should be added to
   */
  onAdd(map: Map): HTMLElement {
    if (this.styleEditor === undefined) {
      this.styleEditor = new StyleEditorImpl(map, this.styleEditorClassOptions as StyleEditorClassOptions)
    }
    // disable styleEditor if using control element
    this.styleEditor.disable()

    return this.createUI()
  }

  createUI() {
    const controlUI = L.DomUtil.create('div', 'leaflet-control-styleeditor leaflet-control leaflet-bar')
    const controlDiv = L.DomUtil.create('a', 'leaflet-control-styleeditor-interior', controlUI)
    controlDiv.title = this.options.strings.title

    const cancelUI = this.cancelUI = L.DomUtil.create('div', 'leaflet-control-styleeditor-cancel leaflet-styleeditor-hidden', controlUI)
    cancelUI.innerHTML = this.options.strings.cancel
    cancelUI.title = this.options.strings.cancelTitle

    L.DomEvent.disableScrollPropagation(controlUI)
    L.DomEvent.disableScrollPropagation(cancelUI)

    L.DomEvent.disableClickPropagation(controlUI)
    L.DomEvent.disableClickPropagation(cancelUI)

    // toggle UI visibility
    L.DomEvent.on(controlUI, 'click', this.toggle, this)

    return controlUI
  }

  toggle() {
    if (this.isEnabled) {
      this.disable()
    } else {
      this.enable()
    }
  }

  enable() {
    this.isEnabled = true
    this.showCancelButton()
    this.styleEditor.enable()
  }

  disable() {
    if (this.isEnabled) {
      this.isEnabled = false
      this.hideCancelButton()
      this.styleEditor.disable()
    }
  }

  private showCancelButton() {
    L.DomUtil.removeClass(this.cancelUI, 'leaflet-styleeditor-hidden')
  }

  private hideCancelButton() {
    L.DomUtil.addClass(this.cancelUI, 'leaflet-styleeditor-hidden')
  }

}

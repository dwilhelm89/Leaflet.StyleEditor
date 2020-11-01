import { Map } from "leaflet";
import { StyleEditorImpl } from "./StyleEditorImpl";
import { StyleEditorOptions, DefaultStyleEditorOptions } from './options'

/**
 * StyleEditorControl creates a { L.Control }
 * which enables the user to enable and disable Leaflet.StyleEditor
 */
export class StyleEditorControl extends L.Control {
  options: StyleEditorOptions

  private styleEditor: StyleEditorImpl

  constructor(styleEditorOptions: StyleEditorOptions, styleEditor?: StyleEditorImpl) {
    super()
    this.options = { ...DefaultStyleEditorOptions, ...styleEditorOptions }
    this.styleEditor = styleEditor
  }

  private isEnabled = false
  private cancelUI: HTMLElement

  /**
   * Create the Control element and its HTMLElements
   * @param map the map where the control should be added to
   */
  onAdd(map: Map): HTMLElement {
    if (this.styleEditor === undefined) {
      this.styleEditor = new StyleEditorImpl(map, this.options)
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

import { FormElement } from "."

/**
 * FormElement used for adding a description to marker or geometry.
 */
export class PopupContentElement extends FormElement {

  title: 'Description'
  private textArea: HTMLTextAreaElement

  createContent() {
    this.textArea = L.DomUtil.create('textarea', 'leaflet-styleeditor-input', this.uiElement) as HTMLTextAreaElement
    L.DomEvent.addListener(this.textArea, 'change', this._setStyle, this)
  }

  /** set correct value */
  style() {
    let selectedElement = this.styleEditor.getCurrentMarker()[0]

    if (selectedElement && selectedElement.options) {
      this.textArea.value = selectedElement.options.popupContent || ''
    }
  }

  /** communicate popupContent value */
  _setStyle() {
    let layers = this.styleEditor.getCurrentLayers()
    let inputText = this.textArea.value

    // update layer (or all layers of a layerGroup)
    for (let i = 0; i < layers.length; i++) {
      let layer = layers[i]
      if (layer && layer.getPopup && layer.bindPopup) {
        let popup1 = layer.getPopup()
        if (popup1) {
          popup1.setContent(inputText)
        } else {
          layer.bindPopup(inputText)
        }
        /* TODO ?! tmp store the text content for init next time
        layer.options = layer.options || {}
        layer.options.popupContent = inputText */
      }
    }

    this.setStyle(inputText)
  }
}

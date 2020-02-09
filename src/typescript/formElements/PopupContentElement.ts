import L, { Layer } from 'leaflet'

import FormElement from './FormElement'
import FormElementOptions from './FormElementOptions'

interface PoppContentElementOptions extends FormElementOptions {
  title: string
  uiElement
  descTextAreaField
}


/**
 * FormElement used for adding a description to marker or geometry.
 */
export default class PopupContentElement extends FormElement {

  options: PoppContentElementOptions

  createContent() {
    let uiElement = this.options.uiElement

    let textArea = this.options.descTextAreaField = L.DomUtil.create('textarea', 'leaflet-styleeditor-input', uiElement)
    L.DomEvent.addListener(textArea, 'change', this._setStyle, this)
  }

  /** set correct value */
  style() {
    let selectedElement = this.util.getCurrentElement()

    if (selectedElement && selectedElement.options) {
      this.options.descTextAreaField.value = selectedElement.options.popupContent || ''
    }
  }

  /** communicate popupContent value */
  _setStyle() {
    let currentElement = this.util.getCurrentElement()
    let inputText = this.options.descTextAreaField.value

    // check whether a layer is part of a layerGroup
    let layers: Layer[] = [currentElement]
    if (currentElement instanceof L.LayerGroup) {
      layers = currentElement.getLayers()
    }

    // update layer (or all layers of a layerGroup)
    for (let i = 0; i < layers.length; i++) {
      let marker = layers[i]
      if (marker && marker.getPopup && marker.bindPopup) {
        let popup1 = marker.getPopup()
        if (popup1) {
          popup1.setContent(inputText)
        } else {
          marker.bindPopup(inputText)
        }
        /*// tmp store the text content for init next time
        marker.options = marker.options || {}
        marker.options.popupContent = inputText
        TODO*/
      }
    }

    this.setStyle(inputText)
  }
}

import { FormElement } from '.'

/**
 * FormElement used for adding a description to marker or geometry.
 */
export class PopupContentElement extends FormElement {
  styleOption: 'pupupContent'
  private textArea: HTMLTextAreaElement

  title = 'Description'
  
  createContent() {
    this.textArea = L.DomUtil.create('textarea', 'leaflet-styleeditor-input', this.uiElement) as HTMLTextAreaElement
    L.DomEvent.addListener(this.textArea, 'change', this.updateStyle, this)
    L.DomEvent.addListener(this.textArea, 'input', this.updateStyle, this)
  }

  /** set correct value */
  style() {
    const selectedElements = this.styleEditor.getCurrentLayers()
    this.textArea.value = ''
    selectedElements.forEach(layer => {
      if(layer.options.popupContent) {
        this.textArea.value = layer.options.popupContent
        const popup = layer.getPopup()
        if(popup) {
          popup.setContent(layer.options.popupContent)
        } else {
          layer.bindPopup(layer.options.popupContent)
        }
      }
    })
  }

  /** communicate popupContent value */
  private updateStyle() {
    const inputText = this.textArea.value
    this.styleEditor.getCurrentLayers().forEach(layer => {
      const popup = layer.getPopup()
      if(popup) {
        popup.setContent(inputText)
      } else {
        layer.bindPopup(inputText)
      }
      layer.openPopup()
    })
    this.setStyle(inputText)
  }
}

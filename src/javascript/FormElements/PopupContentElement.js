/**
 * FormElement used for adding a description to marker or geometry.
 */
L.StyleEditor.formElements.PopupContentElement = L.StyleEditor.formElements.FormElement.extend({

  options: {
    title: 'Description'
  },

  createContent: function () {
    let uiElement = this.options.uiElement

    let textArea = L.DomUtil.create('textarea', 'leaflet-styleeditor-input', uiElement)
    this.options.descTextAreaField = textArea // keep the reference

    L.DomEvent.addListener(textArea, 'change', function () {
      let selectedElement = this.options.styleEditorOptions.util.getCurrentElement()
      setMarkerText(textArea.value, selectedElement)
    }, this)

    function setMarkerText (inputText, currentElement) {
      inputText = inputText + ''

      // check whether a layer is part of a layerGroup
      let layers = [currentElement]
      if (currentElement instanceof L.LayerGroup) {
        layers = Object.values(currentElement._layers)
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
          // tmp store the text content for init next time
          marker.options = marker.options || {}
          marker.options.popupContent = inputText
        }
      }
    }
  },

  /** set correct value */
  style: function () {
    let selectedElement = this.options.styleEditorOptions.util.getCurrentElement()

    if (selectedElement && selectedElement.options) {
      this.options.descTextAreaField.value = selectedElement.options.popupContent || ''
    }
  }

})

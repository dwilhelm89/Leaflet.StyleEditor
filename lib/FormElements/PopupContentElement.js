"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("leaflet");
/**
 * FormElement used for adding a description to marker or geometry.
 */
function setupPopupContentElement() {
    L.StyleEditor.formElements.PopupContentElement = L.StyleEditor.formElements.FormElement.extend({
        options: {
            title: 'Description'
        },
        createContent: function () {
            var uiElement = this.options.uiElement;
            var textArea = this.options.descTextAreaField = L.DomUtil.create('textarea', 'leaflet-styleeditor-input', uiElement);
            L.DomEvent.addListener(textArea, 'change', this._setStyle, this);
        },
        /** set correct value */
        style: function () {
            var selectedElement = this.util.getCurrentElement();
            if (selectedElement && selectedElement.options) {
                this.options.descTextAreaField.value = selectedElement.options.popupContent || '';
            }
        },
        /** communicate popupContent value */
        _setStyle: function () {
            var currentElement = this.util.getCurrentElement();
            var inputText = this.options.descTextAreaField.value;
            // check whether a layer is part of a layerGroup
            var layers = [currentElement];
            if (currentElement instanceof L.LayerGroup) {
                layers = Object.values(currentElement._layers);
            }
            // update layer (or all layers of a layerGroup)
            for (var i = 0; i < layers.length; i++) {
                var marker = layers[i];
                if (marker && marker.getPopup && marker.bindPopup) {
                    var popup1 = marker.getPopup();
                    if (popup1) {
                        popup1.setContent(inputText);
                    }
                    else {
                        marker.bindPopup(inputText);
                    }
                    // tmp store the text content for init next time
                    marker.options = marker.options || {};
                    marker.options.popupContent = inputText;
                }
            }
            this.setStyle(inputText);
        }
    });
}
exports.default = setupPopupContentElement;

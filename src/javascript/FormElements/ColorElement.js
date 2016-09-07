L.StyleEditor.formElements.ColorElement = L.StyleEditor.formElements.FormElement.extend({

    createContent: function() {
        this.options.colorPickerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-colorpicker',
            this.options.uiElement);
        this._getColorRamp().forEach(this._setSelectCallback, this);
    },

    _getColorRamp: function() {
        if (!!this.options.colorRamp) {
            return this.options.colorRamp;
        } else {
            return this.options.styleEditorOptions.colorRamp;
        }
    },

    _setSelectCallback: function(color) {
        var elem = L.DomUtil.create('div', 'leaflet-styleeditor-color', this.options.colorPickerDiv);
        elem.style.backgroundColor = color;
        L.DomEvent.addListener(elem, 'click', this._selectColor, this);
    },

    _selectColor: function(e) {
        e.stopPropagation();
        this.setStyle(e.target.style.backgroundColor);

        if (this.options.styleEditorOptions.currentElement.target instanceof L.Marker) {
            this.options.styleEditorOptions.markerType.setNewMarker();
        }
    }
});

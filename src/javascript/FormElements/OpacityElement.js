/**
 * FormElement used to style opacity
 */
L.StyleEditor.formElements.OpacityElement = L.StyleEditor.formElements.FormElement.extend({

    /** create number input box */
    createContent: function () {
        let opacity = this.options.opacity = L.DomUtil.create('input', 'leaflet-styleeditor-input',
            this.options.uiElement)
        opacity.type = 'number'
        opacity.max = 1
        opacity.min = 0
        opacity.step = 0.1
        opacity.value = 0.5

        // add event listeners
        L.DomEvent.addListener(opacity, 'change', this._setStyle, this)
        L.DomEvent.addListener(opacity, 'input', this._setStyle, this)
        L.DomEvent.addListener(opacity, 'keyup', this._setStyle, this)
        L.DomEvent.addListener(opacity, 'mouseup', this._setStyle, this)
    },

    /** set correct value */
    style: function () {
        this.options.opacity.value = this.options.styleEditorOptions.util.getStyle(this.options.styleOption)
    },

    /** communicate opacity value */
    _setStyle: function () {
        this.setStyle(this.options.opacity.value)
    }
})

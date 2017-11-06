/** FormElements are part of a Form for a specific styling option (i.e. color) */
L.StyleEditor.formElements.FormElement = L.Class.extend({

    /** set options and title */
    initialize: function(options) {
        if (!!options) {
            L.setOptions(this, options);
        }

        // if no title is given use styling option
        if (!this.options.title && !!this.options.styleOption) {
            this.options.title = this.options.styleOption.charAt(0).toUpperCase() + this.options.styleOption.slice(1);
        }
    },

    /** create uiElement and content */
    create: function(parentUiElement) {
        var uiElement = this.options.uiElement =
            L.DomUtil.create('div', 'leaflet-styleeditor-uiElement', parentUiElement);
        this.createTitle();
        this.createContent();
    },

    /** create title */
    createTitle: function() {
        var title = L.DomUtil.create('label', 'leaflet-styleeditor-label', this.options.uiElement);
        title.innerHTML = this.options.title + ':';
    },

    /** create content (where the actual modification takes place) */
    createContent: function() {
    },

    /** style the FormElement and show it */
    show: function () {
        this.style();
        this.showForm();
    },

    /** show the FormElement */
    showForm: function () {
        this.options.styleEditorOptions.util.showElement(this.options.uiElement);
    },

    /** hide the FormElement */
    hide: function () {
        this.options.styleEditorOptions.util.hideElement(this.options.uiElement);
    },

    /** style the FormElement */
    style: function () {
    },

    /** what to do when lost focus */
    lostFocus: function() {
    },

    /** set style - used when the FormElement wants to change the styling option */
    setStyle: function (value) {
        var currentElement = this.options.styleEditorOptions.util.getCurrentElement();
        // check whether a layer is part of a layerGroup
        var layers = [currentElement];
        if (currentElement instanceof L.LayerGroup) {
            layers = Object.values(currentElement._layers);
        }

        // update layer (or all layers of a layerGroup)
        for (var i=0; i<layers.length; i++) {
            var layer = layers[i];
            if (layer instanceof L.Marker) {
                this.options.styleEditorOptions.markerType.setStyle(this.options.styleOption, value);
                layer.options.icon.options[this.options.styleOption] = value;
            } else {
                var newStyle = {};
                newStyle[this.options.styleOption] = value;
                layer.setStyle(newStyle);
                layer.options[this.options.styleOption] = value;
            }

            // fire event for changed layer
            this.options.styleEditorOptions.util.fireChangeEvent(layer);
        }

        // notify form styling value has changed
        this.options.parentForm.style();
    }

});

L.StyleEditor.formElements.FormElement = L.Class.extend({

    initialize: function(options) {
        if (!!options) {
            L.setOptions(this, options);
        }

        if (!!this.options.styleOption) {
            this.options.title = this.options.styleOption.charAt(0).toUpperCase() + this.options.styleOption.slice(1);
        }
    },

    create: function(parentUiElement) {
        var uiElement = this.options.uiElement =
            L.DomUtil.create('div', 'leaflet-styleeditor-uiElement', parentUiElement);
        this.createTitle();
        this.createContent();
    },

    createTitle: function() {
        var title = L.DomUtil.create('label', 'leaflet-styleeditor-label', this.options.uiElement);
        title.innerHTML = this.options.title + ':';
    },

    createContent: function() {
    },

    show: function () {
        this.style();
        this.showForm();
    },

    showForm: function () {
        this.options.styleEditorOptions.util.showElement(this.options.uiElement);
    },

    hide: function () {
        this.options.styleEditorOptions.util.hideElement(this.options.uiElement);
    },

    style: function () {
    },

    setStyle: function (value) {
        var currentElement = this.options.styleEditorOptions.util.getCurrentElement();

        var layers = [currentElement];
        if (currentElement instanceof L.LayerGroup) {
            layers = Object.values(currentElement._layers);
        }

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
        }
        this.options.styleEditorOptions.util.fireChangeEvent(layer);
        this.options.parentForm.style();
    }

});
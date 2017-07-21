L.StyleEditor.Util = L.Class.extend({

    initialize: function(options) {
        if (!!options) {
            L.setOptions(this, options);
        }
    },

    fireChangeEvent: function(element){
        this.options.styleEditorOptions.map.fireEvent('styleeditor:changed', element);
    },

    hideElement: function(element) {
        if (element) {
            L.DomUtil.addClass(element, 'leaflet-styleeditor-hidden');
        }
    },

    rgbToHex: function(rgb, no_hash) {
        if (!rgb) {
            rgb = this.options.styleEditorOptions.defaultColor;
        }

        if (rgb.indexOf('#') == 0) {
            if (no_hash) {
                rgb.replace('#', '');
            }
            return rgb;
        }

        var without_hash = '';
        rgb = rgb.substring(4).replace(")", "").split(",");
        without_hash = this._componentToHex(parseInt(rgb[0], 10)) + this._componentToHex(parseInt(rgb[1], 10)) +
            this._componentToHex(parseInt(rgb[2], 10));

        if (!!no_hash) {
            return without_hash;
        }
        return "#" + without_hash;
    },

    getCurrentElement: function () {
        if (!this.options.styleEditorOptions.currentElement) {
            return null;
        }
        return this.options.styleEditorOptions.currentElement.target;
    },

    setCurrentElement: function (currentElement) {
        this.options.styleEditorOptions.currentElement.target = currentElement;
    },

    fillCurrentElement: function () {
        return this.getCurrentElement().options.fill;
    },

    getStyle: function (option) {
        var currentElement = this.getCurrentElement();
        var style = currentElement.options[option];
        if (!!style) {
            return style;
        }
        return null;
    },

    setStyle: function(option, value) {
        var currentElement = this.getCurrentElement();
        if(currentElement instanceof L.Marker) {
            this.options.styleEditorOptions.markerType.setStyle(option, value)
        } else {
            var newStyle = {};
            newStyle[option] = value;
            currentElement.setStyle(newStyle);
        }

        this.fireChangeEvent(currentElement);
    },

    showElement: function(element) {
        if (element) {
            L.DomUtil.removeClass(element, 'leaflet-styleeditor-hidden');
        }
    },

    // helper functions
    _componentToHex: function(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    },

});

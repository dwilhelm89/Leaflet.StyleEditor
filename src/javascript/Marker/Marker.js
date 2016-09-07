L.StyleEditor.marker.Marker = L.Class.extend({

    initialize: function(options) {
        L.setOptions(this, options);
        this.options.iconOptions = {
            iconSize: [20, 50],
            iconColor: 'rgb(41, 128, 185)',
            icon: 'square'
        };
    },

    setNewMarker: function() {
        var iconOptions = this.options.iconOptions;

        if (iconOptions.iconSize && iconOptions.icon && iconOptions.iconColor) {
            var newIcon = this.createMarkerIcon(iconOptions);
            var currentElement = this.options.styleEditorOptions.currentElement.target;
            currentElement.setIcon(newIcon);
        }
    },

    setStyle: function (styleOption, value) {
        var iconOptions = this.options.iconOptions;
        if(iconOptions[styleOption] != value) {
            iconOptions[styleOption] = value;
            this.setNewMarker();
        }
    }
});



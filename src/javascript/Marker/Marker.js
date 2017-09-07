/**
 * The Base class for different markers
 */
L.StyleEditor.marker.Marker = L.Class.extend({
    /** define markerForm used to style the Marker */
    markerForm: L.StyleEditor.forms.MarkerForm,

    /** set standard icon */
    initialize: function(options) {
        L.setOptions(this, options);
        this.options.iconOptions = {
            iconSize: [20, 50],
            iconColor: 'rgb(41, 128, 185)',
            icon: 'square'
        };
    },

    /** create new Marker and show it */
    setNewMarker: function() {
        var iconOptions = this._ensureMarkerIcon(this.options.iconOptions);

        if (iconOptions.iconSize && iconOptions.icon && iconOptions.iconColor) {
            var newIcon = this._createMarkerIcon(iconOptions);
            var currentElement = this.options.styleEditorOptions.currentElement.target;
            currentElement.setIcon(newIcon);
        }
    },

    /** set styling options */
    setStyle: function (styleOption, value) {
        var iconOptions = this._ensureMarkerIcon(this.options.iconOptions);
        if(iconOptions[styleOption] != value) {
            iconOptions[styleOption] = value;
            this.setNewMarker();
        }
    },

    /** create HTML used to */
    createSelectHTML: function(parentUiElement, iconOptions, icon) {
        this.createSelectHTML(parentUiElement, iconOptions, icon);
    },

    _createMarkerIcon: function(iconOptions) {
        iconOptions = this._ensureMarkerIcon(iconOptions);
        return this.createMarkerIcon(iconOptions);
    },

    _ensureMarkerIcon: function(iconOptions) {
        var markers = this.options.styleEditorOptions.util.getMarkersForColor(iconOptions.iconColor);

        if (markers.includes(iconOptions.icon)) {
            return iconOptions;
        }

        iconOptions.icon = this.options.styleEditorOptions.util.getDefaultMarkerForColor(iconOptions.iconColor);

        return iconOptions;

    }
});



/**
 * Helper functions used throuhgout the project
 */
L.StyleEditor.Util = L.Class.extend({

    initialize: function(options) {
        if (!!options) {
            L.setOptions(this, options);
        }
    },

    /** fire an event if Leaflet.StyleEditor changed something */
    fireChangeEvent: function(element){
        this.options.styleEditorOptions.map.fireEvent('styleeditor:changed', element);
    },

    /** hide the given element */
    hideElement: function(element) {
        if (element) {
            L.DomUtil.addClass(element, 'leaflet-styleeditor-hidden');
        }
    },

    /** convert rgb to hex of a color
     * @param {string} rgb - rgb representation of the color
     * @param {boolean} no_hash - define if return value should not include hash
    */
    rgbToHex: function(rgb, no_hash) {
        if (!rgb) {
            rgb = this.options.styleEditorOptions.defaultColor;
            if(rgb.indexOf('#') !== 0) {
                rgb = '#'+rgb;
            }
        }

        if (rgb.indexOf('#') === 0) {
            if (no_hash) {
                rgb.replace('#', '');
            }
            return rgb;
        }

        if (rgb.indexOf('(') < 0) {
            return '#' + rgb;
        }

        var without_hash = '';
        rgb = rgb.substring(4).replace(')', '').split(',');
        without_hash = this._componentToHex(parseInt(rgb[0], 10)) + this._componentToHex(parseInt(rgb[1], 10)) +
            this._componentToHex(parseInt(rgb[2], 10));

        if (!!no_hash) {
            return without_hash;
        }
        return '#' + without_hash;
    },

    /** get element selected to be styled */
    getCurrentElement: function () {
        if (!this.options.styleEditorOptions.currentElement) {
            return null;
        }
        return this.options.styleEditorOptions.currentElement.target;
    },

    /** set which element is selected to be styled */
    setCurrentElement: function (currentElement) {
        this.options.styleEditorOptions.currentElement.target = currentElement;
    },

    /** does current element have the fill option */
    fillCurrentElement: function () {
        return this.getCurrentElement().options.fill;
    },

    /** get current style of current element */
    getStyle: function (option) {
        var currentElement = this.getCurrentElement();
        var style = currentElement.options[option];
        if (!!style) {
            return style;
        }
        return null;
    },

    /** set new style to current element */
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

    /** show hidden element */
    showElement: function(element) {
        if (element) {
            L.DomUtil.removeClass(element, 'leaflet-styleeditor-hidden');
        }
    },

    /** helper function to convert color to hex */
    _componentToHex: function(color) {
        var hex = color.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    },

    /** get the markers for a specific color **/
    getMarkersForColor: function(color) {
        color = this.rgbToHex(color);

        var markers = this.options.styleEditorOptions.markerType.options.markers;
        var controlMarkers = this.options.styleEditorOptions.markers;

        // if only an array of markers is given return it
        if (!Array.isArray(markers)) {

            // if color is specified return specific markers
            if (Object.keys(markers).includes(color)) {
                markers = markers[color];
            } else {
                markers = markers['default'];
            }
        }
        if (controlMarkers !== null) {
            if(!Array.isArray(controlMarkers)) {
                var keys = Object.keys(controlMarkers);
                if(keys.includes(color)) {
                    controlMarkers = controlMarkers[color];
                } else if (keys.includes('default')) {
                    controlMarkers = controlMarkers['default'];
                } else {
                    controlMarkers = markers;
                }
            }

            return markers.filter((n) => controlMarkers.includes(n));
        }
        return markers;
    },

    /** get default marker for specific color **/
    getDefaultMarkerForColor: function(color) {
        color = this.rgbToHex(color);

        var markers = this.getMarkersForColor(color);

        var defMarkers = [];

        var defaultMarker = this.options.styleEditorOptions.defaultMarkerIcon;
        if (defaultMarker !== null) {
            if (typeof defaultMarker === 'string') {
                defMarkers.push(defaultMarker);
            }
            if (Object.keys(defaultMarker).includes(color)) {
                defMarkers.push(defaultMarker[color]);
            }

        }

        defaultMarker = this.options.styleEditorOptions.markerType.options.defaultMarkerIcon;
        if (defaultMarker !== undefined) {
            if (typeof defaultMarker === 'string') {
                defMarkers.push(defaultMarker);
            }
            if (Object.keys(defaultMarker).includes(color)) {
                defMarkers.push(defaultMarker[color]);
            }
        }

        defMarkers.filter((n) => markers.includes(n));
        if (defMarkers.length > 0) {
            return defMarkers[0];
        }

        return markers[0];
    }

});

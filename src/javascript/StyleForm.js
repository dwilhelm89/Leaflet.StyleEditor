/*
Style options based on:
- path: http://leafletjs.com/reference.html#path-options
- icon: http://leafletjs.com/reference.html#icon

Markers from:
-
*/

L.StyleForm = L.Class.extend({
    initialize: function(options) {
        L.setOptions(this, options);

        this.createMarkerForm();
        this.createGeometryForm();

        // this.addDOMEvents();
    },

    addDOMEvents: function() {
        L.DomEvent.addListener(this.options.styleEditorOptions.map, 'click', this.hideSelectInput, this);
        L.DomEvent.addListener(this.options.styleEditorDiv, 'click', this.hideSelectInput, this);
    },

    clearForm: function() {
        this.options.styleEditorOptions.markerForm.hide();
        this.options.styleEditorOptions.geometryForm.hide();
    },

    createMarkerForm: function () {
        var markerDiv = L.DomUtil.create(
            'div', 'leaflet-styleeditor-interior-marker',this.options.styleEditorInterior);
        this.options.styleEditorOptions.markerForm.create(markerDiv);
    },

    createGeometryForm: function () {
        var markerDiv = L.DomUtil.create(
            'div', 'leaflet-styleeditor-interior-geometry',this.options.styleEditorInterior);
        this.options.styleEditorOptions.geometryForm.create(markerDiv);
    },

    showMarkerForm: function() {
        this.clearForm();
        this.options.styleEditorOptions.markerForm.show();
    },

    showGeometryForm: function() {
        this.clearForm();
        this.options.styleEditorOptions.geometryForm.show();
    },

    fireChangeEvent: function(element){
        this.options.styleEditorOptions.map.fireEvent('styleeditor:changed', element);
    }
});

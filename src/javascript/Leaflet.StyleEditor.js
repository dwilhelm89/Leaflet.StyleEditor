L.Control.StyleEditor = L.Control.extend({

    options: {
        position: 'topleft',
        enabled: false,
        colorRamp: ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'],
        markerApi: 'http://api.tiles.mapbox.com/v3/marker/',
        markers: ['circle-stroked', 'circle', 'square-stroked', 'square', 'triangle-stroked', 'triangle', 'star-stroked', 'star', 'cross', 'marker-stroked', 'marker', 'religious-jewish', 'religious-christian', 'religious-muslim', 'cemetery', 'rocket', 'airport', 'heliport', 'rail', 'rail-metro', 'rail-light', 'bus', 'fuel', 'parking', 'parking-garage', 'airfield', 'roadblock', 'ferry', 'harbor', 'bicycle', 'park', 'park2', 'museum', 'lodging', 'monument', 'zoo', 'garden', 'campsite', 'theatre', 'art-gallery', 'pitch', 'soccer', 'america-football', 'tennis', 'basketball', 'baseball', 'golf', 'swimming', 'cricket', 'skiing', 'school', 'college', 'library', 'post', 'fire-station', 'town-hall', 'police', 'prison', 'embassy', 'beer', 'restaurant', 'cafe', 'shop', 'fast-food', 'bar', 'bank', 'grocery', 'cinema', 'pharmacy', 'hospital', 'danger', 'industrial', 'warehouse', 'commercial', 'building', 'place-of-worship', 'alcohol-shop', 'logging', 'oil-well', 'slaughterhouse', 'dam', 'water', 'wetland', 'disability', 'telephone', 'emergency-telephone', 'toilets', 'waste-basket', 'music', 'land-use', 'city', 'town', 'village', 'farm', 'bakery', 'dog-park', 'lighthouse', 'clothing-store', 'polling-place', 'playground', 'entrance', 'heart', 'london-underground', 'minefield', 'rail-underground', 'rail-above', 'camera', 'laundry', 'car', 'suitcase', 'hairdresser', 'chemist', 'mobilephone', 'scooter'],
        editlayers: [],
        layerGroups: [],
        openOnLeafletDraw: true,
        showTooltip: true,
        strings: {
            tooltip: 'Click on the element you want to style',
            tooltipNext: 'Choose another element you want to style'
        },
        useGrouping: true
    },

    onAdd: function(map) {
        this.options.map = map;
        return this.createUi();
    },

    createUi: function() {
        var controlDiv = this.options.controlDiv = L.DomUtil.create('div', 'leaflet-control-styleeditor');
        var controlUI = this.options.controlUI = L.DomUtil.create('div', 'leaflet-control-styleeditor-interior', controlDiv);
        controlUI.title = 'Style Editor';

        var styleEditorDiv = this.options.styleEditorDiv = L.DomUtil.create('div', 'leaflet-styleeditor', this.options.map._container);
        this.options.styleEditorHeader = L.DomUtil.create('div', 'leaflet-styleeditor-header', styleEditorDiv);
        this.options.styleEditorUi = L.DomUtil.create('div', 'leaflet-styleeditor-interior', styleEditorDiv);

        this.addDomEvents();
        this.addLeafletDrawEvents();
        this.addButtons();

        return controlDiv;
    },

    addDomEvents: function() {
        L.DomEvent.addListener(this.options.controlDiv, 'click', function(e) { this.clickHandler(e); e.stopPropagation(); }, this);
        L.DomEvent.addListener(this.options.controlDiv, 'dblclick', function(e) { e.stopPropagation(); }, this);
        L.DomEvent.addListener(this.options.styleEditorDiv, 'click', L.DomEvent.stopPropagation);
        L.DomEvent.addListener(this.options.styleEditorDiv, 'mouseenter', this.disableLeafletActions, this);
        L.DomEvent.addListener(this.options.styleEditorDiv, 'mouseleave', this.enableLeafletActions, this);
    },

    addLeafletDrawEvents: function() {
        if (!this.options.openOnLeafletDraw) {
        	return;
        }
        if (!L.Control.Draw) {
        	return;
        }

        this.options.map.on('draw:created', function(layer) {
            this.initChangeStyle({
                "target": layer.layer
            });
        }, this);
    },

    addButtons: function() {
        var nextBtn = L.DomUtil.create('button', 'leaflet-styleeditor-button styleeditor-nextBtn', this.options.styleEditorHeader);
        nextBtn.title = this.options.strings.tooltipNext;

        L.DomEvent.addListener(nextBtn, 'click', function(e) {
        	this.hideEditor();
        	this.createTooltip();

        	e.stopPropagation();
        }, this);
    },

    clickHandler: function(e) {
        this.options.enabled = !this.options.enabled;

        if (this.options.enabled) {
            this.enable();
        } else {
            L.DomUtil.removeClass(this.options.controlUI, 'enabled');
            this.disable();
        }
    },

    disableLeafletActions: function() {
    	var m = this.options.map;

        m.dragging.disable();
        m.touchZoom.disable();
        m.doubleClickZoom.disable();
        m.scrollWheelZoom.disable();
        m.boxZoom.disable();
        m.keyboard.disable();
    },

    enableLeafletActions: function() {
    	var m = this.options.map;

        m.dragging.enable();
        m.touchZoom.enable();
        m.doubleClickZoom.enable();
        m.scrollWheelZoom.enable();
        m.boxZoom.enable();
        m.keyboard.enable();
    },

    enable: function() {
        L.DomUtil.addClass(this.options.controlUI, "enabled");
        this.options.map.eachLayer(this.addEditClickEvents, this);
        this.createTooltip();
    },

    disable: function() {
        this.options.editlayers.forEach(this.removeEditClickEvents, this);
        this.options.editlayers = [];
        this.options.layerGroups = [];
        this.hideEditor();
        this.removeTooltip();
    },

    addEditClickEvents: function(layer) {
    	if (this.options.useGrouping && layer instanceof L.LayerGroup) {
    		this.options.layerGroups.push(layer);
    	} else if (layer instanceof L.Marker || layer instanceof L.Path) {
            var evt = layer.on('click', this.initChangeStyle, this);
            this.options.editlayers.push(evt);
        }
    },

    removeEditClickEvents: function(layer) {
        layer.off('click', this.initChangeStyle, this);
    },

    hideEditor: function() {
        L.DomUtil.removeClass(this.options.styleEditorDiv, 'editor-enabled');
    },

    showEditor: function() {
        var editorDiv = this.options.styleEditorDiv;
        if (!L.DomUtil.hasClass(editorDiv, 'editor-enabled')) {
            L.DomUtil.addClass(editorDiv, 'editor-enabled');
        }
    },

    initChangeStyle: function(e) {
        this.options.currentElement = (this.options.useGrouping) ? this.getMatchingElement(e) : e;

        this.showEditor();
        this.removeTooltip();

        var layer = e.target;
        if (layer instanceof L.Marker) {
            // marker
            this.createMarkerForm();
        } else {
        	// layer with of type L.GeoJSON or L.Path (polyline, polygon, ...)
            this.createGeometryForm();
        }
    },

    createGeometryForm: function() {
        var styleForms = new L.StyleForms({
            colorRamp: this.options.colorRamp,
            styleEditorUi: this.options.styleEditorUi,
            currentElement: this.options.currentElement
        });

        styleForms.createGeometryForm();
    },

    createMarkerForm: function() {
        var styleForms = new L.StyleForms({
            colorRamp: this.options.colorRamp,
            styleEditorUi: this.options.styleEditorUi,
            currentElement: this.options.currentElement,
            markerApi: this.options.markerApi,
            markers: this.options.markers
        });

        styleForms.createMarkerForm();
    },

    createTooltip: function() {
        if (!this.options.showTooltip) {
        	return;
        }

        var tooltipWrapper = L.DomUtil.create('div', 'leaflet-styleeditor-tooltip-wrapper', document.body);
        var tooltip = this.options.tooltip = L.DomUtil.create('div', 'leaflet-styleeditor-tooltip', tooltipWrapper);
        tooltip.innerHTML = this.options.strings.tooltip;
    },

    getMatchingElement: function(e) {
    	var group = null,
    		layer = e.target;

        for (i = 0; i < this.options.layerGroups.length; ++i) {
        	group = this.options.layerGroups[i];
        	if (group && layer != group && group.hasLayer(layer)) {
        		// we use the opacity style to check for correct object
        		if (!group.options || !group.options.opacity) {
        			group.options = layer.options;

        			// special handling for layers... we pass the setIcon function
        			if (layer.setIcon) {
        				group.setIcon = function(icon) {
        					group.eachLayer(function(layer) {
        						if (layer instanceof L.Marker) {
        							layer.setIcon(icon);
        						}
        					});
        				};
        			}
        		}

        		return this.getMatchingElement({
        			target: group
        		});
        	}
        }

        return e;
    },

    removeTooltip: function() {
        if (this.options.tooltip && this.options.tooltip.parentNode) {
            this.options.tooltip.parentNode.removeChild(this.options.tooltip);
        }
    }

});

L.control.styleEditor = function(options) {
    return new L.Control.StyleEditor(options);
};

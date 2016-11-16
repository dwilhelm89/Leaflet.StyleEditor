/*
Style options based on:
- path: http://leafletjs.com/reference.html#path-options
- icon: http://leafletjs.com/reference.html#icon

Markers from:
- Maki Markers from mapbox: https://www.mapbox.com/maki/
*/

L.StyleForms = L.Class.extend({
    options: {
        currentMarkerStyle: {
            size: 'm',
            color: '48a'
        }
    },

    initialize: function(options) {
        L.setOptions(this, options);
        this.createIconUrl();
        this.createMarkerColor();
        this.createMarkerSize();
        this.createColor();
        this.createOpacity();
        this.createStroke();
        this.createFillColor();
        this.createFillOpacity();

        this.addDOMEvents();
    },

    addDOMEvents: function() {
        L.DomEvent.addListener(this.options.map, 'click', this.hideSelectInput, this);
        L.DomEvent.addListener(this.options.styleEditorDiv, 'click', this.hideSelectInput, this);
    },

    clearForm: function() {
        var styleEditorUi = this.options.styleEditorUi;
        this.hideSelectInput();

        Object.keys(styleEditorUi).forEach(function(key) {
            var element = styleEditorUi[key];
            if (element.innerHTML) {
                this.hideElement(element);
            }
        }, this);
    },

    showGeometryForm: function(currentElement) {
        this.clearForm();

        this.options.currentElement = currentElement;

        var styleEditorUi = this.options.styleEditorUi;
        var geometryOptions = currentElement.target.options;
        if (geometryOptions.opacity)
            styleEditorUi.opacityInput.value = geometryOptions.opacity;
        else
            styleEditorUi.opacityInput.value = 1;

        if (geometryOptions.fillOpacity)
            styleEditorUi.fillOpacityInput.value = geometryOptions.fillOpacity;
        else
            styleEditorUi.fillOpacityInput.value = 0.2;

        this.showElement(styleEditorUi.colorDiv);
        this.showElement(styleEditorUi.opacityDiv);
        this.showElement(styleEditorUi.lineStrokeDiv);

        var t = currentElement.target;
        if (t instanceof L.Polygon || t instanceof L.LayerGroup ||
          (t instanceof L.Circle && ! (t instanceof L.CircleMarker))) {
            this.showElement(styleEditorUi.fillColorDiv);
            this.showElement(styleEditorUi.fillOpacityDiv);
        }
    },

    showMarkerForm: function(currentElement) {
        this.clearForm();

        this.options.currentElement = currentElement;

        var iconOptions = currentElement.target.options.icon.options;
        var markerStyle = this.options.currentMarkerStyle;
        if(iconOptions.iconColor)
            markerStyle.color = iconOptions.iconColor;
        if(iconOptions.icon)
            markerStyle.icon = iconOptions.icon;
        if(iconOptions.iconSizeChar)
            markerStyle.size = iconOptions.iconSizeChar;

        var styleEditorUi = this.options.styleEditorUi;
        this.showElement(styleEditorUi.iconDiv);
        this.showElement(styleEditorUi.markerColorDiv);
        this.showElement(styleEditorUi.sizeDiv);
        this.styleSelectInput();
    },

    setNewMarker: function() {
        var markerStyle = this.options.currentMarkerStyle;

        if (markerStyle.size && markerStyle.icon && markerStyle.color) {
            var iconSize;
            switch (markerStyle.size) {
                case 's':
                    iconSize = [20, 50];
                    break;
                case 'm':
                    iconSize = [30, 70];
                    break;
                case 'l':
                    iconSize = [35, 90];
                    break;
            }

            var newIcon = new L.Icon({
                iconUrl: this.getIconSrc(),
                iconSize: iconSize,
                iconSizeChar: markerStyle.size,
                iconColor: markerStyle.color,
                icon: markerStyle.icon,
                iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
                popupAnchor: [0, -iconSize[1] / 2]
            });
            var currentElement = this.options.currentElement.target;
            currentElement.setIcon(newIcon);
            this.fireChangeEvent(currentElement);
        }
        this.hideSelectInput();
        this.styleSelectInput();
    },

    showElement: function(element) {
        if (element)
            L.DomUtil.removeClass(element, 'leaflet-styleeditor-hidden');
    },

    hideElement: function(element) {
        if (element)
            L.DomUtil.addClass(element, 'leaflet-styleeditor-hidden');
    },

    createIconUrl: function() {
        var iconDiv = this.options.styleEditorUi.iconDiv;

        var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', iconDiv);
        label.innerHTML = 'Icon:';

        this.createSelectInput(iconDiv, function(e) {
            var value = e.target.getAttribute('value');

            this.options.selectBoxImage.setAttribute('value', value);
            this.options.currentMarkerStyle.icon = value;

            this.setNewMarker();
        }.bind(this), this.options.markers);
    },

    createMarkerColor: function() {
        var markerColorDiv = this.options.styleEditorUi.markerColorDiv;

        var colorUi = this.options.colorUi = L.DomUtil.create('div', 'leaflet-styleeditor-ui-element', markerColorDiv);

        var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', colorUi);
        label.innerHTML = 'Color:';

        this.createColorPicker(markerColorDiv, function(e) {
            var color = this.rgbToHex(e.target.style.backgroundColor);
            this.options.currentMarkerStyle.color = color.replace("#", "");
            this.setNewMarker();
        }.bind(this));
    },

    createMarkerSize: function() {
        var sizeDiv = this.options.styleEditorUi.sizeDiv;

        var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', sizeDiv);
        label.innerHTML = 'Size:';

        var s = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-small', this.options.styleEditorUi.sizeDiv);
        var m = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-medium', this.options.styleEditorUi.sizeDiv);
        var l = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-large', this.options.styleEditorUi.sizeDiv);

        L.DomEvent.addListener(s, 'click', function() {
            this.options.currentMarkerStyle.size = 's';
            this.setNewMarker();
        }, this);

        L.DomEvent.addListener(m, 'click', function() {
            this.options.currentMarkerStyle.size = 'm';
            this.setNewMarker();
        }, this);

        L.DomEvent.addListener(l, 'click', function() {
            this.options.currentMarkerStyle.size = 'l';
            this.setNewMarker();
        }, this);
    },

    createColor: function() {
        var colorDiv = this.options.styleEditorUi.colorDiv;

        var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', colorDiv);
        label.innerHTML = 'Color:';

        this.createColorPicker(colorDiv, function(e) {
            var color = this.rgbToHex(e.target.style.backgroundColor);
            this.setStyle('color', color);
        }.bind(this));
    },

    createStroke: function() {
        var lineStrokeDiv = this.options.styleEditorUi.lineStrokeDiv;

        var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', lineStrokeDiv);
        label.innerHTML = 'Line Stroke:';

        var stroke1 = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', lineStrokeDiv);
        stroke1.style.backgroundPosition = "0px -75px";

        var stroke2 = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', lineStrokeDiv);
        stroke2.style.backgroundPosition = "0px -95px";

        var stroke3 = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', lineStrokeDiv);
        stroke3.style.backgroundPosition = "0px -115px";

        L.DomUtil.create('br', 'bla', lineStrokeDiv);

        L.DomEvent.addListener(stroke1, 'click', function(e) {
            this.setStyle('dashArray', '1');
        }, this);
        L.DomEvent.addListener(stroke2, 'click', function(e) {
            this.setStyle('dashArray', '10,10');
        }, this);
        L.DomEvent.addListener(stroke3, 'click', function(e) {
            this.setStyle('dashArray', '15, 10, 1, 10');
        }, this);
    },

    createOpacity: function() {
        var opacityDiv = this.options.styleEditorUi.opacityDiv;

        var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', opacityDiv);
        label.innerHTML = 'Opacity:';

        this.options.styleEditorUi.opacityInput = this.createNumberInput(opacityDiv, function(e) {
            var value = e.target.value;
            this.setStyle('opacity', value);
        }.bind(this), 0.7, 0, 1, 0.1);
    },

    createFillColor: function() {
        var fillColorDiv = this.options.styleEditorUi.fillColorDiv;

        var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', fillColorDiv);
        label.innerHTML = 'Fill Color:';

        this.createColorPicker(fillColorDiv, function(e) {
            var color = this.rgbToHex(e.target.style.backgroundColor);
            this.setStyle('fillColor', color);
        }.bind(this));
    },

    createFillOpacity: function() {
        var fillOpacityDiv = this.options.styleEditorUi.fillOpacityDiv;

        var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', fillOpacityDiv);
        label.innerHTML = 'Fill Opacity:';

        this.options.styleEditorUi.fillOpacityInput = this.createNumberInput(fillOpacityDiv, function(e) {
            var value = e.target.value;
            this.setStyle('fillOpacity', value);
        }.bind(this), 0.4, 0, 1, 0.1);
    },

    createColorPicker: function(parentDiv, callback) {
        var colorPickerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-colorpicker', parentDiv);

        this.options.colorRamp.forEach(function(color) {
            var elem = L.DomUtil.create('div', 'leaflet-styleeditor-color', colorPickerDiv);
            elem.style.backgroundColor = color;

            L.DomEvent.addListener(elem, 'click', function(e) { e.stopPropagation(); callback(e); });
        }, this);

        L.DomUtil.create('br', '', parentDiv);
        L.DomUtil.create('br', '', parentDiv);

        return colorPickerDiv;
    },

    createNumberInput: function(parentDiv, callback, value, min, max, step) {
        var numberInput = L.DomUtil.create('input', 'leaflet-styleeditor-input', parentDiv);
        numberInput.setAttribute('type', 'number');
        numberInput.setAttribute('value', value);
        numberInput.setAttribute('min', min);
        numberInput.setAttribute('max', max);
        numberInput.setAttribute('step', step);

        L.DomEvent.addListener(numberInput, 'change', function(e) { e.stopPropagation(); callback(e); });
        L.DomEvent.addListener(numberInput, 'keyup', function(e) { e.stopPropagation(); callback(e); });

        L.DomUtil.create('br', '', parentDiv);
        L.DomUtil.create('br', '', parentDiv);

        return numberInput;
    },

    createSelectInput: function(parentDiv, callback, options) {
        var selectBox = L.DomUtil.create('button', 'leaflet-styleeditor-select', parentDiv);
        var selectBoxImage = this.options.selectBoxImage = L.DomUtil.create('img', 'leaflet-styleeditor-select-image', selectBox);

        var selectOptionWrapper = this.options.selectOptionWrapper =
            L.DomUtil.create('ul', 'leaflet-styleeditor-select-option-wrapper leaflet-styleeditor-hidden', parentDiv);
        selectOptionWrapper.id = 'leaflet-styleeditor-select-option-wrapper';

        L.DomEvent.addListener(selectBox, 'click', this.toggleSelectInput, this);

        this.options.selectImages = [];

        options.forEach(function(option) {
            var selectOption = L.DomUtil.create('li', 'leaflet-styleeditor-select-option', selectOptionWrapper);
            var selectImage = L.DomUtil.create('img', 'leaflet-styleeditor-select-option-image', selectOption);
            selectImage.setAttribute('value', option);
            this.options.selectImages.push(selectImage);
        }, this);

        L.DomEvent.addListener(selectOptionWrapper, 'click', function(e) {
            e.stopPropagation();
            if (e.target.nodeName === 'UL')
                return;

            var target = e.target;
            if (e.target.nodeName === 'LI')
                target = e.target.childNodes[0];

            callback({
              'target': target
            });
        }, this);

        return selectBox;
    },

    styleSelectInput: function() {
        var selectBoxImage = this.options.selectBoxImage;
        if(this.options.currentElement) {
            var selectBoxImageValue  = this.options.currentElement.target.options.icon.options.icon;
            if(selectBoxImageValue) {
                selectBoxImage.src = this.getIconSrc('s', selectBoxImageValue);
                this.showElement(selectBoxImage);
            } else
              this.hideElement(selectBoxImage);
        } else {
            this.hideElement(selectBoxImage);
        }

        var selectImages = this.options.selectImages;
        selectImages.forEach(function(selectImage) {
            selectImage.src = this.getIconSrc('s', selectImage.getAttribute('value'));
        }, this);

        this.hideSelectInput();
    },

    toggleSelectInput: function() {
        var selectOptionWrapper = this.options.selectOptionWrapper;

        if (L.DomUtil.hasClass(selectOptionWrapper, 'leaflet-styleeditor-hidden'))
            this.showElement(selectOptionWrapper);
        else
            this.hideElement(selectOptionWrapper);
    },

    hideSelectInput: function(e) {
        if (e && e.target && e.target.tagName && L.DomUtil.hasClass(e.target, 'leaflet-styleeditor-select'))
          return;

        var selectOptionWrapper = this.options.selectOptionWrapper;
        if (!selectOptionWrapper)
            selectOptionWrapper = L.DomUtil.get('leaflet-styleeditor-select-option-wrapper');
        this.hideElement(selectOptionWrapper);
    },

    getIconSrc: function(size, icon) {
        var markerStyle = this.options.currentMarkerStyle;
        if (!icon)
            icon = markerStyle.icon;
        if (!size)
            size = markerStyle.size;
        return this.options.markerApi + 'pin-' + size + '-' + icon+ '+' + markerStyle.color + '@2x.png'
    },

    setStyle: function(option, value) {
        var newStyle = {};
        newStyle[option] = value;
        var currentElement = this.options.currentElement.target;
        currentElement.setStyle(newStyle);
        this.fireChangeEvent(currentElement);
    },

    fireChangeEvent: function(element){
        this.options.map.fireEvent('styleeditor:changed', element);
    },

    componentToHex: function(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    },

    rgbToHex: function(rgb) {
        rgb = rgb.substring(4).replace(")", "").split(",");
        return "#" + this.componentToHex(parseInt(rgb[0], 10)) + this.componentToHex(parseInt(rgb[1], 10)) + this.componentToHex(parseInt(rgb[2], 10));
    }

});

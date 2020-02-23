var leafletstyleeditor =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(1);
const StyleEditorClass_1 = __webpack_require__(2);
const StyleEditorControl_1 = __webpack_require__(3);
__webpack_require__(6);
L.StyleEditor = StyleEditorClass_1.StyleEditorClass;
L.styleEditor = function () { return new StyleEditorClass_1.StyleEditorClass(); };
L.Control.StyleEditor = StyleEditorControl_1.StyleEditorControl;
L.control.styleEditor = function (options) { return new StyleEditorControl_1.StyleEditorControl(options); };
exports.default = L;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class StyleEditorClass extends L.Class {
}
exports.StyleEditorClass = StyleEditorClass;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StyleForm_1 = __webpack_require__(4);
const marker_1 = __webpack_require__(7);
const form_1 = __webpack_require__(18);
const _1 = __importDefault(__webpack_require__(0));
const Util_1 = __webpack_require__(5);
const DefaultOptions = {
    position: 'topleft',
    colorRamp: ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad',
        '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b',
        '#bdc3c7', '#7f8c8d'],
    defaultColor: null,
    markerType: marker_1.DefaultMarker,
    markers: null,
    defaultMarkerIcon: null,
    defaultMarkerColor: null,
    markerForm: form_1.MarkerForm,
    geometryForm: form_1.GeometryForm,
    ignoreLayerTypes: [],
    forms: {},
    events: [],
    openOnLeafletDraw: true,
    openOnLeafletEditable: true,
    showTooltip: true,
    strings: {
        cancel: 'Cancel',
        cancelTitle: 'Cancel Styling',
        tooltip: 'Click on the element you want to style',
        tooltipNext: 'Choose another element you want to style'
    },
    useGrouping: true,
    styleEditorEventPrefix: 'styleeditor:',
};
class StyleEditorControl extends _1.default.Control {
    constructor(options) {
        const opt = Object.assign(Object.assign({}, DefaultOptions), options);
        super(opt);
        this.options = opt;
    }
    onAdd(map) {
        // create Control element
        Util_1.Util.createInstance(map, this.options);
        const controlUI = this.controlUI = _1.default.DomUtil.create('div', 'leaflet-control-styleeditor leaflet-control leaflet-bar');
        const controlDiv = _1.default.DomUtil.create('a', 'leaflet-control-styleeditor-interior', controlUI);
        controlDiv.title = 'Style Editor';
        const cancelUI = this.cancelUI = _1.default.DomUtil.create('div', 'leaflet-control-styleeditor-cancel leaflet-styleeditor-hidden', controlUI);
        cancelUI.innerHTML = this.options.strings.cancel;
        cancelUI.title = this.options.strings.cancelTitle;
        const editorUI = this.editorUI = _1.default.DomUtil.create('div', 'leaflet-styleeditor', map.getContainer());
        const styleEditorHeader = _1.default.DomUtil.create('div', 'leaflet-styleeditor-header', editorUI);
        const styleEditorInterior = _1.default.DomUtil.create('div', 'leaflet-styleeditor-interior', editorUI);
        const buttonNext = _1.default.DomUtil.create('button', 'leaflet-styleeditor-button styleeditor-nextBtn', styleEditorHeader);
        buttonNext.title = this.options.strings.tooltipNext;
        const tooltipWrapper = _1.default.DomUtil.create('div', 'leaflet-styleeditor-tooltip-wrapper', map.getContainer());
        const tooltip = this.tooltipUI = _1.default.DomUtil.create('div', 'leaflet-styleeditor-tooltip', tooltipWrapper);
        tooltip.innerHTML = this.options.strings.tooltip;
        // do not propagate scrolling events on the ui to the map
        _1.default.DomEvent.disableScrollPropagation(controlUI);
        _1.default.DomEvent.disableScrollPropagation(editorUI);
        _1.default.DomEvent.disableScrollPropagation(controlUI);
        _1.default.DomEvent.disableScrollPropagation(cancelUI);
        _1.default.DomEvent.disableScrollPropagation(buttonNext);
        // do not propagate click events on the ui to the map
        _1.default.DomEvent.disableClickPropagation(controlUI);
        _1.default.DomEvent.disableClickPropagation(editorUI);
        _1.default.DomEvent.disableClickPropagation(controlUI);
        _1.default.DomEvent.disableClickPropagation(cancelUI);
        _1.default.DomEvent.disableClickPropagation(buttonNext);
        // toggle UI visibility
        _1.default.DomEvent.on(controlUI, 'click', this.toggle);
        // select next layer to style
        _1.default.DomEvent.on(buttonNext, 'click', this.onNext);
        this.addEventListeners(map);
        new StyleForm_1.StyleForm(map, editorUI, styleEditorInterior, new this.options.markerForm(), new this.options.geometryForm());
        return controlUI;
    }
    addEventListeners(map) {
        this.options.events.forEach(event => map.on(event, this.onEvent));
    }
    onEvent(event) {
        // TODO
    }
    onNext(event) {
        this.hideEditor();
        if (_1.default.DomUtil.hasClass(this.controlUI, 'enabled')) {
            this.showTooltip();
        }
        event.stopPropagation();
    }
    toggle() {
        if (_1.default.DomUtil.hasClass(this.controlUI, 'enabled')) {
            this.disable();
        }
        else {
            this.enable();
        }
    }
    enable(layer) {
        if (this.layerIsIgnored(layer)) {
            return;
        }
        _1.default.DomUtil.addClass(this.controlUI, 'enabled');
        this.map.eachLayer(this.addEditClickEvents, this);
        this.showCancelButton();
        this.showTooltip();
        if (layer !== undefined) {
            if (this.isEnabled()) {
                this.removeIndicators();
            }
            //this.initChangeStyle({ target: layer })
        }
    }
    removeIndicators() {
        const children = this.map.getPanes().markerPane.children;
        for (let index = 0; index < children.length; index++) {
            const element = children[index];
            _1.default.DomUtil.removeClass(element, 'leaflet-styleeditor-marker-selected');
        }
    }
    addEditClickEvents(layer) {
        if (this.layerIsIgnored(layer)) {
            return;
        }
        if (this.options.useGrouping && layer instanceof _1.default.LayerGroup) {
            //this.options._layerGroups.push(layer)
        }
        else if (layer instanceof _1.default.Marker || layer instanceof _1.default.Path) {
            //let evt = layer.on('click', this.initChangeStyle, this)
            //this.options._editLayers.push(evt)
        }
    }
    layerIsIgnored(layer) {
        if (layer === undefined) {
            return false;
        }
        return this.options.ignoreLayerTypes.some(layerType => layer.styleEditor && layer.styleEditor.type.toUpperCase() === layerType.toUpperCase());
    }
    isEnabled() {
        return _1.default.DomUtil.hasClass(this.controlUI, 'enabled');
    }
    disable() {
        if (this.isEnabled()) {
            /*      this.options._editLayers.forEach(this.removeEditClickEvents, this)
                  this.options._editLayers = []
                  this.options._layerGroups = [] */
            this.hideEditor();
            this.hideCancelButton();
            this.hideTooltip();
            _1.default.DomUtil.removeClass(this.controlUI, 'enabled');
        }
    }
    hideEditor() {
        if (_1.default.DomUtil.hasClass(this.controlUI, 'editor-enabled')) {
            this.removeIndicators();
            _1.default.DomUtil.removeClass(this.controlUI, 'editor-enabled');
            this.fireEvent('hidden');
        }
    }
    showCancelButton() {
        _1.default.DomUtil.removeClass(this.cancelUI, 'leaflet-styleeditor-hidden');
    }
    hideCancelButton() {
        _1.default.DomUtil.addClass(this.cancelUI, 'leaflet-styleeditor-hidden');
    }
    showEditor() {
        if (!_1.default.DomUtil.hasClass(this.controlUI, 'editor-enabled')) {
            _1.default.DomUtil.addClass(this.controlUI, 'editor-enabled');
            this.fireEvent('visible');
        }
    }
    showTooltip() {
        _1.default.DomUtil.addClass(this.tooltipUI, 'leaflet-styleeditor-hidden');
    }
    hideTooltip() {
        _1.default.DomUtil.removeClass(this.tooltipUI, 'leaflet-styleeditor-hidden');
    }
    fireEvent(eventName) {
    }
}
exports.StyleEditorControl = StyleEditorControl;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(5);
class StyleForm {
    constructor(map, styleEditorDiv, styleEditorInterior, markerForm, geometryForm) {
        this.util = Util_1.Util.getInstance();
        this.map = map;
        this.styleEditorDiv = styleEditorDiv;
        this.styleEditorInterior = styleEditorInterior;
        this.markerForm = markerForm;
        this.geometryForm = geometryForm;
        this.createMarkerForm();
        this.createGeometryForm();
        this.addDOMEvents();
    }
    addDOMEvents() {
        L.DomEvent.addListener(this.map, 'click', this.lostFocus, this);
        L.DomEvent.addListener(this.styleEditorDiv, 'click', this.lostFocus, this);
    }
    clearForm() {
        this.markerForm.hide();
        this.geometryForm.hide();
    }
    createMarkerForm() {
        let markerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-marker', this.styleEditorInterior);
        this.markerForm.create(markerDiv);
    }
    createGeometryForm() {
        let markerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-geometry', this.styleEditorInterior);
        this.geometryForm.create(markerDiv);
    }
    showMarkerForm() {
        this.clearForm();
        this.markerForm.show();
    }
    showGeometryForm() {
        this.clearForm();
        this.geometryForm.show();
    }
    fireChangeEvent(element) {
        this.util.fireChangeEvent(element);
    }
    lostFocus(e) {
        let parent = e.target;
        for (let i = 0; i < 10; i++) {
            if (!parent) {
                break;
            }
            if (!!parent.className && L.DomUtil.hasClass(parent, 'leaflet-styleeditor-interior')) {
                return;
            }
            parent = parent.parentNode;
        }
        this.markerForm.lostFocus();
        this.geometryForm.lostFocus();
    }
}
exports.StyleForm = StyleForm;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper functions used throuhgout the project
 */
class UtilOptions {
}
exports.UtilOptions = UtilOptions;
class Util {
    constructor(map, options) {
        this.map = map;
        this.options = options;
    }
    static createInstance(map, options) {
        Util.instance = new Util(map, options);
    }
    static getInstance() {
        return Util.instance;
    }
    // TODO element type
    fireEvent(eventName, element) {
        this.map.fireEvent(this.options.styleEditorEventPrefix + eventName, element);
    }
    // TODO element type
    /** fire an event if Leaflet.StyleEditor changed something */
    fireChangeEvent(element) {
        this.fireEvent('changed', element);
    }
    /** hide the given element */
    hideElement(element) {
        if (element) {
            L.DomUtil.addClass(element, 'leaflet-styleeditor-hidden');
        }
    }
    /** convert rgb to hex of a color
     * @param {string} rgb - rgb representation of the color
     * @param {boolean} noHash - define if return value should not include hash
     */
    rgbToHex(rgb, noHash = false) {
        if (!rgb) {
            rgb = this.options.defaultColor;
            if (rgb.indexOf('#') !== 0) {
                rgb = '#' + rgb;
            }
        }
        if (rgb.indexOf('#') === 0) {
            if (noHash) {
                rgb.replace('#', '');
            }
            return rgb;
        }
        if (rgb.indexOf('(') < 0) {
            return '#' + rgb;
        }
        let rgbArray = rgb.substring(4).replace(')', '').split(',');
        let withoutHash = this._componentToHex(parseInt(rgbArray[0], 10)) + this._componentToHex(parseInt(rgbArray[1], 10)) +
            this._componentToHex(parseInt(rgbArray[2], 10));
        if (noHash) {
            return withoutHash;
        }
        return '#' + withoutHash;
    }
    /** get element selected to be styled */
    getCurrentElement() {
        /**if (!this.styleEditor.currentElement) {
          return null
        }
        if (this.styleEditor.currentElement.target !== undefined) {
          return this.styleEditor.currentElement.target
        }
        return this.styleEditor.currentElement */
    }
    /** set which element is selected to be styled */
    setCurrentElement(currentElement) {
        /*this.styleEditor.currentElement.target = currentElement*/
    }
    /** get current style of current element */
    getStyle(currentElement, option) {
        let style = currentElement.options[option];
        if (style) {
            return style;
        }
        return null;
    }
    /** set new style to current element */
    setStyle(currentElement, option, value) {
        if (currentElement instanceof L.Marker) {
            //this.styleEditor.options.markerType.setStyle(currentElement, option, value)
        }
        else {
            let newStyle = {};
            newStyle[option] = value;
            currentElement.setStyle(newStyle);
        }
        this.fireChangeEvent(currentElement);
    }
    /** show hidden element */
    showElement(element) {
        if (element) {
            L.DomUtil.removeClass(element, 'leaflet-styleeditor-hidden');
        }
    }
    /** helper function to convert color to hex */
    _componentToHex(color) {
        let hex = color.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }
    /** get the markers for a specific color **/
    getMarkersForColor(color) {
        color = this.rgbToHex(color);
        let markers = []; // TODOthis.styleEditor.options.markerType.options.markers
        let controlMarkers = []; // TODO this.styleEditor.options.markers
        if (!Array.isArray(markers)) {
            // if color is specified return specific markers
            if (Object.keys(markers).includes(color)) {
                markers = markers[color];
            }
            else {
                markers = markers['default'];
            }
        }
        if (controlMarkers !== null) {
            if (!Array.isArray(controlMarkers)) {
                let keys = Object.keys(controlMarkers);
                if (keys.includes(color)) {
                    controlMarkers = controlMarkers[color];
                }
                else if (keys.includes('default')) {
                    controlMarkers = controlMarkers['default'];
                }
                else {
                    controlMarkers = markers;
                }
            }
            return markers.filter((n) => controlMarkers.includes(n));
        }
        return markers;
    }
    /** get default marker for specific color **/
    getDefaultMarkerForColor(color) {
        color = this.rgbToHex(color);
        let markers = this.getMarkersForColor(color);
        let defMarkers = [];
        let defaultMarker = undefined; //TODO this.styleEditor.options.defaultMarkerIcon
        if (defaultMarker !== null) {
            if (typeof defaultMarker === 'string') {
                defMarkers.push(defaultMarker);
            }
            if (Object.keys(defaultMarker).includes(color)) {
                defMarkers.push(defaultMarker[color]);
            }
        }
        defaultMarker = undefined; // TODO this.styleEditor.options.markerType.options.defaultMarkerIcon
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
}
exports.Util = Util;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Marker_1 = __webpack_require__(9);
exports.Marker = Marker_1.Marker;
const DefaultMarker_1 = __webpack_require__(8);
exports.DefaultMarker = DefaultMarker_1.DefaultMarker;
const GlyphiconMarker_1 = __webpack_require__(13);
exports.GlyphiconMarker = GlyphiconMarker_1.GlyphiconMarker;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Marker_1 = __webpack_require__(9);
const types_1 = __webpack_require__(12);
/**
 * The "old" marker style used by L.StyleEditor
 * used the mapbox API v3
 */
class DefaultMarker extends Marker_1.Marker {
    constructor() {
        super();
    }
    createMarkerIcon(iconOptions, iconClass) {
        if (!iconClass) {
            iconClass = '';
        }
        let iconSize = iconOptions.iconSize;
        return new L.Icon({
            iconUrl: this._getMarkerUrlForStyle(iconOptions),
            iconSize: iconOptions.iconSize.dimen,
            iconColor: iconOptions.iconColor,
            icon: iconOptions.icon,
            className: iconClass,
            iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
            popupAnchor: [0, -iconSize[1] / 2]
        });
    }
    createSelectHTML(parentUiElement, iconOptions, icon) {
        let tmpOptions = new types_1.IconOptions(types_1.Size.Small, icon, iconOptions.iconColor);
        parentUiElement.innerHTML = this.createMarkerIcon(tmpOptions, this.options.selectIconClass).createIcon().outerHTML;
    }
    _getMarkerUrlForStyle(iconOptions) {
        return this._getMarkerUrl(iconOptions.iconSize, iconOptions.iconColor, iconOptions.icon);
    }
    _getMarkerUrl(size, color, icon) {
        if (color.indexOf('#') === 0) {
            color = color.replace('#', '');
        }
        else {
            color = this.util.rgbToHex(color, true);
        }
        let url = 'https://api.tiles.mapbox.com/v3/marker/pin-' + size.name;
        if (icon) {
            url += '-' + icon;
        }
        return url + '+' + color + '.png';
    }
}
exports.DefaultMarker = DefaultMarker;
const markers = [
    'circle-stroked',
    'circle',
    'square-stroked',
    'square',
    'triangle-stroked', 'triangle',
    'star-stroked',
    'star',
    'cross',
    'marker-stroked',
    'marker',
    'religious-jewish',
    'religious-christian',
    'religious-muslim',
    'cemetery',
    'rocket',
    'airport',
    'heliport',
    'rail',
    'rail-metro',
    'rail-light',
    'bus',
    'fuel',
    'parking',
    'parking-garage',
    'airfield',
    'roadblock',
    'ferry',
    'harbor',
    'bicycle',
    'park',
    'park2',
    'museum',
    'lodging',
    'monument',
    'zoo',
    'garden',
    'campsite',
    'theatre',
    'art-gallery',
    'pitch',
    'soccer',
    'america-football',
    'tennis',
    'basketball',
    'baseball',
    'golf',
    'swimming',
    'cricket',
    'skiing',
    'school',
    'college',
    'library',
    'post',
    'fire-station',
    'town-hall',
    'police',
    'prison',
    'embassy',
    'beer',
    'restaurant',
    'cafe',
    'shop',
    'fast-food',
    'bar',
    'bank',
    'grocery',
    'cinema',
    'pharmacy',
    'hospital',
    'danger',
    'industrial',
    'warehouse',
    'commercial',
    'building',
    'place-of-worship',
    'alcohol-shop',
    'logging',
    'oil-well',
    'slaughterhouse',
    'dam',
    'water',
    'wetland',
    'disability',
    'telephone',
    'emergency-telephone',
    'toilets',
    'waste-basket',
    'music',
    'land-use',
    'city',
    'town',
    'village',
    'farm',
    'bakery',
    'dog-park',
    'lighthouse',
    'clothing-store',
    'polling-place',
    'playground',
    'entrance',
    'heart',
    'london-underground',
    'minefield',
    'rail-underground',
    'rail-above',
    'camera',
    'laundry',
    'car',
    'suitcase',
    'hairdresser',
    'chemist',
    'mobilephone',
    'scooter'
];


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(5);
const types_1 = __webpack_require__(12);
/**
 * The Base class for different markers
 */
class Marker {
    constructor() {
        this.util = Util_1.Util.getInstance();
        if (this.options.selectIconClass !== '' && !this.options.selectIconClass.startsWith('leaflet-styleeditor-select-image')) {
            this.options.selectIconClass = 'leaflet-styleeditor-select-image-' + this.options.selectIconClass;
        }
    }
    /** create new Marker and show it */
    setNewMarker(currentElement) {
        let newIcon = this._createMarkerIcon(currentElement);
        currentElement = currentElement.target;
        currentElement.setIcon(newIcon);
        if (currentElement instanceof L.LayerGroup) {
            currentElement.eachLayer(function (layer) {
                const layer2 = layer; // TODO find out where getElement comes from…
                L.DomUtil.addClass(layer2.getElement(), 'leaflet-styleeditor-marker-selected');
            });
        }
        else {
            L.DomUtil.addClass(currentElement.getElement(), 'leaflet-styleeditor-marker-selected');
        }
    }
    /** set styling options */
    setStyle(currentElement, styleOption, value) {
        if (styleOption !== 'icon') {
            styleOption = 'icon' + styleOption.charAt(0).toUpperCase() + styleOption.slice(1);
        }
        this.setIconOptions(currentElement, styleOption, value);
        this.setNewMarker(currentElement);
    }
    /** create HTML used to */
    createSelectHTML(parentUiElement, iconOptions, icon) { }
    /** get the current iconOptions
     *  if not set set them
     */
    getIconOptions(currentElement) {
        try {
            this.options.iconOptions = currentElement.target.options.icon.options;
        }
        catch (e) {
            // if a new marker is created it may be the currentItem is still set, but is no marker
        }
        if (Object.keys(this.options.iconOptions).length > 0) {
            return this.options.iconOptions;
        }
        this.options.iconOptions.iconColor = this._getDefaultMarkerColor();
        this.options.iconOptions.iconSize = types_1.Size.Small;
        this.options.iconOptions.icon = this.util.getDefaultMarkerForColor(this.options.iconOptions.iconColor);
        this.options.iconOptions = this._ensureMarkerIcon(this.options.iconOptions);
        return this.options.iconOptions;
    }
    resetIconOptions(currentElement) {
        Object.keys(this.getIconOptions(currentElement)).forEach((key) => this.setStyle(currentElement, key, this.options.iconOptions[key]));
    }
    setIconOptions(currentElement, key, value) {
        let iconOptions = this.getIconOptions(currentElement);
        iconOptions[key] = value;
    }
    /** call createMarkerIcon with the correct iconOptions */
    _createMarkerIcon(currentElement) {
        let iconOptions = this.getIconOptions(currentElement);
        return this.createMarkerIcon(iconOptions);
    }
    createMarkerIcon(iconOptions, iconClass) { }
    /** check that the icon set in the iconOptions exists
     *  else set default icon
     */
    _ensureMarkerIcon(iconOptions) {
        let markers = this.util.getMarkersForColor(iconOptions.iconColor);
        if (markers.includes(iconOptions.icon)) {
            return iconOptions;
        }
        iconOptions.icon = this.util.getDefaultMarkerForColor(iconOptions.iconColor);
        return iconOptions;
    }
    /** return default marker color
     *
     * will return the first of the following which is set and supported by the markers
     * 1. styleEditorOptions.defaultMarkerColor
     * 2. styleEditorOptions.defaultColor
     * 3. first color of the marker's colorRamp which is in the styleeditor.colorRamp
     * 4. first color of the marker's colorRamp
     * */
    _getDefaultMarkerColor() {
        let markerTypeColorRamp = this.options.colorRamp;
        let generalColorRamp = ["#000"]; // TODO this.styleEditor.options.colorRamp
        let intersectedColorRamp = [];
        if (typeof markerTypeColorRamp !== 'undefined' && markerTypeColorRamp !== null) {
            intersectedColorRamp = markerTypeColorRamp.filter((n) => generalColorRamp.includes(n));
            if (intersectedColorRamp.length === 0) {
                intersectedColorRamp = markerTypeColorRamp;
            }
        }
        else {
            intersectedColorRamp = generalColorRamp;
        }
        let color = "#000"; //TOOD this.styleEditor.options.defaultMarkerColor
        if (color !== null && intersectedColorRamp.includes(color)) {
            color = null;
        }
        if (color === null) {
            color = "#000"; // TODO this.styleEditor.options.defaultColor
            if (color !== null && !intersectedColorRamp.includes(color)) {
                color = null;
            }
            if (color === null) {
                color = intersectedColorRamp[0];
            }
        }
        return this.util.rgbToHex(color);
    }
}
exports.Marker = Marker;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class IconOptions {
    constructor(iconSize, icon, iconColor) {
        this.iconSize = iconSize;
        this.icon = icon;
        this.iconColor = iconColor;
    }
}
exports.IconOptions = IconOptions;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Size {
    constructor(name, dimen) {
        this.name = name;
        this.dimen = dimen;
    }
}
exports.Size = Size;
Size.Small = new Size('small', [20, 50]);
Size.Medium = new Size('medium', [30, 70]);
Size.Large = new Size('large', [35, 90]);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const IconOptions_1 = __webpack_require__(10);
exports.IconOptions = IconOptions_1.IconOptions;
const Size_1 = __webpack_require__(11);
exports.Size = Size_1.Size;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(7);
const types_1 = __webpack_require__(12);
/**
 * Example class showing how to implement new MarkerClasses
 * uses the glyphicons given by bootstrap
 */
class GlyphiconMarker extends _1.Marker {
    constructor() {
        super();
        this.options.markers = markers;
    }
    getMarkerHtml(size, color, icon) {
        let iconUrl = this.getMarkerUrl(size, color);
        return '<div class="leaflet-styleeditor-marker leaflet-styleeditor-marker-' +
            size.name + '" ' +
            'style="background-image: url(' + iconUrl + ');">' +
            '<div class="leaflet-styleeditor-fill"></div>' +
            '<i class="glyphicon ' + icon + '"></i>' +
            '<div class="leaflet-styleeditor-fill"></div>' +
            '</div>';
    }
    createMarkerIcon(iconOptions) {
        let iconSize = iconOptions.iconSize;
        return L.divIcon({
            className: 'leaflet-styleeditor-glyphicon-marker-wrapper',
            html: this.getMarkerHtml(iconSize, iconOptions.iconColor, iconOptions.icon),
            //icon: iconOptions.icon,
            //iconColor: iconOptions.iconColor,
            iconSize: iconSize.dimen,
            iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
            popupAnchor: [0, -iconSize[1] / 2]
        });
    }
    setStyle(currentElement, styleOption, value) {
        if (styleOption !== 'icon') {
            styleOption = 'icon' + styleOption.charAt(0).toUpperCase() + styleOption.slice(1);
        }
        let iconOptions = this.options.iconOptions;
        if (iconOptions[styleOption] !== value) {
            iconOptions[styleOption] = value;
            this.setNewMarker(currentElement);
        }
    }
    createSelectHTML(parentUiElement, iconOptions, icon) {
        parentUiElement.innerHTML = this.getMarkerHtml(types_1.Size.Small, iconOptions.iconColor, icon);
    }
    _getMarkerUrlForStyle(iconOptions) {
        return this.getMarkerUrl(iconOptions.iconSize, iconOptions.iconColor);
    }
    getMarkerUrl(size, color) {
        // TODO move to Color
        if (color.indexOf('#') === 0) {
            color = color.replace('#', '');
        }
        else {
            color = this.util.rgbToHex(color, true);
        }
        let url = 'https://api.tiles.mapbox.com/v3/marker/pin-' + size;
        return url + '+' + color + '.png';
    }
}
exports.GlyphiconMarker = GlyphiconMarker;
const markers = [
    'glyphicon-plus',
    'glyphicon-asterisk',
    'glyphicon-plus',
    'glyphicon-euro',
    'glyphicon-minus',
    'glyphicon-cloud',
    'glyphicon-envelope',
    'glyphicon-pencil',
    'glyphicon-glass',
    'glyphicon-music',
    'glyphicon-search',
    'glyphicon-heart',
    'glyphicon-star',
    'glyphicon-star-empty',
    'glyphicon-user',
    'glyphicon-film',
    'glyphicon-th-large',
    'glyphicon-th',
    'glyphicon-th-list',
    'glyphicon-ok',
    'glyphicon-remove',
    'glyphicon-zoom-in',
    'glyphicon-zoom-out',
    'glyphicon-off',
    'glyphicon-signal',
    'glyphicon-cog',
    'glyphicon-trash',
    'glyphicon-home',
    'glyphicon-file',
    'glyphicon-time',
    'glyphicon-road',
    'glyphicon-download-alt',
    'glyphicon-download',
    'glyphicon-upload',
    'glyphicon-inbox',
    'glyphicon-play-circle',
    'glyphicon-repeat',
    'glyphicon-refresh',
    'glyphicon-list-alt',
    'glyphicon-lock',
    'glyphicon-flag',
    'glyphicon-headphones',
    'glyphicon-volume-off',
    'glyphicon-volume-down',
    'glyphicon-volume-up',
    'glyphicon-qrcode',
    'glyphicon-barcode',
    'glyphicon-tag',
    'glyphicon-tags',
    'glyphicon-book',
    'glyphicon-bookmark',
    'glyphicon-print',
    'glyphicon-camera',
    'glyphicon-font',
    'glyphicon-bold',
    'glyphicon-italic',
    'glyphicon-text-height',
    'glyphicon-text-width',
    'glyphicon-align-left',
    'glyphicon-align-center',
    'glyphicon-align-right',
    'glyphicon-align-justify',
    'glyphicon-list',
    'glyphicon-indent-left',
    'glyphicon-indent-right',
    'glyphicon-facetime-video',
    'glyphicon-picture',
    'glyphicon-map-marker',
    'glyphicon-adjust',
    'glyphicon-tint',
    'glyphicon-edit',
    'glyphicon-share',
    'glyphicon-check',
    'glyphicon-move',
    'glyphicon-chevron-right',
    'glyphicon-plus-sign',
    'glyphicon-minus-sign',
    'glyphicon-remove-sign',
    'glyphicon-ok-sign',
    'glyphicon-question-sign',
    'glyphicon-info-sign',
    'glyphicon-screenshot',
    'glyphicon-remove-circle',
    'glyphicon-ok-circle',
    'glyphicon-ban-circle',
    'glyphicon-arrow-left',
    'glyphicon-arrow-right',
    'glyphicon-arrow-up',
    'glyphicon-arrow-down',
    'glyphicon-share-alt',
    'glyphicon-resize-full',
    'glyphicon-resize-small',
    'glyphicon-exclamation-sign',
    'glyphicon-gift',
    'glyphicon-leaf',
    'glyphicon-fire',
    'glyphicon-eye-open',
    'glyphicon-eye-close',
    'glyphicon-warning-sign',
    'glyphicon-plane',
    'glyphicon-calendar',
    'glyphicon-random',
    'glyphicon-comment',
    'glyphicon-magnet',
    'glyphicon-chevron-up',
    'glyphicon-chevron-down',
    'glyphicon-retweet',
    'glyphicon-shopping-cart',
    'glyphicon-bullhorn',
    'glyphicon-bell',
    'glyphicon-certificate',
    'glyphicon-thumbs-up',
    'glyphicon-thumbs-down',
    'glyphicon-hand-right',
    'glyphicon-hand-left',
    'glyphicon-hand-up',
    'glyphicon-hand-down',
    'glyphicon-circle-arrow-right',
    'glyphicon-circle-arrow-left',
    'glyphicon-circle-arrow-up',
    'glyphicon-circle-arrow-down',
    'glyphicon-globe',
    'glyphicon-wrench',
    'glyphicon-tasks',
    'glyphicon-filter',
    'glyphicon-briefcase',
    'glyphicon-fullscreen',
    'glyphicon-dashboard',
    'glyphicon-paperclip',
    'glyphicon-heart-empty',
    'glyphicon-link',
    'glyphicon-phone',
    'glyphicon-pushpin',
    'glyphicon-usd'
];


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(5);
class FormElementOptions {
}
exports.FormElementOptions = FormElementOptions;
/** FormElements are part of a Form for a specific styling option (i.e. color) */
class FormElement {
    constructor(options) {
        this.util = Util_1.Util.getInstance();
        if (options.title === undefined) {
            options.title = options.styleOption.charAt(0).toUpperCase() + options.styleOption.slice(1);
        }
        this.options = options;
        this.create(options.parentUiElement, options.title);
    }
    /** create uiElement and content */
    create(parentUiElement, title) {
        this.uiElement =
            L.DomUtil.create('div', 'leaflet-styleeditor-uiElement', parentUiElement);
        this.createTitle(title);
        this.createContent();
    }
    /** create title */
    createTitle(title) {
        let titleUiElement = L.DomUtil.create('label', 'leaflet-styleeditor-label', this.uiElement);
        titleUiElement.innerHTML = title + ':';
    }
    /** create content (where the actual modification takes place) */
    createContent() {
    }
    /** style the FormElement and show it */
    show() {
        //this.style(currentElement)
        this.showForm();
    }
    /** show the FormElement */
    showForm() {
        this.util.showElement(this.uiElement);
    }
    /** hide the FormElement */
    hide() {
        this.util.hideElement(this.uiElement);
    }
    /** style the FormElement */
    style(currentElement) {
    }
    /** what to do when lost focus */
    lostFocus() {
    }
    /** set style - used when the FormElement wants to change the styling option */
    setStyle(currentElement, value) {
        // check whether a layer is part of a layerGroup
        let layers = L.Layer[currentElement];
        if (currentElement instanceof L.LayerGroup) {
            layers = currentElement.getLayers;
        }
        // update layer (or all layers of a layerGroup)
        for (let i = 0; i < layers.length; i++) {
            let layer = layers[i];
            if (layer instanceof L.Marker) {
                //TODO layer.setStyle(currentElement, this.options.styleOption, value)
            }
            else {
                let newStyle = {};
                newStyle[this.options.styleOption] = value;
                layer.setStyle(newStyle);
                layer.options[this.options.styleOption] = value;
            }
            // fire event for changed layer
            this.util.fireChangeEvent(layer);
        }
        // notify form styling value has changed
        this.options.parentForm.style(currentElement);
    }
}
exports.FormElement = FormElement;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(5);
/**
 * Forms consist of FormElements and are shown in the StyleForm
 * There exists a MarkerForm to modify Markers and a GeometryForm to modify Geometries (i.e. rectangles...)
 * Style options based on:
 *     - path: https://leafletjs.com/reference.html#path-options
 *     - icon: https://leafletjs.com/reference.html#icon
 */
class Form {
    constructor(parentUiElement, formElements, options) {
        this.util = Util_1.Util.getInstance();
        this.create(parentUiElement, formElements, options);
    }
    create(parentUiElement, formElements, options) {
        let styleFormKeys = Object.keys(formElements);
        for (let i = 0; i < styleFormKeys.length; i++) {
            let formElement = new formElements[styleFormKeys[i]](options);
            if (formElement !== undefined) {
                formElement.create(parentUiElement, styleFormKeys[i]);
                this.initializedElements.push(formElement);
            }
        }
    }
    /** hide the Form including its FormElements */
    hide() {
        this.hideFormElements();
        this.hideForm();
    }
    /** hide the FormElements */
    hideFormElements() {
        for (let i = 0; i < this.initializedElements.length; i++) {
            this.initializedElements[i].hide();
        }
    }
    /** hide the Form */
    hideForm() {
        this.util.hideElement(this.parentUiElement);
    }
    /** make FormElements and Form visible */
    show(currentElement) {
        this.style(currentElement);
        this.preShow();
        this.showFormElements(currentElement);
        this.showForm();
    }
    /** hook which is called at the beginning of the show function */
    preShow() { }
    /** make every FormElement visible */
    showFormElements(currentElemnt) {
        for (let i = 0; i < this.initializedElements.length; i++) {
            this.showFormElement(this.initializedElements[i]);
        }
    }
    /** make the Form visible */
    showForm() {
        this.util.showElement(this.parentUiElement);
    }
    /** inform FormElements the selected style has changed, so they can adapt */
    style(currentElemnt) {
        for (let i = 0; i < this.initializedElements.length; i++) {
            this.initializedElements[i].style(currentElemnt);
        }
    }
    /** inform Form it lost it's focus */
    lostFocus() {
        for (let i = 0; i < this.initializedElements.length; i++) {
            this.initializedElements[i].lostFocus();
        }
    }
    /**
     * @returns a Boolean indicating if the @param formElement should be shown
     */
    showFormElement(formElement) {
        // check wether element should be shown or not
        // TODO make hideable if (this.showFormElementForStyleOption(formElement.options.styleOption)) {
        formElement.show();
        /* } else {
          formElement.hide()
        }*/
    }
}
exports.Form = Form;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FormElement_1 = __webpack_require__(14);
const DefaultOptions = {
    colorRamp: ['#fff']
};
/**
 *  FormElement used to style the color
 */
class ColorElement extends FormElement_1.FormElement {
    constructor(options) {
        super(Object.assign(Object.assign({}, DefaultOptions), options));
    }
    createContent() {
        this.options.colorPickerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-colorpicker', this.options.parentUiElement);
        this._getColorRamp().forEach(this._setSelectCallback, this);
    }
    /** create of get already created colorRamp */
    _getColorRamp() {
        /* TODO
        if (!this.options.colorRamp) {
          // if markers have own colorRamp use it
          if (this.options.parentForm instanceof MarkerForm && !!this.styleEditor.options.markerType.options.colorRamp) {
            this.options.colorRamp = this.styleEditor.options.markerType.options.colorRamp
            // else use the default
          } else {
            this.options.colorRamp = this.styleEditor.options.colorRamp
          }
        }*/
        return this.options.colorRamp;
    }
    /** define what to do when color is changed */
    _setSelectCallback(color) {
        let elem = L.DomUtil.create('div', 'leaflet-styleeditor-color', this.options.colorPickerDiv);
        elem.style.backgroundColor = color;
        L.DomEvent.addListener(elem, 'click', this._selectColor, this);
    }
    /** set style for chosen color */
    _selectColor(e) {
        e.stopPropagation();
        this.setStyle(e.target, this.util.rgbToHex(e.target.style.backgroundColor));
        // marker styling needs additional function calls
        if (e.target instanceof L.Marker) {
            // TODO this.styleEditor.options.markerType.setNewMarker(e)
        }
    }
}
exports.default = ColorElement;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FormElement_1 = __webpack_require__(14);
/**
 * FormElement used for adding a description to marker or geometry.
 */
class PopupContentElement extends FormElement_1.FormElement {
    createContent() {
        let uiElement = this.options.uiElement;
        let textArea = this.options.descTextAreaField = L.DomUtil.create('textarea', 'leaflet-styleeditor-input', uiElement);
        L.DomEvent.addListener(textArea, 'change', this._setStyle, this);
    }
    /** set correct value */
    style(selectedElement) {
        if (selectedElement && selectedElement.options) {
            this.options.descTextAreaField.value = selectedElement.options.popupContent || '';
        }
    }
    /** communicate popupContent value */
    _setStyle(currentElement) {
        let inputText = this.options.descTextAreaField.value;
        // check whether a layer is part of a layerGroup
        let layers = [currentElement];
        if (currentElement instanceof L.LayerGroup) {
            layers = currentElement.getLayers();
        }
        // update layer (or all layers of a layerGroup)
        for (let i = 0; i < layers.length; i++) {
            let marker = layers[i];
            if (marker && marker.getPopup && marker.bindPopup) {
                let popup1 = marker.getPopup();
                if (popup1) {
                    popup1.setContent(inputText);
                }
                else {
                    marker.bindPopup(inputText);
                }
                /*// tmp store the text content for init next time
                marker.options = marker.options || {}
                marker.options.popupContent = inputText
                TODO*/
            }
        }
        this.setStyle(currentElement, inputText);
    }
}
exports.default = PopupContentElement;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Form_1 = __webpack_require__(15);
exports.Form = Form_1.Form;
const GeometryForm_1 = __webpack_require__(19);
exports.GeometryForm = GeometryForm_1.GeometryForm;
const MarkerForm_1 = __importDefault(__webpack_require__(23));
exports.MarkerForm = MarkerForm_1.default;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Form_1 = __webpack_require__(15);
const ColorElement_1 = __importDefault(__webpack_require__(16));
const DashElement_1 = __importDefault(__webpack_require__(20));
const OpacityElement_1 = __importDefault(__webpack_require__(21));
const PopupContentElement_1 = __importDefault(__webpack_require__(17));
const WeightElement_1 = __importDefault(__webpack_require__(22));
/** Form used to enable modification of a Geometry */
class GeometryForm extends Form_1.Form {
    constructor(parentUiElement, options) {
        super(parentUiElement, {
            'color': ColorElement_1.default,
            'opacity': OpacityElement_1.default,
            'weight': WeightElement_1.default,
            'dashArray': DashElement_1.default,
            'fillColor': ColorElement_1.default,
            'fillOpacity': OpacityElement_1.default,
            'popupContent': PopupContentElement_1.default
        }, options);
    }
    /** show the fillOptions (fillColor and fillOpacity) only if the Element can be filled */
    showFormElements(currentElement) {
        for (let i = 0; i < this.initializedElements.length; i++) {
            if (this.initializedElements[i].options.styleOption.indexOf('fill') === 0) {
                if (currentElement.options.fill) {
                    this.showFormElement(this.initializedElements[i]);
                }
                else {
                    this.initializedElements[i].hide();
                }
            }
            else {
                this.showFormElement(this.initializedElements[i]);
            }
        }
    }
}
exports.GeometryForm = GeometryForm;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FormElement_1 = __webpack_require__(14);
/**
 * FormElement used for styling the dash attribute
 */
class DashElement extends FormElement_1.FormElement {
    /** create the three standard dash options */
    createContent() {
        let uiElement = this.options.parentUiElement;
        let stroke = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', uiElement);
        stroke.style.backgroundPosition = '0px -75px';
        L.DomEvent.addListener(stroke, 'click', function () {
            this.setStyle('1');
        }, this);
        stroke = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', uiElement);
        stroke.style.backgroundPosition = '0px -95px';
        L.DomEvent.addListener(stroke, 'click', function () {
            this.setStyle('10, 10');
        }, this);
        stroke = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', uiElement);
        stroke.style.backgroundPosition = '0px -115px';
        L.DomEvent.addListener(stroke, 'click', function () {
            this.setStyle('15, 10, 1, 10');
        }, this);
    }
}
exports.default = DashElement;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FormElement_1 = __webpack_require__(14);
/**
 * FormElement used to style opacity
 */
class OpacityFormElement extends FormElement_1.FormElement {
    /** create number input box */
    createContent() {
        this.options.label = L.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.options.parentUiElement);
        let slider = L.DomUtil.create('input', 'leaflet-styleeditor-input', this.options.parentUiElement);
        slider.type = 'range';
        slider.max = String(1);
        slider.min = String(0);
        slider.step = String(0.01);
        slider.value = String(0.5);
        // add event listeners
        L.DomEvent.addListener(slider, 'change', this._setStyle, this);
        L.DomEvent.addListener(slider, 'input', this._setStyle, this);
        L.DomEvent.addListener(slider, 'keyup', this._setStyle, this);
        L.DomEvent.addListener(slider, 'mouseup', this._setStyle, this);
    }
    /** set correct value */
    style(currentElement) {
        this.options.slider.value = this.util.getStyle(currentElement, this.options.styleOption);
        this.options.label.innerText = 100 * parseInt(this.options.slider.value) + '%';
    }
    /** communicate opacity value */
    _setStyle(currentElement) {
        this.setStyle(currentElement, this.options.slider.value);
    }
}
exports.default = OpacityFormElement;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FormElement_1 = __webpack_require__(14);
/**
 * FormElement used to style weight
 */
class WeigthElement extends FormElement_1.FormElement {
    /** create number input box */
    createContent() {
        this.options.label = L.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.options.parentUiElement);
        let weight = L.DomUtil.create('input', 'leaflet-styleeditor-input', this.options.parentUiElement);
        weight.type = 'range';
        weight.min = String(0);
        weight.max = String(20);
        weight.step = String(1);
        weight.value = String(4);
        this.options.weight = weight;
        // add event listeners
        L.DomEvent.addListener(weight, 'change', this._setStyle, this);
        L.DomEvent.addListener(weight, 'input', this._setStyle, this);
        L.DomEvent.addListener(weight, 'keyup', this._setStyle, this);
        L.DomEvent.addListener(weight, 'mouseup', this._setStyle, this);
    }
    /** set correct value */
    style() {
        this.options.weight.value = this.util.getStyle(undefined, this.options.styleOption); // TODO Remove undefined
        this.options.label.innerText = this.options.weight.value;
    }
    /** communicate weight value */
    _setStyle(currentElement) {
        this.setStyle(currentElement, this.options.weight.value);
    }
}
exports.default = WeigthElement;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Form_1 = __webpack_require__(15);
const IconElement_1 = __importDefault(__webpack_require__(24));
const ColorElement_1 = __importDefault(__webpack_require__(16));
const SizeElement_1 = __importDefault(__webpack_require__(25));
const PopupContentElement_1 = __importDefault(__webpack_require__(17));
/** Form used to enable modification of a Geometry */
class MarkerForm extends Form_1.Form {
    constructor(parentUiElement, options) {
        super(parentUiElement, {
            'icon': IconElement_1.default,
            'color': ColorElement_1.default,
            'size': SizeElement_1.default,
            'popupContent': PopupContentElement_1.default
        }, options);
    }
}
exports.default = MarkerForm;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FormElement_1 = __webpack_require__(14);
/**
 * FormElement used for styling the icon
 */
class IconElement extends FormElement_1.FormElement {
    constructor() {
        super(...arguments);
        // private classed used in the code
        this._selectOptionWrapperClasses = 'leaflet-styleeditor-select-option-wrapper leaflet-styleeditor-hidden';
        this._selectOptionClasses = 'leaflet-styleeditor-select-option';
    }
    /** create the icon selectBoxes */
    createContent() {
        let uiElement = this.options.parentUiElement;
        let selectBox = L.DomUtil.create('div', 'leaflet-styleeditor-select', uiElement);
        this.options.selectBoxImage = this._createSelectInputImage(selectBox);
        L.DomEvent.addListener(selectBox, 'click', this._toggleSelectInput, this);
    }
    /** show the correct icon in the correct color if the icon or color changed */
    style(currentElement) {
        let iconOptions = this.options.markerType.getIconOptions(currentElement);
        this._styleSelectInputImage(currentElement, this.options.selectBoxImage, iconOptions.icon, iconOptions.iconColor);
        this._createColorSelect(this.options.markerType.options.iconOptions.iconColor);
        this._hideSelectOptions();
    }
    /** if lost focus hide potentially open SelectOption */
    lostFocus() {
        this._hideSelectOptions();
    }
    /** create image container that hides/shows the iconSelectBox */
    _createSelectInputImage(parentUiElement) {
        let wrapper = L.DomUtil.create('div', 'leaflet-styleeditor-select-image-wrapper', parentUiElement);
        return L.DomUtil.create('div', 'leaflet-styleeditor-select-image', wrapper);
    }
    /** create appropriate image for color and icon */
    _styleSelectInputImage(currentElement, image, icon, color) {
        if (!icon) {
            icon = image.getAttribute('value');
            if (!icon) {
                return;
            }
        }
        let iconOptions = this.options.markerType.getIconOptions(currentElement);
        if (color) {
            iconOptions.iconColor = color;
        }
        image.innerHTML = '';
        this.options.markerType.createSelectHTML(image, iconOptions, icon);
        image.setAttribute('value', icon);
    }
    /** create the selectBox with the icons in the correct color */
    _createColorSelect(color) {
        if (!this.options.selectOptions) {
            this.options.selectOptions = {};
        }
        if (color in this.options.selectOptions) {
            return;
        }
        let uiElement = this.options.parentUiElement;
        let selectOptionWrapper = L.DomUtil.create('ul', this._selectOptionWrapperClasses, uiElement);
        this.util.getMarkersForColor(color).forEach(function (option) {
            let selectOption = L.DomUtil.create('li', this._selectOptionClasses, selectOptionWrapper);
            let selectImage = this._createSelectInputImage(selectOption);
            this._styleSelectInputImage(selectImage, option, color);
        }, this);
        this.options.selectOptions[color] = selectOptionWrapper;
        L.DomEvent.addListener(selectOptionWrapper, 'click', function (e) {
            e.stopPropagation();
            let target = e.target;
            if (target.nodeName === 'UL') {
                return;
            }
            if (target.parentElement.className === 'leaflet-styleeditor-select-image') {
                target = target.parentElement;
            }
            else {
                while (target && target.className !== 'leaflet-styleeditor-select-image') {
                    target = target.children[0];
                }
            }
            this._selectMarker({
                'target': target
            }, this);
        }, this);
    }
    /** show/hide iconSelectBox */
    _toggleSelectInput(e) {
        let currentColorElement = this._getCurrentColorElement(this.util.rgbToHex(this.options.markerType.options.iconOptions.iconColor));
        let show = false;
        if (currentColorElement) {
            show = L.DomUtil.hasClass(currentColorElement, 'leaflet-styleeditor-hidden');
        }
        this._hideSelectOptions();
        if (show) {
            this.util.showElement(currentColorElement);
        }
    }
    /** called when user selects a marker */
    _selectMarker(e) {
        let value = this._getValue(e.target);
        // update style
        this.options.selectBoxImage.setAttribute('value', value);
        this.setStyle(e.target, value);
        this._hideSelectOptions();
    }
    /** helper function to return attribute value of target */
    _getValue(target) {
        return target.getAttribute('value');
    }
    /** return correct selectBox depending on which color is currently chosen */
    _getCurrentColorElement(color) {
        if (!this.options.selectOptions[color]) {
            this._createColorSelect(color);
        }
        return this.options.selectOptions[color];
    }
    /** hide open SelectOption */
    _hideSelectOptions() {
        for (let selectOption in this.options.selectOptions) {
            this.util.hideElement(this.options.selectOptions[selectOption]);
        }
    }
}
exports.default = IconElement;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FormElement_1 = __webpack_require__(14);
/**
 * FormElement to set style of an icon
 */
class SizeElement extends FormElement_1.FormElement {
    /** create the 3 standard icon sizes */
    createContent() {
        let uiElement = this.options.parentUiElement;
        let select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-small', uiElement);
        L.DomEvent.addListener(select, 'click', function () {
            this.setStyle(this.options.styleEditorOptions.markerType.options.size.small);
        }, this);
        select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-medium', uiElement);
        L.DomEvent.addListener(select, 'click', function () {
            this.setStyle(this.options.styleEditorOptions.markerType.options.size.medium);
        }, this);
        select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-large', uiElement);
        L.DomEvent.addListener(select, 'click', function () {
            this.setStyle(this.options.styleEditorOptions.markerType.options.size.large);
        }, this);
    }
}
exports.default = SizeElement;


/***/ })
/******/ ]);
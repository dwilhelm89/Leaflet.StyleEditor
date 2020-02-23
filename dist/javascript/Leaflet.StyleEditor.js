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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const StyleEditorControlOptions_1 = __webpack_require__(5);
exports.DefaultStyleEditorControlOptions = StyleEditorControlOptions_1.DefaultStyleEditorControlOptions;
const StyleEditorClassOptions_1 = __webpack_require__(6);
exports.DefaultStyleEditorClassOptions = StyleEditorClassOptions_1.DefaultStyleEditorClassOptions;
const StyleEditorOptions_1 = __webpack_require__(7);
exports.DefaultStyleEditorOptions = StyleEditorOptions_1.DefaultStyleEditorOptions;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(4);
const options_1 = __webpack_require__(0);
class StyleEditorClass extends L.Class {
    constructor(map, options) {
        super();
        this.map = map;
        this.options = Object.assign(Object.assign({}, options_1.DefaultStyleEditorOptions), options);
        Util_1.Util.createInstance(map, this.options);
        this.createUi();
    }
    createUi() {
        const editorUI = this.editorUI = L.DomUtil.create('div', 'leaflet-styleeditor', this.map.getContainer());
        const styleEditorHeader = L.DomUtil.create('div', 'leaflet-styleeditor-header', editorUI);
        const styleEditorInterior = L.DomUtil.create('div', 'leaflet-styleeditor-interior', editorUI);
        const buttonNext = L.DomUtil.create('button', 'leaflet-styleeditor-button styleeditor-hideBtn', styleEditorHeader);
        buttonNext.title = this.options.strings.hide;
        const tooltipWrapper = this.tooltipUI = L.DomUtil.create('div', 'leaflet-styleeditor-tooltip-wrapper', this.map.getContainer());
        const tooltip = L.DomUtil.create('div', 'leaflet-styleeditor-tooltip', tooltipWrapper);
        tooltip.innerHTML = this.options.strings.tooltip;
        // do not propagate scrolling events on the ui to the map
        L.DomEvent.disableScrollPropagation(editorUI);
        L.DomEvent.disableScrollPropagation(buttonNext);
        // do not propagate click events on the ui to the map
        L.DomEvent.disableClickPropagation(editorUI);
        L.DomEvent.disableClickPropagation(buttonNext);
        // select next layer to style
        L.DomEvent.on(buttonNext, 'click', this.onNext, this);
        this.addEventListeners(this.map);
        //new StyleForm(map, editorUI, styleEditorInterior, new this.options.markerForm(), new this.options.geometryForm())
    }
    addEventListeners(map) {
        this.options.events.forEach(event => map.on(event, this.onEvent));
    }
    onEvent(event) {
        // TODO
    }
    onNext(event) {
        this.hideEditor();
        this.showTooltip();
        event.stopPropagation();
    }
    removeIndicators() {
        const children = this.map.getPanes().markerPane.children;
        for (let index = 0; index < children.length; index++) {
            const element = children[index];
            L.DomUtil.removeClass(element, 'leaflet-styleeditor-marker-selected');
        }
    }
    addEditClickEvents(layer) {
        if (this.layerIsIgnored(layer)) {
            return;
        }
        if (this.options.useGrouping && layer instanceof L.LayerGroup) {
            //this.options._layerGroups.push(layer)
        }
        else if (layer instanceof L.Marker || layer instanceof L.Path) {
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
    hideEditor() {
        L.DomUtil.removeClass(this.editorUI, 'editor-enabled');
        this.removeIndicators();
        this.fireEvent('hidden');
    }
    showEditor() {
        L.DomUtil.addClass(this.editorUI, 'editor-enabled');
        this.fireEvent('visible');
    }
    showTooltip() {
        L.DomUtil.removeClass(this.tooltipUI, 'leaflet-styleeditor-hidden');
    }
    hideTooltip() {
        L.DomUtil.addClass(this.tooltipUI, 'leaflet-styleeditor-hidden');
    }
    fireEvent(eventName) {
    }
    enable() {
        //TODO this.addClickEvents()
        this.showTooltip();
        this.showEditor();
    }
    disable() {
        //TODO this.removeClickEvents()
        this.hideTooltip();
        this.hideEditor();
    }
}
exports.StyleEditorClass = StyleEditorClass;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(3);
const StyleEditorClass_1 = __webpack_require__(1);
const StyleEditorControl_1 = __webpack_require__(8);
__webpack_require__(9);
L.StyleEditor = StyleEditorClass_1.StyleEditorClass;
L.styleEditor = function (map, options) { return new StyleEditorClass_1.StyleEditorClass(map, options); };
L.Control.StyleEditor = StyleEditorControl_1.StyleEditorControl;
L.control.styleEditor = function (options) { return new StyleEditorControl_1.StyleEditorControl(options); };
exports.default = L;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStyleEditorControlOptions = {
    position: 'topleft',
    strings: {
        title: 'Style Editor',
        cancel: 'cancel',
        cancelTitle: 'cancel'
    }
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStyleEditorClassOptions = {
    position: 'topleft',
    colorRamp: ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad',
        '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b',
        '#bdc3c7', '#7f8c8d'],
    defaultColor: null,
    markerType: undefined,
    markers: null,
    defaultMarkerIcon: null,
    defaultMarkerColor: null,
    markerForm: undefined,
    geometryForm: undefined,
    ignoreLayerTypes: [],
    forms: {},
    events: [],
    openOnLeafletDraw: true,
    openOnLeafletEditable: true,
    showTooltip: true,
    strings: {
        tooltip: 'Click on the element you want to style',
        hide: 'Hide Style Editor',
    },
    useGrouping: true,
    styleEditorEventPrefix: 'styleeditor:',
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(0);
exports.DefaultStyleEditorOptions = Object.assign(Object.assign(Object.assign({}, _1.DefaultStyleEditorClassOptions), _1.DefaultStyleEditorControlOptions), { strings: {
        title: _1.DefaultStyleEditorControlOptions.strings.title,
        cancel: _1.DefaultStyleEditorControlOptions.strings.cancel,
        cancelTitle: _1.DefaultStyleEditorControlOptions.strings.cancelTitle,
        tooltip: _1.DefaultStyleEditorClassOptions.strings.tooltip,
        hide: _1.DefaultStyleEditorClassOptions.strings.hide
    } });


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const StyleEditorClass_1 = __webpack_require__(1);
const options_1 = __webpack_require__(0);
/**
 * StyleEditorControl creates a { L.Control }
 * which enables the user to enable and disable Leaflet.StyleEditor
 */
class StyleEditorControl extends L.Control {
    constructor(options, styleEditor, styleEditorOptions) {
        super();
        this.isEnabled = false;
        if (styleEditorOptions === undefined) {
            this.options = Object.assign(Object.assign({}, options_1.DefaultStyleEditorControlOptions), options);
            this.styleEditor = styleEditor;
        }
        else {
            this.options = Object.assign(Object.assign({}, options_1.DefaultStyleEditorControlOptions), styleEditorOptions);
            this.styleEditorClassOptions = Object.assign(Object.assign({}, options_1.DefaultStyleEditorClassOptions), styleEditorOptions);
        }
    }
    /**
     * Create the Control element and its HTMLElements
     * @param map the map where the control should be added to
     */
    onAdd(map) {
        if (this.styleEditor === undefined) {
            this.styleEditor = new StyleEditorClass_1.StyleEditorClass(map, this.styleEditorClassOptions);
        }
        // disable styleEditor if using control element
        this.styleEditor.disable();
        return this.createUI();
    }
    createUI() {
        const controlUI = L.DomUtil.create('div', 'leaflet-control-styleeditor leaflet-control leaflet-bar');
        const controlDiv = L.DomUtil.create('a', 'leaflet-control-styleeditor-interior', controlUI);
        controlDiv.title = this.options.strings.title;
        const cancelUI = this.cancelUI = L.DomUtil.create('div', 'leaflet-control-styleeditor-cancel leaflet-styleeditor-hidden', controlUI);
        cancelUI.innerHTML = this.options.strings.cancel;
        cancelUI.title = this.options.strings.cancelTitle;
        L.DomEvent.disableScrollPropagation(controlUI);
        L.DomEvent.disableScrollPropagation(cancelUI);
        L.DomEvent.disableClickPropagation(controlUI);
        L.DomEvent.disableClickPropagation(cancelUI);
        // toggle UI visibility
        L.DomEvent.on(controlUI, 'click', this.toggle, this);
        return controlUI;
    }
    toggle() {
        if (this.isEnabled) {
            this.disable();
        }
        else {
            this.enable();
        }
    }
    enable() {
        this.isEnabled = true;
        this.showCancelButton();
        this.styleEditor.enable();
    }
    disable() {
        if (this.isEnabled) {
            this.isEnabled = false;
            this.hideCancelButton();
            this.styleEditor.disable();
        }
    }
    showCancelButton() {
        L.DomUtil.removeClass(this.cancelUI, 'leaflet-styleeditor-hidden');
    }
    hideCancelButton() {
        L.DomUtil.addClass(this.cancelUI, 'leaflet-styleeditor-hidden');
    }
}
exports.StyleEditorControl = StyleEditorControl;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);
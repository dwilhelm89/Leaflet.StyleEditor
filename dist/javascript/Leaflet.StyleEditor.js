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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleEditorClass = void 0;
class StyleEditorClass extends L.Class {
    constructor(styleEditor) {
        super();
        this.styleEditor = styleEditor;
        this.map = styleEditor.map;
        this.util = styleEditor.util;
    }
}
exports.StyleEditorClass = StyleEditorClass;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStyleEditorOptions = exports.DefaultStyleEditorClassOptions = exports.DefaultStyleEditorControlOptions = void 0;
const StyleEditorControlOptions_1 = __webpack_require__(11);
Object.defineProperty(exports, "DefaultStyleEditorControlOptions", { enumerable: true, get: function () { return StyleEditorControlOptions_1.DefaultStyleEditorControlOptions; } });
const StyleEditorClassOptions_1 = __webpack_require__(12);
Object.defineProperty(exports, "DefaultStyleEditorClassOptions", { enumerable: true, get: function () { return StyleEditorClassOptions_1.DefaultStyleEditorClassOptions; } });
const StyleEditorOptions_1 = __webpack_require__(18);
Object.defineProperty(exports, "DefaultStyleEditorOptions", { enumerable: true, get: function () { return StyleEditorOptions_1.DefaultStyleEditorOptions; } });


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleEditorImpl = void 0;
const StyleForm_1 = __webpack_require__(9);
const Util_1 = __webpack_require__(10);
const options_1 = __webpack_require__(1);
class StyleEditorImpl extends L.Class {
    constructor(map, options) {
        super();
        this.map = map;
        this.options = Object.assign(Object.assign({}, options_1.DefaultStyleEditorOptions), options);
        this.util = new Util_1.Util(this);
        this.createUi();
    }
    createUi() {
        const editorUI = this.editorUI = L.DomUtil.create('div', 'leaflet-styleeditor', this.map.getContainer());
        const styleEditorHeader = L.DomUtil.create('div', 'leaflet-styleeditor-header', editorUI);
        const styleEditorInterior = this.interiorEditorUI = L.DomUtil.create('div', 'leaflet-styleeditor-interior', editorUI);
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
        new StyleForm_1.StyleForm(this);
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
    addClickEvents() {
        this.map.eachLayer(this.addClickEvent, this);
    }
    addClickEvent(layer) {
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
        layer.on('click', this.showEditor, this);
    }
    removeClickEvents() {
        this.map.eachLayer(this.removeClickEvent, this);
    }
    removeClickEvent(layer) {
        layer.off('click', this.showEditor, this);
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
    // TODO what type is event?!
    showEditor(event) {
        if (event) {
            this.currentElement = event;
        }
        L.DomUtil.addClass(this.editorUI, 'editor-enabled');
        this.fireEvent('visible');
    }
    showTooltip() {
        L.DomUtil.removeClass(this.tooltipUI, 'leaflet-styleeditor-hidden');
    }
    hideTooltip() {
        L.DomUtil.addClass(this.tooltipUI, 'leaflet-styleeditor-hidden');
    }
    fireEvent(eventName, layer) {
    }
    enable() {
        this.addClickEvents();
        this.showTooltip();
        this.showEditor();
    }
    disable() {
        this.removeClickEvents();
        this.hideTooltip();
        this.hideEditor();
    }
    getCurrentLayers() {
        // TODO !!!! currentelemnt target?!
        if (this.currentElement.target instanceof L.LayerGroup)
            return this.currentElement.target.getLayers();
        else
            return [this.currentElement.target];
    }
    getCurrentMarker() {
        return this.getCurrentLayers().filter((layer) => { layer instanceof L.Marker; });
    }
}
exports.StyleEditorImpl = StyleEditorImpl;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkerForm = exports.Form = void 0;
const Form_1 = __webpack_require__(13);
Object.defineProperty(exports, "Form", { enumerable: true, get: function () { return Form_1.Form; } });
const MarkerForm_1 = __webpack_require__(4);
Object.defineProperty(exports, "MarkerForm", { enumerable: true, get: function () { return MarkerForm_1.MarkerForm; } });


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkerForm = void 0;
const _1 = __webpack_require__(3);
const formElements_1 = __webpack_require__(14);
/** Form used to enable modification of a Geometry */
class MarkerForm extends _1.Form {
    constructor() {
        super(...arguments);
        this.formOptionKey = 'marker';
        this.formElements = {
            'icon': formElements_1.IconElement,
            'color': formElements_1.ColorElement,
            'size': formElements_1.SizeElement,
            'popupContent': formElements_1.PopupContentElement
        };
    }
}
exports.MarkerForm = MarkerForm;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FormElement = void 0;
const StyleEditorClass_1 = __webpack_require__(0);
/** FormElements are part of a Form for a specific styling option (i.e. color) */
class FormElement extends StyleEditorClass_1.StyleEditorClass {
    constructor(parentForm, parentUiElement, styleOption) {
        super(parentForm.styleEditor);
        this.styleOption = styleOption;
        // if no title is given use styling option
        this.parentForm = parentForm;
        this.create(parentUiElement);
    }
    /** create uiElement and content */
    create(parentUiElement) {
        this.uiElement =
            L.DomUtil.create('div', 'leaflet-styleeditor-uiElement', parentUiElement);
        this.createTitle();
        this.createContent();
    }
    /** create title */
    createTitle() {
        let title = L.DomUtil.create('label', 'leaflet-styleeditor-label', this.uiElement);
        title.innerHTML = this.title || this.styleOption.charAt(0).toUpperCase() + this.styleOption.slice(1);
    }
    /** create content (where the actual modification takes place) */
    createContent() {
    }
    /** style the FormElement and show it */
    show(currentElement) {
        this.style(currentElement);
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
    setStyle(value) {
        const layers = this.parentForm.styleEditor.getCurrentLayers();
        // update layers
        for (let i = 0; i < layers.length; i++) {
            let layer = layers[i];
            if (layer instanceof L.Marker) {
                new this.styleEditor.options.markerType(this.styleEditor).setStyle(this.styleOption, value);
            }
            else if (layer instanceof L.Path) {
                let newStyle = {};
                newStyle[this.styleOption] = value;
                layer.setStyle(newStyle);
                layer.options[this.styleOption] = value;
            }
            // fire event for changed layer
            this.util.fireChangeEvent(layer);
        }
        // notify form styling value has changed
        this.parentForm.style();
    }
}
exports.FormElement = FormElement;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMarker = exports.Marker = void 0;
const Marker_1 = __webpack_require__(16);
Object.defineProperty(exports, "Marker", { enumerable: true, get: function () { return Marker_1.Marker; } });
const DefaultMarker_1 = __webpack_require__(17);
Object.defineProperty(exports, "DefaultMarker", { enumerable: true, get: function () { return DefaultMarker_1.DefaultMarker; } });


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(8);
const StyleEditorImpl_1 = __webpack_require__(2);
const StyleEditorControl_1 = __webpack_require__(19);
__webpack_require__(20);
L.StyleEditor = StyleEditorImpl_1.StyleEditorImpl;
L.styleEditor = function (map, options) { return new StyleEditorImpl_1.StyleEditorImpl(map, options); };
L.Control.StyleEditor = StyleEditorControl_1.StyleEditorControl;
L.control.styleEditor = function (options) { return new StyleEditorControl_1.StyleEditorControl(options); };
exports.default = L;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleForm = void 0;
const StyleEditorClass_1 = __webpack_require__(0);
class StyleForm extends StyleEditorClass_1.StyleEditorClass {
    constructor(styleEditor) {
        super(styleEditor);
        this.markerForm = this.createMarkerForm();
        this.geometryForm = this.createGeometryForm();
        this.addDOMEvents();
    }
    addDOMEvents() {
        L.DomEvent.addListener(this.map, 'click', this.lostFocus, this);
        L.DomEvent.addListener(this.styleEditor.editorUI, 'click', this.lostFocus, this);
    }
    clearForm() {
        this.markerForm.hide();
        this.geometryForm.hide();
    }
    createMarkerForm() {
        const markerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-marker', this.styleEditor.interiorEditorUI);
        const markerForm = new this.styleEditor.options.markerForm(this.styleEditor, markerDiv);
        markerForm.create();
        return markerForm;
    }
    createGeometryForm() {
        const markerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-geometry', this.styleEditor.interiorEditorUI);
        const markerForm = new this.styleEditor.options.geometryForm(this.styleEditor, markerDiv);
        markerForm.create();
        return markerForm;
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Helper functions used throuhgout the project
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = exports.UtilOptions = void 0;
class UtilOptions {
}
exports.UtilOptions = UtilOptions;
class Util {
    constructor(styleEditor) {
        this.styleEditor = styleEditor;
        this.map = styleEditor.map;
        this.options = styleEditor.options;
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
    /** get current style of current element */
    getStyle(option) {
        debugger;
        /* TODO?!?!?
        let style = this.styleEditor.getCurrentLayers()[0].options[option]
        if (style) {
          return style
        }
    */
        return null;
    }
    /** set new style to current element */
    setStyle(currentElement, option, value) {
        if (currentElement instanceof L.Marker) {
            new this.styleEditor.options.markerType(this.styleEditor).setStyle(option, value);
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
        let markers = new this.styleEditor.options.markerType(this.styleEditor).markers;
        let controlMarkers = this.styleEditor.options.markers;
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
        let defaultMarker = this.styleEditor.options.defaultMarkerIcon;
        if (defaultMarker !== null) {
            if (typeof defaultMarker === 'string') {
                defMarkers.push(defaultMarker);
            }
            if (Object.keys(defaultMarker).includes(color)) {
                defMarkers.push(defaultMarker[color]);
            }
        }
        defaultMarker = new this.styleEditor.options.markerType(this.styleEditor).defaultMarkerIcon;
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStyleEditorControlOptions = void 0;
exports.DefaultStyleEditorControlOptions = {
    position: 'topleft',
    strings: {
        title: 'Style Editor',
        cancel: 'cancel',
        cancelTitle: 'cancel'
    }
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStyleEditorClassOptions = void 0;
const form_1 = __webpack_require__(3);
const marker_1 = __webpack_require__(6);
exports.DefaultStyleEditorClassOptions = {
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
    geometryForm: form_1.MarkerForm,
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const StyleEditorClass_1 = __webpack_require__(0);
/**
 * Forms consist of FormElements and are shown in the StyleForm
 * There exists a MarkerForm to modify Markers and a GeometryForm to modify Geometries (i.e. rectangles...)
 * Style options based on:
 *     - path: https://leafletjs.com/reference.html#path-options
 *     - icon: https://leafletjs.com/reference.html#icon
 */
class Form extends StyleEditorClass_1.StyleEditorClass {
    constructor(styleEditor, parentUiElement) {
        super(styleEditor);
        this.initializedElements = {};
        this.parentUiElement = parentUiElement;
    }
    /** create every FormElement in the parentUiElement */
    create() {
        for (let key in this.formElements) {
            const formElement = this.getFormElementClass(key);
            if (formElement !== undefined) {
                this.initializedElements[key] = new formElement(this, this.parentUiElement, key);
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
        for (let key in this.initializedElements) {
            this.initializedElements[key].hide();
        }
    }
    /** hide the Form */
    hideForm() {
        this.util.hideElement(this.parentUiElement);
    }
    /** make FormElements and Form visible */
    show(currentElement) {
        this.preShow();
        this.showFormElements();
        this.showForm();
        this.style(currentElement);
    }
    /** hook which is called at the beginning of the show function */
    preShow() {
    }
    /** make every FormElement visible */
    showFormElements() {
        for (let key in this.initializedElements) {
            this.showFormElement(this.initializedElements[key]);
        }
    }
    /** make the Form visible */
    showForm() {
        this.util.showElement(this.parentUiElement);
    }
    /** inform FormElements the selected style has changed, so they can adapt */
    style(currentElement) {
        for (let key in this.initializedElements) {
            this.initializedElements[key].style(currentElement);
        }
    }
    /** inform Form it lost it's focus */
    lostFocus() {
        for (let key in this.initializedElements) {
            this.initializedElements[key].lostFocus();
        }
    }
    /**
     * @returns a Boolean indicating if the @param formElement should be shown
     */
    showFormElement(formElement) {
        // check wether element should be shown or not
        if (this.showFormElementForStyleOption(formElement.styleOption)) {
            formElement.show();
        }
        else {
            formElement.hide();
        }
    }
    /**
     * get the Class of the Formelement to instanciate
     * @param {*} styleOption, the styleOption to get the FormElement for
     */
    getFormElementClass(styleOption) {
        let formElementKeys = Object.keys(this.formElements);
        if (formElementKeys.indexOf(styleOption) >= 0) {
            let FormElement = this.formElements[styleOption];
            if (FormElement) {
                // may be a dictionary
                if (typeof FormElement === 'boolean') {
                    return this.getFormElementStandardClass(styleOption);
                }
                if ('formElement' in FormElement && 'boolean' in FormElement) {
                    FormElement = FormElement['formElement'];
                }
            }
            // if nothing works return it
            return this.getFormElementStandardClass(styleOption);
        }
    }
    /**
     * check whether a FormElement should be shown
     * @param {*} styleOption, the styleOption to check
     */
    showFormElementForStyleOption(styleOption) {
        /*
        if (styleOption in this.formElements) {
          let styleFormElement = this.initializedElements[styleOption]
    
          // maybe a function is given to declare when to show the FormElement
          if (typeof styleFormElement === 'function') {
            try {
              return styleFormElement(this.util.getCurrentElement())
            } catch (err) {
              // the given function presumably is a constructor -> always show it
              return true
            }
          }
    
          // maybe a boolean is given to indicate whether to show it
          if (typeof styleFormElement === 'boolean') {
            return styleFormElement
          }
    
          // check for dictionary
          if ('boolean' in styleFormElement) {
            // in a dictionary boolean may be a function or boolean
            if (typeof styleFormElement['boolean'] === 'function') {
              return styleFormElement['boolean'](this.util.getCurrentElement())
            }
            return styleFormElement['boolean']
          }
          return true
        }
        TODO */
        return false;
    }
    /**
     * get Leaflet.StyleEditor standard FormElement class for given styleOption
     * @param {*} styleOption, the styleOption to get the standard class for
     */
    getFormElementStandardClass(styleOption) {
        return this.formElements[styleOption];
    }
}
exports.Form = Form;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightElement = exports.SizeElement = exports.PopupContentElement = exports.OpacityElement = exports.IconElement = exports.FormElement = exports.DashElement = exports.ColorElement = void 0;
const ColorElement_1 = __webpack_require__(15);
Object.defineProperty(exports, "ColorElement", { enumerable: true, get: function () { return ColorElement_1.ColorElement; } });
const DashElement_1 = __webpack_require__(21);
Object.defineProperty(exports, "DashElement", { enumerable: true, get: function () { return DashElement_1.DashElement; } });
const FormElement_1 = __webpack_require__(5);
Object.defineProperty(exports, "FormElement", { enumerable: true, get: function () { return FormElement_1.FormElement; } });
const IconElement_1 = __webpack_require__(22);
Object.defineProperty(exports, "IconElement", { enumerable: true, get: function () { return IconElement_1.IconElement; } });
const OpacityElement_1 = __webpack_require__(23);
Object.defineProperty(exports, "OpacityElement", { enumerable: true, get: function () { return OpacityElement_1.OpacityElement; } });
const PopupContentElement_1 = __webpack_require__(24);
Object.defineProperty(exports, "PopupContentElement", { enumerable: true, get: function () { return PopupContentElement_1.PopupContentElement; } });
const SizeElement_1 = __webpack_require__(25);
Object.defineProperty(exports, "SizeElement", { enumerable: true, get: function () { return SizeElement_1.SizeElement; } });
const WeightElement_1 = __webpack_require__(26);
Object.defineProperty(exports, "WeightElement", { enumerable: true, get: function () { return WeightElement_1.WeightElement; } });


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorElement = void 0;
const FormElement_1 = __webpack_require__(5);
const MarkerForm_1 = __webpack_require__(4);
/**
 *  FormElement used to style the color
 */
class ColorElement extends FormElement_1.FormElement {
    constructor() {
        super(...arguments);
        this.title = "color";
    }
    createContent() {
        this.colorPickerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-colorpicker', this.uiElement);
        this.getColorRamp().forEach(this.setSelectCallback, this);
    }
    /** create of get already created colorRamp */
    getColorRamp() {
        // if markers have own colorRamp use it
        if (this.parentForm instanceof MarkerForm_1.MarkerForm) {
            const mt = new this.styleEditor.options.markerType(this.styleEditor);
            if (!!mt.colorRamp) {
                return mt.colorRamp;
            }
        }
        return this.styleEditor.options.colorRamp;
    }
    /** define what to do when color is changed */
    setSelectCallback(color) {
        let elem = L.DomUtil.create('div', 'leaflet-styleeditor-color', this.colorPickerDiv);
        elem.style.backgroundColor = color;
        L.DomEvent.addListener(elem, 'click', this.selectColor, this);
    }
    /** set style for chosen color */
    selectColor(event) {
        event.stopPropagation();
        this.setStyle(this.util.rgbToHex(event.target.style.backgroundColor));
    }
}
exports.ColorElement = ColorElement;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Marker = void 0;
const StyleEditorClass_1 = __webpack_require__(0);
class Marker extends StyleEditorClass_1.StyleEditorClass {
    constructor(styleEditor, selectIconClass) {
        super(styleEditor);
        this.size = {
            'small': [20, 50],
            'medium': [30, 70],
            'large': [35, 90]
        };
        /** set standard icon */
        if (selectIconClass !== '' && !selectIconClass.startsWith('leaflet-styleeditor-select-image')) {
            this.selectIconClass = 'leaflet-styleeditor-select-image-' + selectIconClass;
        }
    }
    /** create new Marker and show it */
    setNewMarker(markerOptions) {
        let newIcon = this.createMarkerIcon(markerOptions);
        this.styleEditor.getCurrentLayers().forEach((currentElement) => {
            if (currentElement instanceof L.Marker) {
                currentElement.setIcon(newIcon);
                if (currentElement instanceof L.LayerGroup) {
                    currentElement.eachLayer(function (layer) {
                        if (layer instanceof L.Marker)
                            L.DomUtil.addClass(layer.getElement(), 'leaflet-styleeditor-marker-selected');
                    });
                }
                else {
                    L.DomUtil.addClass(currentElement.getElement(), 'leaflet-styleeditor-marker-selected');
                }
            }
        });
    }
    /** set styling options */
    setStyle(styleOption, value) {
        if (styleOption !== 'icon') {
            styleOption = 'icon' + styleOption.charAt(0).toUpperCase() + styleOption.slice(1);
        }
        this.setNewMarker(this.getNewMarkerOptions(styleOption, value));
    }
    /** create HTML used to */
    createSelectHTML(parentUiElement, iconOptions, icon) {
    }
    /** get the current iconOptions
     *  if not set set them
     */
    getIconOptions() {
        let markerOptions = {};
        const layers = this.styleEditor.getCurrentLayers();
        const marker = layers.find((layer) => layer instanceof L.Marker);
        if (marker) {
            markerOptions = marker.options.icon.options;
        }
        if (Object.keys(markerOptions).length > 0) {
            return markerOptions;
        }
        markerOptions.iconColor = this._getDefaultMarkerColor();
        markerOptions.iconSize = this.size.small;
        markerOptions.icon = this.util.getDefaultMarkerForColor(markerOptions.iconColor);
        markerOptions = this._ensureMarkerIcon(markerOptions);
        return markerOptions;
    }
    getNewMarkerOptions(key, value) {
        let iconOptions = this.getIconOptions();
        iconOptions[key] = value;
        return iconOptions;
    }
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
        let markerTypeColorRamp = this.colorRamp;
        let generalColorRamp = this.styleEditor.options.colorRamp;
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
        let color = this.styleEditor.options.defaultMarkerColor;
        if (color !== null && !intersectedColorRamp.includes(color)) {
            color = null;
        }
        if (color === null) {
            color = this.styleEditor.options.defaultColor;
            if (color !== null && !intersectedColorRamp.includes(color)) {
                color = null;
            }
            if (color === null) {
                color = intersectedColorRamp[0];
            }
        }
        return this.util.rgbToHex(color);
    }
    /** return size as keyword */
    sizeToName(size) {
        let keys = Object.keys(this.size);
        if (typeof size === 'string') {
            if (size === 's') {
                size = 'small';
            }
            else if (size === 'm') {
                size = 'medium';
            }
            else if (size === 'l') {
                size = 'large';
            }
            for (let i = 0; i < keys.length; i++) {
                if (this.size[keys[i]] === size) {
                    return keys[i];
                }
            }
        }
        let values = Object.values(this.size);
        for (let i = 0; i < values.length; i++) {
            if (JSON.stringify(size) === JSON.stringify(values[i])) {
                return keys[i];
            }
        }
        return keys[0];
    }
    /** return size as [x,y] */
    sizeToPixel(size) {
        size = this.sizeToName(size);
        return this.size[size];
    }
}
exports.Marker = Marker;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMarker = void 0;
const _1 = __webpack_require__(6);
/**
 * The "old" marker style used by L.StyleEditor
 * used the mapbox API v3
 */
class DefaultMarker extends _1.Marker {
    constructor(styleEdtior) {
        super(styleEdtior, "defaultmarker");
        this.markers = [
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
    }
    createMarkerIcon(iconOptions) {
        let iconSize = iconOptions.iconSize;
        return new L.Icon({
            iconUrl: this._getMarkerUrlForStyle(iconOptions),
            iconSize: iconOptions.iconSize,
            iconColor: iconOptions.iconColor,
            icon: iconOptions.icon,
            className: this.selectIconClass,
            iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
            popupAnchor: [0, -iconSize[1] / 2]
        });
    }
    createSelectHTML(parentUiElement, iconOptions, icon) {
        let tmpOptions = {};
        tmpOptions.iconSize = this.size.small;
        tmpOptions.icon = icon;
        tmpOptions.iconColor = iconOptions.iconColor;
        parentUiElement.innerHTML = this.createMarkerIcon(tmpOptions).createIcon().outerHTML;
    }
    _getMarkerUrlForStyle(iconOptions) {
        return this._getMarkerUrl(iconOptions.iconSize, iconOptions.iconColor, iconOptions.icon);
    }
    _getMarkerUrl(size, color, icon) {
        size = this.sizeToName(size)[0];
        if (color.indexOf('#') === 0) {
            color = color.replace('#', '');
        }
        else {
            color = this.util.rgbToHex(color, true);
        }
        let url = 'https://api.tiles.mapbox.com/v3/marker/pin-' + size;
        if (icon) {
            url += '-' + icon;
        }
        return url + '+' + color + '.png';
    }
}
exports.DefaultMarker = DefaultMarker;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStyleEditorOptions = void 0;
const _1 = __webpack_require__(1);
exports.DefaultStyleEditorOptions = Object.assign(Object.assign(Object.assign({}, _1.DefaultStyleEditorClassOptions), _1.DefaultStyleEditorControlOptions), { strings: {
        title: _1.DefaultStyleEditorControlOptions.strings.title,
        cancel: _1.DefaultStyleEditorControlOptions.strings.cancel,
        cancelTitle: _1.DefaultStyleEditorControlOptions.strings.cancelTitle,
        tooltip: _1.DefaultStyleEditorClassOptions.strings.tooltip,
        hide: _1.DefaultStyleEditorClassOptions.strings.hide
    } });


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleEditorControl = void 0;
const StyleEditorImpl_1 = __webpack_require__(2);
const options_1 = __webpack_require__(1);
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
            this.styleEditor = new StyleEditorImpl_1.StyleEditorImpl(map, this.styleEditorClassOptions);
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DashElement = void 0;
const FormElement_1 = __webpack_require__(5);
/**
 * FormElement used for styling the dash attribute
 */
class DashElement extends FormElement_1.FormElement {
    /** create the three standard dash options */
    createContent() {
        let stroke = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', this.uiElement);
        stroke.style.backgroundPosition = '0px -75px';
        L.DomEvent.addListener(stroke, 'click', function () {
            this.setStyle('1');
        }, this);
        stroke = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', this.uiElement);
        stroke.style.backgroundPosition = '0px -95px';
        L.DomEvent.addListener(stroke, 'click', function () {
            this.setStyle('10, 10');
        }, this);
        stroke = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', this.uiElement);
        stroke.style.backgroundPosition = '0px -115px';
        L.DomEvent.addListener(stroke, 'click', function () {
            this.setStyle('15, 10, 1, 10');
        }, this);
    }
}
exports.DashElement = DashElement;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.IconElement = void 0;
const _1 = __webpack_require__(14);
/**
 * FormElement used for styling the icon
 */
class IconElement extends _1.FormElement {
    constructor() {
        super(...arguments);
        this.styleOption = 'icon';
    }
    /** create the icon selectBoxes */
    createContent() {
        let selectBox = L.DomUtil.create('div', 'leaflet-styleeditor-select', this.uiElement);
        this.selectBoxImage = this._createSelectInputImage(selectBox);
        L.DomEvent.addListener(selectBox, 'click', this._toggleSelectInput, this);
    }
    /** show the correct icon in the correct color if the icon or color changed */
    style() {
        let iconOptions = new this.styleEditor.options.markerType(this.styleEditor).getIconOptions();
        this._styleSelectInputImage(this.selectBoxImage, iconOptions.icon, iconOptions.iconColor);
        this._createColorSelect(iconOptions.iconColor);
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
    _styleSelectInputImage(image, icon, color) {
        if (!icon) {
            icon = image.getAttribute('value');
            if (!icon) {
                return;
            }
        }
        let iconOptions = new this.styleEditor.options.markerType(this.styleEditor).getIconOptions();
        if (color) {
            iconOptions.iconColor = color;
        }
        image.innerHTML = '';
        // TODO ?!let iconOptions = new this.styleEditor.options.markerType(this.styleEditor).createSelectHTML(image, iconOptions, icon)
        image.setAttribute('value', icon);
    }
    /** create the selectBox with the icons in the correct color */
    _createColorSelect(color) {
        if (!this.selectOptions) {
            this.selectOptions = {};
        }
        if (color in this.selectOptions) {
            return;
        }
        let selectOptionWrapper = L.DomUtil.create('ul', this.selectOptionWrapperClasses, this.uiElement);
        this.util.getMarkersForColor(color).forEach(function (option) {
            let selectOption = L.DomUtil.create('li', this._selectOptionClasses, selectOptionWrapper);
            let selectImage = this._createSelectInputImage(selectOption);
            this._styleSelectInputImage(selectImage, option, color);
        }, this);
        this.selectOptions[color] = selectOptionWrapper;
        L.DomEvent.addListener(selectOptionWrapper, 'click', function (e) {
            e.stopPropagation();
            let target = e.target;
            if (target.nodeName === 'UL') {
                return;
            }
            const parentNode = target.parentNode;
            if (parentNode.className === 'leaflet-styleeditor-select-image') {
                target = parentNode;
            }
            else {
                while (target && target.className !== 'leaflet-styleeditor-select-image') {
                    target = target.childNodes[0];
                }
            }
            this._selectMarker({
                'target': target
            }, this);
        }, this);
    }
    /** show/hide iconSelectBox */
    _toggleSelectInput(e) {
        let currentColorElement = this._getCurrentColorElement(this.util.rgbToHex(new this.styleEditor.options.markerType(this.styleEditor).getIconOptions().iconColor));
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
        this.selectBoxImage.setAttribute('value', value);
        this.setStyle(value);
        this._hideSelectOptions();
    }
    /** helper function to return attribute value of target */
    _getValue(target) {
        return target.getAttribute('value');
    }
    /** return correct selectBox depending on which color is currently chosen */
    _getCurrentColorElement(color) {
        if (!this.selectOptions[color]) {
            this._createColorSelect(color);
        }
        return this.selectOptions[color];
    }
    /** hide open SelectOption */
    _hideSelectOptions() {
        for (let selectOption in this.selectOptions) {
            this.util.hideElement(this.selectOptions[selectOption]);
        }
    }
}
exports.IconElement = IconElement;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OpacityElement = void 0;
const _1 = __webpack_require__(14);
/**
 * FormElement used to style opacity
 */
class OpacityElement extends _1.FormElement {
    /** create number input box */
    createContent() {
        this.label = L.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.uiElement);
        this.slider = L.DomUtil.create('input', 'leaflet-styleeditor-input', this.uiElement);
        this.slider.type = 'range';
        this.slider.max = '1';
        this.slider.min = '0';
        this.slider.step = '0.01';
        this.slider.value = '0.5';
        // add event listeners
        L.DomEvent.addListener(this.slider, 'change', this._setStyle, this);
        L.DomEvent.addListener(this.slider, 'input', this._setStyle, this);
        L.DomEvent.addListener(this.slider, 'keyup', this._setStyle, this);
        L.DomEvent.addListener(this.slider, 'mouseup', this._setStyle, this);
    }
    /** set correct value */
    style() {
        this.slider.value = this.util.getStyle(this.styleOption);
        this.label.innerText = (100 * parseInt(this.slider.value)).toString + '%';
    }
    /** communicate opacity value */
    _setStyle() {
        this.setStyle(this.slider.value);
    }
}
exports.OpacityElement = OpacityElement;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupContentElement = void 0;
const _1 = __webpack_require__(14);
/**
 * FormElement used for adding a description to marker or geometry.
 */
class PopupContentElement extends _1.FormElement {
    constructor() {
        super(...arguments);
        this.title = 'Description';
    }
    createContent() {
        this.textArea = L.DomUtil.create('textarea', 'leaflet-styleeditor-input', this.uiElement);
        L.DomEvent.addListener(this.textArea, 'change', this._setStyle, this);
    }
    /** set correct value */
    style() {
        let selectedElement = this.styleEditor.getCurrentMarker()[0];
        if (selectedElement && selectedElement.options) {
            this.textArea.value = selectedElement.options.popupContent || '';
        }
    }
    /** communicate popupContent value */
    _setStyle() {
        let layers = this.styleEditor.getCurrentLayers();
        let inputText = this.textArea.value;
        // update layer (or all layers of a layerGroup)
        for (let i = 0; i < layers.length; i++) {
            let layer = layers[i];
            if (layer && layer.getPopup && layer.bindPopup) {
                let popup1 = layer.getPopup();
                if (popup1) {
                    popup1.setContent(inputText);
                }
                else {
                    layer.bindPopup(inputText);
                }
                /* TODO ?! tmp store the text content for init next time
                layer.options = layer.options || {}
                layer.options.popupContent = inputText */
            }
        }
        this.setStyle(inputText);
    }
}
exports.PopupContentElement = PopupContentElement;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeElement = void 0;
const _1 = __webpack_require__(14);
/**
 * FormElement to set style of an icon
 */
class SizeElement extends _1.FormElement {
    constructor() {
        super(...arguments);
        this.title = 'size';
    }
    /** create the 3 standard icon sizes */
    createContent() {
        // TODO 
        const markerType = new this.styleEditor.options.markerType(this.styleEditor);
        let select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-small', this.uiElement);
        L.DomEvent.addListener(select, 'click', function () {
            this.setStyle(markerType.size.small);
        }, this);
        select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-medium', this.uiElement);
        L.DomEvent.addListener(select, 'click', function () {
            this.setStyle(markerType.size.medium);
        }, this);
        select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-large', this.uiElement);
        L.DomEvent.addListener(select, 'click', function () {
            this.setStyle(markerType.size.large);
        }, this);
    }
}
exports.SizeElement = SizeElement;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightElement = void 0;
const _1 = __webpack_require__(14);
/**
 * FormElement used to style weight
 */
class WeightElement extends _1.FormElement {
    /** create number input box */
    createContent() {
        this.label = L.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.uiElement);
        this.weight = L.DomUtil.create('input', 'leaflet-styleeditor-input', this.uiElement);
        this.weight.type = 'range';
        this.weight.min = '0';
        this.weight.max = '20';
        this.weight.step = '1';
        this.weight.value = '4';
        // add event listeners
        L.DomEvent.addListener(this.weight, 'change', this._setStyle, this);
        L.DomEvent.addListener(this.weight, 'input', this._setStyle, this);
        L.DomEvent.addListener(this.weight, 'keyup', this._setStyle, this);
        L.DomEvent.addListener(this.weight, 'mouseup', this._setStyle, this);
    }
    /** set correct value */
    style() {
        this.weight.value = this.util.getStyle(this.styleOption);
        this.label.innerText = this.weight.value;
    }
    /** communicate weight value */
    _setStyle() {
        this.setStyle(this.weight.value);
    }
}
exports.WeightElement = WeightElement;


/***/ })
/******/ ]);
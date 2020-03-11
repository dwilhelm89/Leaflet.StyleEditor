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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const StyleEditorControlOptions_1 = __webpack_require__(8);
exports.DefaultStyleEditorControlOptions = StyleEditorControlOptions_1.DefaultStyleEditorControlOptions;
const StyleEditorClassOptions_1 = __webpack_require__(9);
exports.DefaultStyleEditorClassOptions = StyleEditorClassOptions_1.DefaultStyleEditorClassOptions;
const StyleEditorOptions_1 = __webpack_require__(14);
exports.DefaultStyleEditorOptions = StyleEditorOptions_1.DefaultStyleEditorOptions;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const StyleForm_1 = __webpack_require__(7);
const Util_1 = __webpack_require__(0);
const options_1 = __webpack_require__(1);
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
        new StyleForm_1.StyleForm(this.map, editorUI, styleEditorInterior, this.options.markerForm, this.options.geometryForm);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Form_1 = __webpack_require__(10);
exports.Form = Form_1.Form;
const MarkerForm_1 = __webpack_require__(11);
exports.MarkerForm = MarkerForm_1.MarkerForm;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(0);
/** FormElements are part of a Form for a specific styling option (i.e. color) */
class FormElement {
    /* TODO
    // if no title is given use styling option
    if(!this.options.title && !!this.options.styleOption) {
    this.options.title = this.options.styleOption.charAt(0).toUpperCase() + this.options.styleOption.slice(1)
  }*/
    constructor(styleOption, parentForm, parentUiElement, title) {
        this.util = Util_1.Util.getInstance();
        this.styleOption = styleOption;
        this.title = title || styleOption;
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
        title.innerHTML = this.title + ':';
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
    setStyle(value, currentElement) {
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(6);
const StyleEditorClass_1 = __webpack_require__(2);
const StyleEditorControl_1 = __webpack_require__(15);
__webpack_require__(16);
L.StyleEditor = StyleEditorClass_1.StyleEditorClass;
L.styleEditor = function (map, options) { return new StyleEditorClass_1.StyleEditorClass(map, options); };
L.Control.StyleEditor = StyleEditorControl_1.StyleEditorControl;
L.control.styleEditor = function (options) { return new StyleEditorControl_1.StyleEditorControl(options); };
exports.default = L;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(0);
class StyleForm {
    constructor(map, styleEditorDiv, styleEditorInterior, markerForm, geometryForm) {
        this.util = Util_1.Util.getInstance();
        this.map = map;
        this.styleEditorDiv = styleEditorDiv;
        this.styleEditorInterior = styleEditorInterior;
        this.markerForm = this.createMarkerForm(markerForm);
        this.geometryForm = this.createGeometryForm(geometryForm);
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
    createMarkerForm(markerForm) {
        let markerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-marker', this.styleEditorInterior);
        return new markerForm(markerDiv);
    }
    createGeometryForm(geometryForm) {
        let markerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-geometry', this.styleEditorInterior);
        return new geometryForm(markerDiv);
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const form_1 = __webpack_require__(3);
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(0);
/**
 * Forms consist of FormElements and are shown in the StyleForm
 * There exists a MarkerForm to modify Markers and a GeometryForm to modify Geometries (i.e. rectangles...)
 * Style options based on:
 *     - path: https://leafletjs.com/reference.html#path-options
 *     - icon: https://leafletjs.com/reference.html#icon
 */
class Form {
    constructor(formOptionKey, parentUiElement, formElements) {
        this.initializedElements = {};
        this.util = Util_1.Util.getInstance();
        this.formOptionsKey = formOptionKey;
        this.parentUiElement = parentUiElement;
        this.formElements = formElements;
        this.create();
    }
    /** create every FormElement in the parentUiElement */
    create() {
        for (let key in this.formElements) {
            const formElement = this.getFormElementClass(key);
            if (formElement !== undefined) {
                this.initializedElements[key] = new formElement(this, this.parentUiElement);
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(3);
const formElements_1 = __webpack_require__(12);
const formOptionKey = 'marker';
const formElements = {
    //'icon': new IconElement(),
    'color': formElements_1.ColorElement
    //'size': new SizeElement(),
    //'popupContent': new PopupContentElement()
};
/** Form used to enable modification of a Geometry */
class MarkerForm extends _1.Form {
    constructor(parentUiElement) {
        super(formOptionKey, parentUiElement, formElements);
    }
}
exports.MarkerForm = MarkerForm;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ColorElement_1 = __importDefault(__webpack_require__(13));
exports.ColorElement = ColorElement_1.default;
const FormElement_1 = __webpack_require__(4);
exports.FormElement = FormElement_1.FormElement;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FormElement_1 = __webpack_require__(4);
const title = "color";
const styleOption = "color";
/**
 *  FormElement used to style the color
 */
class ColorElement extends FormElement_1.FormElement {
    constructor(parentForm, parentUiElement) {
        super(styleOption, parentForm, parentUiElement, title);
    }
    createContent() {
        this.colorPickerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-colorpicker', this.uiElement);
        this.getColorRamp().forEach(this.setSelectCallback, this);
    }
    /** create of get already created colorRamp */
    getColorRamp() {
        /* TODO
        if (!this.options.colorRamp) {
          // if markers have own colorRamp use it
          if (this.options.parentForm instanceof MarkerForm && !!this.styleEditor.options.markerType.options.colorRamp) {
            this.options.colorRamp = this.styleEditor.options.markerType.options.colorRamp
            // else use the default
          } else {
            this.options.colorRamp = this.styleEditor.options.colorRamp
          }
        }
        return this.options.colorRamp */
        return ['#000'];
    }
    /** define what to do when color is changed */
    setSelectCallback(color) {
        let elem = L.DomUtil.create('div', 'leaflet-styleeditor-color', this.colorPickerDiv);
        elem.style.backgroundColor = color;
        L.DomEvent.addListener(elem, 'click', this.selectColor, this);
    }
    /** set style for chosen color */
    selectColor(e) {
        e.stopPropagation();
        this.setStyle(this.util.rgbToHex(e.target.style.backgroundColor));
        // marker styling needs additional function calls
        if (e.target instanceof L.Marker) {
            // TODO this.styleEditor.options.markerType.setNewMarker(e)
        }
    }
}
exports.default = ColorElement;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(1);
exports.DefaultStyleEditorOptions = Object.assign(Object.assign(Object.assign({}, _1.DefaultStyleEditorClassOptions), _1.DefaultStyleEditorControlOptions), { strings: {
        title: _1.DefaultStyleEditorControlOptions.strings.title,
        cancel: _1.DefaultStyleEditorControlOptions.strings.cancel,
        cancelTitle: _1.DefaultStyleEditorControlOptions.strings.cancelTitle,
        tooltip: _1.DefaultStyleEditorClassOptions.strings.tooltip,
        hide: _1.DefaultStyleEditorClassOptions.strings.hide
    } });


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const StyleEditorClass_1 = __webpack_require__(2);
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);
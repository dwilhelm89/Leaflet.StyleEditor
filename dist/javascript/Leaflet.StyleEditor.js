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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(__webpack_require__(0));
const Util_1 = __importDefault(__webpack_require__(2));
/** FormElements are part of a Form for a specific styling option (i.e. color) */
class FormElement {
    constructor() {
        this.util = Util_1.default.getInstance();
    }
    /* TODO
    // if no title is given use styling option
    if(!this.options.title && !!this.options.styleOption) {
    this.options.title = this.options.styleOption.charAt(0).toUpperCase() + this.options.styleOption.slice(1)
  }*/
    /** create uiElement and content */
    create(parentUiElement) {
        this.options.uiElement =
            leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-uiElement', parentUiElement);
        this.createTitle();
        this.createContent();
    }
    /** create title */
    createTitle() {
        let title = leaflet_1.default.DomUtil.create('label', 'leaflet-styleeditor-label', this.options.uiElement);
        title.innerHTML = this.options.title + ':';
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
        this.util.showElement(this.options.uiElement);
    }
    /** hide the FormElement */
    hide() {
        this.util.hideElement(this.options.uiElement);
    }
    /** style the FormElement */
    style(currentElement) {
    }
    /** what to do when lost focus */
    lostFocus() {
    }
    /** set style - used when the FormElement wants to change the styling option */
    setStyle(value) {
        let currentElement = this.util.getCurrentElement();
        // check whether a layer is part of a layerGroup
        let layers = leaflet_1.default.Layer[currentElement];
        if (currentElement instanceof leaflet_1.default.LayerGroup) {
            layers = currentElement.getLayers;
        }
        // update layer (or all layers of a layerGroup)
        for (let i = 0; i < layers.length; i++) {
            let layer = layers[i];
            if (layer instanceof leaflet_1.default.Marker) {
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
        this.options.parentForm.style();
    }
}
exports.default = FormElement;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(__webpack_require__(0));
/**
 * Helper functions used throuhgout the project
 */
class Util {
    constructor(styleEditor) {
        this.styleEditor = styleEditor;
    }
    static createInstance(styleEditor) {
        Util.instance = new Util(styleEditor);
    }
    static getInstance() {
        return Util.instance;
    }
    // TODO element type
    fireEvent(eventName, element) {
        this.styleEditor.map.fireEvent(this.styleEditor.options.styleEditorEventPrefix + eventName, element);
    }
    // TODO element type
    /** fire an event if Leaflet.StyleEditor changed something */
    fireChangeEvent(element) {
        this.fireEvent('changed', element);
    }
    /** hide the given element */
    hideElement(element) {
        if (element) {
            leaflet_1.default.DomUtil.addClass(element, 'leaflet-styleeditor-hidden');
        }
    }
    /** convert rgb to hex of a color
     * @param {string} rgb - rgb representation of the color
     * @param {boolean} noHash - define if return value should not include hash
     */
    rgbToHex(rgb, noHash = false) {
        if (!rgb) {
            rgb = this.styleEditor.options.defaultColor;
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
        if (!this.styleEditor.currentElement) {
            return null;
        }
        if (this.styleEditor.currentElement.target !== undefined) {
            return this.styleEditor.currentElement.target;
        }
        return this.styleEditor.currentElement;
    }
    /** set which element is selected to be styled */
    setCurrentElement(currentElement) {
        this.styleEditor.currentElement.target = currentElement;
    }
    /** does current element have the fill option */
    fillCurrentElement() {
        return this.getCurrentElement().options.fill;
    }
    /** get current style of current element */
    getStyle(option) {
        let currentElement = this.getCurrentElement();
        let style = currentElement.options[option];
        if (style) {
            return style;
        }
        return null;
    }
    /** set new style to current element */
    setStyle(option, value) {
        let currentElement = this.getCurrentElement();
        if (currentElement instanceof leaflet_1.default.Marker) {
            this.styleEditor.options.markerType.setStyle(currentElement, option, value);
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
            leaflet_1.default.DomUtil.removeClass(element, 'leaflet-styleeditor-hidden');
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
        let markers = this.styleEditor.options.markerType.options.markers;
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
        defaultMarker = this.styleEditor.options.markerType.options.defaultMarkerIcon;
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
exports.default = Util;


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const IconOptions_1 = __webpack_require__(15);
exports.IconOptions = IconOptions_1.IconOptions;
const Size_1 = __webpack_require__(16);
exports.Size = Size_1.Size;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Form_1 = __importDefault(__webpack_require__(6));
exports.Form = Form_1.default;
const GeometryForm_1 = __importDefault(__webpack_require__(19));
exports.GeometryForm = GeometryForm_1.default;
const MarkerForm_1 = __importDefault(__webpack_require__(20));
exports.MarkerForm = MarkerForm_1.default;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __importDefault(__webpack_require__(2));
class FormOptions {
}
exports.FormOptions = FormOptions;
/**
 * Forms consist of FormElements and are shown in the StyleForm
 * There exists a MarkerForm to modify Markers and a GeometryForm to modify Geometries (i.e. rectangles...)
 * Style options based on:
 *     - path: https://leafletjs.com/reference.html#path-options
 *     - icon: https://leafletjs.com/reference.html#icon
 */
class Form {
    constructor() {
        this.util = Util_1.default.getInstance();
    }
    /** create every FormElement in the parentUiElement */
    create(parentUiElement) {
        this.options.parentUiElement = parentUiElement;
        let formElements = this.getFormElements();
        let styleFormKeys = Object.keys(formElements);
        for (let i = 0; i < styleFormKeys.length; i++) {
            let formElement = this.getFormElementClass(styleFormKeys[i]);
            if (formElement !== undefined) {
                formElement.create(parentUiElement);
                this.options.initializedElements.push(formElement);
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
        for (let i = 0; i < this.options.initializedElements.length; i++) {
            this.options.initializedElements[i].hide();
        }
    }
    /** hide the Form */
    hideForm() {
        this.util.hideElement(this.options.parentUiElement);
    }
    /** make FormElements and Form visible */
    show() {
        this.preShow();
        this.showFormElements();
        this.showForm();
        this.style();
    }
    /** hook which is called at the beginning of the show function */
    preShow() {
    }
    /** make every FormElement visible */
    showFormElements() {
        for (let i = 0; i < this.options.initializedElements.length; i++) {
            this.showFormElement(this.options.initializedElements[i]);
        }
    }
    /** make the Form visible */
    showForm() {
        this.util.showElement(this.options.parentUiElement);
    }
    /** inform FormElements the selected style has changed, so they can adapt */
    style() {
        for (let i = 0; i < this.options.initializedElements.length; i++) {
            this.options.initializedElements[i].style();
        }
    }
    /** inform Form it lost it's focus */
    lostFocus() {
        for (let i = 0; i < this.options.initializedElements.length; i++) {
            this.options.initializedElements[i].lostFocus();
        }
    }
    /**
     * @returns a Boolean indicating if the @param formElement should be shown
     */
    showFormElement(formElement) {
        // check wether element should be shown or not
        if (this.showFormElementForStyleOption(formElement.options.styleOption)) {
            formElement.show();
        }
        else {
            formElement.hide();
        }
    }
    /**
     * get the currently used formElements
     * either standard or the ones provided while instanciation
     */
    getFormElements() {
        let formElements;
        formElements = this.options.formElements;
        return formElements;
    }
    /**
     * get the Class of the Formelement to instanciate
     * @param {*} styleOption, the styleOption to get the FormElement for
     */
    getFormElementClass(styleOption) {
        let formElements = this.getFormElements();
        let formElementKeys = Object.keys(formElements);
        if (formElementKeys.indexOf(styleOption) >= 0) {
            let FormElement = formElements[styleOption];
            if (FormElement) {
                // may be a dictionary
                if (typeof FormElement === 'boolean') {
                    return this.getFormElementStandardClass(styleOption);
                }
                if ('formElement' in FormElement && 'boolean' in FormElement) {
                    FormElement = FormElement['formElement'];
                }
                // try to instantiate FormElementOption and return StandardClass if it does not work
                try {
                    let formElementInstance = new FormElement({
                        styleOption: styleOption,
                        parentForm: this
                    });
                    if (formElementInstance instanceof FormElement) {
                        return formElementInstance;
                    }
                }
                catch (e) {
                    // creating instance failed fallback to StandardClass
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
        let formElements = this.getFormElements();
        if (styleOption in formElements) {
            let styleFormElement = formElements[styleOption];
            // maybe a function is given to declare when to show the FormElement
            if (typeof styleFormElement === 'function') {
                try {
                    return styleFormElement(this.util.getCurrentElement());
                }
                catch (err) {
                    // the given function presumably is a constructor -> always show it
                    return true;
                }
            }
            // maybe a boolean is given to indicate whether to show it
            if (typeof styleFormElement === 'boolean') {
                return styleFormElement;
            }
            // check for dictionary
            if ('boolean' in styleFormElement) {
                // in a dictionary boolean may be a function or boolean
                if (typeof styleFormElement['boolean'] === 'function') {
                    return styleFormElement['boolean'](this.util.getCurrentElement());
                }
                return styleFormElement['boolean'];
            }
            return true;
        }
        return false;
    }
    /**
     * get Leaflet.StyleEditor standard FormElement class for given styleOption
     * @param {*} styleOption, the styleOption to get the standard class for
     */
    getFormElementStandardClass(styleOption) {
        return new this.options.formElements[styleOption]({ styleOption: styleOption, parentForm: this });
    }
}
exports.default = Form;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(__webpack_require__(0));
const FormElement_1 = __importDefault(__webpack_require__(1));
/**
 *  FormElement used to style the color
 */
class ColorElement extends FormElement_1.default {
    createContent() {
        this.options.colorPickerDiv = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-colorpicker', this.options.uiElement);
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
        let elem = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-color', this.options.colorPickerDiv);
        elem.style.backgroundColor = color;
        leaflet_1.default.DomEvent.addListener(elem, 'click', this._selectColor, this);
    }
    /** set style for chosen color */
    _selectColor(e) {
        e.stopPropagation();
        this.setStyle(this.util.rgbToHex(e.target.style.backgroundColor));
        // marker styling needs additional function calls
        if (e.target instanceof leaflet_1.default.Marker) {
            // TODO this.styleEditor.options.markerType.setNewMarker(e)
        }
    }
}
exports.default = ColorElement;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(__webpack_require__(0));
const FormElement_1 = __importDefault(__webpack_require__(1));
/**
 * FormElement used for styling the dash attribute
 */
class DashElement extends FormElement_1.default {
    /** create the three standard dash options */
    createContent() {
        let uiElement = this.options.uiElement;
        let stroke = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-stroke', uiElement);
        stroke.style.backgroundPosition = '0px -75px';
        leaflet_1.default.DomEvent.addListener(stroke, 'click', function () {
            this.setStyle('1');
        }, this);
        stroke = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-stroke', uiElement);
        stroke.style.backgroundPosition = '0px -95px';
        leaflet_1.default.DomEvent.addListener(stroke, 'click', function () {
            this.setStyle('10, 10');
        }, this);
        stroke = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-stroke', uiElement);
        stroke.style.backgroundPosition = '0px -115px';
        leaflet_1.default.DomEvent.addListener(stroke, 'click', function () {
            this.setStyle('15, 10, 1, 10');
        }, this);
    }
}
exports.default = DashElement;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(__webpack_require__(0));
const FormElement_1 = __importDefault(__webpack_require__(1));
/**
 * FormElement used to style opacity
 */
class OpacityFormElement extends FormElement_1.default {
    /** create number input box */
    createContent() {
        this.options.label = leaflet_1.default.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.options.uiElement);
        let slider = leaflet_1.default.DomUtil.create('input', 'leaflet-styleeditor-input', this.options.uiElement);
        slider.type = 'range';
        slider.max = String(1);
        slider.min = String(0);
        slider.step = String(0.01);
        slider.value = String(0.5);
        // add event listeners
        leaflet_1.default.DomEvent.addListener(slider, 'change', this._setStyle, this);
        leaflet_1.default.DomEvent.addListener(slider, 'input', this._setStyle, this);
        leaflet_1.default.DomEvent.addListener(slider, 'keyup', this._setStyle, this);
        leaflet_1.default.DomEvent.addListener(slider, 'mouseup', this._setStyle, this);
    }
    /** set correct value */
    style() {
        this.options.slider.value = this.util.getStyle(this.options.styleOption);
        this.options.label.innerText = 100 * parseInt(this.options.slider.value) + '%';
    }
    /** communicate opacity value */
    _setStyle() {
        this.setStyle(this.options.slider.value);
    }
}
exports.default = OpacityFormElement;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(__webpack_require__(0));
const FormElement_1 = __importDefault(__webpack_require__(1));
/**
 * FormElement used for adding a description to marker or geometry.
 */
class PopupContentElement extends FormElement_1.default {
    createContent() {
        let uiElement = this.options.uiElement;
        let textArea = this.options.descTextAreaField = leaflet_1.default.DomUtil.create('textarea', 'leaflet-styleeditor-input', uiElement);
        leaflet_1.default.DomEvent.addListener(textArea, 'change', this._setStyle, this);
    }
    /** set correct value */
    style() {
        let selectedElement = this.util.getCurrentElement();
        if (selectedElement && selectedElement.options) {
            this.options.descTextAreaField.value = selectedElement.options.popupContent || '';
        }
    }
    /** communicate popupContent value */
    _setStyle() {
        let currentElement = this.util.getCurrentElement();
        let inputText = this.options.descTextAreaField.value;
        // check whether a layer is part of a layerGroup
        let layers = [currentElement];
        if (currentElement instanceof leaflet_1.default.LayerGroup) {
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
        this.setStyle(inputText);
    }
}
exports.default = PopupContentElement;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(__webpack_require__(0));
const FormElement_1 = __importDefault(__webpack_require__(1));
/**
 * FormElement used to style weight
 */
class WeigthElement extends FormElement_1.default {
    /** create number input box */
    createContent() {
        this.options.label = leaflet_1.default.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.options.uiElement);
        let weight = leaflet_1.default.DomUtil.create('input', 'leaflet-styleeditor-input', this.options.uiElement);
        weight.type = 'range';
        weight.min = String(0);
        weight.max = String(20);
        weight.step = String(1);
        weight.value = String(4);
        this.options.weight = weight;
        // add event listeners
        leaflet_1.default.DomEvent.addListener(weight, 'change', this._setStyle, this);
        leaflet_1.default.DomEvent.addListener(weight, 'input', this._setStyle, this);
        leaflet_1.default.DomEvent.addListener(weight, 'keyup', this._setStyle, this);
        leaflet_1.default.DomEvent.addListener(weight, 'mouseup', this._setStyle, this);
    }
    /** set correct value */
    style() {
        this.options.weight.value = this.util.getStyle(this.options.styleOption);
        this.options.label.innerText = this.options.weight.value;
    }
    /** communicate weight value */
    _setStyle() {
        this.setStyle(this.options.weight.value);
    }
}
exports.default = WeigthElement;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importStar(__webpack_require__(0));
const Util_1 = __importDefault(__webpack_require__(2));
const DefaultMarker_1 = __webpack_require__(14);
const StyleEditor_1 = __webpack_require__(24);
const StyleForm_1 = __importDefault(__webpack_require__(26));
class StyleEditorControl extends leaflet_1.Control {
    constructor(options = defaultOptions) {
        super();
        this.util = Util_1.default.getInstance();
        this.styleEditor = new StyleEditor_1.StyleEditor();
        this.options = options;
    }
    onAdd(map) {
        this.styleEditor.map = map;
        return this.createUi();
    }
    fireEvent(eventName, element) {
        this.util.fireEvent(eventName, element);
    }
    createUi() {
        this.controlDiv = leaflet_1.default.DomUtil.create('div', 'leaflet-control-styleeditor leaflet-control leaflet-bar');
        this.controlUI = leaflet_1.default.DomUtil.create('a', 'leaflet-control-styleeditor-interior', this.controlDiv);
        this.controlUI.title = 'Style Editor';
        this.cancelUI = leaflet_1.default.DomUtil.create('div', 'leaflet-control-styleeditor-cancel leaflet-styleeditor-hidden', this.controlDiv);
        this.cancelUI.innerHTML = this.styleEditor.options.strings.cancel;
        this.cancelUI.title = this.styleEditor.options.strings.cancelTitle;
        this.styleEditorDiv = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor', this.styleEditor.map.getContainer);
        this.styleEditorHeader = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-header', this.styleEditorDiv);
        this.styleEditorInterior = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-interior', this.styleEditorDiv);
        this.addDomEvents();
        this.addEventListeners();
        this.addButtons();
        this.styleForm = new StyleForm_1.default({
            styleEditorDiv: this.styleEditorDiv,
            styleEditorInterior: this.styleEditorInterior,
        });
        return this.controlDiv;
    }
    addDomEvents() {
        leaflet_1.default.DomEvent.disableScrollPropagation(this.styleEditorDiv);
        leaflet_1.default.DomEvent.disableScrollPropagation(this.controlDiv);
        leaflet_1.default.DomEvent.disableScrollPropagation(this.cancelUI);
        leaflet_1.default.DomEvent.disableClickPropagation(this.styleEditorDiv);
        leaflet_1.default.DomEvent.disableClickPropagation(this.controlDiv);
        leaflet_1.default.DomEvent.disableClickPropagation(this.cancelUI);
        leaflet_1.default.DomEvent.on(this.controlDiv, 'click', function () {
            this.toggle();
        }, this);
    }
    addEventListeners() {
        this.addLeafletDrawEvents();
        this.addLeafletEditableEvents();
    }
    addLeafletDrawEvents() {
        if (!this.options.openOnLeafletDraw || !leaflet_1.default.Control.Draw) {
            return;
        }
        this.styleEditor.map.on('layeradd', this.onLayerAdd, this);
        this.styleEditor.map.on(leaflet_1.default.Draw.Event.CREATED, this.onLayerCreated, this);
    }
    addLeafletEditableEvents() {
        if (!this.options.openOnLeafletEditable || !leaflet_1.default.Editable) {
            return;
        }
        this.styleEditor.map.on('layeradd', this.onLayerAdd, this);
        this.styleEditor.map.on('editable:created', this.onLayerCreated, this);
    }
    onLayerCreated(layer) {
        this.removeIndicators();
        this.styleEditor.currentElement = layer.layer;
    }
    onLayerAdd(e) {
        if (this.styleEditor.currentElement) {
            if (e.layer === this.util.getCurrentElement()) {
                this.enable(e.layer);
            }
        }
    }
    onRemove() {
        // hide everything that may be visible
        // remove edit events for layers
        // remove tooltip
        this.disable();
        // remove events
        this.removeDomEvents();
        this.removeEventListeners();
        // remove dom elements
        leaflet_1.default.DomUtil.remove(this.styleEditorDiv);
        leaflet_1.default.DomUtil.remove(this.cancelUI);
        // delete dom elements
        delete this.styleEditorDiv;
        delete this.cancelUI;
    }
    removeEventListeners() {
        this.styleEditor.map.off('layeradd', this.onLayerAdd);
        if (leaflet_1.default.Draw) {
            this.styleEditor.map.off(leaflet_1.default.Draw.Event.CREATED, this.onLayerCreated);
        }
        if (leaflet_1.default.Editable) {
            this.styleEditor.map.off('editable:created', this.onLayerCreated);
        }
    }
    removeDomEvents() {
        leaflet_1.default.DomEvent.off(this.controlDiv, 'click', function () {
            this.toggle();
        }, this);
    }
    addButtons() {
        let nextBtn = leaflet_1.default.DomUtil.create('button', 'leaflet-styleeditor-button styleeditor-nextBtn', this.styleEditorHeader);
        nextBtn.title = this.options.strings.tooltipNext;
        leaflet_1.default.DomEvent.on(nextBtn, 'click', function (e) {
            this.hideEditor();
            if (leaflet_1.default.DomUtil.hasClass(this.controlUI, 'enabled')) {
                this.createTooltip();
            }
            e.stopPropagation();
        }, this);
    }
    toggle() {
        if (leaflet_1.default.DomUtil.hasClass(this.controlUI, 'enabled')) {
            this.disable();
        }
        else {
            this.enable();
        }
    }
    enable(layer) {
        if (this._layerIsIgnored(layer)) {
            return;
        }
        leaflet_1.default.DomUtil.addClass(this.controlUI, 'enabled');
        this.styleEditor.map.eachLayer(this.addEditClickEvents, this);
        this.showCancelButton();
        this.createTooltip();
        if (layer !== undefined) {
            if (this.isEnabled()) {
                this.removeIndicators();
            }
            this.initChangeStyle({ target: layer });
        }
    }
    isEnabled() {
        return leaflet_1.default.DomUtil.hasClass(this.controlUI, 'enabled');
    }
    disable() {
        if (this.isEnabled()) {
            this.editLayers.forEach(this.removeEditClickEvents, this);
            this.editLayers = [];
            this.layerGroups = [];
            this.hideEditor();
            this.hideCancelButton();
            this.removeTooltip();
            leaflet_1.default.DomUtil.removeClass(this.controlUI, 'enabled');
        }
    }
    addEditClickEvents(layer) {
        if (this._layerIsIgnored(layer)) {
            return;
        }
        if (this.options.useGrouping && layer instanceof leaflet_1.default.LayerGroup) {
            this.layerGroups.push(layer);
        }
        else if (layer instanceof leaflet_1.default.Marker || layer instanceof leaflet_1.default.Path) {
            let evt = layer.on('click', this.initChangeStyle, this);
            this.editLayers.push(evt);
        }
    }
    removeEditClickEvents(layer) {
        layer.off('click', this.initChangeStyle, this);
    }
    addIndicators() {
        if (!this.styleEditor.currentElement) {
            return;
        }
        let currentElement = this.styleEditor.currentElement.target;
        if (currentElement instanceof leaflet_1.default.LayerGroup) {
            currentElement.eachLayer(function (layer) {
                if (layer instanceof leaflet_1.default.Marker && layer.getElement()) {
                    leaflet_1.default.DomUtil.addClass(layer.getElement(), 'leaflet-styleeditor-marker-selected');
                }
            });
        }
        else if (currentElement instanceof leaflet_1.default.Marker) {
            if (currentElement.getElement()) {
                leaflet_1.default.DomUtil.addClass(currentElement.getElement(), 'leaflet-styleeditor-marker-selected');
            }
        }
    }
    removeIndicators() {
        if (!this.styleEditor.currentElement) {
            return;
        }
        let currentElement = this.util.getCurrentElement();
        if (currentElement instanceof leaflet_1.default.LayerGroup) {
            currentElement.eachLayer(function (layer) {
                //TODO
                const anything = layer;
                if (anything.getElement()) {
                    leaflet_1.default.DomUtil.removeClass(anything.getElement(), 'leaflet-styleeditor-marker-selected');
                }
            });
        }
        else {
            if (currentElement.getElement()) {
                leaflet_1.default.DomUtil.removeClass(currentElement.getElement(), 'leaflet-styleeditor-marker-selected');
            }
        }
    }
    hideEditor() {
        if (leaflet_1.default.DomUtil.hasClass(this.styleEditorDiv, 'editor-enabled')) {
            this.removeIndicators();
            leaflet_1.default.DomUtil.removeClass(this.styleEditorDiv, 'editor-enabled');
            this.fireEvent('hidden');
        }
    }
    hideCancelButton() {
        leaflet_1.default.DomUtil.addClass(this.cancelUI, 'leaflet-styleeditor-hidden');
    }
    showEditor() {
        let editorDiv = this.styleEditorDiv;
        if (!leaflet_1.default.DomUtil.hasClass(editorDiv, 'editor-enabled')) {
            leaflet_1.default.DomUtil.addClass(editorDiv, 'editor-enabled');
            this.fireEvent('visible');
        }
    }
    showCancelButton() {
        leaflet_1.default.DomUtil.removeClass(this.cancelUI, 'leaflet-styleeditor-hidden');
    }
    initChangeStyle(e) {
        this.removeIndicators();
        this.styleEditor.currentElement = (this.options.useGrouping) ? this.getMatchingElement(e) : e;
        this.addIndicators();
        this.showEditor();
        this.removeTooltip();
        let layer = e;
        if (!(layer instanceof leaflet_1.default.Layer)) {
            layer = e.target;
        }
        this.fireEvent('editing', layer);
        if (layer instanceof leaflet_1.default.Marker) {
            // ensure iconOptions are set for Leaflet.Draw created Markers
            this.options.markerType.resetIconOptions(layer);
            // marker
            this.showMarkerForm(layer);
        }
        else {
            // layer with of type L.GeoJSON or L.Path (polyline, polygon, ...)
            this.showGeometryForm(layer);
        }
    }
    showGeometryForm(layer) {
        this.fireEvent('geometry', layer);
        this.styleForm.showGeometryForm();
    }
    showMarkerForm(layer) {
        this.fireEvent('marker', layer);
        this.styleForm.showMarkerForm();
    }
    createTooltip() {
        if (!this.options.showTooltip) {
            return;
        }
        if (!this.tooltipWrapper) {
            this.tooltipWrapper =
                leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-tooltip-wrapper', this.styleEditor.map.getContainer());
        }
        if (!this.tooltip) {
            this.tooltip = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-tooltip', this.tooltipWrapper);
        }
        this.tooltip.innerHTML = this.options.strings.tooltip;
    }
    getMatchingElement(e) {
        let group = null;
        let layer = e.target;
        for (let i = 0; i < this.layerGroups.length; ++i) {
            group = this.layerGroups[i];
            if (group && layer !== group && group.hasLayer(layer)) {
                // we use the opacity style to check for correct object
                if (!group.options || !group.options.opacity) {
                    group.options = layer.options;
                    // special handling for layers... we pass the setIcon function
                    if (layer.setIcon) {
                        group.setIcon = function (icon) {
                            group.eachLayer(function (layer) {
                                if (layer instanceof leaflet_1.default.Marker) {
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
    }
    removeTooltip() {
        if (this.tooltip && this.tooltip.parentNode) {
            this.tooltip.remove();
            this.tooltip = undefined;
        }
    }
    _layerIsIgnored(layer) {
        if (layer === undefined) {
            return false;
        }
        return this.options.ignoreLayerTypes.some(layerType => layer.styleEditor && layer.styleEditor.type.toUpperCase() === layerType.toUpperCase());
    }
}
exports.StyleEditorControl = StyleEditorControl;
const defaultOptions = {
    position: 'topleft',
    colorRamp: ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad',
        '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b',
        '#bdc3c7', '#7f8c8d'],
    defaultColor: null,
    markers: null,
    defaultMarkerIcon: null,
    defaultMarkerColor: null,
    ignoreLayerTypes: [],
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
    forms: {},
    styleEditorEventPrefix: 'styleeditor:',
    markerType: new DefaultMarker_1.DefaultMarker()
};


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Control__WEBPACK_IMPORTED_MODULE_1__);


L.Marker.include({
  styleEditor: {
    type: 'Marker'
  }
});
L.Polygon.include({
  styleEditor: {
    type: 'Polygon'
  }
});
L.Polyline.include({
  styleEditor: {
    type: 'Polyline'
  }
});
L.Rectangle.include({
  styleEditor: {
    type: 'Rectangle'
  }
});
L.Control.StyleEditor = _Control__WEBPACK_IMPORTED_MODULE_1__["StyleEditorControl"];

L.control.styleEditor = function (options) {
  if (!options) {
    options = {};
  }

  return new L.Control.StyleEditor(options);
};

/* harmony default export */ __webpack_exports__["default"] = (L);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(__webpack_require__(0));
const Marker_1 = __webpack_require__(18);
const types_1 = __webpack_require__(4);
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
        return new leaflet_1.default.Icon({
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
/* 15 */
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
/* 16 */
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
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(__webpack_require__(0));
const form_1 = __webpack_require__(5);
const Util_1 = __importDefault(__webpack_require__(2));
const types_1 = __webpack_require__(4);
/**
 * The Base class for different markers
 */
class Marker {
    constructor() {
        this.util = Util_1.default.getInstance();
        /** define markerForm used to style the Marker */
        this.markerForm = new form_1.MarkerForm();
        if (this.options.selectIconClass !== '' && !this.options.selectIconClass.startsWith('leaflet-styleeditor-select-image')) {
            this.options.selectIconClass = 'leaflet-styleeditor-select-image-' + this.options.selectIconClass;
        }
    }
    /** create new Marker and show it */
    setNewMarker(currentElement) {
        let newIcon = this._createMarkerIcon(currentElement);
        currentElement = currentElement.target;
        currentElement.setIcon(newIcon);
        if (currentElement instanceof leaflet_1.default.LayerGroup) {
            currentElement.eachLayer(function (layer) {
                const layer2 = layer; // TODO find out where getElement comes from…
                leaflet_1.default.DomUtil.addClass(layer2.getElement(), 'leaflet-styleeditor-marker-selected');
            });
        }
        else {
            leaflet_1.default.DomUtil.addClass(currentElement.getElement(), 'leaflet-styleeditor-marker-selected');
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(0);
const Form_1 = __importStar(__webpack_require__(6));
const ColorElement_1 = __importDefault(__webpack_require__(7));
const DashElement_1 = __importDefault(__webpack_require__(8));
const OpacityElement_1 = __importDefault(__webpack_require__(9));
const PopupContentElement_1 = __importDefault(__webpack_require__(10));
const WeightElement_1 = __importDefault(__webpack_require__(11));
class GeometryFormOptions extends Form_1.FormOptions {
    constructor() {
        super();
        this.formOptionKey = 'geometry';
        this.formElements = {
            'color': new ColorElement_1.default(),
            'opacity': new OpacityElement_1.default(),
            'weight': new WeightElement_1.default(),
            'dashArray': new DashElement_1.default(),
            'fillColor': new ColorElement_1.default(),
            'fillOpacity': new OpacityElement_1.default(),
            'popupContent': new PopupContentElement_1.default()
        };
    }
}
/** Form used to enable modification of a Geometry */
class GeometryForm extends Form_1.default {
    constructor() {
        super(...arguments);
        this.options = new GeometryFormOptions();
    }
    /** show the fillOptions (fillColor and fillOpacity) only if the Element can be filled */
    showFormElements() {
        for (let i = 0; i < this.options.initializedElements.length; i++) {
            if (this.options.initializedElements[i].options.styleOption.indexOf('fill') === 0) {
                if (this.util.fillCurrentElement()) {
                    this.showFormElement(this.options.initializedElements[i]);
                }
                else {
                    this.options.initializedElements[i].hide();
                }
            }
            else {
                this.showFormElement(this.options.initializedElements[i]);
            }
        }
    }
}
exports.default = GeometryForm;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(5);
const IconElement_1 = __importDefault(__webpack_require__(22));
const ColorElement_1 = __importDefault(__webpack_require__(7));
const SizeElement_1 = __importDefault(__webpack_require__(23));
const PopupContentElement_1 = __importDefault(__webpack_require__(10));
/** Form used to enable modification of a Geometry */
class MarkerForm extends _1.Form {
    constructor() {
        super(...arguments);
        this.formOptionKey = 'marker';
        this.formElements = {
            'icon': new IconElement_1.default(),
            'color': new ColorElement_1.default(),
            'size': new SizeElement_1.default(),
            'popupContent': new PopupContentElement_1.default()
        };
    }
}
exports.default = MarkerForm;


/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(__webpack_require__(0));
const FormElement_1 = __importDefault(__webpack_require__(1));
/**
 * FormElement used for styling the icon
 */
class IconElement extends FormElement_1.default {
    constructor() {
        super(...arguments);
        // private classed used in the code
        this._selectOptionWrapperClasses = 'leaflet-styleeditor-select-option-wrapper leaflet-styleeditor-hidden';
        this._selectOptionClasses = 'leaflet-styleeditor-select-option';
    }
    /** create the icon selectBoxes */
    createContent() {
        let uiElement = this.options.uiElement;
        let selectBox = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-select', uiElement);
        this.options.selectBoxImage = this._createSelectInputImage(selectBox);
        leaflet_1.default.DomEvent.addListener(selectBox, 'click', this._toggleSelectInput, this);
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
        let wrapper = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-select-image-wrapper', parentUiElement);
        return leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-select-image', wrapper);
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
        let uiElement = this.options.uiElement;
        let selectOptionWrapper = leaflet_1.default.DomUtil.create('ul', this._selectOptionWrapperClasses, uiElement);
        this.util.getMarkersForColor(color).forEach(function (option) {
            let selectOption = leaflet_1.default.DomUtil.create('li', this._selectOptionClasses, selectOptionWrapper);
            let selectImage = this._createSelectInputImage(selectOption);
            this._styleSelectInputImage(selectImage, option, color);
        }, this);
        this.options.selectOptions[color] = selectOptionWrapper;
        leaflet_1.default.DomEvent.addListener(selectOptionWrapper, 'click', function (e) {
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
            show = leaflet_1.default.DomUtil.hasClass(currentColorElement, 'leaflet-styleeditor-hidden');
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
        this.setStyle(value);
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(__webpack_require__(0));
const FormElement_1 = __importDefault(__webpack_require__(1));
/**
 * FormElement to set style of an icon
 */
class SizeElement extends FormElement_1.default {
    /** create the 3 standard icon sizes */
    createContent() {
        let uiElement = this.options.uiElement;
        let select = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-small', uiElement);
        leaflet_1.default.DomEvent.addListener(select, 'click', function () {
            this.setStyle(this.options.styleEditorOptions.markerType.options.size.small);
        }, this);
        select = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-medium', uiElement);
        leaflet_1.default.DomEvent.addListener(select, 'click', function () {
            this.setStyle(this.options.styleEditorOptions.markerType.options.size.medium);
        }, this);
        select = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-large', uiElement);
        leaflet_1.default.DomEvent.addListener(select, 'click', function () {
            this.setStyle(this.options.styleEditorOptions.markerType.options.size.large);
        }, this);
    }
}
exports.default = SizeElement;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const form_1 = __webpack_require__(5);
__webpack_require__(25);
class StyleEditor {
    constructor(options) {
        this.currentElement = null; // TODO type
        this._editLayers = [];
        this._layerGroups = [];
        this.markerForm = new form_1.MarkerForm();
        this.geometryForm = new form_1.GeometryForm();
        this.options = options;
    }
}
exports.StyleEditor = StyleEditor;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(__webpack_require__(0));
const Util_1 = __importDefault(__webpack_require__(2));
class StyleForm {
    constructor(options) {
        this.util = Util_1.default.getInstance();
        this.options = options;
        this.createMarkerForm();
        this.createGeometryForm();
        this.addDOMEvents();
    }
    addDOMEvents() {
        leaflet_1.default.DomEvent.addListener(this.styleEditor.map, 'click', this.lostFocus, this);
        leaflet_1.default.DomEvent.addListener(this.options.styleEditorDiv, 'click', this.lostFocus, this);
    }
    clearForm() {
        this.styleEditor.markerForm.hide();
        this.styleEditor.geometryForm.hide();
    }
    createMarkerForm() {
        let markerDiv = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-interior-marker', this.options.styleEditorInterior);
        this.styleEditor.markerForm.create(markerDiv);
    }
    createGeometryForm() {
        let markerDiv = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-interior-geometry', this.options.styleEditorInterior);
        this.styleEditor.geometryForm.create(markerDiv);
    }
    showMarkerForm() {
        this.clearForm();
        this.styleEditor.markerForm.show();
    }
    showGeometryForm() {
        this.clearForm();
        this.styleEditor.geometryForm.show();
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
            if (!!parent.className && leaflet_1.default.DomUtil.hasClass(parent, 'leaflet-styleeditor-interior')) {
                return;
            }
            parent = parent.parentNode;
        }
        this.styleEditor.markerForm.lostFocus();
        this.styleEditor.geometryForm.lostFocus();
    }
}
exports.default = StyleForm;


/***/ })
/******/ ]);
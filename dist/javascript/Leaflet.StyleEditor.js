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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var leaflet_1 = __importDefault(__webpack_require__(0));

var Util_1 = __importDefault(__webpack_require__(4));
/** FormElements are part of a Form for a specific styling option (i.e. color) */


var FormElement =
/*#__PURE__*/
function () {
  function FormElement(styleEditor) {
    _classCallCheck(this, FormElement);

    this.util = Util_1.default.getInstance();
    this.styleEditor = styleEditor;
  }
  /* TODO
  // if no title is given use styling option
  if(!this.options.title && !!this.options.styleOption) {
  this.options.title = this.options.styleOption.charAt(0).toUpperCase() + this.options.styleOption.slice(1)
  }*/

  /** create uiElement and content */


  _createClass(FormElement, [{
    key: "create",
    value: function create(parentUiElement) {
      this.options.uiElement = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-uiElement', parentUiElement);
      this.createTitle();
      this.createContent();
    }
    /** create title */

  }, {
    key: "createTitle",
    value: function createTitle() {
      var title = leaflet_1.default.DomUtil.create('label', 'leaflet-styleeditor-label', this.options.uiElement);
      title.innerHTML = this.options.title + ':';
    }
    /** create content (where the actual modification takes place) */

  }, {
    key: "createContent",
    value: function createContent() {}
    /** style the FormElement and show it */

  }, {
    key: "show",
    value: function show() {
      this.style();
      this.showForm();
    }
    /** show the FormElement */

  }, {
    key: "showForm",
    value: function showForm() {
      this.util.showElement(this.options.uiElement);
    }
    /** hide the FormElement */

  }, {
    key: "hide",
    value: function hide() {
      this.util.hideElement(this.options.uiElement);
    }
    /** style the FormElement */

  }, {
    key: "style",
    value: function style() {}
    /** what to do when lost focus */

  }, {
    key: "lostFocus",
    value: function lostFocus() {}
    /** set style - used when the FormElement wants to change the styling option */

  }, {
    key: "setStyle",
    value: function setStyle(value) {
      var currentElement = this.util.getCurrentElement(); // check whether a layer is part of a layerGroup

      var layers = leaflet_1.default.Layer[currentElement];

      if (currentElement instanceof leaflet_1.default.LayerGroup) {
        layers = currentElement.getLayers;
      } // update layer (or all layers of a layerGroup)


      for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];

        if (layer instanceof leaflet_1.default.Marker) {
          this.styleEditor.options.markerType.setStyle(this.options.styleOption, value);
        } else {
          var newStyle = {};
          newStyle[this.options.styleOption] = value;
          layer.setStyle(newStyle);
          layer.options[this.options.styleOption] = value;
        } // fire event for changed layer


        this.util.fireChangeEvent(layer);
      } // notify form styling value has changed


      this.options.parentForm.style();
    }
  }]);

  return FormElement;
}();

exports.default = FormElement;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Form_1 = __importDefault(__webpack_require__(3));

exports.Form = Form_1.default;

var GeometryForm_1 = __importDefault(__webpack_require__(11));

exports.GeometryForm = GeometryForm_1.default;

var MarkerForm_1 = __importDefault(__webpack_require__(12));

exports.MarkerForm = MarkerForm_1.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Util_1 = __importDefault(__webpack_require__(4));

var FormOptions = function FormOptions() {
  _classCallCheck(this, FormOptions);
};

exports.FormOptions = FormOptions;
/**
 * Forms consist of FormElements and are shown in the StyleForm
 * There exists a MarkerForm to modify Markers and a GeometryForm to modify Geometries (i.e. rectangles...)
 * Style options based on:
 *     - path: https://leafletjs.com/reference.html#path-options
 *     - icon: https://leafletjs.com/reference.html#icon
 */

var Form =
/*#__PURE__*/
function () {
  function Form(styleEditor) {
    _classCallCheck(this, Form);

    this.util = Util_1.default.getInstance();
    this.styleEditor = styleEditor;
  }
  /** create every FormElement in the parentUiElement */


  _createClass(Form, [{
    key: "create",
    value: function create(parentUiElement) {
      this.options.parentUiElement = parentUiElement;
      var formElements = this.getFormElements();
      var styleFormKeys = Object.keys(formElements);

      for (var i = 0; i < styleFormKeys.length; i++) {
        var formElement = this.getFormElementClass(styleFormKeys[i]);

        if (formElement !== undefined) {
          formElement.create(parentUiElement);
          this.options.initializedElements.push(formElement);
        }
      }
    }
    /** hide the Form including its FormElements */

  }, {
    key: "hide",
    value: function hide() {
      this.hideFormElements();
      this.hideForm();
    }
    /** hide the FormElements */

  }, {
    key: "hideFormElements",
    value: function hideFormElements() {
      for (var i = 0; i < this.options.initializedElements.length; i++) {
        this.options.initializedElements[i].hide();
      }
    }
    /** hide the Form */

  }, {
    key: "hideForm",
    value: function hideForm() {
      this.util.hideElement(this.options.parentUiElement);
    }
    /** make FormElements and Form visible */

  }, {
    key: "show",
    value: function show() {
      this.preShow();
      this.showFormElements();
      this.showForm();
      this.style();
    }
    /** hook which is called at the beginning of the show function */

  }, {
    key: "preShow",
    value: function preShow() {}
    /** make every FormElement visible */

  }, {
    key: "showFormElements",
    value: function showFormElements() {
      for (var i = 0; i < this.options.initializedElements.length; i++) {
        this.showFormElement(this.options.initializedElements[i]);
      }
    }
    /** make the Form visible */

  }, {
    key: "showForm",
    value: function showForm() {
      this.util.showElement(this.options.parentUiElement);
    }
    /** inform FormElements the selected style has changed, so they can adapt */

  }, {
    key: "style",
    value: function style() {
      for (var i = 0; i < this.options.initializedElements.length; i++) {
        this.options.initializedElements[i].style();
      }
    }
    /** inform Form it lost it's focus */

  }, {
    key: "lostFocus",
    value: function lostFocus() {
      for (var i = 0; i < this.options.initializedElements.length; i++) {
        this.options.initializedElements[i].lostFocus();
      }
    }
    /**
     * @returns a Boolean indicating if the @param formElement should be shown
     */

  }, {
    key: "showFormElement",
    value: function showFormElement(formElement) {
      // check wether element should be shown or not
      if (this.showFormElementForStyleOption(formElement.options.styleOption)) {
        formElement.show();
      } else {
        formElement.hide();
      }
    }
    /**
     * get the currently used formElements
     * either standard or the ones provided while instanciation
     */

  }, {
    key: "getFormElements",
    value: function getFormElements() {
      var formElements;

      if (this.options.formOptionKey in this.styleEditor.options.forms) {
        formElements = this.styleEditor.options.forms[this.options.formOptionKey];
      } else {
        formElements = this.options.formElements;
      }

      return formElements;
    }
    /**
     * get the Class of the Formelement to instanciate
     * @param {*} styleOption, the styleOption to get the FormElement for
     */

  }, {
    key: "getFormElementClass",
    value: function getFormElementClass(styleOption) {
      var formElements = this.getFormElements();
      var formElementKeys = Object.keys(formElements);

      if (formElementKeys.indexOf(styleOption) >= 0) {
        var FormElement = formElements[styleOption];

        if (FormElement) {
          // may be a dictionary
          if (typeof FormElement === 'boolean') {
            return this.getFormElementStandardClass(styleOption);
          }

          if ('formElement' in FormElement && 'boolean' in FormElement) {
            FormElement = FormElement['formElement'];
          } // try to instantiate FormElementOption and return StandardClass if it does not work


          try {
            var formElementInstance = new FormElement({
              styleOption: styleOption,
              parentForm: this
            });

            if (formElementInstance instanceof FormElement) {
              return formElementInstance;
            }
          } catch (e) {// creating instance failed fallback to StandardClass
          }
        } // if nothing works return it


        return this.getFormElementStandardClass(styleOption);
      }
    }
    /**
     * check whether a FormElement should be shown
     * @param {*} styleOption, the styleOption to check
     */

  }, {
    key: "showFormElementForStyleOption",
    value: function showFormElementForStyleOption(styleOption) {
      var formElements = this.getFormElements();

      if (styleOption in formElements) {
        var styleFormElement = formElements[styleOption]; // maybe a function is given to declare when to show the FormElement

        if (typeof styleFormElement === 'function') {
          try {
            return styleFormElement(this.util.getCurrentElement());
          } catch (err) {
            // the given function presumably is a constructor -> always show it
            return true;
          }
        } // maybe a boolean is given to indicate whether to show it


        if (typeof styleFormElement === 'boolean') {
          return styleFormElement;
        } // check for dictionary


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

  }, {
    key: "getFormElementStandardClass",
    value: function getFormElementStandardClass(styleOption) {
      return new this.options.formElements[styleOption]({
        styleOption: styleOption,
        parentForm: this
      });
    }
  }]);

  return Form;
}();

exports.default = Form;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var leaflet_1 = __importDefault(__webpack_require__(0));
/**
 * Helper functions used throuhgout the project
 */


var Util =
/*#__PURE__*/
function () {
  function Util(styleEditor) {
    _classCallCheck(this, Util);

    this.styleEditor = styleEditor;
  }

  _createClass(Util, [{
    key: "fireEvent",
    // TODO element type
    value: function fireEvent(eventName, element) {
      this.styleEditor.map.fireEvent(this.styleEditor.options.styleEditorEventPrefix + eventName, element);
    } // TODO element type

    /** fire an event if Leaflet.StyleEditor changed something */

  }, {
    key: "fireChangeEvent",
    value: function fireChangeEvent(element) {
      this.fireEvent('changed', element);
    }
    /** hide the given element */

  }, {
    key: "hideElement",
    value: function hideElement(element) {
      if (element) {
        leaflet_1.default.DomUtil.addClass(element, 'leaflet-styleeditor-hidden');
      }
    }
    /** convert rgb to hex of a color
     * @param {string} rgb - rgb representation of the color
     * @param {boolean} noHash - define if return value should not include hash
     */

  }, {
    key: "rgbToHex",
    value: function rgbToHex(rgb) {
      var noHash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

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

      var rgbArray = rgb.substring(4).replace(')', '').split(',');

      var withoutHash = this._componentToHex(parseInt(rgbArray[0], 10)) + this._componentToHex(parseInt(rgbArray[1], 10)) + this._componentToHex(parseInt(rgbArray[2], 10));

      if (noHash) {
        return withoutHash;
      }

      return '#' + withoutHash;
    }
    /** get element selected to be styled */

  }, {
    key: "getCurrentElement",
    value: function getCurrentElement() {
      if (!this.styleEditor.currentElement) {
        return null;
      }

      if (this.styleEditor.currentElement.target !== undefined) {
        return this.styleEditor.currentElement.target;
      }

      return this.styleEditor.currentElement;
    }
    /** set which element is selected to be styled */

  }, {
    key: "setCurrentElement",
    value: function setCurrentElement(currentElement) {
      this.styleEditor.currentElement.target = currentElement;
    }
    /** does current element have the fill option */

  }, {
    key: "fillCurrentElement",
    value: function fillCurrentElement() {
      return this.getCurrentElement().options.fill;
    }
    /** get current style of current element */

  }, {
    key: "getStyle",
    value: function getStyle(option) {
      var currentElement = this.getCurrentElement();
      var style = currentElement.options[option];

      if (style) {
        return style;
      }

      return null;
    }
    /** set new style to current element */

  }, {
    key: "setStyle",
    value: function setStyle(option, value) {
      var currentElement = this.getCurrentElement();

      if (currentElement instanceof leaflet_1.default.Marker) {
        this.styleEditor.options.markerType.setStyle(option, value);
      } else {
        var newStyle = {};
        newStyle[option] = value;
        currentElement.setStyle(newStyle);
      }

      this.fireChangeEvent(currentElement);
    }
    /** show hidden element */

  }, {
    key: "showElement",
    value: function showElement(element) {
      if (element) {
        leaflet_1.default.DomUtil.removeClass(element, 'leaflet-styleeditor-hidden');
      }
    }
    /** helper function to convert color to hex */

  }, {
    key: "_componentToHex",
    value: function _componentToHex(color) {
      var hex = color.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }
    /** get the markers for a specific color **/

  }, {
    key: "getMarkersForColor",
    value: function getMarkersForColor(color) {
      color = this.rgbToHex(color);
      var markers = this.styleEditor.options.markerType.options.markers;
      var controlMarkers = this.styleEditor.options.markers;

      if (!Array.isArray(markers)) {
        // if color is specified return specific markers
        if (Object.keys(markers).includes(color)) {
          markers = markers[color];
        } else {
          markers = markers['default'];
        }
      }

      if (controlMarkers !== null) {
        if (!Array.isArray(controlMarkers)) {
          var keys = Object.keys(controlMarkers);

          if (keys.includes(color)) {
            controlMarkers = controlMarkers[color];
          } else if (keys.includes('default')) {
            controlMarkers = controlMarkers['default'];
          } else {
            controlMarkers = markers;
          }
        }

        return markers.filter(function (n) {
          return controlMarkers.includes(n);
        });
      }

      return markers;
    }
    /** get default marker for specific color **/

  }, {
    key: "getDefaultMarkerForColor",
    value: function getDefaultMarkerForColor(color) {
      color = this.rgbToHex(color);
      var markers = this.getMarkersForColor(color);
      var defMarkers = [];
      var defaultMarker = this.styleEditor.options.defaultMarkerIcon;

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

      defMarkers.filter(function (n) {
        return markers.includes(n);
      });

      if (defMarkers.length > 0) {
        return defMarkers[0];
      }

      return markers[0];
    }
  }], [{
    key: "createInstance",
    value: function createInstance(styleEditor) {
      Util.instance = new Util(styleEditor);
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      return Util.instance;
    }
  }]);

  return Util;
}();

exports.default = Util;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var leaflet_1 = __importDefault(__webpack_require__(0));

var FormElement_1 = __importDefault(__webpack_require__(1));

var form_1 = __webpack_require__(2);
/**
 *  FormElement used to style the color
 */


var ColorElement =
/*#__PURE__*/
function (_FormElement_1$defaul) {
  _inherits(ColorElement, _FormElement_1$defaul);

  function ColorElement() {
    _classCallCheck(this, ColorElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(ColorElement).apply(this, arguments));
  }

  _createClass(ColorElement, [{
    key: "createContent",
    value: function createContent() {
      this.options.colorPickerDiv = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-colorpicker', this.options.uiElement);

      this._getColorRamp().forEach(this._setSelectCallback, this);
    }
    /** create of get already created colorRamp */

  }, {
    key: "_getColorRamp",
    value: function _getColorRamp() {
      if (!this.options.colorRamp) {
        // if markers have own colorRamp use it
        if (this.options.parentForm instanceof form_1.MarkerForm && !!this.styleEditor.options.markerType.options.colorRamp) {
          this.options.colorRamp = this.styleEditor.options.markerType.options.colorRamp; // else use the default
        } else {
          this.options.colorRamp = this.styleEditor.options.colorRamp;
        }
      }

      return this.options.colorRamp;
    }
    /** define what to do when color is changed */

  }, {
    key: "_setSelectCallback",
    value: function _setSelectCallback(color) {
      var elem = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-color', this.options.colorPickerDiv);
      elem.style.backgroundColor = color;
      leaflet_1.default.DomEvent.addListener(elem, 'click', this._selectColor, this);
    }
    /** set style for chosen color */

  }, {
    key: "_selectColor",
    value: function _selectColor(e) {
      e.stopPropagation();
      this.setStyle(this.util.rgbToHex(e.target.style.backgroundColor)); // marker styling needs additional function calls

      if (this.styleEditor.currentElement.target instanceof leaflet_1.default.Marker) {
        this.styleEditor.options.markerType.setNewMarker();
      }
    }
  }]);

  return ColorElement;
}(FormElement_1.default);

exports.default = ColorElement;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var leaflet_1 = __importDefault(__webpack_require__(0));

var FormElement_1 = __importDefault(__webpack_require__(1));
/**
 * FormElement used for styling the dash attribute
 */


var DashElement =
/*#__PURE__*/
function (_FormElement_1$defaul) {
  _inherits(DashElement, _FormElement_1$defaul);

  function DashElement() {
    _classCallCheck(this, DashElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(DashElement).apply(this, arguments));
  }

  _createClass(DashElement, [{
    key: "createContent",

    /** create the three standard dash options */
    value: function createContent() {
      var uiElement = this.options.uiElement;
      var stroke = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-stroke', uiElement);
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
  }]);

  return DashElement;
}(FormElement_1.default);

exports.default = DashElement;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var leaflet_1 = __importDefault(__webpack_require__(0));

var FormElement_1 = __importDefault(__webpack_require__(1));
/**
 * FormElement used to style opacity
 */


var OpacityFormElement =
/*#__PURE__*/
function (_FormElement_1$defaul) {
  _inherits(OpacityFormElement, _FormElement_1$defaul);

  function OpacityFormElement() {
    _classCallCheck(this, OpacityFormElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(OpacityFormElement).apply(this, arguments));
  }

  _createClass(OpacityFormElement, [{
    key: "createContent",

    /** create number input box */
    value: function createContent() {
      this.options.label = leaflet_1.default.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.options.uiElement);
      var slider = leaflet_1.default.DomUtil.create('input', 'leaflet-styleeditor-input', this.options.uiElement);
      slider.type = 'range';
      slider.max = String(1);
      slider.min = String(0);
      slider.step = String(0.01);
      slider.value = String(0.5); // add event listeners

      leaflet_1.default.DomEvent.addListener(slider, 'change', this._setStyle, this);
      leaflet_1.default.DomEvent.addListener(slider, 'input', this._setStyle, this);
      leaflet_1.default.DomEvent.addListener(slider, 'keyup', this._setStyle, this);
      leaflet_1.default.DomEvent.addListener(slider, 'mouseup', this._setStyle, this);
    }
    /** set correct value */

  }, {
    key: "style",
    value: function style() {
      this.options.slider.value = this.util.getStyle(this.options.styleOption);
      this.options.label.innerText = 100 * parseInt(this.options.slider.value) + '%';
    }
    /** communicate opacity value */

  }, {
    key: "_setStyle",
    value: function _setStyle() {
      this.setStyle(this.options.slider.value);
    }
  }]);

  return OpacityFormElement;
}(FormElement_1.default);

exports.default = OpacityFormElement;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var leaflet_1 = __importDefault(__webpack_require__(0));

var FormElement_1 = __importDefault(__webpack_require__(1));
/**
 * FormElement used for adding a description to marker or geometry.
 */


var PopupContentElement =
/*#__PURE__*/
function (_FormElement_1$defaul) {
  _inherits(PopupContentElement, _FormElement_1$defaul);

  function PopupContentElement() {
    _classCallCheck(this, PopupContentElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(PopupContentElement).apply(this, arguments));
  }

  _createClass(PopupContentElement, [{
    key: "createContent",
    value: function createContent() {
      var uiElement = this.options.uiElement;
      var textArea = this.options.descTextAreaField = leaflet_1.default.DomUtil.create('textarea', 'leaflet-styleeditor-input', uiElement);
      leaflet_1.default.DomEvent.addListener(textArea, 'change', this._setStyle, this);
    }
    /** set correct value */

  }, {
    key: "style",
    value: function style() {
      var selectedElement = this.util.getCurrentElement();

      if (selectedElement && selectedElement.options) {
        this.options.descTextAreaField.value = selectedElement.options.popupContent || '';
      }
    }
    /** communicate popupContent value */

  }, {
    key: "_setStyle",
    value: function _setStyle() {
      var currentElement = this.util.getCurrentElement();
      var inputText = this.options.descTextAreaField.value; // check whether a layer is part of a layerGroup

      var layers = [currentElement];

      if (currentElement instanceof leaflet_1.default.LayerGroup) {
        layers = currentElement.getLayers();
      } // update layer (or all layers of a layerGroup)


      for (var i = 0; i < layers.length; i++) {
        var marker = layers[i];

        if (marker && marker.getPopup && marker.bindPopup) {
          var popup1 = marker.getPopup();

          if (popup1) {
            popup1.setContent(inputText);
          } else {
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
  }]);

  return PopupContentElement;
}(FormElement_1.default);

exports.default = PopupContentElement;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var leaflet_1 = __importDefault(__webpack_require__(0));

var FormElement_1 = __importDefault(__webpack_require__(1));
/**
 * FormElement used to style weight
 */


var WeigthElement =
/*#__PURE__*/
function (_FormElement_1$defaul) {
  _inherits(WeigthElement, _FormElement_1$defaul);

  function WeigthElement() {
    _classCallCheck(this, WeigthElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(WeigthElement).apply(this, arguments));
  }

  _createClass(WeigthElement, [{
    key: "createContent",

    /** create number input box */
    value: function createContent() {
      this.options.label = leaflet_1.default.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.options.uiElement);
      var weight = leaflet_1.default.DomUtil.create('input', 'leaflet-styleeditor-input', this.options.uiElement);
      weight.type = 'range';
      weight.min = String(0);
      weight.max = String(20);
      weight.step = String(1);
      weight.value = String(4);
      this.options.weight = weight; // add event listeners

      leaflet_1.default.DomEvent.addListener(weight, 'change', this._setStyle, this);
      leaflet_1.default.DomEvent.addListener(weight, 'input', this._setStyle, this);
      leaflet_1.default.DomEvent.addListener(weight, 'keyup', this._setStyle, this);
      leaflet_1.default.DomEvent.addListener(weight, 'mouseup', this._setStyle, this);
    }
    /** set correct value */

  }, {
    key: "style",
    value: function style() {
      this.options.weight.value = this.util.getStyle(this.options.styleOption);
      this.options.label.innerText = this.options.weight.value;
    }
    /** communicate weight value */

  }, {
    key: "_setStyle",
    value: function _setStyle() {
      this.setStyle(this.options.weight.value);
    }
  }]);

  return WeigthElement;
}(FormElement_1.default);

exports.default = WeigthElement;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var leaflet_1 = __importDefault(__webpack_require__(0));

var form_1 = __webpack_require__(2);

__webpack_require__(16);

var StyleEditor = function StyleEditor(options) {
  _classCallCheck(this, StyleEditor);

  this.currentElement = null; // TODO type

  this._editLayers = [];
  this._layerGroups = [];
  this.markerForm = new form_1.MarkerForm(this);
  this.geometryForm = new form_1.GeometryForm(this);
  this.options = options;
};

exports.StyleEditor = StyleEditor;
leaflet_1.default.Marker.include({
  styleEditor: {
    type: 'Marker'
  }
});
leaflet_1.default.Polygon.include({
  styleEditor: {
    type: 'Polygon'
  }
});
leaflet_1.default.Polyline.include({
  styleEditor: {
    type: 'Polyline'
  }
});
leaflet_1.default.Rectangle.include({
  styleEditor: {
    type: 'Rectangle'
  }
});
exports.default = leaflet_1.default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(0);

var Form_1 = __importStar(__webpack_require__(3));

var ColorElement_1 = __importDefault(__webpack_require__(5));

var DashElement_1 = __importDefault(__webpack_require__(6));

var OpacityElement_1 = __importDefault(__webpack_require__(7));

var PopupContentElement_1 = __importDefault(__webpack_require__(8));

var WeightElement_1 = __importDefault(__webpack_require__(9));

var GeometryFormOptions =
/*#__PURE__*/
function (_Form_1$FormOptions) {
  _inherits(GeometryFormOptions, _Form_1$FormOptions);

  function GeometryFormOptions(styleEditor) {
    var _this;

    _classCallCheck(this, GeometryFormOptions);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GeometryFormOptions).call(this));
    _this.formOptionKey = 'geometry';
    _this.formElements = {
      'color': new ColorElement_1.default(styleEditor),
      'opacity': new OpacityElement_1.default(styleEditor),
      'weight': new WeightElement_1.default(styleEditor),
      'dashArray': new DashElement_1.default(styleEditor),
      'fillColor': new ColorElement_1.default(styleEditor),
      'fillOpacity': new OpacityElement_1.default(styleEditor),
      'popupContent': new PopupContentElement_1.default(styleEditor)
    };
    return _this;
  }

  return GeometryFormOptions;
}(Form_1.FormOptions);
/** Form used to enable modification of a Geometry */


var GeometryForm =
/*#__PURE__*/
function (_Form_1$default) {
  _inherits(GeometryForm, _Form_1$default);

  function GeometryForm() {
    var _this2;

    _classCallCheck(this, GeometryForm);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(GeometryForm).apply(this, arguments));
    _this2.options = new GeometryFormOptions(_this2.styleEditor);
    return _this2;
  }
  /** show the fillOptions (fillColor and fillOpacity) only if the Element can be filled */


  _createClass(GeometryForm, [{
    key: "showFormElements",
    value: function showFormElements() {
      for (var i = 0; i < this.options.initializedElements.length; i++) {
        if (this.options.initializedElements[i].options.styleOption.indexOf('fill') === 0) {
          if (this.util.fillCurrentElement()) {
            this.showFormElement(this.options.initializedElements[i]);
          } else {
            this.options.initializedElements[i].hide();
          }
        } else {
          this.showFormElement(this.options.initializedElements[i]);
        }
      }
    }
  }]);

  return GeometryForm;
}(Form_1.default);

exports.default = GeometryForm;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var formElements_1 = __webpack_require__(13);

var _1 = __webpack_require__(2);
/** Form used to enable modification of a Geometry */


var MarkerForm =
/*#__PURE__*/
function (_$Form) {
  _inherits(MarkerForm, _$Form);

  function MarkerForm() {
    var _this;

    _classCallCheck(this, MarkerForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MarkerForm).apply(this, arguments));
    _this.formOptionKey = 'marker';
    _this.formElements = {
      'icon': new formElements_1.IconElement(_this.styleEditor),
      'color': new formElements_1.ColorElement(_this.styleEditor),
      'size': new formElements_1.SizeElement(_this.styleEditor),
      'popupContent': new formElements_1.PopupContentElement(_this.styleEditor)
    };
    return _this;
  }

  return MarkerForm;
}(_1.Form);

exports.default = MarkerForm;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ColorElement_1 = __importDefault(__webpack_require__(5));

exports.ColorElement = ColorElement_1.default;

var DashElement_1 = __importDefault(__webpack_require__(6));

exports.DashElement = DashElement_1.default;

var FormElement_1 = __importDefault(__webpack_require__(1));

exports.FormElement = FormElement_1.default;

var IconElement_1 = __importDefault(__webpack_require__(14));

exports.IconElement = IconElement_1.default;

var OpacityElement_1 = __importDefault(__webpack_require__(7));

exports.OpacityElement = OpacityElement_1.default;

var PopupContentElement_1 = __importDefault(__webpack_require__(8));

exports.PopupContentElement = PopupContentElement_1.default;

var SizeElement_1 = __importDefault(__webpack_require__(15));

exports.SizeElement = SizeElement_1.default;

var WeightElement_1 = __importDefault(__webpack_require__(9));

exports.WeightElement = WeightElement_1.default;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var leaflet_1 = __importDefault(__webpack_require__(0));

var FormElement_1 = __importDefault(__webpack_require__(1));
/**
 * FormElement used for styling the icon
 */


var IconElement =
/*#__PURE__*/
function (_FormElement_1$defaul) {
  _inherits(IconElement, _FormElement_1$defaul);

  function IconElement() {
    var _this;

    _classCallCheck(this, IconElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IconElement).apply(this, arguments)); // private classed used in the code

    _this._selectOptionWrapperClasses = 'leaflet-styleeditor-select-option-wrapper leaflet-styleeditor-hidden';
    _this._selectOptionClasses = 'leaflet-styleeditor-select-option';
    return _this;
  }
  /** create the icon selectBoxes */


  _createClass(IconElement, [{
    key: "createContent",
    value: function createContent() {
      var uiElement = this.options.uiElement;
      var selectBox = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-select', uiElement);
      this.options.selectBoxImage = this._createSelectInputImage(selectBox);
      leaflet_1.default.DomEvent.addListener(selectBox, 'click', this._toggleSelectInput, this);
    }
    /** show the correct icon in the correct color if the icon or color changed */

  }, {
    key: "style",
    value: function style() {
      var iconOptions = this.styleEditor.options.markerType.getIconOptions();

      this._styleSelectInputImage(this.options.selectBoxImage, iconOptions.icon, iconOptions.iconColor);

      this._createColorSelect(this.styleEditor.options.markerType.options.iconOptions.iconColor);

      this._hideSelectOptions();
    }
    /** if lost focus hide potentially open SelectOption */

  }, {
    key: "lostFocus",
    value: function lostFocus() {
      this._hideSelectOptions();
    }
    /** create image container that hides/shows the iconSelectBox */

  }, {
    key: "_createSelectInputImage",
    value: function _createSelectInputImage(parentUiElement) {
      var wrapper = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-select-image-wrapper', parentUiElement);
      return leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-select-image', wrapper);
    }
    /** create appropriate image for color and icon */

  }, {
    key: "_styleSelectInputImage",
    value: function _styleSelectInputImage(image, icon, color) {
      if (!icon) {
        icon = image.getAttribute('value');

        if (!icon) {
          return;
        }
      }

      var iconOptions = this.styleEditor.options.markerType.getIconOptions();

      if (color) {
        iconOptions.iconColor = color;
      }

      image.innerHTML = '';
      this.styleEditor.options.markerType.createSelectHTML(image, iconOptions, icon);
      image.setAttribute('value', icon);
    }
    /** create the selectBox with the icons in the correct color */

  }, {
    key: "_createColorSelect",
    value: function _createColorSelect(color) {
      if (!this.options.selectOptions) {
        this.options.selectOptions = {};
      }

      if (color in this.options.selectOptions) {
        return;
      }

      var uiElement = this.options.uiElement;
      var selectOptionWrapper = leaflet_1.default.DomUtil.create('ul', this._selectOptionWrapperClasses, uiElement);
      this.util.getMarkersForColor(color).forEach(function (option) {
        var selectOption = leaflet_1.default.DomUtil.create('li', this._selectOptionClasses, selectOptionWrapper);

        var selectImage = this._createSelectInputImage(selectOption);

        this._styleSelectInputImage(selectImage, option, color);
      }, this);
      this.options.selectOptions[color] = selectOptionWrapper;
      leaflet_1.default.DomEvent.addListener(selectOptionWrapper, 'click', function (e) {
        e.stopPropagation();
        var target = e.target;

        if (target.nodeName === 'UL') {
          return;
        }

        if (target.parentElement.className === 'leaflet-styleeditor-select-image') {
          target = target.parentElement;
        } else {
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

  }, {
    key: "_toggleSelectInput",
    value: function _toggleSelectInput(e) {
      var currentColorElement = this._getCurrentColorElement(this.util.rgbToHex(this.styleEditor.options.markerType.options.iconOptions.iconColor));

      var show = false;

      if (currentColorElement) {
        show = leaflet_1.default.DomUtil.hasClass(currentColorElement, 'leaflet-styleeditor-hidden');
      }

      this._hideSelectOptions();

      if (show) {
        this.util.showElement(currentColorElement);
      }
    }
    /** called when user selects a marker */

  }, {
    key: "_selectMarker",
    value: function _selectMarker(e) {
      var value = this._getValue(e.target); // update style


      this.options.selectBoxImage.setAttribute('value', value);
      this.setStyle(value);

      this._hideSelectOptions();
    }
    /** helper function to return attribute value of target */

  }, {
    key: "_getValue",
    value: function _getValue(target) {
      return target.getAttribute('value');
    }
    /** return correct selectBox depending on which color is currently chosen */

  }, {
    key: "_getCurrentColorElement",
    value: function _getCurrentColorElement(color) {
      if (!this.options.selectOptions[color]) {
        this._createColorSelect(color);
      }

      return this.options.selectOptions[color];
    }
    /** hide open SelectOption */

  }, {
    key: "_hideSelectOptions",
    value: function _hideSelectOptions() {
      for (var selectOption in this.options.selectOptions) {
        this.util.hideElement(this.options.selectOptions[selectOption]);
      }
    }
  }]);

  return IconElement;
}(FormElement_1.default);

exports.default = IconElement;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var leaflet_1 = __importDefault(__webpack_require__(0));

var FormElement_1 = __importDefault(__webpack_require__(1));
/**
 * FormElement to set style of an icon
 */


var SizeElement =
/*#__PURE__*/
function (_FormElement_1$defaul) {
  _inherits(SizeElement, _FormElement_1$defaul);

  function SizeElement() {
    _classCallCheck(this, SizeElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(SizeElement).apply(this, arguments));
  }

  _createClass(SizeElement, [{
    key: "createContent",

    /** create the 3 standard icon sizes */
    value: function createContent() {
      var uiElement = this.options.uiElement;
      var select = leaflet_1.default.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-small', uiElement);
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
  }]);

  return SizeElement;
}(FormElement_1.default);

exports.default = SizeElement;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);
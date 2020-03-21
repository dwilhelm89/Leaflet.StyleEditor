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
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs":"leaflet","amd":"leaflet","root":"L"}
var external_commonjs_leaflet_amd_leaflet_root_L_ = __webpack_require__(0);

// CONCATENATED MODULE: ./src/javascript/FormElements/ColorElement.js

/**
 *  FormElement used to style the color
 */

function setupColorElement() {
  L.StyleEditor.formElements.ColorElement = L.StyleEditor.formElements.FormElement.extend({
    createContent: function createContent() {
      this.options.colorPickerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-colorpicker', this.options.uiElement);

      this._getColorRamp().forEach(this._setSelectCallback, this);
    },

    /** create of get already created colorRamp */
    _getColorRamp: function _getColorRamp() {
      if (!this.options.colorRamp) {
        // if markers have own colorRamp use it
        if (this.options.parentForm instanceof L.StyleEditor.forms.MarkerForm && !!this.options.styleEditorOptions.markerType.options.colorRamp) {
          this.options.colorRamp = this.options.styleEditorOptions.markerType.options.colorRamp; // else use the default
        } else {
          this.options.colorRamp = this.options.styleEditorOptions.colorRamp;
        }
      }

      return this.options.colorRamp;
    },

    /** define what to do when color is changed */
    _setSelectCallback: function _setSelectCallback(color) {
      var elem = L.DomUtil.create('div', 'leaflet-styleeditor-color', this.options.colorPickerDiv);
      elem.style.backgroundColor = color;
      L.DomEvent.addListener(elem, 'click', this._selectColor, this);
    },

    /** set style for chosen color */
    _selectColor: function _selectColor(e) {
      e.stopPropagation();
      this.setStyle(this.options.styleEditorOptions.util.rgbToHex(e.target.style.backgroundColor)); // marker styling needs additional function calls

      if (this.options.styleEditorOptions.currentElement.target instanceof L.Marker) {
        this.options.styleEditorOptions.markerType.setNewMarker();
      }
    }
  });
}
// CONCATENATED MODULE: ./src/javascript/FormElements/FormElement.js

/** FormElements are part of a Form for a specific styling option (i.e. color) */

function setupFormElement() {
  L.StyleEditor.formElements.FormElement = L.Class.extend({
    /** set options and title */
    initialize: function initialize(options) {
      if (options) {
        L.setOptions(this, options);
      } // if no title is given use styling option


      if (!this.options.title && !!this.options.styleOption) {
        this.options.title = this.options.styleOption.charAt(0).toUpperCase() + this.options.styleOption.slice(1);
      }
    },

    /** create uiElement and content */
    create: function create(parentUiElement) {
      this.options.uiElement = L.DomUtil.create('div', 'leaflet-styleeditor-uiElement', parentUiElement);
      this.createTitle();
      this.createContent();
    },

    /** create title */
    createTitle: function createTitle() {
      var title = L.DomUtil.create('label', 'leaflet-styleeditor-label', this.options.uiElement);
      title.innerHTML = this.options.title + ':';
    },

    /** create content (where the actual modification takes place) */
    createContent: function createContent() {},

    /** style the FormElement and show it */
    show: function show() {
      this.style();
      this.showForm();
    },

    /** show the FormElement */
    showForm: function showForm() {
      this.options.styleEditorOptions.util.showElement(this.options.uiElement);
    },

    /** hide the FormElement */
    hide: function hide() {
      this.options.styleEditorOptions.util.hideElement(this.options.uiElement);
    },

    /** style the FormElement */
    style: function style() {},

    /** what to do when lost focus */
    lostFocus: function lostFocus() {},

    /** set style - used when the FormElement wants to change the styling option */
    setStyle: function setStyle(value) {
      var currentElement = this.options.styleEditorOptions.util.getCurrentElement(); // check whether a layer is part of a layerGroup

      var layers = [currentElement];

      if (currentElement instanceof L.LayerGroup) {
        layers = Object.values(currentElement._layers);
      } // update layer (or all layers of a layerGroup)


      for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];

        if (layer instanceof L.Marker) {
          this.options.styleEditorOptions.markerType.setStyle(this.options.styleOption, value);
        } else {
          var newStyle = {};
          newStyle[this.options.styleOption] = value;
          layer.setStyle(newStyle);
          layer.options[this.options.styleOption] = value;
        } // fire event for changed layer


        this.options.styleEditorOptions.util.fireChangeEvent(layer);
      } // notify form styling value has changed


      this.options.parentForm.style();
    }
  });
}
// CONCATENATED MODULE: ./src/javascript/FormElements/DashElement.js
/**
 * FormElement used for styling the dash attribute
 */

function setupDashElement() {
  L.StyleEditor.formElements.DashElement = L.StyleEditor.formElements.FormElement.extend({
    /** create the three standard dash options */
    createContent: function createContent() {
      var uiElement = this.options.uiElement;
      var stroke = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', uiElement);
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
  });
}
// CONCATENATED MODULE: ./src/javascript/FormElements/IconElement.js

/**
 * FormElement used for styling the icon
 */

function setupIconElement() {
  L.StyleEditor.formElements.IconElement = L.StyleEditor.formElements.FormElement.extend({
    // private classed used in the code
    _selectOptionWrapperClasses: 'leaflet-styleeditor-select-option-wrapper leaflet-styleeditor-hidden',
    _selectOptionClasses: 'leaflet-styleeditor-select-option',

    /** create the icon selectBoxes */
    createContent: function createContent() {
      var uiElement = this.options.uiElement;
      var selectBox = L.DomUtil.create('div', 'leaflet-styleeditor-select', uiElement);
      this.options.selectBoxImage = this._createSelectInputImage(selectBox);
      L.DomEvent.addListener(selectBox, 'click', this._toggleSelectInput, this);
    },

    /** show the correct icon in the correct color if the icon or color changed */
    style: function style() {
      var iconOptions = this.options.styleEditorOptions.markerType.getIconOptions();

      this._styleSelectInputImage(this.options.selectBoxImage, iconOptions.icon, iconOptions.iconColor);

      this._createColorSelect(this.options.styleEditorOptions.markerType.options.iconOptions.iconColor);

      this._hideSelectOptions();
    },

    /** if lost focus hide potentially open SelectOption */
    lostFocus: function lostFocus() {
      this._hideSelectOptions();
    },

    /** create image container that hides/shows the iconSelectBox */
    _createSelectInputImage: function _createSelectInputImage(parentUiElement) {
      var wrapper = L.DomUtil.create('div', 'leaflet-styleeditor-select-image-wrapper', parentUiElement);
      return L.DomUtil.create('div', 'leaflet-styleeditor-select-image', wrapper);
    },

    /** create appropriate image for color and icon */
    _styleSelectInputImage: function _styleSelectInputImage(image, icon, color) {
      if (!icon) {
        icon = image.getAttribute('value');

        if (!icon) {
          return;
        }
      }

      var iconOptions = this.options.styleEditorOptions.markerType.getIconOptions();

      if (color) {
        iconOptions.iconColor = color;
      }

      image.innerHTML = '';
      this.options.styleEditorOptions.markerType.createSelectHTML(image, iconOptions, icon);
      image.setAttribute('value', icon);
    },

    /** create the selectBox with the icons in the correct color */
    _createColorSelect: function _createColorSelect(color) {
      if (!this.options.selectOptions) {
        this.options.selectOptions = {};
      }

      if (color in this.options.selectOptions) {
        return;
      }

      var uiElement = this.options.uiElement;
      var selectOptionWrapper = L.DomUtil.create('ul', this._selectOptionWrapperClasses, uiElement);
      this.options.styleEditorOptions.util.getMarkersForColor(color).forEach(function (option) {
        var selectOption = L.DomUtil.create('li', this._selectOptionClasses, selectOptionWrapper);

        var selectImage = this._createSelectInputImage(selectOption);

        this._styleSelectInputImage(selectImage, option, color);
      }, this);
      this.options.selectOptions[color] = selectOptionWrapper;
      L.DomEvent.addListener(selectOptionWrapper, 'click', function (e) {
        e.stopPropagation();
        var target = e.target;

        if (target.nodeName === 'UL') {
          return;
        }

        if (target.parentNode.className === 'leaflet-styleeditor-select-image') {
          target = target.parentNode;
        } else {
          while (target && target.className !== 'leaflet-styleeditor-select-image') {
            target = target.childNodes[0];
          }
        }

        this._selectMarker({
          'target': target
        }, this);
      }, this);
    },

    /** show/hide iconSelectBox */
    _toggleSelectInput: function _toggleSelectInput(e) {
      var currentColorElement = this._getCurrentColorElement(this.options.styleEditorOptions.util.rgbToHex(this.options.styleEditorOptions.markerType.options.iconOptions.iconColor));

      var show = false;

      if (currentColorElement) {
        show = L.DomUtil.hasClass(currentColorElement, 'leaflet-styleeditor-hidden');
      }

      this._hideSelectOptions();

      if (show) {
        this.options.styleEditorOptions.util.showElement(currentColorElement);
      }
    },

    /** called when user selects a marker */
    _selectMarker: function _selectMarker(e) {
      var value = this._getValue(e.target); // update style


      this.options.selectBoxImage.setAttribute('value', value);
      this.setStyle(value);

      this._hideSelectOptions();
    },

    /** helper function to return attribute value of target */
    _getValue: function _getValue(target) {
      return target.getAttribute('value');
    },

    /** return correct selectBox depending on which color is currently chosen */
    _getCurrentColorElement: function _getCurrentColorElement(color) {
      if (!this.options.selectOptions[color]) {
        this._createColorSelect(color);
      }

      return this.options.selectOptions[color];
    },

    /** hide open SelectOption */
    _hideSelectOptions: function _hideSelectOptions() {
      for (var selectOption in this.options.selectOptions) {
        this.options.styleEditorOptions.util.hideElement(this.options.selectOptions[selectOption]);
      }
    }
  });
}
// CONCATENATED MODULE: ./src/javascript/FormElements/OpacityElement.js

/**
 * FormElement used to style opacity
 */

function setupOpacityElement() {
  L.StyleEditor.formElements.OpacityElement = L.StyleEditor.formElements.FormElement.extend({
    /** create number input box */
    createContent: function createContent() {
      this.options.label = L.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.options.uiElement);
      var slider = this.options.slider = L.DomUtil.create('input', 'leaflet-styleeditor-input', this.options.uiElement);
      slider.type = 'range';
      slider.max = 1;
      slider.min = 0;
      slider.step = 0.01;
      slider.value = 0.5; // add event listeners

      L.DomEvent.addListener(slider, 'change', this._setStyle, this);
      L.DomEvent.addListener(slider, 'input', this._setStyle, this);
      L.DomEvent.addListener(slider, 'keyup', this._setStyle, this);
      L.DomEvent.addListener(slider, 'mouseup', this._setStyle, this);
    },

    /** set correct value */
    style: function style() {
      this.options.slider.value = this.options.styleEditorOptions.util.getStyle(this.options.styleOption);
      this.options.label.innerText = parseInt(100 * this.options.slider.value) + '%';
    },

    /** communicate opacity value */
    _setStyle: function _setStyle() {
      this.setStyle(this.options.slider.value);
    }
  });
}
// CONCATENATED MODULE: ./src/javascript/FormElements/PopupContentElement.js

/**
 * FormElement used for adding a description to marker or geometry.
 */

function setupPopupContentElement() {
  L.StyleEditor.formElements.PopupContentElement = L.StyleEditor.formElements.FormElement.extend({
    options: {
      title: 'Description'
    },
    createContent: function createContent() {
      var uiElement = this.options.uiElement;
      var textArea = this.options.descTextAreaField = L.DomUtil.create('textarea', 'leaflet-styleeditor-input', uiElement);
      L.DomEvent.addListener(textArea, 'change', this._setStyle, this);
    },

    /** set correct value */
    style: function style() {
      var selectedElement = this.options.styleEditorOptions.util.getCurrentElement();

      if (selectedElement && selectedElement.options) {
        this.options.descTextAreaField.value = selectedElement.options.popupContent || '';
      }
    },

    /** communicate popupContent value */
    _setStyle: function _setStyle() {
      var currentElement = this.options.styleEditorOptions.util.getCurrentElement();
      var inputText = this.options.descTextAreaField.value; // check whether a layer is part of a layerGroup

      var layers = [currentElement];

      if (currentElement instanceof L.LayerGroup) {
        layers = Object.values(currentElement._layers);
      } // update layer (or all layers of a layerGroup)


      for (var i = 0; i < layers.length; i++) {
        var marker = layers[i];

        if (marker && marker.getPopup && marker.bindPopup) {
          var popup1 = marker.getPopup();

          if (popup1) {
            popup1.setContent(inputText);
          } else {
            marker.bindPopup(inputText);
          } // tmp store the text content for init next time


          marker.options = marker.options || {};
          marker.options.popupContent = inputText;
        }
      }

      this.setStyle(inputText);
    }
  });
}
// CONCATENATED MODULE: ./src/javascript/FormElements/SizeElement.js

/**
 * FormElement to set style of an icon
 */

function setupSizeElement() {
  L.StyleEditor.formElements.SizeElement = L.StyleEditor.formElements.FormElement.extend({
    /** create the 3 standard icon sizes */
    createContent: function createContent() {
      var uiElement = this.options.uiElement;
      var select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-small', uiElement);
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
  });
}
// CONCATENATED MODULE: ./src/javascript/FormElements/WeightElement.js

/**
 * FormElement used to style weight
 */

function setupWeightElement() {
  L.StyleEditor.formElements.WeightElement = L.StyleEditor.formElements.FormElement.extend({
    /** create number input box */
    createContent: function createContent() {
      this.options.label = L.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.options.uiElement);
      var weight = this.options.weight = L.DomUtil.create('input', 'leaflet-styleeditor-input', this.options.uiElement);
      weight.type = 'range';
      weight.min = 0;
      weight.max = 20;
      weight.step = 1;
      weight.value = 4; // add event listeners

      L.DomEvent.addListener(weight, 'change', this._setStyle, this);
      L.DomEvent.addListener(weight, 'input', this._setStyle, this);
      L.DomEvent.addListener(weight, 'keyup', this._setStyle, this);
      L.DomEvent.addListener(weight, 'mouseup', this._setStyle, this);
    },

    /** set correct value */
    style: function style() {
      this.options.weight.value = this.options.styleEditorOptions.util.getStyle(this.options.styleOption);
      this.options.label.innerText = this.options.weight.value;
    },

    /** communicate weight value */
    _setStyle: function _setStyle() {
      this.setStyle(this.options.weight.value);
    }
  });
}
// CONCATENATED MODULE: ./src/javascript/Form/Form.js

/**
 * Forms consist of FormElements and are shown in the StyleForm
 * There exists a MarkerForm to modify Markers and a GeometryForm to modify Geometries (i.e. rectangles...)
 * Style options based on:
 *     - path: https://leafletjs.com/reference.html#path-options
 *     - icon: https://leafletjs.com/reference.html#icon
 */

function setupForm() {
  L.StyleEditor.forms.Form = L.Class.extend({
    initialize: function initialize(options) {
      if (options) {
        L.setOptions(this, options);
      }

      this.options.initializedElements = [];
    },

    /** create every FormElement in the parentUiElement */
    create: function create(parentUiElement) {
      this.options.parentUiElement = parentUiElement;
      var formElements = this.getFormElements();
      var styleFormKeys = Object.keys(formElements);

      for (var i = 0; i < styleFormKeys.length; i++) {
        var formElement = this.getFormElementClass(styleFormKeys[i], formElements);

        if (formElement !== undefined) {
          formElement.create(parentUiElement);
          this.options.initializedElements.push(formElement);
        }
      }
    },

    /** hide the Form including its FormElements */
    hide: function hide() {
      this.hideFormElements();
      this.hideForm();
    },

    /** hide the FormElements */
    hideFormElements: function hideFormElements() {
      for (var i = 0; i < this.options.initializedElements.length; i++) {
        this.options.initializedElements[i].hide();
      }
    },

    /** hide the Form */
    hideForm: function hideForm() {
      this.options.styleEditorOptions.util.hideElement(this.options.parentUiElement);
    },

    /** make FormElements and Form visible */
    show: function show() {
      this.preShow();
      this.showFormElements();
      this.showForm();
      this.style();
    },

    /** hook which is called at the beginning of the show function */
    preShow: function preShow() {},

    /** make every FormElement visible */
    showFormElements: function showFormElements() {
      for (var i = 0; i < this.options.initializedElements.length; i++) {
        this.showFormElement(this.options.initializedElements[i]);
      }
    },

    /** make the Form visible */
    showForm: function showForm() {
      this.options.styleEditorOptions.util.showElement(this.options.parentUiElement);
    },

    /** inform FormElements the selected style has changed, so they can adapt */
    style: function style() {
      for (var i = 0; i < this.options.initializedElements.length; i++) {
        this.options.initializedElements[i].style();
      }
    },

    /** inform Form it lost it's focus */
    lostFocus: function lostFocus() {
      for (var i = 0; i < this.options.initializedElements.length; i++) {
        this.options.initializedElements[i].lostFocus();
      }
    },

    /**
     * @returns a Boolean indicating if the @param formElement should be shown
     */
    showFormElement: function showFormElement(formElement) {
      // check wether element should be shown or not
      if (this.showFormElementForStyleOption(formElement.options.styleOption)) {
        formElement.show();
      } else {
        formElement.hide();
      }
    },

    /**
     * get the currently used formElements
     * either standard or the ones provided while instanciation
     */
    getFormElements: function getFormElements() {
      var formElements;

      if (this.options.formOptionKey in this.options.styleEditorOptions.forms) {
        formElements = this.options.styleEditorOptions.forms[this.options.formOptionKey];
      } else {
        formElements = this.options.formElements;
      }

      return formElements;
    },

    /**
     * get the Class of the Formelement to instanciate
     * @param {*} styleOption, the styleOption to get the FormElement for
     */
    getFormElementClass: function getFormElementClass(styleOption) {
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
              parentForm: this,
              styleEditorOptions: this.options.styleEditorOptions
            });

            if (formElementInstance instanceof L.StyleEditor.formElements.FormElement) {
              return formElementInstance;
            }
          } catch (e) {// creating instance failed fallback to StandardClass
          }
        } // if nothing works return it


        return this.getFormElementStandardClass(styleOption);
      }
    },

    /**
     * check whether a FormElement should be shown
     * @param {*} styleOption, the styleOption to check
     */
    showFormElementForStyleOption: function showFormElementForStyleOption(styleOption) {
      var formElements = this.getFormElements();

      if (styleOption in formElements) {
        var styleFormElement = formElements[styleOption]; // maybe a function is given to declare when to show the FormElement

        if (typeof styleFormElement === 'function') {
          try {
            return styleFormElement(this.options.styleEditorOptions.util.getCurrentElement());
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
            return styleFormElement['boolean'](this.options.styleEditorOptions.util.getCurrentElement());
          }

          return styleFormElement['boolean'];
        }

        return true;
      }

      return false;
    },

    /**
     * get Leaflet.StyleEditor standard FormElement class for given styleOption
     * @param {*} styleOption, the styleOption to get the standard class for
     */
    getFormElementStandardClass: function getFormElementStandardClass(styleOption) {
      return new this.options.formElements[styleOption]({
        styleOption: styleOption,
        parentForm: this,
        styleEditorOptions: this.options.styleEditorOptions
      });
    }
  });
}
// CONCATENATED MODULE: ./src/javascript/Form/GeometryForm.js

/** Form used to enable modification of a Geometry */

function setupGeometryForm() {
  L.StyleEditor.forms.GeometryForm = L.StyleEditor.forms.Form.extend({
    options: {
      formOptionKey: 'geometry',
      formElements: {
        'color': L.StyleEditor.formElements.ColorElement,
        'opacity': L.StyleEditor.formElements.OpacityElement,
        'weight': L.StyleEditor.formElements.WeightElement,
        'dashArray': L.StyleEditor.formElements.DashElement,
        'fillColor': L.StyleEditor.formElements.ColorElement,
        'fillOpacity': L.StyleEditor.formElements.OpacityElement,
        'popupContent': L.StyleEditor.formElements.PopupContentElement
      }
    },

    /** show the fillOptions (fillColor and fillOpacity) only if the Element can be filled */
    showFormElements: function showFormElements() {
      for (var i = 0; i < this.options.initializedElements.length; i++) {
        if (this.options.initializedElements[i].options.styleOption.indexOf('fill') === 0) {
          if (this.options.styleEditorOptions.util.fillCurrentElement()) {
            this.showFormElement(this.options.initializedElements[i]);
          } else {
            this.options.initializedElements[i].hide();
          }
        } else {
          this.showFormElement(this.options.initializedElements[i]);
        }
      }
    }
  });
}
// CONCATENATED MODULE: ./src/javascript/Form/MarkerForm.js

/** Form used to enable modification of a Geometry */

function setupMarkerForm() {
  L.StyleEditor.forms.MarkerForm = L.StyleEditor.forms.Form.extend({
    options: {
      formOptionKey: 'marker',
      formElements: {
        'icon': L.StyleEditor.formElements.IconElement,
        'color': L.StyleEditor.formElements.ColorElement,
        'size': L.StyleEditor.formElements.SizeElement,
        'popupContent': L.StyleEditor.formElements.PopupContentElement
      }
    }
  });
}
// CONCATENATED MODULE: ./src/javascript/Marker/Marker.js

/**
 * The Base class for different markers
 */

function setupMarker() {
  L.StyleEditor.marker.Marker = L.Marker.extend({
    /** define markerForm used to style the Marker */
    markerForm: L.StyleEditor.forms.MarkerForm,
    options: {
      size: {
        'small': [20, 50],
        'medium': [30, 70],
        'large': [35, 90]
      },
      selectIconSize: [],
      selectIconClass: '',
      iconOptions: {}
    },

    /** set standard icon */
    initialize: function initialize(options) {
      L.setOptions(this, options);
      L.setOptions(this, this.options);

      if (this.options.selectIconClass !== '' && !this.options.selectIconClass.startsWith('leaflet-styleeditor-select-image')) {
        this.options.selectIconClass = 'leaflet-styleeditor-select-image-' + this.options.selectIconClass;
      }
    },

    /** create new Marker and show it */
    setNewMarker: function setNewMarker() {
      var newIcon = this._createMarkerIcon();

      var currentElement = this.options.styleEditorOptions.currentElement.target;
      currentElement.setIcon(newIcon);

      if (currentElement instanceof L.LayerGroup) {
        currentElement.eachLayer(function (layer) {
          L.DomUtil.addClass(layer.getElement(), 'leaflet-styleeditor-marker-selected');
        });
      } else {
        L.DomUtil.addClass(currentElement.getElement(), 'leaflet-styleeditor-marker-selected');
      }
    },

    /** set styling options */
    setStyle: function setStyle(styleOption, value) {
      if (styleOption !== 'icon') {
        styleOption = 'icon' + styleOption.charAt(0).toUpperCase() + styleOption.slice(1);
      }

      this.setIconOptions(styleOption, value);
      this.setNewMarker();
    },

    /** create HTML used to */
    createSelectHTML: function createSelectHTML(parentUiElement, iconOptions, icon) {},

    /** get the current iconOptions
     *  if not set set them
     */
    getIconOptions: function getIconOptions() {
      try {
        this.options.iconOptions = this.options.styleEditorOptions.currentElement.target.options.icon.options;
      } catch (e) {// if a new marker is created it may be the currentItem is still set, but is no marker
      }

      if (Object.keys(this.options.iconOptions).length > 0) {
        return this.options.iconOptions;
      }

      this.options.iconOptions.iconColor = this._getDefaultMarkerColor();
      this.options.iconOptions.iconSize = this.options.styleEditorOptions.markerType.options.size.small;
      this.options.iconOptions.icon = this.options.styleEditorOptions.util.getDefaultMarkerForColor(this.options.iconOptions.iconColor);
      this.options.iconOptions = this._ensureMarkerIcon(this.options.iconOptions);
      return this.options.iconOptions;
    },
    resetIconOptions: function resetIconOptions() {
      var _this = this;

      Object.keys(this.getIconOptions()).forEach(function (key) {
        return _this.setStyle(key, _this.options.iconOptions[key]);
      });
    },
    setIconOptions: function setIconOptions(key, value) {
      var iconOptions = this.getIconOptions();
      iconOptions[key] = value;
    },

    /** call createMarkerIcon with the correct iconOptions */
    _createMarkerIcon: function _createMarkerIcon() {
      var iconOptions = this.getIconOptions();
      return this.createMarkerIcon(iconOptions);
    },

    /** check that the icon set in the iconOptions exists
     *  else set default icon
     */
    _ensureMarkerIcon: function _ensureMarkerIcon(iconOptions) {
      var markers = this.options.styleEditorOptions.util.getMarkersForColor(iconOptions.iconColor);

      if (markers.includes(iconOptions.icon)) {
        return iconOptions;
      }

      iconOptions.icon = this.options.styleEditorOptions.util.getDefaultMarkerForColor(iconOptions.iconColor);
      return iconOptions;
    },

    /** return default marker color
     *
     * will return the first of the following which is set and supported by the markers
     * 1. styleEditorOptions.defaultMarkerColor
     * 2. styleEditorOptions.defaultColor
     * 3. first color of the marker's colorRamp which is in the styleeditor.colorRamp
     * 4. first color of the marker's colorRamp
     * */
    _getDefaultMarkerColor: function _getDefaultMarkerColor() {
      var markerTypeColorRamp = this.options.colorRamp;
      var generalColorRamp = this.options.styleEditorOptions.colorRamp;
      var intersectedColorRamp = [];

      if (typeof markerTypeColorRamp !== 'undefined' && markerTypeColorRamp !== null) {
        intersectedColorRamp = markerTypeColorRamp.filter(function (n) {
          return generalColorRamp.includes(n);
        });

        if (intersectedColorRamp.length === 0) {
          intersectedColorRamp = markerTypeColorRamp;
        }
      } else {
        intersectedColorRamp = generalColorRamp;
      }

      var color = this.options.styleEditorOptions.defaultMarkerColor;

      if (color !== null && !intersectedColorRamp.includes(color)) {
        color = null;
      }

      if (color === null) {
        color = this.options.styleEditorOptions.defaultColor;

        if (color !== null && !intersectedColorRamp.includes(color)) {
          color = null;
        }

        if (color === null) {
          color = intersectedColorRamp[0];
        }
      }

      return this.options.styleEditorOptions.util.rgbToHex(color);
    },

    /** return size as keyword */
    sizeToName: function sizeToName(size) {
      var keys = Object.keys(this.options.size);

      if (typeof size === 'string') {
        if (size === 's') {
          size = 'small';
        } else if (size === 'm') {
          size = 'medium';
        } else if (size === 'l') {
          size = 'large';
        }

        for (var i = 0; i < keys.length; i++) {
          if (this.options.size[keys[i]] === size) {
            return keys[i];
          }
        }
      }

      var values = Object.values(this.options.size);

      for (var _i = 0; _i < values.length; _i++) {
        if (JSON.stringify(size) === JSON.stringify(values[_i])) {
          return keys[_i];
        }
      }

      return keys[0];
    },

    /** return size as [x,y] */
    sizeToPixel: function sizeToPixel(size) {
      size = this.sizeToName(size);
      return this.options.size[size];
    }
  });
}
// CONCATENATED MODULE: ./src/javascript/Marker/DefaultMarker.js

/**
 * The "old" marker style used by L.StyleEditor
 * used the mapbox API v3
 */

function setupDefaultMarker() {
  L.StyleEditor.marker.DefaultMarker = L.StyleEditor.marker.Marker.extend({
    createMarkerIcon: function createMarkerIcon(iconOptions, iconClass) {
      if (!iconClass) {
        iconClass = '';
      }

      var iconSize = iconOptions.iconSize;
      return new L.Icon({
        iconUrl: this._getMarkerUrlForStyle(iconOptions),
        iconSize: iconOptions.iconSize,
        iconColor: iconOptions.iconColor,
        icon: iconOptions.icon,
        className: iconClass,
        iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
        popupAnchor: [0, -iconSize[1] / 2]
      });
    },
    createSelectHTML: function createSelectHTML(parentUiElement, iconOptions, icon) {
      var tmpOptions = {};
      tmpOptions.iconSize = this.options.size.small;
      tmpOptions.icon = icon;
      tmpOptions.iconColor = iconOptions.iconColor;
      parentUiElement.innerHTML = this.createMarkerIcon(tmpOptions, this.options.selectIconClass).createIcon().outerHTML;
    },
    _getMarkerUrlForStyle: function _getMarkerUrlForStyle(iconOptions) {
      return this._getMarkerUrl(iconOptions.iconSize, iconOptions.iconColor, iconOptions.icon);
    },
    _getMarkerUrl: function _getMarkerUrl(size, color, icon) {
      size = this.sizeToName(size)[0];

      if (color.indexOf('#') === 0) {
        color = color.replace('#', '');
      } else {
        color = this.options.styleEditorOptions.util.rgbToHex(color, true);
      }

      var url = 'https://api.tiles.mapbox.com/v3/marker/pin-' + size;

      if (icon) {
        url += '-' + icon;
      }

      return url + '+' + color + '.png';
    },
    options: {
      selectIconClass: 'defaultmarker',
      markers: ['circle-stroked', 'circle', 'square-stroked', 'square', 'triangle-stroked', 'triangle', 'star-stroked', 'star', 'cross', 'marker-stroked', 'marker', 'religious-jewish', 'religious-christian', 'religious-muslim', 'cemetery', 'rocket', 'airport', 'heliport', 'rail', 'rail-metro', 'rail-light', 'bus', 'fuel', 'parking', 'parking-garage', 'airfield', 'roadblock', 'ferry', 'harbor', 'bicycle', 'park', 'park2', 'museum', 'lodging', 'monument', 'zoo', 'garden', 'campsite', 'theatre', 'art-gallery', 'pitch', 'soccer', 'america-football', 'tennis', 'basketball', 'baseball', 'golf', 'swimming', 'cricket', 'skiing', 'school', 'college', 'library', 'post', 'fire-station', 'town-hall', 'police', 'prison', 'embassy', 'beer', 'restaurant', 'cafe', 'shop', 'fast-food', 'bar', 'bank', 'grocery', 'cinema', 'pharmacy', 'hospital', 'danger', 'industrial', 'warehouse', 'commercial', 'building', 'place-of-worship', 'alcohol-shop', 'logging', 'oil-well', 'slaughterhouse', 'dam', 'water', 'wetland', 'disability', 'telephone', 'emergency-telephone', 'toilets', 'waste-basket', 'music', 'land-use', 'city', 'town', 'village', 'farm', 'bakery', 'dog-park', 'lighthouse', 'clothing-store', 'polling-place', 'playground', 'entrance', 'heart', 'london-underground', 'minefield', 'rail-underground', 'rail-above', 'camera', 'laundry', 'car', 'suitcase', 'hairdresser', 'chemist', 'mobilephone', 'scooter']
    }
  });
}
// CONCATENATED MODULE: ./src/javascript/Marker/GlyphiconMarker.js

/**
 * Example class showing how to implement new MarkerClasses
 * uses the glyphicons given by bootstrap
 */

function setupGlyphiconMarker() {
  L.StyleEditor.marker.GlyphiconMarker = L.StyleEditor.marker.Marker.extend({
    getMarkerHtml: function getMarkerHtml(size, color, icon) {
      var iconUrl = this._getMarkerUrl(size, color);

      return '<div class="leaflet-styleeditor-marker leaflet-styleeditor-marker-' + this.sizeToName(size)[0] + '" ' + 'style="background-image: url(' + iconUrl + ');">' + '<div class="leaflet-styleeditor-fill"></div>' + '<i class="glyphicon ' + icon + '"></i>' + '<div class="leaflet-styleeditor-fill"></div>' + '</div>';
    },
    createMarkerIcon: function createMarkerIcon(iconOptions) {
      var iconSize = iconOptions.iconSize;
      return L.divIcon({
        className: 'leaflet-styleeditor-glyphicon-marker-wrapper',
        html: this.getMarkerHtml(iconSize, iconOptions.iconColor, iconOptions.icon),
        icon: iconOptions.icon,
        iconColor: iconOptions.iconColor,
        iconSize: iconSize,
        iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
        popupAnchor: [0, -iconSize[1] / 2]
      });
    },
    setStyle: function setStyle(styleOption, value) {
      if (styleOption !== 'icon') {
        styleOption = 'icon' + styleOption.charAt(0).toUpperCase() + styleOption.slice(1);
      }

      var iconOptions = this.options.iconOptions;

      if (iconOptions[styleOption] !== value) {
        iconOptions[styleOption] = value;
        this.setNewMarker();
      }
    },
    createSelectHTML: function createSelectHTML(parentUiElement, iconOptions, icon) {
      parentUiElement.innerHTML = this.getMarkerHtml('s', iconOptions.iconColor, icon);
    },
    _getMarkerUrlForStyle: function _getMarkerUrlForStyle(iconOptions) {
      return this._getMarkerUrl(iconOptions.iconSize, iconOptions.iconColor, iconOptions.icon);
    },
    _getMarkerUrl: function _getMarkerUrl(size, color, icon) {
      size = this.sizeToName(size)[0];

      if (color.indexOf('#') === 0) {
        color = color.replace('#', '');
      } else {
        color = this.options.styleEditorOptions.util.rgbToHex(color, true);
      }

      var url = 'https://api.tiles.mapbox.com/v3/marker/pin-' + size;
      return url + '+' + color + '.png';
    },
    options: {
      markers: ['glyphicon-plus', 'glyphicon-asterisk', 'glyphicon-plus', 'glyphicon-euro', 'glyphicon-minus', 'glyphicon-cloud', 'glyphicon-envelope', 'glyphicon-pencil', 'glyphicon-glass', 'glyphicon-music', 'glyphicon-search', 'glyphicon-heart', 'glyphicon-star', 'glyphicon-star-empty', 'glyphicon-user', 'glyphicon-film', 'glyphicon-th-large', 'glyphicon-th', 'glyphicon-th-list', 'glyphicon-ok', 'glyphicon-remove', 'glyphicon-zoom-in', 'glyphicon-zoom-out', 'glyphicon-off', 'glyphicon-signal', 'glyphicon-cog', 'glyphicon-trash', 'glyphicon-home', 'glyphicon-file', 'glyphicon-time', 'glyphicon-road', 'glyphicon-download-alt', 'glyphicon-download', 'glyphicon-upload', 'glyphicon-inbox', 'glyphicon-play-circle', 'glyphicon-repeat', 'glyphicon-refresh', 'glyphicon-list-alt', 'glyphicon-lock', 'glyphicon-flag', 'glyphicon-headphones', 'glyphicon-volume-off', 'glyphicon-volume-down', 'glyphicon-volume-up', 'glyphicon-qrcode', 'glyphicon-barcode', 'glyphicon-tag', 'glyphicon-tags', 'glyphicon-book', 'glyphicon-bookmark', 'glyphicon-print', 'glyphicon-camera', 'glyphicon-font', 'glyphicon-bold', 'glyphicon-italic', 'glyphicon-text-height', 'glyphicon-text-width', 'glyphicon-align-left', 'glyphicon-align-center', 'glyphicon-align-right', 'glyphicon-align-justify', 'glyphicon-list', 'glyphicon-indent-left', 'glyphicon-indent-right', 'glyphicon-facetime-video', 'glyphicon-picture', 'glyphicon-map-marker', 'glyphicon-adjust', 'glyphicon-tint', 'glyphicon-edit', 'glyphicon-share', 'glyphicon-check', 'glyphicon-move', 'glyphicon-chevron-right', 'glyphicon-plus-sign', 'glyphicon-minus-sign', 'glyphicon-remove-sign', 'glyphicon-ok-sign', 'glyphicon-question-sign', 'glyphicon-info-sign', 'glyphicon-screenshot', 'glyphicon-remove-circle', 'glyphicon-ok-circle', 'glyphicon-ban-circle', 'glyphicon-arrow-left', 'glyphicon-arrow-right', 'glyphicon-arrow-up', 'glyphicon-arrow-down', 'glyphicon-share-alt', 'glyphicon-resize-full', 'glyphicon-resize-small', 'glyphicon-exclamation-sign', 'glyphicon-gift', 'glyphicon-leaf', 'glyphicon-fire', 'glyphicon-eye-open', 'glyphicon-eye-close', 'glyphicon-warning-sign', 'glyphicon-plane', 'glyphicon-calendar', 'glyphicon-random', 'glyphicon-comment', 'glyphicon-magnet', 'glyphicon-chevron-up', 'glyphicon-chevron-down', 'glyphicon-retweet', 'glyphicon-shopping-cart', 'glyphicon-bullhorn', 'glyphicon-bell', 'glyphicon-certificate', 'glyphicon-thumbs-up', 'glyphicon-thumbs-down', 'glyphicon-hand-right', 'glyphicon-hand-left', 'glyphicon-hand-up', 'glyphicon-hand-down', 'glyphicon-circle-arrow-right', 'glyphicon-circle-arrow-left', 'glyphicon-circle-arrow-up', 'glyphicon-circle-arrow-down', 'glyphicon-globe', 'glyphicon-wrench', 'glyphicon-tasks', 'glyphicon-filter', 'glyphicon-briefcase', 'glyphicon-fullscreen', 'glyphicon-dashboard', 'glyphicon-paperclip', 'glyphicon-heart-empty', 'glyphicon-link', 'glyphicon-phone', 'glyphicon-pushpin', 'glyphicon-usd']
    }
  });
}
// CONCATENATED MODULE: ./src/javascript/StyleForm.js

function setupStyleForm() {
  L.StyleForm = L.Class.extend({
    initialize: function initialize(options) {
      L.setOptions(this, options);
      this.createMarkerForm();
      this.createGeometryForm();
      this.addDOMEvents();
    },
    addDOMEvents: function addDOMEvents() {
      L.DomEvent.addListener(this.options.styleEditorOptions.map, 'click', this.lostFocus, this);
      L.DomEvent.addListener(this.options.styleEditorDiv, 'click', this.lostFocus, this);
    },
    clearForm: function clearForm() {
      this.options.styleEditorOptions.markerForm.hide();
      this.options.styleEditorOptions.geometryForm.hide();
    },
    createMarkerForm: function createMarkerForm() {
      var markerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-marker', this.options.styleEditorInterior);
      this.options.styleEditorOptions.markerForm.create(markerDiv);
    },
    createGeometryForm: function createGeometryForm() {
      var markerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-geometry', this.options.styleEditorInterior);
      this.options.styleEditorOptions.geometryForm.create(markerDiv);
    },
    showMarkerForm: function showMarkerForm() {
      this.clearForm();
      this.options.styleEditorOptions.markerForm.show();
    },
    showGeometryForm: function showGeometryForm() {
      this.clearForm();
      this.options.styleEditorOptions.geometryForm.show();
    },
    fireChangeEvent: function fireChangeEvent(element) {
      this.options.styleEditorOptions.util.fireChangedEvent(element);
    },
    lostFocus: function lostFocus(e) {
      var parent = e.target;

      for (var i = 0; i < 10; i++) {
        if (!parent) {
          break;
        }

        if (!!parent.className && L.DomUtil.hasClass(parent, 'leaflet-styleeditor-interior')) {
          return;
        }

        parent = parent.parentNode;
      }

      this.options.styleEditorOptions.markerForm.lostFocus();
      this.options.styleEditorOptions.geometryForm.lostFocus();
    }
  });
}
// CONCATENATED MODULE: ./src/javascript/Control.js

function setupControl() {
  L.Control.StyleEditor = L.Control.extend({
    options: {
      position: 'topleft',
      colorRamp: ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'],
      defaultColor: null,
      markerType: L.StyleEditor.marker.DefaultMarker,
      markers: null,
      defaultMarkerIcon: null,
      defaultMarkerColor: null,
      geometryForm: L.StyleEditor.forms.GeometryForm,
      ignoreLayerTypes: [],
      forms: {},
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
      // internal
      currentElement: null,
      _editLayers: [],
      _layerGroups: []
    },
    initialize: function initialize(options) {
      if (options) {
        L.setOptions(this, options);
      }

      this.options.util = new L.StyleEditor.Util({
        styleEditorOptions: this.options
      }); // eslint-disable-next-line new-cap

      this.options.markerType = new this.options.markerType({
        styleEditorOptions: this.options
      }); // eslint-disable-next-line new-cap

      this.options.markerForm = new this.options.markerType.markerForm({
        styleEditorOptions: this.options
      }); // eslint-disable-next-line new-cap

      this.options.geometryForm = new this.options.geometryForm({
        styleEditorOptions: this.options
      });
      this.getDefaultIcon = this.options.markerType._createMarkerIcon.bind(this.options.markerType);
      this.createIcon = this.options.markerType.createMarkerIcon.bind(this.options.markerType);
    },
    onAdd: function onAdd(map) {
      this.options.map = map;
      return this.createUi();
    },
    fireEvent: function fireEvent(eventName, element) {
      this.options.util.fireEvent(eventName, element);
    },
    createUi: function createUi() {
      var controlDiv = this.options.controlDiv = L.DomUtil.create('div', 'leaflet-control-styleeditor leaflet-control leaflet-bar');
      var controlUI = this.options.controlUI = L.DomUtil.create('a', 'leaflet-control-styleeditor-interior', controlDiv);
      controlUI.title = 'Style Editor';
      var cancel = this.options.cancelUI = L.DomUtil.create('div', 'leaflet-control-styleeditor-cancel leaflet-styleeditor-hidden', controlDiv);
      cancel.innerHTML = this.options.strings.cancel;
      cancel.title = this.options.strings.cancelTitle;
      var styleEditorDiv = this.options.styleEditorDiv = L.DomUtil.create('div', 'leaflet-styleeditor', this.options.map._container);
      this.options.styleEditorHeader = L.DomUtil.create('div', 'leaflet-styleeditor-header', styleEditorDiv);
      var styleEditorInterior = L.DomUtil.create('div', 'leaflet-styleeditor-interior', styleEditorDiv);
      this.addDomEvents();
      this.addEventListeners();
      this.addButtons();
      this.options.styleForm = new L.StyleForm({
        styleEditorDiv: styleEditorDiv,
        styleEditorInterior: styleEditorInterior,
        styleEditorOptions: this.options
      });
      return controlDiv;
    },
    addDomEvents: function addDomEvents() {
      L.DomEvent.disableScrollPropagation(this.options.styleEditorDiv);
      L.DomEvent.disableScrollPropagation(this.options.controlDiv);
      L.DomEvent.disableScrollPropagation(this.options.cancelUI);
      L.DomEvent.disableClickPropagation(this.options.styleEditorDiv);
      L.DomEvent.disableClickPropagation(this.options.controlDiv);
      L.DomEvent.disableClickPropagation(this.options.cancelUI);
      L.DomEvent.on(this.options.controlDiv, 'click', function () {
        this.toggle();
      }, this);
    },
    addEventListeners: function addEventListeners() {
      this.addLeafletDrawEvents();
      this.addLeafletEditableEvents();
    },
    addLeafletDrawEvents: function addLeafletDrawEvents() {
      if (!this.options.openOnLeafletDraw || !L.Control.Draw) {
        return;
      }

      this.options.map.on('layeradd', this.onLayerAdd, this);
      this.options.map.on(L.Draw.Event.CREATED, this.onLayerCreated, this);
    },
    addLeafletEditableEvents: function addLeafletEditableEvents() {
      if (!this.options.openOnLeafletEditable || !L.Editable) {
        return;
      }

      this.options.map.on('layeradd', this.onLayerAdd, this);
      this.options.map.on('editable:created', this.onLayerCreated, this);
    },
    onLayerCreated: function onLayerCreated(layer) {
      this.removeIndicators();
      this.options.currentElement = layer.layer;
    },
    onLayerAdd: function onLayerAdd(e) {
      if (this.options.currentElement) {
        if (e.layer === this.options.util.getCurrentElement()) {
          this.enable(e.layer);
        }
      }
    },
    onRemove: function onRemove() {
      // hide everything that may be visible
      // remove edit events for layers
      // remove tooltip
      this.disable(); // remove events

      this.removeDomEvents();
      this.removeEventListeners(); // remove dom elements

      L.DomUtil.remove(this.options.styleEditorDiv);
      L.DomUtil.remove(this.options.cancelUI); // delete dom elements

      delete this.options.styleEditorDiv;
      delete this.options.cancelUI;
    },
    removeEventListeners: function removeEventListeners() {
      this.options.map.off('layeradd', this.onLayerAdd);

      if (L.Draw) {
        this.options.map.off(L.Draw.Event.CREATED, this.onLayerCreated);
      }

      if (L.Editable) {
        this.options.map.off('editable:created', this.onLayerCreated);
      }
    },
    removeDomEvents: function removeDomEvents() {
      L.DomEvent.off(this.options.controlDiv, 'click', function () {
        this.toggle();
      }, this);
    },
    addButtons: function addButtons() {
      var nextBtn = L.DomUtil.create('button', 'leaflet-styleeditor-button styleeditor-nextBtn', this.options.styleEditorHeader);
      nextBtn.title = this.options.strings.tooltipNext;
      L.DomEvent.on(nextBtn, 'click', function (e) {
        e.preventDefault(); // Prevent form submit

        this.hideEditor();

        if (L.DomUtil.hasClass(this.options.controlUI, 'enabled')) {
          this.createTooltip();
        }

        e.stopPropagation();
      }, this);
    },
    toggle: function toggle() {
      if (L.DomUtil.hasClass(this.options.controlUI, 'enabled')) {
        this.disable();
      } else {
        this.enable();
      }
    },
    enable: function enable(layer) {
      if (this._layerIsIgnored(layer)) {
        return;
      }

      L.DomUtil.addClass(this.options.controlUI, 'enabled');
      this.options.map.eachLayer(this.addEditClickEvents, this);
      this.showCancelButton();
      this.createTooltip();

      if (layer !== undefined) {
        if (this.isEnabled()) {
          this.removeIndicators();
        }

        this.initChangeStyle({
          target: layer
        });
      }
    },
    isEnabled: function isEnabled() {
      return L.DomUtil.hasClass(this.options.controlUI, 'enabled');
    },
    disable: function disable() {
      if (this.isEnabled()) {
        this.options._editLayers.forEach(this.removeEditClickEvents, this);

        this.options._editLayers = [];
        this.options._layerGroups = [];
        this.hideEditor();
        this.hideCancelButton();
        this.removeTooltip();
        L.DomUtil.removeClass(this.options.controlUI, 'enabled');
      }
    },
    addEditClickEvents: function addEditClickEvents(layer) {
      if (this._layerIsIgnored(layer)) {
        return;
      }

      if (this.options.useGrouping && layer instanceof L.LayerGroup) {
        this.options._layerGroups.push(layer);
      } else if (layer instanceof L.Marker || layer instanceof L.Path) {
        var evt = layer.on('click', this.initChangeStyle, this);

        this.options._editLayers.push(evt);
      }
    },
    removeEditClickEvents: function removeEditClickEvents(layer) {
      layer.off('click', this.initChangeStyle, this);
    },
    addIndicators: function addIndicators() {
      if (!this.options.currentElement) {
        return;
      }

      var currentElement = this.options.currentElement.target;

      if (currentElement instanceof L.LayerGroup) {
        currentElement.eachLayer(function (layer) {
          if (layer instanceof L.Marker && layer.getElement()) {
            L.DomUtil.addClass(layer.getElement(), 'leaflet-styleeditor-marker-selected');
          }
        });
      } else if (currentElement instanceof L.Marker) {
        if (currentElement.getElement()) {
          L.DomUtil.addClass(currentElement.getElement(), 'leaflet-styleeditor-marker-selected');
        }
      }
    },
    removeIndicators: function removeIndicators() {
      if (!this.options.currentElement) {
        return;
      }

      var currentElement = this.options.util.getCurrentElement();

      if (currentElement instanceof L.LayerGroup) {
        currentElement.eachLayer(function (layer) {
          if (layer.getElement()) {
            L.DomUtil.removeClass(layer.getElement(), 'leaflet-styleeditor-marker-selected');
          }
        });
      } else {
        if (currentElement.getElement()) {
          L.DomUtil.removeClass(currentElement.getElement(), 'leaflet-styleeditor-marker-selected');
        }
      }
    },
    hideEditor: function hideEditor() {
      if (L.DomUtil.hasClass(this.options.styleEditorDiv, 'editor-enabled')) {
        this.removeIndicators();
        L.DomUtil.removeClass(this.options.styleEditorDiv, 'editor-enabled');
        this.fireEvent('hidden');
      }
    },
    hideCancelButton: function hideCancelButton() {
      L.DomUtil.addClass(this.options.cancelUI, 'leaflet-styleeditor-hidden');
    },
    showEditor: function showEditor() {
      var editorDiv = this.options.styleEditorDiv;

      if (!L.DomUtil.hasClass(editorDiv, 'editor-enabled')) {
        L.DomUtil.addClass(editorDiv, 'editor-enabled');
        this.fireEvent('visible');
      }
    },
    showCancelButton: function showCancelButton() {
      L.DomUtil.removeClass(this.options.cancelUI, 'leaflet-styleeditor-hidden');
    },
    initChangeStyle: function initChangeStyle(e) {
      this.removeIndicators();
      this.options.currentElement = this.options.useGrouping ? this.getMatchingElement(e) : e;
      this.addIndicators();
      this.showEditor();
      this.removeTooltip();
      var layer = e;

      if (!(layer instanceof L.Layer)) {
        layer = e.target;
      }

      this.fireEvent('editing', layer);

      if (layer instanceof L.Marker) {
        // ensure iconOptions are set for Leaflet.Draw created Markers
        this.options.markerType.resetIconOptions(); // marker

        this.showMarkerForm(layer);
      } else {
        // layer with of type L.GeoJSON or L.Path (polyline, polygon, ...)
        this.showGeometryForm(layer);
      }
    },
    showGeometryForm: function showGeometryForm(layer) {
      this.fireEvent('geometry', layer);
      this.options.styleForm.showGeometryForm();
    },
    showMarkerForm: function showMarkerForm(layer) {
      this.fireEvent('marker', layer);
      this.options.styleForm.showMarkerForm();
    },
    createTooltip: function createTooltip() {
      if (!this.options.showTooltip) {
        return;
      }

      if (!this.options.tooltipWrapper) {
        this.options.tooltipWrapper = L.DomUtil.create('div', 'leaflet-styleeditor-tooltip-wrapper', this.options.map.getContainer());
      }

      if (!this.options.tooltip) {
        this.options.tooltip = L.DomUtil.create('div', 'leaflet-styleeditor-tooltip', this.options.tooltipWrapper);
      }

      this.options.tooltip.innerHTML = this.options.strings.tooltip;
    },
    getMatchingElement: function getMatchingElement(e) {
      var group = null;
      var layer = e.target;

      for (var i = 0; i < this.options._layerGroups.length; ++i) {
        group = this.options._layerGroups[i];

        if (group && layer !== group && group.hasLayer(layer)) {
          // we use the opacity style to check for correct object
          if (!group.options || !group.options.opacity) {
            group.options = layer.options; // special handling for layers... we pass the setIcon function

            if (layer.setIcon) {
              group.setIcon = function (icon) {
                group.eachLayer(function (layer) {
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
    removeTooltip: function removeTooltip() {
      if (this.options.tooltip && this.options.tooltip.parentNode) {
        this.options.tooltip.remove();
        this.options.tooltip = undefined;
      }
    },
    _layerIsIgnored: function _layerIsIgnored(layer) {
      if (layer === undefined) {
        return false;
      }

      return this.options.ignoreLayerTypes.some(function (layerType) {
        return layer.styleEditor && layer.styleEditor.type.toUpperCase() === layerType.toUpperCase();
      });
    }
  });

  L.control.styleEditor = function (options) {
    if (!options) {
      options = {};
    }

    return new L.Control.StyleEditor(options);
  };
}
// CONCATENATED MODULE: ./src/javascript/Util.js

/**
 * Helper functions used throuhgout the project
 */

function setupUtil() {
  L.StyleEditor.Util = L.Class.extend({
    initialize: function initialize(options) {
      if (options) {
        L.setOptions(this, options);
      }
    },
    fireEvent: function fireEvent(eventName, element) {
      this.options.styleEditorOptions.map.fireEvent(this.options.styleEditorOptions.styleEditorEventPrefix + eventName, element);
    },

    /** fire an event if Leaflet.StyleEditor changed something */
    fireChangeEvent: function fireChangeEvent(element) {
      this.fireEvent('changed', element);
    },

    /** hide the given element */
    hideElement: function hideElement(element) {
      if (element) {
        L.DomUtil.addClass(element, 'leaflet-styleeditor-hidden');
      }
    },

    /** convert rgb to hex of a color
     * @param {string} rgb - rgb representation of the color
     * @param {boolean} noHash - define if return value should not include hash
     */
    rgbToHex: function rgbToHex(rgb, noHash) {
      if (!rgb) {
        rgb = this.options.styleEditorOptions.defaultColor;

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
    },

    /** get element selected to be styled */
    getCurrentElement: function getCurrentElement() {
      if (!this.options.styleEditorOptions.currentElement) {
        return null;
      }

      if (this.options.styleEditorOptions.currentElement.target !== undefined) {
        return this.options.styleEditorOptions.currentElement.target;
      }

      return this.options.styleEditorOptions.currentElement;
    },

    /** set which element is selected to be styled */
    setCurrentElement: function setCurrentElement(currentElement) {
      this.options.styleEditorOptions.currentElement.target = currentElement;
    },

    /** does current element have the fill option */
    fillCurrentElement: function fillCurrentElement() {
      return this.getCurrentElement().options.fill;
    },

    /** get current style of current element */
    getStyle: function getStyle(option) {
      var currentElement = this.getCurrentElement();
      var style = currentElement.options[option];

      if (style) {
        return style;
      }

      return null;
    },

    /** set new style to current element */
    setStyle: function setStyle(option, value) {
      var currentElement = this.getCurrentElement();

      if (currentElement instanceof L.Marker) {
        this.options.styleEditorOptions.markerType.setStyle(option, value);
      } else {
        var newStyle = {};
        newStyle[option] = value;
        currentElement.setStyle(newStyle);
      }

      this.fireChangeEvent(currentElement);
    },

    /** show hidden element */
    showElement: function showElement(element) {
      if (element) {
        L.DomUtil.removeClass(element, 'leaflet-styleeditor-hidden');
      }
    },

    /** helper function to convert color to hex */
    _componentToHex: function _componentToHex(color) {
      var hex = color.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    },

    /** get the markers for a specific color **/
    getMarkersForColor: function getMarkersForColor(color) {
      color = this.rgbToHex(color);
      var markers = this.options.styleEditorOptions.markerType.options.markers;
      var controlMarkers = this.options.styleEditorOptions.markers;

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
    },

    /** get default marker for specific color **/
    getDefaultMarkerForColor: function getDefaultMarkerForColor(color) {
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

      defMarkers.filter(function (n) {
        return markers.includes(n);
      });

      if (defMarkers.length > 0) {
        return defMarkers[0];
      }

      return markers[0];
    }
  });
}
// CONCATENATED MODULE: ./src/javascript/Leaflet.StyleEditor.js



















__webpack_require__(1);

L.StyleEditor = {
  marker: {},
  forms: {},
  formElements: {}
};
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
setupUtil();
setupFormElement();
setupColorElement();
setupDashElement();
setupIconElement();
setupOpacityElement();
setupPopupContentElement();
setupSizeElement();
setupWeightElement();
setupForm();
setupGeometryForm();
setupMarkerForm();
setupMarker();
setupDefaultMarker();
setupGlyphiconMarker();
setupStyleForm();
setupControl();
/* harmony default export */ var Leaflet_StyleEditor = __webpack_exports__["default"] = (L);

/***/ })
/******/ ]);
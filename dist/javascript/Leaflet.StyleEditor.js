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
__webpack_require__(4);
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
class StyleEditorClass {
}
exports.StyleEditorClass = StyleEditorClass;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class StyleEditorControl extends L.Control {
    constructor(options) {
        super(options);
        this.options = options;
    }
    onAdd(map) {
        // create Control element
        const controlUI = this.controlUI = L.DomUtil.create('div', 'leaflet-control-styleeditor leaflet-control leaflet-bar');
        const controlDiv = L.DomUtil.create('a', 'leaflet-control-styleeditor-interior', controlUI);
        controlDiv.title = 'Style Editor';
        const cancelUI = this.cancelUI = L.DomUtil.create('div', 'leaflet-control-styleeditor-cancel leaflet-styleeditor-hidden', controlUI);
        cancelUI.innerHTML = this.options.strings.cancel;
        cancelUI.title = this.options.strings.cancelTitle;
        const editorUI = this.editorUI = L.DomUtil.create('div', 'leaflet-styleeditor', map.getContainer());
        const styleEditorHeader = L.DomUtil.create('div', 'leaflet-styleeditor-header', editorUI);
        L.DomUtil.create('div', 'leaflet-styleeditor-interior', editorUI);
        const buttonNext = L.DomUtil.create('button', 'leaflet-styleeditor-button styleeditor-nextBtn', styleEditorHeader);
        buttonNext.title = this.options.strings.tooltipNext;
        const tooltipWrapper = L.DomUtil.create('div', 'leaflet-styleeditor-tooltip-wrapper', map.getContainer());
        const tooltip = this.tooltipUI = L.DomUtil.create('div', 'leaflet-styleeditor-tooltip', tooltipWrapper);
        tooltip.innerHTML = this.options.strings.tooltip;
        // do not propagate scrolling events on the ui to the map
        L.DomEvent.disableScrollPropagation(controlUI);
        L.DomEvent.disableScrollPropagation(editorUI);
        L.DomEvent.disableScrollPropagation(controlUI);
        L.DomEvent.disableScrollPropagation(cancelUI);
        L.DomEvent.disableScrollPropagation(buttonNext);
        // do not propagate click events on the ui to the map
        L.DomEvent.disableClickPropagation(controlUI);
        L.DomEvent.disableClickPropagation(editorUI);
        L.DomEvent.disableClickPropagation(controlUI);
        L.DomEvent.disableClickPropagation(cancelUI);
        L.DomEvent.disableClickPropagation(buttonNext);
        // toggle UI visibility
        L.DomEvent.on(controlUI, 'click', this.toggle);
        // select next layer to style
        L.DomEvent.on(buttonNext, 'click', this.onNext);
        this.addEventListeners(map);
        /*
            this.options.styleForm = new L.StyleForm({
              styleEditorDiv: styleEditorDiv,
              styleEditorInterior: styleEditorInterior,
              styleEditorOptions: this.options
            })
        */
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
        if (L.DomUtil.hasClass(this.controlUI, 'enabled')) {
            this.showTooltip();
        }
        event.stopPropagation();
    }
    toggle() {
        if (L.DomUtil.hasClass(this.controlUI, 'enabled')) {
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
        L.DomUtil.addClass(this.controlUI, 'enabled');
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
    isEnabled() {
        return L.DomUtil.hasClass(this.controlUI, 'enabled');
    }
    disable() {
        if (this.isEnabled()) {
            /*      this.options._editLayers.forEach(this.removeEditClickEvents, this)
                  this.options._editLayers = []
                  this.options._layerGroups = [] */
            this.hideEditor();
            this.hideCancelButton();
            this.hideTooltip();
            L.DomUtil.removeClass(this.controlUI, 'enabled');
        }
    }
    hideEditor() {
        if (L.DomUtil.hasClass(this.controlUI, 'editor-enabled')) {
            this.removeIndicators();
            L.DomUtil.removeClass(this.controlUI, 'editor-enabled');
            this.fireEvent('hidden');
        }
    }
    showCancelButton() {
        L.DomUtil.removeClass(this.cancelUI, 'leaflet-styleeditor-hidden');
    }
    hideCancelButton() {
        L.DomUtil.addClass(this.cancelUI, 'leaflet-styleeditor-hidden');
    }
    showEditor() {
        if (!L.DomUtil.hasClass(this.controlUI, 'editor-enabled')) {
            L.DomUtil.addClass(this.controlUI, 'editor-enabled');
            this.fireEvent('visible');
        }
    }
    showTooltip() {
        L.DomUtil.addClass(this.tooltipUI, 'leaflet-styleeditor-hidden');
    }
    hideTooltip() {
        L.DomUtil.removeClass(this.tooltipUI, 'leaflet-styleeditor-hidden');
    }
    fireEvent(eventName) {
    }
}
exports.StyleEditorControl = StyleEditorControl;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);
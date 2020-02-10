"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(require("leaflet"));
const Util_1 = __importDefault(require("./Util"));
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(require("leaflet"));
const form_1 = require("./form");
require('../dist/css/Leaflet.StyleEditor.min.css');
class StyleEditor {
    constructor(options) {
        this.currentElement = null; // TODO type
        this._editLayers = [];
        this._layerGroups = [];
        this.markerForm = new form_1.MarkerForm(this);
        this.geometryForm = new form_1.GeometryForm(this);
        this.options = options;
    }
}
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

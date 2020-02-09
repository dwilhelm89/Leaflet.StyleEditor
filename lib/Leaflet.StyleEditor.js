"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("leaflet");
var ColorElement_1 = __importDefault(require("./FormElements/ColorElement"));
var FormElement_1 = __importDefault(require("./FormElements/FormElement"));
var DashElement_1 = __importDefault(require("./FormElements/DashElement"));
var IconElement_1 = __importDefault(require("./FormElements/IconElement"));
var OpacityElement_1 = __importDefault(require("./FormElements/OpacityElement"));
var PopupContentElement_1 = __importDefault(require("./FormElements/PopupContentElement"));
var SizeElement_1 = __importDefault(require("./FormElements/SizeElement"));
var WeightElement_1 = __importDefault(require("./FormElements/WeightElement"));
var Form_1 = __importDefault(require("./Form/Form"));
var GeometryForm_1 = __importDefault(require("./Form/GeometryForm"));
var MarkerForm_1 = __importDefault(require("./Form/MarkerForm"));
var Marker_1 = __importDefault(require("./Marker/Marker"));
var DefaultMarker_1 = __importDefault(require("./Marker/DefaultMarker"));
var GlyphiconMarker_1 = __importDefault(require("./Marker/GlyphiconMarker"));
var StyleForm_1 = __importDefault(require("./StyleForm"));
var Control_1 = __importDefault(require("./Control"));
var Util_1 = __importDefault(require("./Util"));
require('../css/Leaflet.StyleEditor.css');
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
Util_1.default();
FormElement_1.default();
ColorElement_1.default();
DashElement_1.default();
IconElement_1.default();
OpacityElement_1.default();
PopupContentElement_1.default();
SizeElement_1.default();
WeightElement_1.default();
Form_1.default();
GeometryForm_1.default();
MarkerForm_1.default();
Marker_1.default();
DefaultMarker_1.default();
GlyphiconMarker_1.default();
StyleForm_1.default();
Control_1.default();
exports.default = L;

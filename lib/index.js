"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(require("leaflet"));
const Control_1 = require("./Control");
leaflet_1.default.StyleEditor = Control_1.StyleEditorControl;
leaflet_1.default.styleEditor = (...args) => new Control_1.StyleEditorControl(...args);
__export(require("./Control"));

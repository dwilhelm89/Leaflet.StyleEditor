import L from 'leaflet';
import { GeometryForm, MarkerForm } from './form';
import LeafletOptions from './interfaces/LeafletOptions';
export declare class StyleEditor {
    currentElement: any;
    private _editLayers;
    private _layerGroups;
    map?: L.Map;
    options: LeafletOptions;
    markerForm: MarkerForm;
    geometryForm: GeometryForm;
    constructor(options?: LeafletOptions);
}

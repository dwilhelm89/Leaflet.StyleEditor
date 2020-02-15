import { MarkerForm } from '../form';
import Util from '../Util';
import MarkerOptions from './MarkerOptions';
import { IconOptions } from '../types';
/**
 * The Base class for different markers
 */
export declare class Marker {
    protected util: Util;
    constructor();
    /** define markerForm used to style the Marker */
    markerForm: MarkerForm;
    options: MarkerOptions;
    /** create new Marker and show it */
    setNewMarker(currentElement: any): void;
    /** set styling options */
    setStyle(currentElement: any, styleOption: any, value: any): void;
    /** create HTML used to */
    createSelectHTML(parentUiElement: any, iconOptions: any, icon: any): void;
    /** get the current iconOptions
     *  if not set set them
     */
    getIconOptions(currentElement: any): IconOptions;
    resetIconOptions(currentElement: any): void;
    setIconOptions(currentElement: any, key: any, value: any): void;
    /** call createMarkerIcon with the correct iconOptions */
    _createMarkerIcon(currentElement: any): void;
    createMarkerIcon(iconOptions: IconOptions, iconClass?: string): void;
    /** check that the icon set in the iconOptions exists
     *  else set default icon
     */
    _ensureMarkerIcon(iconOptions: any): any;
    /** return default marker color
     *
     * will return the first of the following which is set and supported by the markers
     * 1. styleEditorOptions.defaultMarkerColor
     * 2. styleEditorOptions.defaultColor
     * 3. first color of the marker's colorRamp which is in the styleeditor.colorRamp
     * 4. first color of the marker's colorRamp
     * */
    _getDefaultMarkerColor(): any;
}

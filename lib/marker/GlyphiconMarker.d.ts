import L from 'leaflet';
import { Marker } from '.';
import { IconOptions, Size, Color } from '../types';
/**
 * Example class showing how to implement new MarkerClasses
 * uses the glyphicons given by bootstrap
 */
export declare class GlyphiconMarker extends Marker {
    constructor();
    getMarkerHtml(size: Size, color: Color, icon: L.Icon): string;
    createMarkerIcon(iconOptions: IconOptions): L.DivIcon;
    setStyle(currentElement: any, styleOption: any, value: any): void;
    createSelectHTML(parentUiElement: any, iconOptions: any, icon: any): void;
    _getMarkerUrlForStyle(iconOptions: any): string;
    private getMarkerUrl;
}

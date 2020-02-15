import L from 'leaflet';
import { Marker } from './Marker';
import { IconOptions, Size, Color } from '../types';
/**
 * The "old" marker style used by L.StyleEditor
 * used the mapbox API v3
 */
export declare class DefaultMarker extends Marker {
    constructor();
    createMarkerIcon(iconOptions: IconOptions, iconClass?: string): L.Icon<{
        iconUrl: string;
        iconSize: L.PointExpression;
        iconColor: string;
        icon: L.Icon<L.IconOptions>;
        className: string;
        iconAnchor: [number, number];
        popupAnchor: [number, number];
    }>;
    createSelectHTML(parentUiElement: any, iconOptions: any, icon: any): void;
    _getMarkerUrlForStyle(iconOptions: any): string;
    _getMarkerUrl(size: Size, color: Color, icon: L.Icon): string;
}

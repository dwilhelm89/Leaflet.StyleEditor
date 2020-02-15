import { ControlPosition } from 'leaflet';
import { Color, LayerType } from '../types';
import { Marker } from '../marker';
export default interface LeafletOptions {
    /**
     * The initial position of the control (one of the map corners).
     *
     * @default 'topleft'
     */
    position?: ControlPosition;
    colorRamp: string[];
    defaultColor: Color;
    markers: string[];
    markerType: Marker;
    defaultMarkerIcon?: string;
    defaultMarkerColor?: Color;
    ignoreLayerTypes: LayerType[];
    openOnLeafletDraw: Boolean;
    openOnLeafletEditable: Boolean;
    showTooltip: Boolean;
    strings: Record<string, string>;
    useGrouping: Boolean;
    styleEditorEventPrefix: string;
    forms: any;
}

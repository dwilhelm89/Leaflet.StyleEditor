import { MarkerOptions as LMarkerOptions } from 'leaflet';
export interface MarkerOptions extends LMarkerOptions {
  iconColor?: string; // TODO color
  iconSize?; // TODO sizes
  popupContent?; // TODO what is this used for?
}

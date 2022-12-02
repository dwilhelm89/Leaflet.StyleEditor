import { MarkerOptions as LMarkerOptions } from "leaflet"
export interface MarkerOptions extends LMarkerOptions {
  iconColor?
  iconSize?
  popupContent?
}

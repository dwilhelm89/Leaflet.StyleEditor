import { MarkerOptions as LMarkerOptions } from "leaflet"
export interface MarkerOptions extends LMarkerOptions {
  iconColor?: string // TODO color
  iconSize?: number[] // TODO size type
  popupContent? // TODO what is this used for?
}

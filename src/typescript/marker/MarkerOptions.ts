import { MarkerOptions as LMarkerOptions } from "leaflet"
import { MarkerSize } from "../types/MarkerSize"
export interface MarkerOptions extends LMarkerOptions {
  iconColor?: string // TODO color
  iconSize?: MarkerSize
  popupContent? // TODO what is this used for?
}

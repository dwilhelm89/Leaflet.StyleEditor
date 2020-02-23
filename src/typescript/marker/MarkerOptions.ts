import { Color, Size, IconOptions } from "../types";
import { PointExpression } from "leaflet";

export default class MarkerOptions {
  defaultMarkerIcon: string

  markers: Array<string>
  iconOptions: IconOptions

  selectIconSize: []
  selectIconClass: string = ''
  colorRamp?: string[] = null
}

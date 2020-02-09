import L, { ControlPosition } from 'leaflet'
import { Color, Size, LayerType } from '../types'
import { Marker } from '../marker'

export default interface LeafletOptions extends L.Control.DrawConstructorOptions {
  /**
   * The initial position of the control (one of the map corners).
   *
   * @default 'topleft'
   */
  position?: ControlPosition

  /**
   * The options used to configure the draw toolbar.
   *
   * @default {}
   */
  draw?: L.Control.DrawOptions

  /**
   * The options used to configure the edit toolbar.
   *
   * @default false
   */
  edit?: L.Control.EditOptions

  colorRamp: string[]
  defaultColor: Color

  markers: string[]
  markerType: Marker
  defaultMarkerIcon?: string
  defaultMarkerColor?: Color

  ignoreLayerTypes: LayerType[]

  openOnLeafletDraw: Boolean
  openOnLeafletEditable: Boolean

  showTooltip: Boolean

  strings: Record<string, string> 

  useGrouping: Boolean

  styleEditorEventPrefix: string
}

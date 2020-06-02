import 'leaflet'
import { StyleEditorImpl } from './StyleEditorImpl'
import { StyleEditorControl } from './StyleEditorControl'
import { StyleEditorOptions, StyleEditorControlOptions } from './options'

require('../css/Leaflet.StyleEditor.css')

declare module 'leaflet' {
  type StyleEditor = StyleEditorImpl

  let StyleEditor: typeof StyleEditorImpl
  let styleEditor: (...args: ConstructorParameters<typeof StyleEditor>) => StyleEditor

  module Control {
    type StyleEditor = StyleEditorControl
    let StyleEditor: typeof StyleEditorControl
  }

  module control {
    let styleEditor: (options: StyleEditorControlOptions) => StyleEditorControl
  }

  interface MarkerOptions {
    iconColor?: string
    iconSize?: string
    popupContent?: string
  }

  interface StyleableLayer extends Layer {
    options?
  }

}


L.StyleEditor = StyleEditorImpl
L.styleEditor = function (map: L.Map, options: StyleEditorOptions) { return new StyleEditorImpl(map, options) }

L.Control.StyleEditor = StyleEditorControl
L.control.styleEditor = function (options: StyleEditorOptions) { return new StyleEditorControl(options) }


export default L

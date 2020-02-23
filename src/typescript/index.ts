import 'leaflet'
import { StyleEditorClass } from './StyleEditorClass'
import { StyleEditorControl } from './StyleEditorControl'
import { StyleEditorOptions, StyleEditorControlOptions } from './options'
import { Map } from 'leaflet'

require('../css/Leaflet.StyleEditor.css')

declare module 'leaflet' {
  type StyleEditor = StyleEditorClass

  let StyleEditor: typeof StyleEditorClass
  let styleEditor: (...args: ConstructorParameters<typeof StyleEditorClass>) => StyleEditorClass

  module Control {
    type StyleEditor = StyleEditorControl
    let StyleEditor: typeof StyleEditorControl
  }

  module control {
    let styleEditor: (options: StyleEditorControlOptions) => StyleEditorControl
  }

}


L.StyleEditor = StyleEditorClass
L.styleEditor = function (map: Map, options: StyleEditorOptions) { return new StyleEditorClass(map, options) }

L.Control.StyleEditor = StyleEditorControl
L.control.styleEditor = function (options: StyleEditorOptions) { return new StyleEditorControl(options) }


export default L

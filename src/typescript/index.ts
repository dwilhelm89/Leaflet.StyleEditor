import 'leaflet'
import { StyleEditorClass } from './StyleEditorClass'
import { StyleEditorControl, StyleEditorControlOptions } from './StyleEditorControl'

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
L.styleEditor = function () { return new StyleEditorClass() }

L.Control.StyleEditor = StyleEditorControl
L.control.styleEditor = function (options: StyleEditorControlOptions) { return new StyleEditorControl(options) }

export default L

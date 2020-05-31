import { StyleEditorImpl } from "./StyleEditorImpl"
import { Util } from "./Util"
import { StyleEditorOptions } from "./options"

export class StyleEditorClass extends L.Class {
  protected map: L.Map
  styleEditor: StyleEditorImpl
  protected util: Util
  
  constructor(styleEditor: StyleEditorImpl) {
    super()
    this.styleEditor = styleEditor
    this.map = styleEditor.map
    this.util = styleEditor.util
  }
}

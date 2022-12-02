import { Class, Map } from "leaflet"
import { StyleEditor } from "./StyleEditor"
import { Util } from "./Util"

export class StyleEditorClass extends Class {
  protected map: Map
  styleEditor: StyleEditor
  protected util: Util
  
  constructor(styleEditor: StyleEditor) {
    super()
    this.styleEditor = styleEditor
    this.map = styleEditor.map
    this.util = styleEditor.util
  }
}

import * as L from 'leaflet';
import { StyleEditor } from './StyleEditor';
import { Util } from './Util';

export class StyleEditorClass extends L.Class {
  public styleEditor: StyleEditor;

  protected map: L.Map;
  protected util: Util;

  public constructor(styleEditor: StyleEditor) {
    super();
    this.styleEditor = styleEditor;
    this.map = styleEditor.map;
    this.util = styleEditor.util;
  }
}

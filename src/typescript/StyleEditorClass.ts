import * as L from 'leaflet';
import { StyleEditor } from './StyleEditor';
import { Util } from './Util';

export class StyleEditorClass extends L.Class {
  public styleEditor: StyleEditor;

  protected util: Util;

  public constructor(styleEditor: StyleEditor) {
    super();
    this.styleEditor = styleEditor;
    this.util = styleEditor.util;
  }
}

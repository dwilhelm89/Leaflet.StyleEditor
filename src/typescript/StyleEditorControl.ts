import { StyleEditor } from './StyleEditor';
import { StyleEditorOptions, DefaultStyleEditorOptions } from './options';
import { Control, Map, DomUtil, DomEvent } from 'leaflet';

/**
 * StyleEditorControl creates a { Control }
 * which enables the user to enable and disable Leaflet.StyleEditor
 */
export class StyleEditorControl extends Control {
  declare options: StyleEditorOptions;

  private styleEditor: StyleEditor;

  constructor(
    styleEditorOptions: StyleEditorOptions,
    styleEditor?: StyleEditor
  ) {
    super();
    this.options = { ...DefaultStyleEditorOptions, ...styleEditorOptions };
    if (styleEditor) {
      this.styleEditor = styleEditor;
      this.styleEditor.addControl(this);
    }
  }

  private isEnabled = false;
  private cancelUI: HTMLElement;

  /**
   * Create the Control element and its HTMLElements
   * @param map the map where the control should be added to
   */
  onAdd(map: Map): HTMLElement {
    if (this.styleEditor === undefined) {
      this.styleEditor = new StyleEditor(map, this.options, this);
    }
    // disable styleEditor if using control element
    this.styleEditor.disable();

    return this.createUI();
  }

  createUI() {
    const controlUI = DomUtil.create(
      'div',
      'leaflet-control-styleeditor leaflet-control leaflet-bar'
    );
    const controlDiv = DomUtil.create(
      'a',
      'leaflet-control-styleeditor-interior',
      controlUI
    );
    controlDiv.title = this.options.strings.title;

    const cancelUI = (this.cancelUI = DomUtil.create(
      'div',
      'leaflet-control-styleeditor-cancel leaflet-styleeditor-hidden',
      controlUI
    ));
    cancelUI.innerHTML = this.options.strings.cancel;
    cancelUI.title = this.options.strings.cancelTitle;

    DomEvent.disableScrollPropagation(controlUI);
    DomEvent.disableScrollPropagation(cancelUI);

    DomEvent.disableClickPropagation(controlUI);
    DomEvent.disableClickPropagation(cancelUI);

    // toggle UI visibility
    DomEvent.on(controlUI, 'click', this.toggle, this);

    return controlUI;
  }

  toggle() {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
  }

  enable() {
    this.isEnabled = true;
    this.showCancelButton();
    this.styleEditor.enable();
  }

  disable() {
    if (this.isEnabled) {
      this.isEnabled = false;
      this.hideCancelButton();
      this.styleEditor.disable();
    }
  }

  private showCancelButton() {
    DomUtil.removeClass(this.cancelUI, 'leaflet-styleeditor-hidden');
  }

  private hideCancelButton() {
    DomUtil.addClass(this.cancelUI, 'leaflet-styleeditor-hidden');
  }
}

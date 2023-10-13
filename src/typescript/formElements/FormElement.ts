import { Path, Marker as LMarker, DomUtil, Layer, StyleEditor } from 'leaflet';
import { StyleEditorClass } from '../StyleEditorClass';

export type FormElementClass = new (
  styleEditor: StyleEditor,
  styleOption: string,
  whenToShow: (layer: Layer) => boolean,
) => FormElement;

/** FormElements are part of a Form for a specific styling option (i.e. color) */
export abstract class FormElement extends StyleEditorClass {
  protected abstract defaultShowForLayer(layer: Layer): boolean;
  private userDefinedShowForLayer : (layer: Layer) => boolean;

  public showForLayer(layer: Layer): boolean {
    return typeof this.userDefinedShowForLayer === 'function' ? this.userDefinedShowForLayer(layer) : this.defaultShowForLayer(layer); 
  }

  constructor(
    override styleEditor: StyleEditor,
    protected styleOption: string,
    showForLayer?: (layer: Layer) => boolean,
    public title?: string,
  ) {
    super(styleEditor);
    this.styleOption = styleOption;
    // if no title is given use styling option
    this.userDefinedShowForLayer = showForLayer;
    this.title = title;
  }

  /** create uiElement and content */
  public getHTML(layer?: Layer): HTMLElement {
    const uiElement = DomUtil.create(
      'div',
      'leaflet-styleeditor-uiElement',
    );
  
    /** create title */
    const titleDom = DomUtil.create(
      'label',
      'leaflet-styleeditor-label',
      uiElement
    );
    titleDom.innerHTML = this.title ?? this.styleOption.charAt(0).toUpperCase() + this.styleOption.slice(1);
    return uiElement
  }

  /** style the FormElement and show it */
  public show(): void {
    if(this.showForLayer(this.styleEditor.currentLayer)) {
      this.style();
    }
  }

  /** what to do when lost focus */
  public lostFocus(): void {}

  /** set style - used when the FormElement wants to change the styling option */
  protected setStyle(layer: Layer, value: unknown): void {
    if (layer instanceof LMarker) {
      // TODO!!!!
      layer.setIcon(value);
    } else if (layer instanceof Path) {
      layer.options[this.styleOption] = value;
      layer.setStyle(layer.options);
    }

    // fire event for changed layer
    this.util.fireEvent('changed', layer);

    //?! TODO readd form? this.parentForm.style();
  }

  protected getStyle(layer: Layer): unknown {
    return this.styleOption in layer.options ? layer.options[this.styleOption] : undefined;
  }
}

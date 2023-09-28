import { Path, Marker as LMarker, DomUtil, Layer } from 'leaflet';
import { Form } from '../forms';
import { StyleEditorClass } from '../StyleEditorClass';

export type FormElementClass = new (
  parentForm: Form,
  parentUiElement: HTMLElement,
  styleOption: string
) => FormElement;

/** FormElements are part of a Form for a specific styling option (i.e. color) */
export abstract class FormElement extends StyleEditorClass {
  protected styleOption: string;
  protected uiElement: HTMLElement;
  protected parentForm: Form;

  constructor(
    parentForm: Form,
    parentUiElement: HTMLElement,
    styleOption: string,
    title?: string
  ) {
    super(parentForm.styleEditor);
    this.styleOption = styleOption;
    // if no title is given use styling option
    this.parentForm = parentForm;
    this.create(parentUiElement, title);
  }

  /** create uiElement and content */
  private create(parentUiElement: HTMLElement, title: string): void {
    this.uiElement = DomUtil.create(
      'div',
      'leaflet-styleeditor-uiElement',
      parentUiElement
    );
    this.createTitle(title);
  }

  /** create title */
  private createTitle(title: string): void {
    const titleDom = DomUtil.create(
      'label',
      'leaflet-styleeditor-label',
      this.uiElement
    );
    titleDom.innerHTML = title ?? this.styleOption.charAt(0).toUpperCase() + this.styleOption.slice(1);
  }

  /** style the FormElement and show it */
  public show(): void {
    this.style();
    this.showForm();
  }

  /** show the FormElement */
  private showForm(): void {
    this.util.showElement(this.uiElement);
  }

  /** hide the FormElement */
  public hide(): void {
    this.util.hideElement(this.uiElement);
  }

  /** style the FormElement */
  public abstract style(): void;

  /** what to do when lost focus */
  public lostFocus(): void {}

  /** set style - used when the FormElement wants to change the styling option */
  protected setStyle(value: Layer): void {
    this.styleEditor.getCurrentLayers().forEach((layer) => {
      layer.options[this.styleOption] = value;
      if (layer instanceof LMarker) {
        new this.styleEditor.options.markerType(this.styleEditor).setStyle(
          this.styleOption,
          value
        );
      } else if (layer instanceof Path) {
        layer.setStyle(layer.options);
      }

      // fire event for changed layer
      this.util.fireEvent('changed', layer);
    });

    // notify form styling value has changed
    this.parentForm.style();
  }
}

import { DomEvent, DomUtil } from 'leaflet';
import { FormElement } from '.';
import { Form } from '../forms';

/**
 * FormElement used for adding a description to marker or geometry.
 */
export class PopupContentElement extends FormElement {

  override title = 'Description';
  override styleOption = 'pupupContent';

  private textArea: HTMLTextAreaElement;

  constructor(
    parentForm: Form,
    parentUiElement: HTMLElement,
    styleOption: string
  ) {
    super(parentForm, parentUiElement, styleOption);
    this.textArea = this.createTextArea();
  }

  private createTextArea(): HTMLTextAreaElement {
    const textArea = DomUtil.create(
      'textarea',
      'leaflet-styleeditor-input',
      this.uiElement
    ) as HTMLTextAreaElement;
    DomEvent.addListener(textArea, 'change', this.updateStyle, this);
    DomEvent.addListener(textArea, 'input', this.updateStyle, this);
    return textArea;
  }

  /** set correct value */
  override style() {
    const selectedElements = this.styleEditor.getCurrentLayers();
    selectedElements.forEach((layer) => {
      const popupContent = layer.getPopup()?.getContent().toString() ?? layer.options.popupContent
      if (popupContent) {
        this.textArea.value = popupContent;

        const popup = layer.getPopup();
        if (popup) {
          popup.setContent(popupContent);
        } else {
          layer.bindPopup(popupContent);
        }
      }
    });
  }

  /** communicate popupContent value */
  private updateStyle() {
    const inputText = this.textArea.value;
    this.styleEditor.getCurrentLayers().forEach((layer) => {
      const popup = layer.getPopup();
      if (popup) {
        popup.setContent(inputText);
      } else {
        layer.bindPopup(inputText);
      }
      layer.openPopup();
    });
    this.setStyle(inputText);
  }
}

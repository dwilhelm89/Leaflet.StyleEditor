import { DomEvent, DomUtil, Layer, StyleEditor } from 'leaflet';
import { FormElement } from '.';

/**
 * FormElement used for adding a description to marker or geometry.
 */
export class PopupContentElement extends FormElement {
  protected override defaultShowForLayer(layer: Layer): boolean {
    return true;
  }

  override styleOption = 'popupContent';

  private textArea: HTMLTextAreaElement;

  public override getHTML(layer?: Layer): HTMLElement {
    const uiElement = super.getHTML() 
    this.textArea = DomUtil.create(
      'textarea',
      'leaflet-styleeditor-input',
      uiElement
    ) as HTMLTextAreaElement;
    DomEvent.addListener(this.textArea, 'change', this.updateStyle, this);
    DomEvent.addListener(this.textArea, 'input', this.updateStyle, this);
    this.style(layer)
    return uiElement
  }

  /** set correct value */
  private style(layer?: Layer) {
    const popupContent = layer?.getPopup()?.getContent().toString() ?? layer?.options?.popupContent
    if (popupContent) {
      this.textArea.value = popupContent;

      const popup = layer.getPopup();
      if (popup) {
        popup.setContent(popupContent);
      } else {
        layer.bindPopup(popupContent);
      }
    }
  }

  /** communicate popupContent value */
  private updateStyle() {
    const inputText = this.textArea.value;
    const layer: Layer = this.styleEditor.currentLayer;

    const popup = layer.getPopup();
    if (popup) {
      popup.setContent(inputText);
    } else {
      layer.bindPopup(inputText);
    }
    layer.openPopup();

    this.setStyle(inputText);
  }
}

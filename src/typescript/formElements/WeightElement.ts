import { DomEvent, DomUtil, Layer, LayerGroup, Path, StyleEditor } from 'leaflet';
import { FormElement } from '.';

/**
 * FormElement used to style weight
 */
export class WeightElement extends FormElement {
  protected override defaultShowForLayer(layer: Layer): boolean {
    return  layer instanceof LayerGroup
      ? layer.getLayers().some((layer: Layer) => layer instanceof Path)
      : layer instanceof Path;
  }

  private label: HTMLSpanElement;
  private weight: HTMLInputElement;

  public override getHTML(layer?: Layer): HTMLElement {
    const uiElement: HTMLElement = super.getHTML() 
    this.label = this.createLabel(uiElement);
    this.weight = this.createWeightElement(layer, uiElement);
    this.style(layer)
    return uiElement
  }

  /** set correct value */
  private style(layer?: Layer) {
    this.weight.value = this.util.getStyle(this.styleOption);
    this.label.innerText = this.weight.value;
  }


  private createLabel(uiElement: HTMLElement): HTMLSpanElement {
    return DomUtil.create(
      'span',
      'leaflet-styleeditor-input-span',
      uiElement
    );
  }

  /** create number input box */
  private createWeightElement(layer: Layer, uiElement: HTMLElement): HTMLInputElement {
    const weight = DomUtil.create(
      'input',
      'leaflet-styleeditor-input',
      uiElement
    ) as HTMLInputElement;
    weight.type = 'range';
    weight.min = '0';
    weight.max = '20';
    weight.step = '1';
    weight.value = '4';

    // add event listeners
    DomEvent.addListener(weight, 'change', () => this.updateStyle(layer), this);
    DomEvent.addListener(weight, 'input', () => this.updateStyle(layer), this);
    DomEvent.addListener(weight, 'keyup', () => this.updateStyle(layer), this);
    DomEvent.addListener(weight, 'mouseup', () => this.updateStyle(layer), this);
    return weight;
  }
  /** communicate weight value */
  private updateStyle(layer: Layer) {
    this.label.innerText = this.weight.value;
    this.setStyle(layer, this.weight.value);
  }
}

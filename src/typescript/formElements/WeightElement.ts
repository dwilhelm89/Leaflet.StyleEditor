import { DomEvent, DomUtil, Layer, LayerGroup, Path } from 'leaflet';
import { FormElement } from '.';
import { Form } from '../forms';

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

  public constructor(
    parentForm: Form,
    parentUiElement: HTMLElement,
    styleOption: string,
    showForLayer: (layer: Layer) => boolean,
  ) {
    super(parentForm, parentUiElement, styleOption, showForLayer);
    this.label = this.createLabel();
    this.weight = this.createWeightElement();
  }

  /** set correct value */
  public override style() {
    this.weight.value = this.util.getStyle(this.styleOption);
    this.label.innerText = this.weight.value;
  }


  private createLabel(): HTMLSpanElement {
    return DomUtil.create(
      'span',
      'leaflet-styleeditor-input-span',
      this.uiElement
    );
  }

  /** create number input box */
  private createWeightElement(): HTMLInputElement {
    const weight = DomUtil.create(
      'input',
      'leaflet-styleeditor-input',
      this.uiElement
    ) as HTMLInputElement;
    weight.type = 'range';
    weight.min = '0';
    weight.max = '20';
    weight.step = '1';
    weight.value = '4';

    // add event listeners
    DomEvent.addListener(weight, 'change', this.updateStyle, this);
    DomEvent.addListener(weight, 'input', this.updateStyle, this);
    DomEvent.addListener(weight, 'keyup', this.updateStyle, this);
    DomEvent.addListener(weight, 'mouseup', this.updateStyle, this);
    return weight;
  }
  /** communicate weight value */
  private updateStyle() {
    this.setStyle(this.weight.value);
  }
}

import { DomEvent, DomUtil } from 'leaflet';
import { FormElement } from '.';
import { Form } from '../forms';

/**
 * FormElement used to style weight
 */
export class WeightElement extends FormElement {
  private label: HTMLSpanElement;
  private weight: HTMLInputElement;

  constructor(
    parentForm: Form,
    parentUiElement: HTMLElement,
    styleOption: string
  ) {
    super(parentForm, parentUiElement, styleOption);
    this.label = this.createLabel();
    this.weight = this.createWeightElement();
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

  /** set correct value */
  style() {
    this.weight.value = this.util.getStyle(this.styleOption);
    this.label.innerText = this.weight.value;
  }

  /** communicate weight value */
  private updateStyle() {
    this.setStyle(this.weight.value);
  }
}

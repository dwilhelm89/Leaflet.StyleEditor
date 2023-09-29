import { DomEvent, DomUtil, Layer } from 'leaflet';
import { FormElement } from '.';
import { Form } from '../forms';

/**
 * FormElement used to style opacity
 */
export class OpacityElement extends FormElement {
  private label: HTMLSpanElement;
  private slider: HTMLInputElement;

  public constructor(
    parentForm: Form,
    parentUiElement: HTMLElement,
    styleOption: string,
    showForLayer?: (layer: Layer) => boolean,
  ) {
    super(parentForm, parentUiElement, styleOption, showForLayer);

    this.label = this.createLabel();
    this.slider = this.createSlider();
  }

  /** set correct value */
  public override style(): void {
    this.slider.value = this.util.getStyle(this.styleOption);
    this.label.innerText =
      Math.round(100 * parseFloat(this.slider.value)).toString() + '%';
  }

  private createLabel(): HTMLSpanElement {
    return DomUtil.create(
      'span',
      'leaflet-styleeditor-input-span',
      this.uiElement
    );
  }

  /** create number input box */
  private createSlider() {
    const slider = DomUtil.create(
      'input',
      'leaflet-styleeditor-input',
      this.uiElement
    ) as HTMLInputElement;
    slider.type = 'range';
    slider.max = '1';
    slider.min = '0';
    slider.step = '0.01';
    slider.value = '0.5';

    // add event listeners
    DomEvent.addListener(slider, 'change', this.updateStyle, this);
    DomEvent.addListener(slider, 'input', this.updateStyle, this);
    DomEvent.addListener(slider, 'keyup', this.updateStyle, this);
    DomEvent.addListener(slider, 'mouseup', this.updateStyle, this);

    return slider;
  }

  /** communicate opacity value */
  private updateStyle() {
    this.setStyle(this.slider.value);
  }
}

import { DomEvent, DomUtil, Layer, LayerGroup, Path, StyleEditor } from 'leaflet';
import { FormElement } from '.';

/**
 * FormElement used to style opacity
 */
export class OpacityElement extends FormElement {
  protected override defaultShowForLayer(layer: Layer): boolean {
    return  layer instanceof LayerGroup
      ? layer.getLayers().some((layer: Layer) => layer instanceof Path)
      : layer instanceof Path;
  }

  private label: HTMLSpanElement;
  private slider: HTMLInputElement;

  public constructor(
    override styleEditor: StyleEditor,
    styleOption: string,
    showForLayer?: (layer: Layer) => boolean,
  ) {
    super(styleEditor, styleOption, showForLayer);

  }

  /** set correct value */
  private style(layer: Layer): void {
    this.slider.value = this.util.getStyle(this.styleOption);
    this.label.innerText =
      Math.round(100 * parseFloat(this.slider.value)).toString() + '%';
  }

  public override getHTML(layer?: Layer): HTMLElement {
    const uiElement: HTMLElement = super.getHTML()
    this.label = this.createLabel(uiElement);
    this.slider = this.createSlider(layer, uiElement);
    this.style(layer)
    return uiElement
  }

  private createLabel(uiElement: HTMLElement): HTMLSpanElement {
    return DomUtil.create(
      'span',
      'leaflet-styleeditor-input-span',
      uiElement
    );
  }

  /** create number input box */
  private createSlider(layer: Layer, uiElement: HTMLElement) {
    const slider = DomUtil.create(
      'input',
      'leaflet-styleeditor-input',
      uiElement
    ) as HTMLInputElement;
    slider.type = 'range';
    slider.max = '1';
    slider.min = '0';
    slider.step = '0.01';
    slider.value = '0.5';

    // add event listeners
    DomEvent.addListener(slider, 'change', () => this.updateStyle(layer));
    DomEvent.addListener(slider, 'input', () => this.updateStyle(layer));
    DomEvent.addListener(slider, 'keyup', () => this.updateStyle(layer));
    DomEvent.addListener(slider, 'mouseup', () => this.updateStyle(layer));

    return slider;
  }

  /** communicate opacity value */
  private updateStyle(layer: Layer) {
    this.label.innerText =
      Math.round(100 * parseFloat(this.slider.value)).toString() + '%';
    this.setStyle(layer, this.slider.value);
  }
}

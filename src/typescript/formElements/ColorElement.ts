import { FormElement } from './FormElement';
import { DomEvent, DomUtil, Layer, Path } from 'leaflet';
import { Form } from '../forms';
import Color from 'ts-color-class';

const selectedColorClass = 'leaflet-styleeditor-selected';

/**
 *  FormElement used to style the color
 */
export class ColorElement extends FormElement {
  protected override defaultShowForLayer(layer: Layer): boolean {
    return layer instanceof Path;
  }

  private colorPickerDiv: HTMLElement;
  private colorRampDivs: Map<string, HTMLDivElement> = new Map();

  public constructor(
    parentForm: Form,
    parentUiElement: HTMLElement,
    styleOption: string,
    showForLayer?: (layer: Layer) => boolean,
  ) {
    super(parentForm, parentUiElement, styleOption, showForLayer);
    this.colorPickerDiv = this.createColoPicker();
  }

  public override style(): void {
    this.hideAllColors();
    this.showNeededColors();

    const layer = this.styleEditor.currentLayer;
    /* TODO Add hanling for MARKER */
    if(!(layer instanceof Path)) {
      return;
    }

    const color = layer.options[this.styleOption];
    const colorRampElement = this.colorRampDivs.get(color);
    if (colorRampElement) {
      DomUtil.addClass(colorRampElement, selectedColorClass);
    }
  }

  private createColoPicker(): HTMLElement {
    return DomUtil.create(
      'div',
      'leaflet-styleeditor-colorpicker',
      this.uiElement
    );
  }

  private hideAllColors() {
    this.colorRampDivs.forEach((div: HTMLDivElement) => {
      this.util.hideElement(div);
      DomUtil.removeClass(div, selectedColorClass);
    })
  }


  private showNeededColors() {
    const layer = this.styleEditor.currentLayer;
    this.util.getColorRampForLayer(layer)?.forEach((color: string) => {
      const colorRampDiv: HTMLDivElement = this.colorRampDivs.get(color)
      if(colorRampDiv) {
        this.util.showElement(colorRampDiv)
        return;
      }

      const element = DomUtil.create(
        'div',
        'leaflet-styleeditor-color',
        this.colorPickerDiv
      );
      element.style.backgroundColor = color;
      DomEvent.addListener(element, 'click', this.selectColor, this);
      this.colorRampDivs.set(color, element);
    })
  }

  /** set style for chosen color */
  private selectColor(event: Event) {
    event.stopPropagation();
    if (event.target instanceof HTMLElement) {
      this.setStyle(new Color(event.target.style.backgroundColor).getHex()); // TODO hand over color
    }
  }
}

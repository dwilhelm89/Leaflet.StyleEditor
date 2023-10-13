import { FormElement } from './FormElement';
import { DomEvent, DomUtil, Layer, Path, StyleEditor } from 'leaflet';
import Color from 'ts-color-class';

const selectedColorClass = 'leaflet-styleeditor-selected';

/**
 *  FormElement used to style the color
 */
export class ColorElement extends FormElement {
  protected override defaultShowForLayer(layer: Layer): boolean {
    return layer instanceof Path;
  }

  private style(colorPickerDivs: Map<string, HTMLElement>, layer?: Layer): void {
    const color = layer.options[this.styleOption];
    const colorRampElement = colorPickerDivs.get(color);
    if (colorRampElement) {
      DomUtil.addClass(colorRampElement, selectedColorClass);
    }
  }

  override getHTML(layer?: Layer): HTMLElement {
    const uiElement = super.getHTML(layer);
    const wrapper = DomUtil.create(
      'div',
      'leaflet-styleeditor-colorpicker',
      uiElement
    );
    const colorPickerDivs: Map<string, HTMLElement> = this.createColorPickers(layer, wrapper);
    this.style(colorPickerDivs, layer)
    return uiElement;
  }

  private createColorPickers(layer: Layer, colorPickerDiv: HTMLDivElement): Map<string, HTMLElement> {
    const map: Map<string, HTMLElement> = new Map()
    this.util.getColorRampForLayer(layer)?.forEach((color: string) => {
      const colorElement: HTMLElement = DomUtil.create(
        'div',
        'leaflet-styleeditor-color',
        colorPickerDiv
      );
      DomEvent.addListener(colorElement, 'click', (event: Event) => this.selectColor(event))
      colorElement.style.background = color;
      map.set(color, colorElement);
    })
    return map
  }


  /** set style for chosen color */
  private selectColor(event: Event) {
    event.stopPropagation();
    if (event.target instanceof HTMLElement) {
      this.setStyle(new Color(event.target.style.backgroundColor).getHex()); // TODO hand over color
    }
  }
}

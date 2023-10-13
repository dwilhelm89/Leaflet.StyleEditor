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

  private highlightSelectedColor(colorPickerDivs: Map<string, HTMLElement>, layer?: Layer): void {
    const color = this.getStyle(layer) as string;
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
    this.highlightSelectedColor(colorPickerDivs, layer);
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
      DomEvent.addListener(colorElement, 'click', (event: Event) => this.selectColor(layer, event, map))
      colorElement.style.background = color;
      map.set(color, colorElement);
    })
    return map
  }


  /** set style for chosen color */
  private selectColor(layer: Layer, event: Event, colorPickerDivs: Map<string, HTMLElement>) {
    event.stopPropagation();

    const previouslySelected: HTMLElement = colorPickerDivs.get(this.getStyle(layer) as string);
    if(previouslySelected)
      DomUtil.removeClass(previouslySelected, selectedColorClass);

    const newColor: string = new Color((event.target as HTMLElement).style.backgroundColor).getHex()
    if (event.target instanceof HTMLElement) {
      this.setStyle(layer, newColor);
    }
    DomUtil.addClass(colorPickerDivs.get(newColor), selectedColorClass);
  }
}

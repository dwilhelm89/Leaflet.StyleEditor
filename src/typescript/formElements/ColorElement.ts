import { FormElement } from './FormElement';
import { MarkerForm } from '../forms/MarkerForm';
import { DomEvent, DomUtil } from 'leaflet';
import { Form } from '../forms';

const selectedColorClass = 'leaflet-styleeditor-color-selected';
const selectedColorIdPrefix = 'leaflet-styleeditor-color-';

/**
 *  FormElement used to style the color
 */
export class ColorElement extends FormElement {
  private colorPickerDiv: HTMLElement;
  private colorRampDivs: HTMLElement[] = [];

  title = 'color';

  constructor(
    parentForm: Form,
    parentUiElement: HTMLElement,
    styleOption: string
  ) {
    super(parentForm, parentUiElement, styleOption);
    this.colorPickerDiv = this.createColoPicker();
    this.createColorPickerRamp();
  }

  private createColoPicker(): HTMLElement {
    return DomUtil.create(
      'div',
      'leaflet-styleeditor-colorpicker',
      this.uiElement
    );
  }

  private createColorPickerRamp() {
    this.getColorRamp().forEach(this.createAndSetSelectCallback, this);
  }

  style(): void {
    this.colorRampDivs.forEach((div) => {
      DomUtil.removeClass(div, selectedColorClass);
    });
    const layerWithColor = this.styleEditor.getCurrentLayers().find((layer) => layer.options.color);
    if (!layerWithColor) {
      return;
    }

    const color = layerWithColor.options[this.styleOption];
    const colorRampElement = DomUtil.get(selectedColorIdPrefix + color);
    if (colorRampElement) {
      DomUtil.addClass(colorRampElement, selectedColorClass);
    }
  }

  /** create or get already created colorRamp */
  private getColorRamp() {
    // if markers have own colorRamp use it
    if (this.parentForm instanceof MarkerForm) {
      const markerType = new this.styleEditor.options.markerType(
        this.styleEditor
      );
      if (!!markerType.colorRamp) {
        return markerType.colorRamp;
      }
    }
    return this.styleEditor.options.colorRamp;
  }

  /** define what to do when color is changed */
  private createAndSetSelectCallback(color) {
    const element = DomUtil.create(
      'div',
      'leaflet-styleeditor-color',
      this.colorPickerDiv
    );
    element.id = selectedColorIdPrefix + color;
    element.style.backgroundColor = color;
    DomEvent.addListener(element, 'click', this.selectColor, this);
    this.colorRampDivs.push(element);
  }

  /** set style for chosen color */
  private selectColor(event: Event) {
    event.stopPropagation();
    if (event.target instanceof HTMLElement) {
      this.setStyle(this.util.rgbToHex(event.target.style.backgroundColor));
    }
  }
}

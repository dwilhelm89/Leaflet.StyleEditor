import { FormElement } from './FormElement';
import { DomEvent, DomUtil, Path } from 'leaflet';
import { Form } from '../forms';
import Color from 'ts-color-class';
import { Marker } from '../marker';

const selectedColorClass = 'leaflet-styleeditor-selected';

/**
 *  FormElement used to style the color
 */
export class ColorElement extends FormElement {

  private colorPickerDiv: HTMLElement;
  private colorRampDivs: Map<string, HTMLElement> = new Map();

  public constructor(
    parentForm: Form,
    parentUiElement: HTMLElement,
    styleOption: 'color' | 'fillColor' 
  ) {
    super(parentForm, parentUiElement, styleOption);
    this.colorPickerDiv = this.createColoPicker();
    this.createColorPickerRamp();
  }

  public override style(): void {
    this.colorRampDivs.forEach((div) => {
      DomUtil.removeClass(div, selectedColorClass);
    })

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

  private createColorPickerRamp() {
    this.getColorRamp().forEach(this.createAndSetSelectCallback, this);
  }

  /** create or get already created colorRamp */
  private getColorRamp() {
    // if markers have own colorRamp use it
    /*
    TODO distinguish which colors to show
    if (this.parentForm instanceof MarkerForm) {
      const markerType = new this.styleEditor.options.markerType(
        this.styleEditor
      );
      if (!!markerType.colorRamp) {
        return markerType.colorRamp;
      }
    } */ 
    return this.styleEditor.options.colorRamp;
  }

  /** define what to do when color is changed */
  private createAndSetSelectCallback(color) {
    const element = DomUtil.create(
      'div',
      'leaflet-styleeditor-color',
      this.colorPickerDiv
    );
    element.style.backgroundColor = color;
    DomEvent.addListener(element, 'click', this.selectColor, this);
    this.colorRampDivs.set(color, element);
  }

  /** set style for chosen color */
  private selectColor(event: Event) {
    event.stopPropagation();
    if (event.target instanceof HTMLElement) {
      this.setStyle(new Color(event.target.style.backgroundColor).getHex()); // TODO hand over color
    }
  }
}

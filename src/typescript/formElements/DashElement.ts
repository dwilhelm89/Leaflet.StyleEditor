import { DomEvent, DomUtil } from 'leaflet';
import { Form } from '../forms';
import { FormElement } from './FormElement';

const selectedColorClass = 'leaflet-styleeditor-selected';

/**
 * FormElement used for styling the dash attribute
 */
export class DashElement extends FormElement {
  private dashDivs: Map<string, HTMLElement> = new Map();

  public constructor(
    parentForm: Form,
    parentUiElement: HTMLElement,
    styleOption: string
  ) {
    super(parentForm, parentUiElement, styleOption);
    this.createContent();
  }

  public override style(): void {
    this.dashDivs.forEach((div) => {
      DomUtil.removeClass(div, selectedColorClass);
    });
    const layerWithStyleOption = this.styleEditor.getCurrentLayers().find((layer) => layer.options[this.styleOption]);
    if (!layerWithStyleOption) {
      return;
    }

    const dashStyle = layerWithStyleOption.options[this.styleOption];
    const colorRampElement: HTMLElement= this.dashDivs.get(dashStyle);
    if (colorRampElement) {
      DomUtil.addClass(colorRampElement, selectedColorClass);
    }
  }


  /** create the three standard dash options */
  private createContent() {
    let stroke = DomUtil.create(
      'div',
      'leaflet-styleeditor-stroke',
      this.uiElement
    );
    stroke.style.backgroundPosition = '0px -75px';
    DomEvent.addListener(
      stroke,
      'click',
      () => {
        this.setStyle('1');
      },
      this
    );
    this.dashDivs.set('1', stroke)

    stroke = DomUtil.create(
      'div',
      'leaflet-styleeditor-stroke',
      this.uiElement
    );
    stroke.style.backgroundPosition = '0px -95px';
    DomEvent.addListener(
      stroke,
      'click',
      () => {
        this.setStyle('10, 10');
      },
      this
    );
    this.dashDivs.set('10, 10', stroke)

    stroke = DomUtil.create(
      'div',
      'leaflet-styleeditor-stroke',
      this.uiElement
    );
    stroke.style.backgroundPosition = '-10px -115px';
    DomEvent.addListener(
      stroke,
      'click',
      () => {
        this.setStyle('15, 10, 1, 10');
      },
      this
    );
    this.dashDivs.set('15, 10, 1, 10', stroke)
  }
}

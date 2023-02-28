import { DomEvent, DomUtil } from 'leaflet';
import { Form } from '../forms';
import { FormElement } from './FormElement';

/**
 * FormElement used for styling the dash attribute
 */
export class DashElement extends FormElement {
  public constructor(
    parentForm: Form,
    parentUiElement: HTMLElement,
    styleOption: string
  ) {
    super(parentForm, parentUiElement, styleOption);
    this.createContent();
  }

  public override style(): void {
    // TODO
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
  }

}

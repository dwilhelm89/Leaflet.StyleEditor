import { DomEvent, DomUtil } from 'leaflet';
import { FormElement } from '.';
import { Form } from '../forms';

/**
 * FormElement to set style of an icon
 */
export class SizeElement extends FormElement {
  title = 'size';

  constructor(
    parentForm: Form,
    parentUiElement: HTMLElement,
    styleOption: string
  ) {
    super(parentForm, parentUiElement, styleOption);
    this.createContent();
  }

  /** create the 3 standard icon sizes */
  private createContent() {
    const markerType = new this.styleEditor.options.markerType(
      this.styleEditor
    );

    let select = DomUtil.create(
      'div',
      'leaflet-styleeditor-sizeicon sizeicon-small',
      this.uiElement
    );
    DomEvent.addListener(
      select,
      'click',
      () => {
        this.setStyle(markerType.size.small);
      },
      this
    );

    select = DomUtil.create(
      'div',
      'leaflet-styleeditor-sizeicon sizeicon-medium',
      this.uiElement
    );
    DomEvent.addListener(
      select,
      'click',
      () => {
        this.setStyle(markerType.size.medium);
      },
      this
    );

    select = DomUtil.create(
      'div',
      'leaflet-styleeditor-sizeicon sizeicon-large',
      this.uiElement
    );
    DomEvent.addListener(
      select,
      'click',
      () => {
        this.setStyle(markerType.size.large);
      },
      this
    );
  }

  public override style(): void {
    // TODO
  }
}

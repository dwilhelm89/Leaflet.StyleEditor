import { DomEvent, DomUtil, Layer, LayerGroup, Path, StyleEditor } from 'leaflet';
import { Form } from '../forms';
import { FormElement } from './FormElement';

const selectedColorClass = 'leaflet-styleeditor-selected';

/**
 * FormElement used for styling the dash attribute
 */
export class DashElement extends FormElement {
  protected override defaultShowForLayer(layer: Layer): boolean {
    return  layer instanceof LayerGroup
      ? layer.getLayers().some((layer: Layer) => layer instanceof Path)
      : layer instanceof Path;
  }

  private dashDivs: Map<string, HTMLElement> = new Map();

  private style(layer?: Layer): void {
    this.dashDivs.forEach((div) => {
      DomUtil.removeClass(div, selectedColorClass);
    });

    if(!(layer instanceof Path)) {
      return;
    }

    const dashStyle = layer.options[this.styleOption];
    const dashElement: HTMLElement= this.dashDivs.get(dashStyle);
    if (dashElement) {
      DomUtil.addClass(dashElement, selectedColorClass);
    }
  }


  /** create the three standard dash options */
  override getHTML(layer?: Layer) {
    const uiElement: HTMLElement = super.getHTML();
    let stroke = DomUtil.create(
      'div',
      'leaflet-styleeditor-stroke',
      uiElement
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
      uiElement
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
      uiElement
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
    this.style(layer)
    return uiElement
  }
}

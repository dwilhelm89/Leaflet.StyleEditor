import { DomEvent, DomUtil, Layer, LayerGroup, Path, StyleEditor } from 'leaflet';
import { FormElement } from './FormElement';

const selectedDashClass = 'leaflet-styleeditor-selected';

/**
 * FormElement used for styling the dash attribute
 */
export class DashElement extends FormElement {
  protected override defaultShowForLayer(layer: Layer): boolean {
    return  layer instanceof LayerGroup
      ? layer.getLayers().some((layer: Layer) => layer instanceof Path)
      : layer instanceof Path;
  }

  private style(layer: Layer, strokeHTMLElements: Map<string, HTMLElement>): void {

    if(!(layer instanceof Path)) {
      return;
    }

    const dashStyle = this.getStyle(layer)
    const dashElement: HTMLElement= strokeHTMLElements.get(dashStyle);
    if (dashElement) {
      DomUtil.addClass(dashElement, selectedDashClass);
    }
  }


  /** create the three standard dash options */
  override getHTML(layer?: Layer): HTMLElement {
    const uiElement: HTMLElement = super.getHTML();
    const strokeHTMLElements: Map<string, HTMLElement> = this.createStrokeHTMLElements(layer, uiElement)
    this.style(layer, strokeHTMLElements)
    return uiElement
  }

  // TODO make public?
  private supportedDashArrays: string[] = ["", "10, 10", "15, 10, 1, 10"]

  private createStrokeHTMLElements(layer: Layer, uiElement: HTMLElement): Map<string, HTMLElement> {
    const map: Map<string, HTMLElement> = new Map();
    this.supportedDashArrays.forEach((dashArray: string) => {
      const htmlElement: HTMLElement = DomUtil.create(
        'div',
        'leaflet-styleeditor-stroke',
        uiElement
      );
      htmlElement.appendChild(this.createSVG(dashArray));

      DomEvent.addListener(
        htmlElement,
        'click',
        () => {
          this.setDashArray(layer, dashArray, map);
        },
        this
      );
      map.set(dashArray, htmlElement)
    })
    return map;
  }

  protected setDashArray(layer: Layer, value: string, strokeHTMLElements: Map<string, HTMLElement>): void {
    const previousDash: string = this.getStyle(layer)
    const previousElement: HTMLElement = strokeHTMLElements.get(previousDash)
    if(previousElement)
      DomUtil.removeClass(previousElement, selectedDashClass)

    this.setStyle(layer, value)
    DomUtil.addClass(strokeHTMLElements.get(value), selectedDashClass)
  }

  private createSVG(dashArray: string): SVGElement {
    const svg: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('viewBox', '0 0 160 20')
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

    const line: SVGLineElement = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', '5');
    line.setAttribute('x2', '155');
    line.setAttribute('y1', '10');
    line.setAttribute('y2', '10');
    line.style.setProperty('stroke-dasharray', dashArray);
    svg.appendChild(line)

    return svg;
  }
}

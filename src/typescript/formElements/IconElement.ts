import Color from 'ts-color-class';
import { DomEvent, DomUtil, Layer, LayerGroup, Marker, StyleEditor } from 'leaflet';
import { FormElement } from '.';
import { Form } from '../forms';
import { RemoteMakiIcon, RemoteMakiIconIconOptions, RemoteMakiMarker } from '../marker/Icon';

/**
 * FormElement used for styling the icon
 * TODO ADD DEFAULT ICON ETC
 */
export class IconElement extends FormElement {
  protected override defaultShowForLayer(layer: Layer): boolean {
    return  layer instanceof LayerGroup
      ? layer.getLayers().some((layer: Layer) => layer instanceof Marker)
      : layer instanceof Marker;
  }

  override styleOption = 'icon';


  // TODO this should be done somewhere else
  private remoteMakiMarker = new RemoteMakiMarker({defaultIcon: 'circle',  defaultColor: '#3498db', defaultSize: [20, 50] })

  // private classed used in the code
  private selectOptionWrapperClasses =
    'leaflet-styleeditor-select-option-wrapper leaflet-styleeditor-hidden';
  private selectOptionClasses = 'leaflet-styleeditor-select-option';

  private selectBoxImage: HTMLElement;
  private selectOptions: Map<string, HTMLElement> = new Map();

  private get icon(): RemoteMakiIcon {
    const layer: Marker = this.styleEditor?.currentLayer as Marker

    if(layer?.options?.icon && !(layer.options.icon instanceof RemoteMakiIcon)) {
      layer.options.icon = this.remoteMakiMarker.getIcon() 
    }

    return layer?.options?.icon as RemoteMakiIcon
  }


  /** create the icon selectBoxes */
  public override getHTML(layer?: Layer): HTMLElement {
    const uiElement: HTMLElement = super.getHTML()
    const selectBox: HTMLElement  = DomUtil.create(
      'div',
      'leaflet-styleeditor-select',
      uiElement
    );
    this.selectBoxImage = this.createSelectInputImage(selectBox);

    DomEvent.addListener(selectBox, 'click', this.toggleSelectInput, this);
    this.style(layer)
    return uiElement;
  }

  /** show the correct icon in the correct color if the icon or color changed */
  private style(layer?: Layer) {
    const icon: RemoteMakiIcon = this.icon
    this.styleSelectInputImage(
      this.selectBoxImage,
      icon?.options?.icon,
      icon?.options?.color
    );
    this.createColorSelect(icon.options.color);
    this.hideSelectOptions();
  }

  /** if lost focus hide potentially open SelectOption */
  override lostFocus() {
    this.hideSelectOptions();
  }

  /** create image container that hides/shows the iconSelectBox */
  private createSelectInputImage(parentUiElement: HTMLElement): HTMLElement {
    const wrapper = DomUtil.create(
      'div',
      'leaflet-styleeditor-select-image-wrapper',
      parentUiElement
    );
    return DomUtil.create('div', 'leaflet-styleeditor-select-image', wrapper);
  }

  /** create appropriate image for color and icon */
  private styleSelectInputImage(image: HTMLElement, icon: string, color: string) {
    const html: HTMLElement = this.remoteMakiMarker.getIcon({ icon: icon, color: color, iconSize: [20, 50]}).createIcon()
    image.appendChild(html)
  }

  /** create the selectBox with the icons in the correct color */
  private createColorSelect(color: string) {
    if (this.selectOptions.has(color)) {
      return;
    }

    const selectOptionWrapper: HTMLUListElement = DomUtil.create(
      'ul',
      this.selectOptionWrapperClasses,
      this.uiElement
    );

    RemoteMakiIconIconOptions.forEach((icon) => {
      const selectOption: HTMLLIElement = DomUtil.create(
        'li',
        this.selectOptionClasses,
        selectOptionWrapper
      );
      selectOption.setAttribute('value', icon);
      const selectImage = this.createSelectInputImage(selectOption);
      this.styleSelectInputImage(selectImage, icon, color);
    }, this);

    this.selectOptions.set(color, selectOptionWrapper);

    DomEvent.addListener(
      selectOptionWrapper,
      'click',
      (e: Event) => {
        e.stopPropagation();
        this.selectMarker(e);
        this.util.hideElement(selectOptionWrapper);
      },
      this
    );
  }

  /** show/hide iconSelectBox */
  private toggleSelectInput() {
    const currentColorElement = this.getCurrentColorElement(
      new Color(this.icon.options.color).getHex()
    ); // TODO Color instead of hex

    let show = false;
    if (currentColorElement) {
      show = DomUtil.hasClass(
        currentColorElement,
        'leaflet-styleeditor-hidden'
      );
    }

    this.hideSelectOptions();

    if (show) {
      this.util.showElement(currentColorElement);
    }
  }

  /** called when user selects a marker */
  private selectMarker(e: Event) {
    const value = this.getValue(e.target as HTMLElement);

    // update style
    this.selectBoxImage.setAttribute('value', value);
    this.setStyle(this.remoteMakiMarker.getIcon({
      ...this.icon.options,
      icon: value,
    }));

    this.hideSelectOptions();
  }

  /** helper function to return attribute value of target */
  private getValue(target: HTMLElement) {
    return target.getAttribute('value');
  }

  /** return correct selectBox depending on which color is currently chosen */
  private getCurrentColorElement(color: string) {
    if (!this.selectOptions.has(color)) {
      this.createColorSelect(color);
    }
    return this.selectOptions.get(color);
  }

  /** hide open SelectOption */
  private hideSelectOptions() {
    this.selectOptions.forEach((value: HTMLElement) => {
      this.util.hideElement(value);
    });
  }
  
}

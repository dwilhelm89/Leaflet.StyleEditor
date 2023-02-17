import { DomEvent, DomUtil } from 'leaflet'
import { FormElement } from '.'
import { Form } from '../forms'


/**
 * FormElement used for styling the icon
 */
export class IconElement extends FormElement {

  styleOption = 'icon'

  // private classed used in the code
  private selectOptionWrapperClasses: string = 'leaflet-styleeditor-select-option-wrapper leaflet-styleeditor-hidden'
  private selectOptionClasses: string = 'leaflet-styleeditor-select-option'

  private selectBoxImage: HTMLElement
  private selectOptions: Map<string, HTMLElement> = new Map()

  constructor(parentForm: Form, parentUiElement: HTMLElement, styleOption: string) {
    super(parentForm, parentUiElement, styleOption)
    this.selectBoxImage = this.createSelectBoxImage()
  }

  /** create the icon selectBoxes */
  private createSelectBoxImage(): HTMLElement {
    const selectBox = DomUtil.create('div', 'leaflet-styleeditor-select', this.uiElement)
    const selectBoxImage = this.createSelectInputImage(selectBox)

    DomEvent.addListener(selectBox, 'click', this.toggleSelectInput, this)
    return selectBoxImage
  }

  /** show the correct icon in the correct color if the icon or color changed */
  override style() {
    let iconOptions = new this.styleEditor.options.markerType(this.styleEditor).getIconOptions()
    this.styleSelectInputImage(this.selectBoxImage, iconOptions.icon, iconOptions.iconColor)
    this.createColorSelect(iconOptions.iconColor)
    this.hideSelectOptions()
  }

  /** if lost focus hide potentially open SelectOption */
  override lostFocus() {
    this.hideSelectOptions()
  }

  /** create image container that hides/shows the iconSelectBox */
  private createSelectInputImage(parentUiElement: HTMLElement): HTMLElement {
    let wrapper = DomUtil.create('div', 'leaflet-styleeditor-select-image-wrapper', parentUiElement)
    return DomUtil.create('div', 'leaflet-styleeditor-select-image', wrapper)
  }

  /** create appropriate image for color and icon */
  private styleSelectInputImage(image: HTMLElement, icon, color) {
    let iconOptions = new this.styleEditor.options.markerType(this.styleEditor).getIconOptions()
    if (color) {
      iconOptions.iconColor = color
    }

    image.innerHTML = ''
    new this.styleEditor.options.markerType(this.styleEditor).createSelectHTML(image, iconOptions, icon)
  }

  /** create the selectBox with the icons in the correct color */
  private createColorSelect(color) {
    if (color in this.selectOptions) {
      return
    }

    let selectOptionWrapper: HTMLUListElement =
      DomUtil.create('ul', this.selectOptionWrapperClasses, this.uiElement)

    this.util.getIconsForColor(color).forEach((icon) => {
      let selectOption: HTMLLIElement = DomUtil.create('li', this.selectOptionClasses, selectOptionWrapper)
      selectOption.setAttribute('value', icon)
      let selectImage = this.createSelectInputImage(selectOption)
      this.styleSelectInputImage(selectImage, icon, color)
      this.selectOptions.set(color, selectOption)
    }, this)


    DomEvent.addListener(selectOptionWrapper, 'click', (e) => {
      e.stopPropagation()
      let target = e.target as HTMLElement
      if (target.nodeName === 'UL') {
        return
      }
      while (target && target.className !== 'leaflet-styleeditor-select-option') {
        target = target.parentNode as HTMLElement
      }
      this.selectMarker({
        'target': target
      })
    }, this)
  }

  /** show/hide iconSelectBox */
  private toggleSelectInput() {
    let currentColorElement = this.getCurrentColorElement(
      this.util.rgbToHex(
        new this.styleEditor.options.markerType(this.styleEditor).getIconOptions().iconColor
      )
    )

    let show = false
    if (currentColorElement) {
      show = DomUtil.hasClass(currentColorElement, 'leaflet-styleeditor-hidden')
    }

    this.hideSelectOptions()

    if (show) {
      this.util.showElement(currentColorElement)
    }
  }

  /** called when user selects a marker */
  private selectMarker(e) {
    let value = this.getValue(e.target)

    // update style
    this.selectBoxImage.setAttribute('value', value)
    this.setStyle(value)

    this.hideSelectOptions()
  }

  /** helper function to return attribute value of target */
  private getValue(target) {
    return target.getAttribute('value')
  }

  /** return correct selectBox depending on which color is currently chosen */
  private getCurrentColorElement(color) {
    if (!this.selectOptions.has(color)) {
      this.createColorSelect(color)
    }
    return this.selectOptions.get(color)
  }

  /** hide open SelectOption */
  private hideSelectOptions() {
    this.selectOptions.forEach((value: HTMLElement) => {
      this.util.hideElement(value)
    })
  }
}

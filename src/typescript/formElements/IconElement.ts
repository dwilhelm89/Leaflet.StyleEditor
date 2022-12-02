import { DomEvent, DomUtil } from 'leaflet'
import { FormElement } from '.'


/**
 * FormElement used for styling the icon
 */
export class IconElement extends FormElement {

  styleOption = 'icon'

  // private classed used in the code
  private selectOptionWrapperClasses = 'leaflet-styleeditor-select-option-wrapper leaflet-styleeditor-hidden'
  private selectOptionClasses = 'leaflet-styleeditor-select-option'

  private selectBoxImage: HTMLElement
  private selectOptions

  /** create the icon selectBoxes */
  createContent() {
    let selectBox = DomUtil.create('div', 'leaflet-styleeditor-select', this.uiElement)
    this.selectBoxImage = this.createSelectInputImage(selectBox)

    DomEvent.addListener(selectBox, 'click', this.toggleSelectInput, this)
  }

  /** show the correct icon in the correct color if the icon or color changed */
  style() {
    let iconOptions = new this.styleEditor.options.markerType(this.styleEditor).getIconOptions()
    this.styleSelectInputImage(this.selectBoxImage, iconOptions.icon, iconOptions.iconColor)
    this.createColorSelect(iconOptions.iconColor)
    this.hideSelectOptions()
  }

  /** if lost focus hide potentially open SelectOption */
  lostFocus() {
    this.hideSelectOptions()
  }

  /** create image container that hides/shows the iconSelectBox */
  private createSelectInputImage(parentUiElement): HTMLElement {
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
    if (!this.selectOptions) {
      this.selectOptions = {}
    }
    if (color in this.selectOptions) {
      return
    }

    let selectOptionWrapper =
      DomUtil.create('ul', this.selectOptionWrapperClasses, this.uiElement)

    this.util.getIconsForColor(color).forEach(function (icon) {
      let selectOption = DomUtil.create('li', this.selectOptionClasses, selectOptionWrapper)
      selectOption.setAttribute('value', icon)
      let selectImage = this.createSelectInputImage(selectOption)
      this.styleSelectInputImage(selectImage, icon, color)
    }, this)

    this.selectOptions[color] = selectOptionWrapper

    DomEvent.addListener(selectOptionWrapper, 'click', function (e) {
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
      }, this)
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
    if (!this.selectOptions[color]) {
      this.createColorSelect(color)
    }
    return this.selectOptions[color]
  }

  /** hide open SelectOption */
  private hideSelectOptions() {
    for (let selectOption in this.selectOptions) {
      this.util.hideElement(this.selectOptions[selectOption])
    }
  }
}

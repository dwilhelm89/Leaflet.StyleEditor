import { FormElement } from "."

/**
 * FormElement used for styling the icon
 */
export class IconElement extends FormElement {
  // private classed used in the code
  private selectOptionWrapperClasses: 'leaflet-styleeditor-select-option-wrapper leaflet-styleeditor-hidden'
  private selectOptionClasses: 'leaflet-styleeditor-select-option'

  private selectBoxImage
  private selectOptions

  /** create the icon selectBoxes */
  createContent() {
    let selectBox = L.DomUtil.create('div', 'leaflet-styleeditor-select', this.uiElement)
    this.selectBoxImage = this._createSelectInputImage(selectBox)

    L.DomEvent.addListener(selectBox, 'click', this._toggleSelectInput, this)
  }

  /** show the correct icon in the correct color if the icon or color changed */
  style() {
    let iconOptions = new this.styleEditor.options.markerType(this.styleEditor).getIconOptions()
    this._styleSelectInputImage(this.selectBoxImage,
      iconOptions.icon, iconOptions.iconColor)
    this._createColorSelect(iconOptions.iconColor)
    this._hideSelectOptions()
  }

  /** if lost focus hide potentially open SelectOption */
  lostFocus() {
    this._hideSelectOptions()
  }

  /** create image container that hides/shows the iconSelectBox */
  _createSelectInputImage(parentUiElement) {
    let wrapper = L.DomUtil.create('div', 'leaflet-styleeditor-select-image-wrapper', parentUiElement)
    return L.DomUtil.create('div', 'leaflet-styleeditor-select-image', wrapper)
  }

  /** create appropriate image for color and icon */
  _styleSelectInputImage(image, icon, color) {
    if (!icon) {
      icon = image.getAttribute('value')
      if (!icon) {
        return
      }
    }

    let iconOptions = new this.styleEditor.options.markerType(this.styleEditor).getIconOptions()
    if (color) {
      iconOptions.iconColor = color
    }

    image.innerHTML = ''
    // TODO ?!let iconOptions = new this.styleEditor.options.markerType(this.styleEditor).createSelectHTML(image, iconOptions, icon)
    image.setAttribute('value', icon)
  }

  /** create the selectBox with the icons in the correct color */
  _createColorSelect(color) {
    if (!this.selectOptions) {
      this.selectOptions = {}
    }
    if (color in this.selectOptions) {
      return
    }

    let selectOptionWrapper =
      L.DomUtil.create('ul', this.selectOptionWrapperClasses, this.uiElement)

    this.util.getMarkersForColor(color).forEach(function (option) {
      let selectOption = L.DomUtil.create('li', this._selectOptionClasses, selectOptionWrapper)
      let selectImage = this._createSelectInputImage(selectOption)
      this._styleSelectInputImage(selectImage, option, color)
    }, this)

    this.selectOptions[color] = selectOptionWrapper

    L.DomEvent.addListener(selectOptionWrapper, 'click', function (e) {
      e.stopPropagation()
      let target = e.target as HTMLElement 
      if (target.nodeName === 'UL') {
        return
      }
      const parentNode = target.parentNode as HTMLElement
      if (parentNode.className === 'leaflet-styleeditor-select-image') {
        target = parentNode
      } else {
        while (target && target.className !== 'leaflet-styleeditor-select-image') {
          target = target.childNodes[0] as HTMLElement
        }
      }
      this._selectMarker({
        'target': target
      }, this)
    }, this)
  }

  /** show/hide iconSelectBox */
  _toggleSelectInput(e) {
    let currentColorElement = this._getCurrentColorElement(
      this.util.rgbToHex(
        new this.styleEditor.options.markerType(this.styleEditor).getIconOptions().iconColor
      )
    )

    let show = false
    if (currentColorElement) {
      show = L.DomUtil.hasClass(currentColorElement, 'leaflet-styleeditor-hidden')
    }

    this._hideSelectOptions()

    if (show) {
      this.util.showElement(currentColorElement)
    }
  }

  /** called when user selects a marker */
  _selectMarker(e) {
    let value = this._getValue(e.target)

    // update style
    this.selectBoxImage.setAttribute('value', value)
    this.setStyle(value)

    this._hideSelectOptions()
  }

  /** helper function to return attribute value of target */
  _getValue(target) {
    return target.getAttribute('value')
  }

  /** return correct selectBox depending on which color is currently chosen */
  _getCurrentColorElement(color) {
    if (!this.selectOptions[color]) {
      this._createColorSelect(color)
    }
    return this.selectOptions[color]
  }

  /** hide open SelectOption */
  _hideSelectOptions() {
    for (let selectOption in this.selectOptions) {
      this.util.hideElement(this.selectOptions[selectOption])
    }
  }
}

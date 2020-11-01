import { FormElement } from '.'

/**
 * FormElement to set style of an icon
 */
export class SizeElement extends FormElement {
  title = 'size'

  /** create the 3 standard icon sizes */
  createContent() {
    const markerType = new this.styleEditor.options.markerType(this.styleEditor)

    let select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-small', this.uiElement)
    L.DomEvent.addListener(select, 'click', function () {
      this.setStyle(markerType.size.small)
    }, this)

    select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-medium', this.uiElement)
    L.DomEvent.addListener(select, 'click', function () {
      this.setStyle(markerType.size.medium)
    }, this)

    select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-large', this.uiElement)
    L.DomEvent.addListener(select, 'click', function () {
      this.setStyle(markerType.size.large)
    }, this)
  }
}

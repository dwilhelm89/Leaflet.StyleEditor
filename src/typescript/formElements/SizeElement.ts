import { FormElement, FormElementOptions } from './FormElement'

/**
 * FormElement to set style of an icon
 */
export default class SizeElement extends FormElement {

    /** create the 3 standard icon sizes */
    createContent() {
      let uiElement = this.options.parentUiElement
      let select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-small', uiElement)
      L.DomEvent.addListener(select, 'click', function () {
        this.setStyle(this.options.styleEditorOptions.markerType.options.size.small)
      }, this)

      select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-medium', uiElement)
      L.DomEvent.addListener(select, 'click', function () {
        this.setStyle(this.options.styleEditorOptions.markerType.options.size.medium)
      }, this)

      select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-large', uiElement)
      L.DomEvent.addListener(select, 'click', function () {
        this.setStyle(this.options.styleEditorOptions.markerType.options.size.large)
      }, this)
    }
}

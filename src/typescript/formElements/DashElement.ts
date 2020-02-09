import L from 'leaflet'
import FormElement from './FormElement'
import FormElementOptions from './FormElementOptions'

/**
 * FormElement used for styling the dash attribute
 */
export default class DashElement extends FormElement {

  /** create the three standard dash options */
  createContent() {
    let uiElement = this.options.uiElement
    let stroke = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', uiElement)
    stroke.style.backgroundPosition = '0px -75px'
    L.DomEvent.addListener(stroke, 'click', function () {
      this.setStyle('1')
    }, this)

    stroke = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', uiElement)
    stroke.style.backgroundPosition = '0px -95px'
    L.DomEvent.addListener(stroke, 'click', function () {
      this.setStyle('10, 10')
    }, this)

    stroke = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', uiElement)
    stroke.style.backgroundPosition = '0px -115px'
    L.DomEvent.addListener(stroke, 'click', function () {
      this.setStyle('15, 10, 1, 10')
    }, this)
  }
}

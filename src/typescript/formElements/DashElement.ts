import { DomEvent, DomUtil } from 'leaflet'
import { FormElement } from './FormElement'

/**
 * FormElement used for styling the dash attribute
 */
export class DashElement extends FormElement {

  /** create the three standard dash options */
  createContent() {
    let stroke = DomUtil.create('div', 'leaflet-styleeditor-stroke', this.uiElement)
    stroke.style.backgroundPosition = '0px -75px'
    DomEvent.addListener(stroke, 'click', function () {
      this.setStyle('1')
    }, this)

    stroke = DomUtil.create('div', 'leaflet-styleeditor-stroke', this.uiElement)
    stroke.style.backgroundPosition = '0px -95px'
    DomEvent.addListener(stroke, 'click', function () {
      this.setStyle('10, 10')
    }, this)

    stroke = DomUtil.create('div', 'leaflet-styleeditor-stroke', this.uiElement)
    stroke.style.backgroundPosition = '-10px -115px'
    DomEvent.addListener(stroke, 'click', function () {
      this.setStyle('15, 10, 1, 10')
    }, this)
  }
}

import { FormElement, FormElementClass } from '../formElements'
import { StyleEditorClass } from '../StyleEditorClass'
import { StyleEditor } from '../StyleEditor'
import { DomUtil, StyleableLayer } from 'leaflet'


export interface FormClass {
  new(...args: any[]): Form
}

/**
* Forms consist of FormElements and are shown in the StyleForm
* There exists a MarkerForm to modify Markers and a GeometryForm to modify Geometries (i.e. rectangles...)
* Style options based on:
*     - path: https://leafletjs.com/reference.html#path-options
*     - icon: https://leafletjs.com/reference.html#icon
*/
export abstract class Form extends StyleEditorClass {
  constructor(styleEditor: StyleEditor, parentUiElement: HTMLElement) {
    super(styleEditor)
    this.parentUiElement = parentUiElement
  }
  
  protected formElements: Record<string, FormElementClass>
  
  private uiElement: HTMLElement
  private parentUiElement: HTMLElement
  protected initializedElements: Record<string, FormElement> = {}
  
  /** create every FormElement in the parentUiElement */
  create() {
    this.uiElement = DomUtil.create('div', '', this.parentUiElement)
    for (let key in this.formElements) {
      const formElement = this.getFormElementClass(key)
      if (formElement !== undefined) {
        this.initializedElements[key] = new formElement(this, this.uiElement, key)
      }
    }
    this.hide()
  }
  
  /** hide the Form including its FormElements */
  hide() {
    this.hideForm()
  }
  
  /** hide the Form */
  hideForm() {
    this.util.hideElement(this.uiElement)
  }
  
  /** make FormElements and Form visible */
  show() {
    this.preShow()
    this.showForm()
    this.style()
  }
  
  /** hook which is called at the beginning of the show function */
  preShow() {}
  
  /** make the Form visible */
  showForm() {
    this.util.showElement(this.uiElement)
  }
  
  /** inform FormElements the selected style has changed, so they can adapt */
  style() {
    for (let key in this.initializedElements) {
      this.initializedElements[key].style()
    }
  }
  
  /** inform Form it lost it's focus */
  lostFocus() {
    for (let key in this.initializedElements) {
      this.initializedElements[key].lostFocus()
    }
  }
  
  /**
  * get the Class of the Formelement to instanciate
  * @param {*} styleOption, the styleOption to get the FormElement for
  */
  getFormElementClass(styleOption: string): FormElementClass {
    let formElementKeys = Object.keys(this.formElements)
    
    if (formElementKeys.indexOf(styleOption) >= 0) {
      let FormElement = this.formElements[styleOption]
      
      if (FormElement) {
        // may be a dictionary
        if (typeof FormElement === 'boolean') {
          return this.getFormElementStandardClass(styleOption)
        }
        /* TODO: presumably not necesarry   
        if ('formElement' in FormElement && 'boolean' in FormElement) {
          FormElement = FormElement['formElement']
        }*/
      }
      // if nothing works return it
      return this.getFormElementStandardClass(styleOption)
    }
  }
  
  /**
  * get Leaflet.StyleEditor standard FormElement class for given styleOption
  * @param {*} styleOption, the styleOption to get the standard class for
  */
  getFormElementStandardClass(styleOption: string): FormElementClass {
    return this.formElements[styleOption]
  }

  abstract whenToShow(layers: StyleableLayer[]): Boolean
}

import { Util } from '../Util'
import { FormElement, FormElementOptions } from '../formElements/FormElement'

/**
 * Forms consist of FormElements and are shown in the StyleForm
 * There exists a MarkerForm to modify Markers and a GeometryForm to modify Geometries (i.e. rectangles...)
 * Style options based on:
 *     - path: https://leafletjs.com/reference.html#path-options
 *     - icon: https://leafletjs.com/reference.html#icon
 */
export abstract class Form {

  private parentUiElement: HTMLElement
  
  protected util = Util.getInstance()
  protected initializedElements: FormElement[]

  constructor(parentUiElement: HTMLElement, formElements: Record<string, typeof FormElement>, options: FormElementOptions) {
    this.create(parentUiElement, formElements, options)
  }

  create(parentUiElement: HTMLElement, formElements: Record<string, typeof FormElement>, options: FormElementOptions) {
    let styleFormKeys = Object.keys(formElements)

    for (let i = 0; i < styleFormKeys.length; i++) {
      let formElement = new formElements[styleFormKeys[i]](options)
      if (formElement !== undefined) {
        formElement.create(parentUiElement, styleFormKeys[i])
        this.initializedElements.push(formElement)
      }
    }
  }

  /** hide the Form including its FormElements */
  hide() {
    this.hideFormElements()
    this.hideForm()
  }

  /** hide the FormElements */
  hideFormElements() {
    for (let i = 0; i < this.initializedElements.length; i++) {
      this.initializedElements[i].hide()
    }
  }

  /** hide the Form */
  hideForm() {
    this.util.hideElement(this.parentUiElement)
  }

  /** make FormElements and Form visible */
  show(currentElement) {
    this.style(currentElement)
    this.preShow()
    this.showFormElements(currentElement)
    this.showForm()
  }

  /** hook which is called at the beginning of the show function */
  preShow() {}

  /** make every FormElement visible */
  protected showFormElements(currentElemnt) {
    for (let i = 0; i < this.initializedElements.length; i++) {
      this.showFormElement(this.initializedElements[i])
    }
  }

  /** make the Form visible */
  private showForm() {
    this.util.showElement(this.parentUiElement)
  }

  /** inform FormElements the selected style has changed, so they can adapt */
  style(currentElemnt) {
    for (let i = 0; i < this.initializedElements.length; i++) {
      this.initializedElements[i].style(currentElemnt)
    }
  }

  /** inform Form it lost it's focus */
  lostFocus() {
    for (let i = 0; i < this.initializedElements.length; i++) {
      this.initializedElements[i].lostFocus()
    }
  }

  /**
   * @returns a Boolean indicating if the @param formElement should be shown
   */
  protected showFormElement(formElement: FormElement) {
    // check wether element should be shown or not
   // TODO make hideable if (this.showFormElementForStyleOption(formElement.options.styleOption)) {
      formElement.show()
    /* } else {
      formElement.hide()
    }*/
  }

}

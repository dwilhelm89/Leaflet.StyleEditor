import { Util } from '../Util'
import { FormElement, FormElementClass } from '../formElements'


export interface FormClass {
  new(parentUiElement: HTMLElement): Form
}

/**
 * Forms consist of FormElements and are shown in the StyleForm
 * There exists a MarkerForm to modify Markers and a GeometryForm to modify Geometries (i.e. rectangles...)
 * Style options based on:
 *     - path: https://leafletjs.com/reference.html#path-options
 *     - icon: https://leafletjs.com/reference.html#icon
 */
export abstract class Form {
  constructor(formOptionKey: string, parentUiElement: HTMLElement, formElements: Record<string, FormElementClass>) {
    this.formOptionsKey = formOptionKey
    this.parentUiElement = parentUiElement
    this.formElements = formElements
    this.create()
  }

  protected formOptionsKey: String
  protected formElements: Record<string, FormElementClass>

  private parentUiElement: HTMLElement
  private initializedElements: Record<string, FormElement> = {}

  protected util = Util.getInstance()

  /** create every FormElement in the parentUiElement */
  protected create() {
    for (let key in this.formElements) {
      const formElement = this.getFormElementClass(key)
      if (formElement !== undefined) {
        this.initializedElements[key] = new formElement(this, this.parentUiElement)
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
    for (let key in this.initializedElements) {
      this.initializedElements[key].hide()
    }
  }

  /** hide the Form */
  hideForm() {
    this.util.hideElement(this.parentUiElement)
  }

  /** make FormElements and Form visible */
  show(currentElement?) {
    this.preShow()
    this.showFormElements()
    this.showForm()
    this.style(currentElement)
  }

  /** hook which is called at the beginning of the show function */
  preShow() {
  }

  /** make every FormElement visible */
  showFormElements() {
    for (let key in this.initializedElements) {
      this.showFormElement(this.initializedElements[key])
    }
  }

  /** make the Form visible */
  showForm() {
    this.util.showElement(this.parentUiElement)
  }

  /** inform FormElements the selected style has changed, so they can adapt */
  style(currentElement?) {
    for (let key in this.initializedElements) {
      this.initializedElements[key].style(currentElement)
    }
  }

  /** inform Form it lost it's focus */
  lostFocus() {
    for (let key in this.initializedElements) {
      this.initializedElements[key].lostFocus()
    }
  }

  /**
   * @returns a Boolean indicating if the @param formElement should be shown
   */
  showFormElement(formElement: FormElement) {
    // check wether element should be shown or not
    if (this.showFormElementForStyleOption(formElement.styleOption)) {
      formElement.show()
    } else {
      formElement.hide()
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

        if ('formElement' in FormElement && 'boolean' in FormElement) {
          FormElement = FormElement['formElement']
        }
      }
      // if nothing works return it
      return this.getFormElementStandardClass(styleOption)
    }
  }

  /**
   * check whether a FormElement should be shown
   * @param {*} styleOption, the styleOption to check
   */
  showFormElementForStyleOption(styleOption) {
    /*
    if (styleOption in this.formElements) {
      let styleFormElement = this.initializedElements[styleOption]

      // maybe a function is given to declare when to show the FormElement
      if (typeof styleFormElement === 'function') {
        try {
          return styleFormElement(this.util.getCurrentElement())
        } catch (err) {
          // the given function presumably is a constructor -> always show it
          return true
        }
      }

      // maybe a boolean is given to indicate whether to show it
      if (typeof styleFormElement === 'boolean') {
        return styleFormElement
      }

      // check for dictionary
      if ('boolean' in styleFormElement) {
        // in a dictionary boolean may be a function or boolean
        if (typeof styleFormElement['boolean'] === 'function') {
          return styleFormElement['boolean'](this.util.getCurrentElement())
        }
        return styleFormElement['boolean']
      }
      return true
    }
    TODO */
    return false
  }

  /**
   * get Leaflet.StyleEditor standard FormElement class for given styleOption
   * @param {*} styleOption, the styleOption to get the standard class for
   */
  getFormElementStandardClass(styleOption: string): FormElementClass {
    return this.formElements[styleOption]
  }
}

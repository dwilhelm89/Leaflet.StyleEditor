import L from 'leaflet'
import { StyleEditor } from '../Leaflet.StyleEditor'
import Util from '../Util'


export class FormOptions {
  parentUiElement
  initializedElements: any[]
  formOptionKey: string
  formElements
}

/**
 * Forms consist of FormElements and are shown in the StyleForm
 * There exists a MarkerForm to modify Markers and a GeometryForm to modify Geometries (i.e. rectangles...)
 * Style options based on:
 *     - path: https://leafletjs.com/reference.html#path-options
 *     - icon: https://leafletjs.com/reference.html#icon
 */
export default class Form {
 
  protected styleEditor: StyleEditor

  options: FormOptions
  protected util = Util.getInstance()

  constructor(styleEditor: StyleEditor) {
    this.styleEditor = styleEditor
  }

  /** create every FormElement in the parentUiElement */
  create(parentUiElement) {
    this.options.parentUiElement = parentUiElement

    let formElements = this.getFormElements()
    let styleFormKeys = Object.keys(formElements)

    for (let i = 0; i < styleFormKeys.length; i++) {
      let formElement = this.getFormElementClass(styleFormKeys[i])
      if (formElement !== undefined) {
        formElement.create(parentUiElement)
        this.options.initializedElements.push(formElement)
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
    for (let i = 0; i < this.options.initializedElements.length; i++) {
      this.options.initializedElements[i].hide()
    }
  }

  /** hide the Form */
  hideForm() {
    this.util.hideElement(this.options.parentUiElement)
  }

  /** make FormElements and Form visible */
  show() {
    this.preShow()
    this.showFormElements()
    this.showForm()
    this.style()
  }

  /** hook which is called at the beginning of the show function */
  preShow() {
  }

  /** make every FormElement visible */
  showFormElements() {
    for (let i = 0; i < this.options.initializedElements.length; i++) {
      this.showFormElement(this.options.initializedElements[i])
    }
  }

  /** make the Form visible */
  showForm() {
    this.util.showElement(this.options.parentUiElement)
  }

  /** inform FormElements the selected style has changed, so they can adapt */
  style() {
    for (let i = 0; i < this.options.initializedElements.length; i++) {
      this.options.initializedElements[i].style()
    }
  }

  /** inform Form it lost it's focus */
  lostFocus() {
    for (let i = 0; i < this.options.initializedElements.length; i++) {
      this.options.initializedElements[i].lostFocus()
    }
  }

  /**
   * @returns a Boolean indicating if the @param formElement should be shown
   */
  showFormElement(formElement) {
    // check wether element should be shown or not
    if (this.showFormElementForStyleOption(formElement.options.styleOption)) {
      formElement.show()
    } else {
      formElement.hide()
    }
  }

  /**
   * get the currently used formElements
   * either standard or the ones provided while instanciation
   */
  getFormElements() {
    let formElements
    if (this.options.formOptionKey in this.styleEditor.forms) {
      formElements = this.styleEditor.forms[this.options.formOptionKey]
    } else {
      formElements = this.options.formElements
    }
    return formElements
  }

  /**
   * get the Class of the Formelement to instanciate
   * @param {*} styleOption, the styleOption to get the FormElement for
   */
  getFormElementClass(styleOption) {
    let formElements = this.getFormElements()
    let formElementKeys = Object.keys(formElements)

    if (formElementKeys.indexOf(styleOption) >= 0) {
      let FormElement = formElements[styleOption]

      if (FormElement) {
        // may be a dictionary
        if (typeof FormElement === 'boolean') {
          return this.getFormElementStandardClass(styleOption)
        }

        if ('formElement' in FormElement && 'boolean' in FormElement) {
          FormElement = FormElement['formElement']
        }
        // try to instantiate FormElementOption and return StandardClass if it does not work
        try {
          let formElementInstance = new FormElement({
            styleOption: styleOption,
            parentForm: this
          })
          if (formElementInstance instanceof FormElement) {
            return formElementInstance
          }
        } catch (e) {
          // creating instance failed fallback to StandardClass
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
    let formElements = this.getFormElements()
    if (styleOption in formElements) {
      let styleFormElement = formElements[styleOption]

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
    return false
  }

  /**
   * get Leaflet.StyleEditor standard FormElement class for given styleOption
   * @param {*} styleOption, the styleOption to get the standard class for
   */
  getFormElementStandardClass(styleOption) {
    return new this.options.formElements[styleOption](
      { styleOption: styleOption, parentForm: this})
  }
}

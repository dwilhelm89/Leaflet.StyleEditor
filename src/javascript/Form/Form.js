/**
 * Forms consist of FormElements and are shown in the StyleForm
 * There exists a MarkerForm to modify Markers and a GeometryForm to modify Geometries (i.e. rectangles...)
 * Style options based on:
 *     - path: https://leafletjs.com/reference.html#path-options
 *     - icon: https://leafletjs.com/reference.html#icon
 */

L.StyleEditor.forms.Form = L.Class.extend({
  initialize: function (options) {
    if (options) {
      L.setOptions(this, options)
    }
    this.options.initializedElements = []
  },

  /** create every FormElement in the parentUiElement */
  create: function (parentUiElement) {
    this.options.parentUiElement = parentUiElement

    let formElements
    if (this.options.formOptionKey in this.options.styleEditorOptions.forms) {
      formElements = this.options.styleEditorOptions.forms[this.options.formOptionKey]
    } else {
      formElements = this.options.formElements
    }
    let styleFormKeys = Object.keys(formElements)

    for (let i = 0; i < styleFormKeys.length; i++) {
      let formElement = this.getFormElementClass(styleFormKeys[i], formElements)
      if (formElement !== undefined) {
        formElement.create(parentUiElement)
        this.options.initializedElements.push(formElement)
      }
    }
  },

  /** hide the Form including its FormElements */
  hide: function () {
    this.hideFormElements()
    this.hideForm()
  },

  /** hide the FormElements */
  hideFormElements: function () {
    for (let i = 0; i < this.options.initializedElements.length; i++) {
      this.options.initializedElements[i].hide()
    }
  },

  /** hide the Form */
  hideForm: function () {
    this.options.styleEditorOptions.util.hideElement(this.options.parentUiElement)
  },

  /** make FormElements and Form visible */
  show: function () {
    this.preShow()
    this.showFormElements()
    this.showForm()
    this.style()
  },

  /** hook which is called at the beginning of the show function */
  preShow: function () {
  },

  /** make every FormElement visible */
  showFormElements: function () {
    for (let i = 0; i < this.options.initializedElements.length; i++) {
      this.showFormElement(this.options.initializedElements[i])
    }
  },

  /** make the Form visible */
  showForm: function () {
    this.options.styleEditorOptions.util.showElement(this.options.parentUiElement)
  },

  /** inform FormElements the selected style has changed, so they can adapt */
  style: function () {
    for (let i = 0; i < this.options.initializedElements.length; i++) {
      this.options.initializedElements[i].style()
    }
  },

  /** inform Form it lost it's focus */
  lostFocus: function () {
    for (let i = 0; i < this.options.initializedElements.length; i++) {
      this.options.initializedElements[i].lostFocus()
    }
  },

  /**
   * @returns a Boolean indicating if the @param formElement should be shown
   */
  showFormElement: function (formElement) {
    // check wether element should be shown or not
    if (this.showFormElementForStyleOption(formElement.options.styleOption)) {
      formElement.show()
    } else {
      formElement.hide()
    }
  },

  getFormElementClass: function (styleOption, formElements) {
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
            parentForm: this,
            styleEditorOptions: this.options.styleEditorOptions
          })
          if (formElementInstance instanceof L.StyleEditor.formElements.FormElement) {
            return formElementInstance
          }
        } catch (e) {
          console.log(e)
        }
      }
      // if nothing works return it
      return this.getFormElementStandardClass(styleOption)
    }
  },

  showFormElementForStyleOption (styleOption) {
    let formElements
    if (this.options.formOptionKey in this.options.styleEditorOptions.forms) {
      formElements = this.options.styleEditorOptions.forms[this.options.formOptionKey]
    } else {
      formElements = this.options.formElements
    }
    if (styleOption in formElements) {
      let styleFormElement = formElements[styleOption]

      if (typeof styleFormElement === 'function') {
        try {
          let asfd = styleFormElement(this.options.styleEditorOptions.util.getCurrentElement())
          return asfd
        } catch (err) {
          return true
        }
      }
      if (typeof styleFormElement === 'boolean') {
        return styleFormElement
      }
      if ('boolean' in styleFormElement) {
        return styleFormElement['boolean']
      }
      return true
    }
    return false
  },

  getFormElementStandardClass (styleOption) {
    return new this.options.formElements[styleOption](
      {styleOption: styleOption, parentForm: this, styleEditorOptions: this.options.styleEditorOptions})
  }
})

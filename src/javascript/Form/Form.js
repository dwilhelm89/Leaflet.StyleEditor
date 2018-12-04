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

    let styleFormKeys = Object.keys(this.options.formElements)

    for (let i = 0; i < styleFormKeys.length; i++) {
      let formElement = this.getFormElementOptionClass(styleFormKeys[i])
      formElement.create(parentUiElement)
      this.options.initializedElements.push(formElement)
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

  showFormElement (formElement) {
    // check wether element should be shown or not
    if (this.getFormElementOptionBoolean(formElement.options.styleOption)) {
      formElement.show()
    } else {
      formElement.hide()
    }
  },

  getFormElementOption (styleOption) {
    if (this.options.formOptionKey &&
        this.options.styleEditorOptions.forms &&
        this.options.formOptionKey in this.options.styleEditorOptions.forms &&
        styleOption in this.options.styleEditorOptions.forms[this.options.formOptionKey]) {
      return this.options.styleEditorOptions.forms[this.options.formOptionKey][styleOption]
    }
  },

  getFormElementOptionClass (styleOption) {
    let FormElementOption = this.getFormElementOption(styleOption)

    if (FormElementOption) {
      // may be a dictionary
      if ('formElement' in FormElementOption && 'boolean' in FormElementOption) {
        FormElementOption = FormElementOption['formElement']
      } else if (FormElementOption instanceof Boolean) {
        return this.getFormElementStandardClass(styleOption)
      }

      let returnValue
      try {
        let formElementInstance = new FormElementOption(
          {styleOption: styleOption, parentForm: this, styleEditorOptions: this.options.styleEditorOptions})
        if (formElementInstance instanceof L.StyleEditor.formElements.FormElement) {
          returnValue = formElementInstance
        }
      } catch (e) {
        console.log(e)
      }
      if (!returnValue) {
        return this.getFormElementStandardClass(styleOption)
      }
      return returnValue
    }
    return this.getFormElementStandardClass(styleOption)
  },

  getFormElementOptionBoolean (styleOption) {
    let formElementOption = this.getFormElementOption(styleOption)
    // may be a dictionary
    if (formElementOption && 'formElement' in formElementOption && 'boolean' in formElementOption) {
      formElementOption = formElementOption['boolean']
    }

    // may be function or boolean
    if (formElementOption instanceof Function) {
      try {
        return formElementOption(this.options.styleEditorOptions.currentElement)
      } catch (e) {
        console.log(e)
        return true
      }
    } else if (typeof formElementOption === 'boolean') {
      return formElementOption
    }
    return true
  },

  getFormElementStandardClass (styleOption) {
    return new this.options.formElements[styleOption](
      {styleOption: styleOption, parentForm: this, styleEditorOptions: this.options.styleEditorOptions})
  }
})

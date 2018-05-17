/**
  * Forms consist of FormElements and are shown in the StyleForm
  * There exists a MarkerForm to modify Markers and a GeometryForm to modify Geometries (i.e. rectangles...)
  * Style options based on:
  *     - path: http://leafletjs.com/reference.html#path-options
  *     - icon: http://leafletjs.com/reference.html#icon
  */

L.StyleEditor.forms.Form = L.Class.extend({
    initialize: function(options) {
        if (!!options) {
            L.setOptions(this, options);
        }
        this.options.initializedElements = [];
    },

    /** create every FormElement in the parentUiElement */
    create: function (parentUiElement) {
        this.options.parentUiElement = parentUiElement;

        var styleFormKeys = Object.keys(this.options.formElements);
        var styleFormValues = Object.values(this.options.formElements);

        for (var i = 0; i < styleFormKeys.length; i++) {
            var formElement = new styleFormValues[i](
                {styleOption: styleFormKeys[i], parentForm: this, styleEditorOptions: this.options.styleEditorOptions});
            formElement.create(parentUiElement);
            this.options.initializedElements.push(formElement);
        }
    },

    /** hide the Form including its FormElements */
    hide: function () {
        this.hideFormElements();
        this.hideForm();
    },

    /** hide the FormElements */
    hideFormElements: function () {
        for (var i = 0; i < this.options.initializedElements.length; i++) {
            this.options.initializedElements[i].hide();
        }
    },

    /** hide the Form */
    hideForm: function () {
        this.options.styleEditorOptions.util.hideElement(this.options.parentUiElement);
    },

    /** make FormElements and Form visible*/
    show: function () {
        this.preShow();
        this.showFormElements();
        this.showForm();
    },

    /** hook which is called at the beginning of the show function */
    preShow: function() {
    },

    /** make every FormElement visible */
    showFormElements: function () {
        for (var i = 0; i < this.options.initializedElements.length; i++) {
            this.options.initializedElements[i].show();
        }
    },

    /** make the Form visible */
    showForm: function () {
        this.options.styleEditorOptions.util.showElement(this.options.parentUiElement);
    },

    /** inform FormElements the selected style has changed, so they can adapt */
    style: function () {
        for (var i = 0; i < this.options.initializedElements.length; i++) {
            this.options.initializedElements[i].style();
        }
    },

    /** inform Form it lost it's focus */
    lostFocus: function() {
        for (var i = 0; i < this.options.initializedElements.length; i++) {
            this.options.initializedElements[i].lostFocus();
        }
    }
});

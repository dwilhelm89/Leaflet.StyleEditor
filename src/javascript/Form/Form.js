L.StyleEditor.forms.Form = L.Class.extend({
    initialize: function(options) {
        if (!!options) {
            L.setOptions(this, options);
        }
        this.options.initializedElements = [];
    },

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

    hide: function () {
        this.hideFormElements();
        this.hideForm();
    },

    hideFormElements: function () {
        for (var i = 0; i < this.options.initializedElements.length; i++) {
            this.options.initializedElements[i].hide();
        }
    },

    hideForm: function () {
        this.options.styleEditorOptions.util.showElement(this.options.parentUiElement);
    },

    show: function () {
        this.preShow();
        this.showFormElements();
        this.showForm();
    },

    preShow: function() {
    },

    showFormElements: function () {
        for (var i = 0; i < this.options.initializedElements.length; i++) {
            this.options.initializedElements[i].show();
        }
    },

    showForm: function () {
        this.options.styleEditorOptions.util.showElement(this.options.parentUiElement);
    },

    style: function () {
        for (var i = 0; i < this.options.initializedElements.length; i++) {
            this.options.initializedElements[i].style();
        }
    }
});

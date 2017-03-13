L.StyleEditor.forms.MarkerForm = L.StyleEditor.forms.Form.extend({
    options: {
        formElements: {
            'icon': L.StyleEditor.formElements.IconElement,
            'color': L.StyleEditor.formElements.ColorElement,
            'size': L.StyleEditor.formElements.SizeElement
        }
    },

    preShow: function () {
        Object.assign(this.options.styleEditorOptions.markerType.options.iconOptions,
            this.options.styleEditorOptions.util.getCurrentElement().options.icon.options);
    }
});

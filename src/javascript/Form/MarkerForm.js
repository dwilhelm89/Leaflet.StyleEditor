/** Form used to enable modification of a Geometry */
L.StyleEditor.forms.MarkerForm = L.StyleEditor.forms.Form.extend({
  options: {
    formElements: {
      'popupContent': L.StyleEditor.formElements.PopupContentElement,
      'icon': L.StyleEditor.formElements.IconElement,
      'color': L.StyleEditor.formElements.ColorElement,
      'size': L.StyleEditor.formElements.SizeElement
    }
  }

})

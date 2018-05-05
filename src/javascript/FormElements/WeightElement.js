/**
 * FormElement used to style weight
 */
L.StyleEditor.formElements.WeightElement = L.StyleEditor.formElements.FormElement.extend({

  /** create number input box */
  createContent: function () {
    this.options.label = L.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.options.uiElement)

    let weight = this.options.weight = L.DomUtil.create('input', 'leaflet-styleeditor-input',
      this.options.uiElement)
    weight.type = 'range'
    weight.min = 0
    weight.max = 20
    weight.step = 1
    weight.value = 4

    // add event listeners
    L.DomEvent.addListener(weight, 'change', this._setStyle, this)
    L.DomEvent.addListener(weight, 'input', this._setStyle, this)
    L.DomEvent.addListener(weight, 'keyup', this._setStyle, this)
    L.DomEvent.addListener(weight, 'mouseup', this._setStyle, this)
  },

  /** set correct value */
  style: function () {
    this.options.weight.value = this.options.styleEditorOptions.util.getStyle(this.options.styleOption)
    this.options.label.innerText = this.options.weight.value
  },

  /** communicate weight value */
  _setStyle: function () {
    this.setStyle(this.options.weight.value)
  }
})

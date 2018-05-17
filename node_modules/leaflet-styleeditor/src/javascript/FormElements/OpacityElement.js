/**
 * FormElement used to style opacity
 */
L.StyleEditor.formElements.OpacityElement = L.StyleEditor.formElements.FormElement.extend({

  /** create number input box */
  createContent: function () {
    this.options.label = L.DomUtil.create('span', 'leaflet-styleeditor-input-span', this.options.uiElement)

    let slider = this.options.slider = L.DomUtil.create('input', 'leaflet-styleeditor-input',
      this.options.uiElement)
    slider.type = 'range'
    slider.max = 1
    slider.min = 0
    slider.step = 0.01
    slider.value = 0.5

    // add event listeners
    L.DomEvent.addListener(slider, 'change', this._setStyle, this)
    L.DomEvent.addListener(slider, 'input', this._setStyle, this)
    L.DomEvent.addListener(slider, 'keyup', this._setStyle, this)
    L.DomEvent.addListener(slider, 'mouseup', this._setStyle, this)
  },

  /** set correct value */
  style: function () {
    this.options.slider.value = this.options.styleEditorOptions.util.getStyle(this.options.styleOption)
    this.options.label.innerText = parseInt(100 * this.options.slider.value) + '%'
  },

  /** communicate opacity value */
  _setStyle: function () {
    this.setStyle(this.options.slider.value)
  }
})

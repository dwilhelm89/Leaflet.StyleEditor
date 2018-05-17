L.StyleForm = L.Class.extend({
  initialize: function (options) {
    L.setOptions(this, options)

    this.createMarkerForm()
    this.createGeometryForm()

    this.addDOMEvents()
  },

  addDOMEvents: function () {
    L.DomEvent.addListener(this.options.styleEditorOptions.map, 'click', this.lostFocus, this)
    L.DomEvent.addListener(this.options.styleEditorDiv, 'click', this.lostFocus, this)
  },

  clearForm: function () {
    this.options.styleEditorOptions.markerForm.hide()
    this.options.styleEditorOptions.geometryForm.hide()
  },

  createMarkerForm: function () {
    let markerDiv = L.DomUtil.create(
      'div', 'leaflet-styleeditor-interior-marker', this.options.styleEditorInterior)
    this.options.styleEditorOptions.markerForm.create(markerDiv)
  },

  createGeometryForm: function () {
    let markerDiv = L.DomUtil.create(
      'div', 'leaflet-styleeditor-interior-geometry', this.options.styleEditorInterior)
    this.options.styleEditorOptions.geometryForm.create(markerDiv)
  },

  showMarkerForm: function () {
    this.clearForm()
    this.options.styleEditorOptions.markerForm.show()
  },

  showGeometryForm: function () {
    this.clearForm()
    this.options.styleEditorOptions.geometryForm.show()
  },

  fireChangeEvent: function (element) {
    this.options.styleEditorOptions.util.fireChangedEvent(element)
  },

  lostFocus: function (e) {
    let parent = e.target
    for (let i = 0; i < 10; i++) {
      if (!parent) {
        break
      }
      if (!!parent.className && L.DomUtil.hasClass(parent, 'leaflet-styleeditor-interior')) {
        return
      }
      parent = parent.parentNode
    }

    this.options.styleEditorOptions.markerForm.lostFocus()
    this.options.styleEditorOptions.geometryForm.lostFocus()
  }
})

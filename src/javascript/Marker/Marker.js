/**
 * The Base class for different markers
 */
L.StyleEditor.marker.Marker = L.Marker.extend({
  /** define markerForm used to style the Marker */
  markerForm: L.StyleEditor.forms.MarkerForm,

  options: {
    size: {
      'small': [20, 50],
      'medium': [30, 70],
      'large': [35, 90]
    },

    selectIconSize: [],
    selectIconClass: '',
    iconOptions: {}
  },

  /** set standard icon */
  initialize: function (options) {
    L.setOptions(this, options)
    L.setOptions(this, this.options)

    if (this.options.selectIconClass !== '' && !this.options.selectIconClass.startsWith('leaflet-styleeditor-select-image')) {
      this.options.selectIconClass = 'leaflet-styleeditor-select-image-' + this.options.selectIconClass
    }
  },

  /** create new Marker and show it */
  setNewMarker: function () {
    let newIcon = this._createMarkerIcon()
    let currentElement = this.options.styleEditorOptions.currentElement.target
    currentElement.setIcon(newIcon)
    if (currentElement instanceof L.LayerGroup) {
      currentElement.eachLayer(function (layer) {
        L.DomUtil.addClass(layer.getElement(), 'leaflet-styleeditor-marker-selected')
      })
    } else {
      L.DomUtil.addClass(currentElement.getElement(), 'leaflet-styleeditor-marker-selected')
    }
  },

  /** set styling options */
  setStyle: function (styleOption, value) {
    if (styleOption !== 'icon') {
      styleOption = 'icon' + styleOption.charAt(0).toUpperCase() + styleOption.slice(1)
    }
    this.setIconOptions(styleOption, value)
    this.setNewMarker()
  },

  /** create HTML used to */
  createSelectHTML: function (parentUiElement, iconOptions, icon) {
  },

  /** get the current iconOptions
   *  if not set set them
   */
  getIconOptions: function () {
    if (this.options.styleEditorOptions.currentElement) {
      this.options.iconOptions = this.options.styleEditorOptions.currentElement.target.options.icon.options
    }

    if (Object.keys(this.options.iconOptions).length > 0) {
      return this.options.iconOptions
    }

    this.options.iconOptions.iconColor = this._getDefaultMarkerColor()
    this.options.iconOptions.iconSize = this.options.styleEditorOptions.markerType.options.size.small
    this.options.iconOptions.icon = this.options.styleEditorOptions.util.getDefaultMarkerForColor(this.options.iconOptions.iconColor)

    this.options.iconOptions = this._ensureMarkerIcon(this.options.iconOptions)
    return this.options.iconOptions
  },

  resetIconOptions: function () {
    Object.keys(this.getIconOptions()).forEach((key) =>
      this.setStyle(key, this.options.iconOptions[key])
    )
  },

  setIconOptions: function (key, value) {
    let iconOptions = this.getIconOptions()
    iconOptions[key] = value
  },

  /** call createMarkerIcon with the correct iconOptions */
  _createMarkerIcon: function () {
    let iconOptions = this.getIconOptions()
    return this.createMarkerIcon(iconOptions)
  },

  /** check that the icon set in the iconOptions exists
   *  else set default icon
   */
  _ensureMarkerIcon: function (iconOptions) {
    let markers = this.options.styleEditorOptions.util.getMarkersForColor(iconOptions.iconColor)

    if (markers.includes(iconOptions.icon)) {
      return iconOptions
    }

    iconOptions.icon = this.options.styleEditorOptions.util.getDefaultMarkerForColor(iconOptions.iconColor)
    return iconOptions
  },

  /** return default marker color
   *
   * will return the first of the following which is set and supported by the markers
   * 1. styleEditorOptions.defaultMarkerColor
   * 2. styleEditorOptions.defaultColor
   * 3. first color of the marker's colorRamp which is in the styleeditor.colorRamp
   * 4. first color of the marker's colorRamp
   * */
  _getDefaultMarkerColor: function () {
    let markerTypeColorRamp = this.options.colorRamp
    let generalColorRamp = this.options.styleEditorOptions.colorRamp
    let intersectedColorRamp = []

    if (typeof markerTypeColorRamp !== 'undefined' && markerTypeColorRamp !== null) {
      intersectedColorRamp = markerTypeColorRamp.filter((n) => generalColorRamp.includes(n))
      if (intersectedColorRamp.length === 0) {
        intersectedColorRamp = markerTypeColorRamp
      }
    } else {
      intersectedColorRamp = generalColorRamp
    }

    let color = this.options.styleEditorOptions.defaultMarkerColor
    if (color !== null && !intersectedColorRamp.includes(color)) {
      color = null
    }

    if (color === null) {
      color = this.options.styleEditorOptions.defaultColor
      if (color !== null && !intersectedColorRamp.includes(color)) {
        color = null
      }

      if (color === null) {
        color = intersectedColorRamp[0]
      }
    }
    return this.options.styleEditorOptions.util.rgbToHex(color)
  },

  /** return size as keyword */
  sizeToName: function (size) {
    let keys = Object.keys(this.options.size)

    if (typeof size === 'string') {
      if (size === 's') {
        size = 'small'
      } else if (size === 'm') {
        size = 'medium'
      } else if (size === 'l') {
        size = 'large'
      }

      for (let i = 0; i < keys.length; i++) {
        if (this.options.size[keys[i]] === size) {
          return keys[i]
        }
      }
    }

    let values = Object.values(this.options.size)
    for (let i = 0; i < values.length; i++) {
      if (JSON.stringify(size) === JSON.stringify(values[i])) {
        return keys[i]
      }
    }

    return keys[0]
  },

  /** return size as [x,y] */
  sizeToPixel: function (size) {
    size = this.sizeToName(size)
    return this.options.size[size]
  }
})

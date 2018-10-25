/**
 * Example class showing how to implement new MarkerClasses
 * uses the glyphicons given by bootstrap
 */
L.StyleEditor.marker.GlyphiconMarker = L.StyleEditor.marker.Marker.extend({
  getMarkerHtml: function (size, color, icon) {
    let iconUrl = this._getMarkerUrl(size, color)
    return '<div class="leaflet-styleeditor-marker leaflet-styleeditor-marker-' +
      this.sizeToName(size)[0] + '" ' +
      'style="background-image: url(' + iconUrl + ');">' +
      '<div class="leaflet-styleeditor-fill"></div>' +
      '<i class="glyphicon ' + icon + '"></i>' +
      '<div class="leaflet-styleeditor-fill"></div>' +
      '</div>'
  },

  createMarkerIcon: function (iconOptions) {
    let iconSize = iconOptions.iconSize
    return L.divIcon({
      className: 'leaflet-styleeditor-glyphicon-marker-wrapper',
      html: this.getMarkerHtml(iconSize, iconOptions.iconColor, iconOptions.icon),
      icon: iconOptions.icon,
      iconColor: iconOptions.iconColor,
      iconSize: iconSize,
      iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
      popupAnchor: [0, -iconSize[1] / 2]
    })
  },

  setStyle: function (styleOption, value) {
    if (styleOption !== 'icon') {
      styleOption = 'icon' + styleOption.charAt(0).toUpperCase() + styleOption.slice(1)
    }

    let iconOptions = this.options.iconOptions
    if (iconOptions[styleOption] !== value) {
      iconOptions[styleOption] = value
      this.setNewMarker()
    }
  },

  createSelectHTML: function (parentUiElement, iconOptions, icon) {
    parentUiElement.innerHTML = this.getMarkerHtml('s', iconOptions.iconColor, icon)
  },

  _getMarkerUrlForStyle: function (iconOptions) {
    return this._getMarkerUrl(iconOptions.iconSize, iconOptions.iconColor, iconOptions.icon)
  },

  _getMarkerUrl: function (size, color, icon) {
    size = this.sizeToName(size)[0]
    if (color.indexOf('#') === 0) {
      color = color.replace('#', '')
    } else {
      color = this.options.styleEditorOptions.util.rgbToHex(color, true)
    }
    let url = 'https://api.tiles.mapbox.com/v3/marker/pin-' + size
    return url + '+' + color + '.png'
  },

  options: {
    markers: [
      'glyphicon-plus',
      'glyphicon-asterisk',
      'glyphicon-plus',
      'glyphicon-euro',
      'glyphicon-minus',
      'glyphicon-cloud',
      'glyphicon-envelope',
      'glyphicon-pencil',
      'glyphicon-glass',
      'glyphicon-music',
      'glyphicon-search',
      'glyphicon-heart',
      'glyphicon-star',
      'glyphicon-star-empty',
      'glyphicon-user',
      'glyphicon-film',
      'glyphicon-th-large',
      'glyphicon-th',
      'glyphicon-th-list',
      'glyphicon-ok',
      'glyphicon-remove',
      'glyphicon-zoom-in',
      'glyphicon-zoom-out',
      'glyphicon-off',
      'glyphicon-signal',
      'glyphicon-cog',
      'glyphicon-trash',
      'glyphicon-home',
      'glyphicon-file',
      'glyphicon-time',
      'glyphicon-road',
      'glyphicon-download-alt',
      'glyphicon-download',
      'glyphicon-upload',
      'glyphicon-inbox',
      'glyphicon-play-circle',
      'glyphicon-repeat',
      'glyphicon-refresh',
      'glyphicon-list-alt',
      'glyphicon-lock',
      'glyphicon-flag',
      'glyphicon-headphones',
      'glyphicon-volume-off',
      'glyphicon-volume-down',
      'glyphicon-volume-up',
      'glyphicon-qrcode',
      'glyphicon-barcode',
      'glyphicon-tag',
      'glyphicon-tags',
      'glyphicon-book',
      'glyphicon-bookmark',
      'glyphicon-print',
      'glyphicon-camera',
      'glyphicon-font',
      'glyphicon-bold',
      'glyphicon-italic',
      'glyphicon-text-height',
      'glyphicon-text-width',
      'glyphicon-align-left',
      'glyphicon-align-center',
      'glyphicon-align-right',
      'glyphicon-align-justify',
      'glyphicon-list',
      'glyphicon-indent-left',
      'glyphicon-indent-right',
      'glyphicon-facetime-video',
      'glyphicon-picture',
      'glyphicon-map-marker',
      'glyphicon-adjust',
      'glyphicon-tint',
      'glyphicon-edit',
      'glyphicon-share',
      'glyphicon-check',
      'glyphicon-move',
      'glyphicon-chevron-right',
      'glyphicon-plus-sign',
      'glyphicon-minus-sign',
      'glyphicon-remove-sign',
      'glyphicon-ok-sign',
      'glyphicon-question-sign',
      'glyphicon-info-sign',
      'glyphicon-screenshot',
      'glyphicon-remove-circle',
      'glyphicon-ok-circle',
      'glyphicon-ban-circle',
      'glyphicon-arrow-left',
      'glyphicon-arrow-right',
      'glyphicon-arrow-up',
      'glyphicon-arrow-down',
      'glyphicon-share-alt',
      'glyphicon-resize-full',
      'glyphicon-resize-small',
      'glyphicon-exclamation-sign',
      'glyphicon-gift',
      'glyphicon-leaf',
      'glyphicon-fire',
      'glyphicon-eye-open',
      'glyphicon-eye-close',
      'glyphicon-warning-sign',
      'glyphicon-plane',
      'glyphicon-calendar',
      'glyphicon-random',
      'glyphicon-comment',
      'glyphicon-magnet',
      'glyphicon-chevron-up',
      'glyphicon-chevron-down',
      'glyphicon-retweet',
      'glyphicon-shopping-cart',
      'glyphicon-bullhorn',
      'glyphicon-bell',
      'glyphicon-certificate',
      'glyphicon-thumbs-up',
      'glyphicon-thumbs-down',
      'glyphicon-hand-right',
      'glyphicon-hand-left',
      'glyphicon-hand-up',
      'glyphicon-hand-down',
      'glyphicon-circle-arrow-right',
      'glyphicon-circle-arrow-left',
      'glyphicon-circle-arrow-up',
      'glyphicon-circle-arrow-down',
      'glyphicon-globe',
      'glyphicon-wrench',
      'glyphicon-tasks',
      'glyphicon-filter',
      'glyphicon-briefcase',
      'glyphicon-fullscreen',
      'glyphicon-dashboard',
      'glyphicon-paperclip',
      'glyphicon-heart-empty',
      'glyphicon-link',
      'glyphicon-phone',
      'glyphicon-pushpin',
      'glyphicon-usd'
    ]
  }
})

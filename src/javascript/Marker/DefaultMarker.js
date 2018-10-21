/**
 * The "old" marker style used by L.StyleEditor
 * used the mapbox API v3
 */
L.StyleEditor.marker.DefaultMarker = L.StyleEditor.marker.Marker.extend({

  createMarkerIcon: function (iconOptions, iconClass) {
    if (!iconClass) {
      iconClass = ''
    }

    let iconSize = iconOptions.iconSize
    return new L.Icon({
      iconUrl: this._getMarkerUrlForStyle(iconOptions),
      iconSize: iconOptions.iconSize,
      iconColor: iconOptions.iconColor,
      icon: iconOptions.icon,
      className: iconClass,
      iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
      popupAnchor: [0, -iconSize[1] / 2]
    })
  },

  createSelectHTML: function (parentUiElement, iconOptions, icon) {
    let tmpOptions = {}
    tmpOptions.iconSize = this.options.size.small
    tmpOptions.icon = icon
    tmpOptions.iconColor = iconOptions.iconColor

    parentUiElement.innerHTML = this.createMarkerIcon(tmpOptions, this.options.selectIconClass).createIcon().outerHTML
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
    if (icon) {
      url += '-' + icon
    }
    return url + '+' + color + '.png'
  },

  options: {
    selectIconClass: 'defaultmarker',
    markers: [
      'circle-stroked',
      'circle',
      'square-stroked',
      'square',
      'triangle-stroked', 'triangle',
      'star-stroked',
      'star',
      'cross',
      'marker-stroked',
      'marker',
      'religious-jewish',
      'religious-christian',
      'religious-muslim',
      'cemetery',
      'rocket',
      'airport',
      'heliport',
      'rail',
      'rail-metro',
      'rail-light',
      'bus',
      'fuel',
      'parking',
      'parking-garage',
      'airfield',
      'roadblock',
      'ferry',
      'harbor',
      'bicycle',
      'park',
      'park2',
      'museum',
      'lodging',
      'monument',
      'zoo',
      'garden',
      'campsite',
      'theatre',
      'art-gallery',
      'pitch',
      'soccer',
      'america-football',
      'tennis',
      'basketball',
      'baseball',
      'golf',
      'swimming',
      'cricket',
      'skiing',
      'school',
      'college',
      'library',
      'post',
      'fire-station',
      'town-hall',
      'police',
      'prison',
      'embassy',
      'beer',
      'restaurant',
      'cafe',
      'shop',
      'fast-food',
      'bar',
      'bank',
      'grocery',
      'cinema',
      'pharmacy',
      'hospital',
      'danger',
      'industrial',
      'warehouse',
      'commercial',
      'building',
      'place-of-worship',
      'alcohol-shop',
      'logging',
      'oil-well',
      'slaughterhouse',
      'dam',
      'water',
      'wetland',
      'disability',
      'telephone',
      'emergency-telephone',
      'toilets',
      'waste-basket',
      'music',
      'land-use',
      'city',
      'town',
      'village',
      'farm',
      'bakery',
      'dog-park',
      'lighthouse',
      'clothing-store',
      'polling-place',
      'playground',
      'entrance',
      'heart',
      'london-underground',
      'minefield',
      'rail-underground',
      'rail-above',
      'camera',
      'laundry',
      'car',
      'suitcase',
      'hairdresser',
      'chemist',
      'mobilephone',
      'scooter'
    ]
  }
})

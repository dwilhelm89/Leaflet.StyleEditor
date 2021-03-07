import { Marker, MarkerOptions } from '.'
import { StyleEditor } from '../StyleEditor'

/**
 * The "old" marker style used by L.StyleEditor
 * used the mapbox API v3
 */
export class DefaultMarker extends Marker {

  constructor(styleEdtior: StyleEditor) {
    super(styleEdtior, "defaultmarker")
  }

  createMarkerIcon(iconOptions: MarkerOptions) {
    let iconSize = iconOptions.iconSize
    return new L.Icon({
      iconUrl: this.getMarkerUrlForStyle(iconOptions),
      iconSize: iconOptions.iconSize,
      iconColor: iconOptions.iconColor,
      icon: iconOptions.icon,
      className: this.markerName,
      iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
      popupAnchor: [0, -iconSize[1] / 2]
    })
  }

  getSelectHTML(iconOptions, icon): HTMLElement {
    const tmpOptions = {} as MarkerOptions
    tmpOptions.iconSize = this.size.small
    tmpOptions.icon = icon
    tmpOptions.iconColor = iconOptions.iconColor
    return this.createMarkerIcon(tmpOptions).createIcon()
  }

  private getMarkerUrlForStyle(iconOptions) {
    return this.getMarkerUrl(iconOptions.iconSize, iconOptions.iconColor, iconOptions.icon)
  }

  private getMarkerUrl(size, color, icon) {
    size = this.sizeToName(size)[0]
    if (color.indexOf('#') === 0) {
      color = color.replace('#', '')
    } else {
      color = this.util.rgbToHex(color, true)
    }
    let url = 'https://api.tiles.mapbox.com/v3/marker/pin-' + size
    if (icon) {
      url += '-' + icon
    }
    return url + '+' + color + '.png'
  }

  markers = [
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

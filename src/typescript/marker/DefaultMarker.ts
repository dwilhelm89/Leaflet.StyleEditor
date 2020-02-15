import L from 'leaflet'
import { Marker } from './Marker'
import { IconOptions, Size, Color } from '../types'
import { StyleEditor } from '../StyleEditor'
/**
 * The "old" marker style used by L.StyleEditor
 * used the mapbox API v3
 */
export class DefaultMarker extends Marker {

  constructor() {
    super()
  }

  createMarkerIcon(iconOptions: IconOptions, iconClass?: string) {
    if (!iconClass) {
      iconClass = ''
    }

    let iconSize = iconOptions.iconSize
    return new L.Icon({
      iconUrl: this._getMarkerUrlForStyle(iconOptions),
      iconSize: iconOptions.iconSize.dimen,
      iconColor: iconOptions.iconColor,
      icon: iconOptions.icon,
      className: iconClass,
      iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
      popupAnchor: [0, -iconSize[1] / 2]
    })
  }

  createSelectHTML(parentUiElement, iconOptions, icon) {
    let tmpOptions = new IconOptions(
      Size.Small,
      icon,
      iconOptions.iconColor
    )

    parentUiElement.innerHTML = this.createMarkerIcon(tmpOptions, this.options.selectIconClass).createIcon().outerHTML
  }

  _getMarkerUrlForStyle(iconOptions) {
    return this._getMarkerUrl(iconOptions.iconSize, iconOptions.iconColor, iconOptions.icon)
  }

  _getMarkerUrl(size: Size, color: Color, icon: L.Icon) {
    if (color.indexOf('#') === 0) {
      color = color.replace('#', '')
    } else {
      color = this.util.rgbToHex(color, true)
    }
    let url = 'https://api.tiles.mapbox.com/v3/marker/pin-' + size.name
    if (icon) {
      url += '-' + icon
    }
    return url + '+' + color + '.png'
  }
}
const markers = [
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

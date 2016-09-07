/*
	Maki Markers from mapbox: https://www.mapbox.com/maki/
 */
L.StyleEditor.marker.MakiMarker = L.StyleEditor.marker.Marker.extend({

    createMarkerIcon: function (iconOptions) {
		var iconSize = iconOptions.iconSize;
        return new L.Icon({
            iconUrl: this._getMakiMarkerUrlForStyle(iconOptions),
            iconSize: iconOptions.iconSize,
            iconColor: iconOptions.iconColor,
            icon: iconOptions.icon,
            iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
            popupAnchor: [0, -iconSize[1] / 2]
        });
    },

    createSelectHTML: function (parentUiElement, iconOptions, icon) {
        var iconUrl = this._getMakiMarkerUrl([20,30], iconOptions.iconColor, icon);
        var image = L.DomUtil.create('IMG', '', parentUiElement);
        image.src = iconUrl;
    },

	setStyle: function(styleOption, value) {
		if (styleOption != 'icon') {
			styleOption = 'icon' + styleOption.charAt(0).toUpperCase() + styleOption.slice(1);
		}

		var iconOptions = this.options.iconOptions;
        if(iconOptions[styleOption] != value) {
            iconOptions[styleOption] = value;
            this.setNewMarker();
        }
	},

	_getMakiMarkerUrlForStyle: function(iconOptions) {
		return this._getMakiMarkerUrl(iconOptions.iconSize, iconOptions.iconColor, iconOptions.icon)
	},

	_getMakiMarkerUrl: function(size, color, icon) {
		size = this._size(size);
		if (color.indexOf('#') == 0) {
			color = color.replace('#', '');
		} else {
			color = this.options.styleEditorOptions.util.rgbToHex(color, true);
		}
		var url = 'http://api.tiles.mapbox.com/v3/marker/pin-' + size;
		if(!!icon) {
			url += '-' + icon;
		}
		return url + '+' + color + '.png';
	},

	_size: function (size) {
		if (size[0] >= 30) {
			if(size[0] >= 35) {
				return 'l';
			} else {
				return 'm';
			}
		} else {
			return 's';
		}
	},

    options: {
        markers: [
            'circle-stroked',
            'circle',
            'square-stroked',
            'square',
            'triangle-stroked','triangle',
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
			'scooter']
    }
});

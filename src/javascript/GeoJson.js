import 'leaflet'

export default function overrideToGeoJson () {
  function optionsToGeoJsonProperties (options) {
    const validKeys = [
      'id',
      'label',
      'color',
      'weight',
      'opacity',
      'fillColor',
      'fillOpacity',
      'dashArray',
      'icon.options.iconColor',
      'icon.options.iconSize',
      'icon.options.icon'
    ]

    const properties = {}

    validKeys.forEach((item) => {
      var data = options
      const keys = item.split('.')
      var key

      for (let i = 0; i < keys.length; ++i) {
        key = keys[i]
        if (typeof data !== 'object' || !(key in data)) {
          return
        }
        data = data[key]
      }

      if (data) {
        properties[key] = data
      }
    })

    return properties
  }

  L.Path.addInitHook(function () {
    this.styleEditor = {
      _parent: this,
      toGeoJSON: function () {
        return Object.assign(
          this._parent.toGeoJSON(),
          {properties: optionsToGeoJsonProperties(this._parent.options)}
        )
      },
      fromGeoJson: function (geoJSON) {
        return L.geoJSON(geoJSON, geoJSON.properties)
      }
    }
  })

  L.Marker.addInitHook(function () {
    this.styleEditor = {
      _parent: this,
      toGeoJSON: function () {
        return Object.assign(
          this._parent.toGeoJSON(),
          {properties: optionsToGeoJsonProperties(this._parent.options)}
        )
      },
      fromGeoJson: function (geoJSON) {
        return L.geoJSON(geoJSON, geoJSON.properties)
      }
    }
  })
}

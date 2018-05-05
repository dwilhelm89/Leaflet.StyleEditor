(function (factory, window) {
  // define an AMD module that relies on 'leaflet'
  if (typeof define === 'function' && define.amd) {
    define(['leaflet'], factory)

    // define a Common JS module that relies on 'leaflet'
  } else if (typeof exports === 'object') {
    module.exports = factory(require('leaflet'))
  }

  // attach your plugin to the global 'L' variable
  if (typeof window !== 'undefined' && window.L) {
    window.L.StyleEditor = factory(L)
  }
}(function (L) {
  let StyleEditor = {
    marker: {},
    forms: {},
    formElements: {}
  }
  // implement your plugin

  // return your plugin when you are done
  return StyleEditor
}, window))

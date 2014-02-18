Leaflet.StyleEditor
=============

The [Leaflet](http://leafletjs.com/) StyleEditor allows to edit the style of any feature drawn within Leaflet.
After activating the tool, the features can be edited by simply clicking them within the map.
Current Leaflet version is: 0.7.2.

Check out the [Demo](http://dwilhelm89.github.io/Leaflet.StyleEditor/)!

Usage
-----

```javascript
//Initialize the StyleEditor
var styleEditor = L.control.styleEditor({
    position: "topleft"
});
map.addControl(styleEditor);
````

It is also possible to specify different color ramps or to specify the set of markers:
```javascript
var styleEditor = L.control.styleEditor({
    position: "topleft",
    colorRamp: ['#1abc9c', '#2ecc71', '#3498db'],
    markers: ['circle-stroked', 'circle', 'square-stroked', 'square']
});
map.addControl(styleEditor);
````

TODO
-----
* Create a tooltip: "Click on feature...."
* Better representation of marker icons (img instead of plain text)
* Add listener to Leaflet.draw events
* Line strokes
* Restore default button


Author
-----
Dennis Wilhelm, 2014

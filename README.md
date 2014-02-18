Leaflet.StyleEditor
=============

The [Leaflet](http://leafletjs.com/) StyleEditor allows to edit the style of any feature drawn within Leaflet.
After activating the tool, the features can be edited by simply clicking them within the map.
Current Leaflet version is: 0.7.2.

Check out the [Demo](http://dwilhelm89.github.io/Leaflet.StyleEditor/)!

And another [demo](http://dwilhelm89.github.io/Leaflet.StyleEditor/StyleEditorWithLeafletDraw.html) with [Leaflet.draw](https://github.com/Leaflet/Leaflet.draw).

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

When using with Leaflet.draw you can define if the editor should open when new features are added:
```javascript
var styleEditor = L.control.styleEditor({
    openOnLeafletDraw: true
});
map.addControl(styleEditor);
````




TODO
-----
* Create a tooltip: "Click on feature...."
* Better representation of marker icons (img instead of plain text)
* Line strokes
* "Restore default" button
* Visual highlight of the selected feature


Author
-----
Dennis Wilhelm, 2014

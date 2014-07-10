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


There is also an event to catch style changes:
```javascript
map.on('styleeditor:changed', function(element){
    console.log(element);
});
````

When using with Leaflet.draw you can define if the editor should open when new features are added:
```javascript
var styleEditor = L.control.styleEditor({
    openOnLeafletDraw: true
});
map.addControl(styleEditor);
````

Bower
----
Leaflet.StyleEditor is also a registered package in [Bower](http://bower.io/) (based on [nodejs](http://nodejs.org/)). Integrate the source in your project with:
```
npm install -g bower
bower install Leaflet.StyleEditor
```


TODO
-----
* Better representation of marker icons (img instead of plain text)
* "Restore default" button
* Visual highlight of the selected feature


Author
-----
Dennis Wilhelm, 2014

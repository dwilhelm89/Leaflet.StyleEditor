Leaflet.StyleEditor
=============

The [Leaflet](http://leafletjs.com/) StyleEditor allows to edit the style of any feature drawn within Leaflet.
After activating the tool, the features can be edited by simply clicking them within the map.
Current Leaflet version is: 1.1.0.

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

Development
----

### Marker

All Marker need to extend [L.StyleEditor.marker.Marker](https://github.com/dwilhelm89/Leaflet.StyleEditor/blob/master/src/javascript/Marker/Marker.js).

At a minimum a new Marker implementation **needs to provide these functions**:
* createMarkerIcon(iconOptions)

   Creates an Icon for the given Options (icon, iconColor, iconSize);
   Must return an instance of [L.Icon](http://leafletjs.com/reference-1.2.0.html#icon) (or subclasses)

* createSelectHTML (parentUiElement, iconOptions, icon)

   create an HTML element in the parentUiElement to allow selection of a marker

A new Marker implementation **must define the markers** that can be used in the options.
Either as a list or a dictionary.

If a list is defined all colors will support the same icons.

If a dictionary is defined you may define supported icons for every color individually.
'default' is the fallback in the dictionary. I.e. if a color is not defined specifically the value for the key 'default' will be returned.

The **markerForm** can be individually set.

### Forms

The StyleForm consists of different Forms, which consist of different FormElements.

Forms need to extend [L.StyleEditor.forms.Form](https://github.com/dwilhelm89/Leaflet.StyleEditor/blob/master/src/javascript/Form/Form.js),
every FormElement [L.StyleEditor.formElements.FormElement](https://github.com/dwilhelm89/Leaflet.StyleEditor/blob/master/src/javascript/FormElements/FormElement.js).

Forms consist of FormElements defined in options.formElements as a dictionary mapping the "styleOption" (e.g. icon, color, dash,...) to the FormElement.
A FormElement needs to implement **createContent**, where the select options are created.

**style** and **lostFocus** may be useful as well.

For a simple FormElement see [DashElement](https://github.com/dwilhelm89/Leaflet.StyleEditor/blob/master/src/javascript/FormElements/DashElement.js),
for a more complicated one see [IconElement](https://github.com/dwilhelm89/Leaflet.StyleEditor/blob/master/src/javascript/FormElements/IconElement.js)

TODO
-----
* "Restore default" button
* Visual highlight of the selected feature


Author
-----
Dennis Wilhelm, 2014

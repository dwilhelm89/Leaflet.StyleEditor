Leaflet.StyleEditor
=============
[![Build Status](https://travis-ci.org/dwilhelm89/Leaflet.StyleEditor.svg?branch=master)](https://travis-ci.org/dwilhelm89/Leaflet.StyleEditor)

The [Leaflet](https://leafletjs.com/) StyleEditor allows to edit the style of any feature drawn within Leaflet.
After activating the tool, the features can be edited by simply clicking them within the map.

Check out the [Demo](https://dwilhelm89.github.io/Leaflet.StyleEditor/)!
And another [demo](https://dwilhelm89.github.io/Leaflet.StyleEditor/StyleEditorWithLeafletDraw.html) with [Leaflet.draw](https://github.com/Leaflet/Leaflet.draw).

Usage
-----

```javascript
//Initialize the StyleEditor
map.addControl(L.control.styleEditor())
```

It's now possible to open the StyleEditor programmatically:  
```javascript
let styleEditor = L.control.styleEditor()
let marker = L.marker([51.5, -0.09])
marker.addTo(map)
styleEditor.enable(marker)
```

### Settings

There are a bunch of settings you can define when initializing the styleeditor.

```javascript
//Initialize the StyleEditor
let styleEditor = L.control.styleEditor({
    position: 'topleft',
    colorRamp: ['#1abc9c', '#2ecc71', '#3498db'],
    markers: ['circle-stroked', 'circle', 'square-stroked', 'square']
});
map.addControl(styleEditor)
````

Here is a list of all possible options.
* **[position](https://leafletjs.com/reference-1.3.0.html#control)**  
  Position of the control.  
  example: 'topleft'

* **colorRamp**  
  The colors shown in the ColorElement to set color and fillColor.  
  Markers will possibly overwrite these settings (e.g. if they do not support these colors)  
  example: *['#2c3e50', '#f1c40f', '#e67e22']* 
   
* **markerType**  
  Defines what kind of Markers you want to use.
  [Create your own markerType](#marker)  
  example: *L.StyleEditor.marker.DefaultMarker*

* **markers**  
  The markers that will be selectable in the IconElement. 
  You may define a list (for all colors) or a dictionary.  
  example: *['circle-stroked', 'circle', 'square-stroked', 'square']*  
  example: *{'default': ['circle'], '#f1c40f': ['square']}*

* **defaultMarkerIcon**  
  The default icon selected at the beginning. A string or a dictionary.  
  example: *'circle'*  
  example: *{'default': ['circle'], '#f1c40f': ['square']}*

* **defaultMarkerColor**  
  The default color for markers.  
  example: *'#2c3e50'*

* **openOnLeafletDraw**  
  Define if Leaflet.StyleEditor should automatically show up if an element has been created with
  [Leaflet Draw](https://github.com/Leaflet/Leaflet.draw)
  
* **showTooltip**  
  Define if tooltip indicating to 'choose another element you want to style' should be shown

* **strings**  
  Overwrite the strings *cancel*, *cancelTitle*, *tooltip* and *tooltipNext*

* **geometryForm**  
  You may define another Form to style Geometries. 

* **useGrouping**  
  Define if grouped elements should be styled together.
  
* **styleEditorEventPrefix**  
  Overwrite the prefix for the events. Default is *'styleeditor:'*

* **ignoreLayerTypes**
  An Array indicating which layer types to ignore.
  Possible options are "Marker", "Polyline", "Polygon" and "Rectangle".

* **forms**  
  A dictionary defining when to show what form for which option.  
  example: *{'marker': {'icon': CustomIconFormElement }}*  
  example: *{'geometry': {'color': false, opacity: true }}*  
  example: *{'marker': {'size': () => return {new Date().getSecond()%2 == 0 }}*  
  example: *{'geometry': {'opacity': (elem) => {return elem.target instanceof L.Polygon }}}*  
  example: *{'marker': {'size': {'boolean': () => {return true }, 'formElement': 'L.StyleEditor.formElement.DashElement' }}}*

  Only predefined styleOptions of the Geometry- and Markerform are supported.
  For every styleOption You may provide a boolean, function, [FormElement](https://github.com/dwilhelm89/Leaflet.StyleEditor/blob/master/src/javascript/FormElements/FormElement.js) or dictionary.
 
  If you decide to customize forms **only** the formElements listed will be rendered (and shown).
 
  The **boolean** indicates if a FormElement will be shown. Setting this to false will generate the formElement in the HTML but hide it by adding `leaflet-styleeditor-hidden` class.
  A **function** will be called to determine if a FormElement should be shown. The return value should be a boolean.
  A **FormElement** overrides the predefined FormElement.
  A **dictionary** should contain **boolean** and **formElement** combining obove mentionend options.
  'boolean' can be a function or a boolean.


### Events

Events are prefixed with 'styleeditor:' unless defined differently in the [settings](#settings)
styleEditorEventPrefix.

The following events exist:

event | signification
--- | ---
visible | The editor is visible and ready for user interaction.
hidden | The editor is invisible.
changed | An element has been styled. Element is given by the function.
editing | A layer is being edited. The layer is given by the function.
marker | A marker is being edited. The layer is given by the function.<br>Note: 'editing' will be called beforehand with the same layer.
geometry | A geometry is being edited. The layer is given by the function.<br>Note:'editing' will be called beforehand with the same layer.


```javascript
map.on('styleeditor:changed', function(element){
    console.log(element);
});
````

# Packages
## Bower
Leaflet.StyleEditor is also a registered package in [Bower](https://bower.io/) (based on [nodejs](https://nodejs.org/)). Integrate the source in your project with:
```
npm install -g bower
bower install Leaflet.StyleEditor
```

## npm
Leaflet.StyleEditor is also a registered [node module](https://www.npmjs.com/package/leaflet-styleeditor)
```
npm install leaflet-styleeditor
```

# Leaflet.Draw
When using [Leaflet.draw](https://github.com/Leaflet/Leaflet.draw) most people will want to set `useGrouping: false` in the settings to prevent styling all added
elements.

To let Leaflet.Draw directly show a styled marker set `marker { icon: styleEditor.getDefaultIcon() }` when
initializing Leaflet.Draw.


Development
----

### Marker

All Marker need to extend [L.StyleEditor.marker.Marker](https://github.com/dwilhelm89/Leaflet.StyleEditor/blob/master/src/javascript/Marker/Marker.js).

At a minimum a new Marker implementation **needs to provide these functions**:
* createMarkerIcon(iconOptions)

   Creates an Icon for the given Options (icon, iconColor, iconSize)
   Must return an instance of [L.Icon](https://leafletjs.com/reference-1.2.0.html#icon) (or subclasses)

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

Authors
-----

- Dennis Wilhelm, 2014-2018
- Nikolaus Krismer
- Felix Höffken
- Daniel Berthereau, 2018

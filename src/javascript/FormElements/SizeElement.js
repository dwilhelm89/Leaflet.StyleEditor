L.StyleEditor.formElements.SizeElement = L.StyleEditor.formElements.FormElement.extend({
   createContent: function () {
       var uiElement = this.options.uiElement;
       var select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-small', uiElement);
       L.DomEvent.addListener(select, 'click', function () {
           this.setStyle([20, 50]);
       }, this);

       select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-medium', uiElement);
       L.DomEvent.addListener(select, 'click', function () {
           this.setStyle([30, 70]);
       }, this);

       select = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-large', uiElement);
       L.DomEvent.addListener(select, 'click', function () {
           this.setStyle([35, 90]);
       }, this);
   }
});
import { StyleForm } from './StyleForm';
import { Util } from './Util';
import { StyleEditorOptions, DefaultStyleEditorOptions } from './options';
import { StyleEditorControl } from './StyleEditorControl';
import {
  Layer,
  LeafletMouseEvent,
  Map,
  DomUtil,
  DomEvent,
  LayerGroup,
  Class,
  LayerEvent,
  StyleableLayer,
} from 'leaflet';

// TODO merge STYLEFORM AND STYLE EDITORIMPL? or seperate better?
export class StyleEditor extends Class {
  controls: StyleEditorControl[] = [];
  // TODO event? LAyer?!
  currentLayer?: Layer | LayerGroup;

  options: StyleEditorOptions;
  util: Util;

  map: Map;
  editorUI: HTMLElement;
  interiorEditorUI: HTMLElement;
  tooltipUI: HTMLElement;

  styleForm: StyleForm;

  isEnabled: Boolean = false;

  constructor(
    map: Map,
    options: StyleEditorOptions,
    control?: StyleEditorControl
  ) {
    super();

    this.map = map;

    this.options = { ...DefaultStyleEditorOptions, ...options };
    this.util = new Util(this);

    this.editorUI = this.createEditorUi();
    this.interiorEditorUI = DomUtil.create(
      'div',
      'leaflet-styleeditor-interior',
      this.editorUI
    );

    this.tooltipUI = this.createToolTip();
    this.createEditorHeader();

    this.addEventListeners(this.map);
    this.styleForm = new StyleForm(this);

    if (control) {
      this.addControl(control);
    }
  }

  createToolTip(): HTMLElement {
    const tooltipWrapper = DomUtil.create(
      'div',
      'leaflet-styleeditor-tooltip-wrapper',
      this.map.getContainer()
    );
    const tooltip = DomUtil.create(
      'div',
      'leaflet-styleeditor-tooltip',
      tooltipWrapper
    );
    tooltip.innerHTML = this.options.strings.tooltip;
    return tooltipWrapper;
  }

  private createEditorUi() {
    const editorUI = DomUtil.create(
      'div',
      'leaflet-styleeditor',
      this.map.getContainer()
    );
    DomEvent.disableScrollPropagation(editorUI);
    DomEvent.disableClickPropagation(editorUI);
    return editorUI;
  }

  private createEditorHeader() {
    const styleEditorHeader = DomUtil.create(
      'div',
      'leaflet-styleeditor-header',
      this.editorUI
    );

    const buttonNext = DomUtil.create(
      'button',
      'leaflet-styleeditor-button styleeditor-hideBtn',
      styleEditorHeader
    );
    buttonNext.title = this.options.strings.hide;

    // select next layer to style
    DomEvent.on(buttonNext, 'click', this.onNext, this);

    DomEvent.disableScrollPropagation(buttonNext);
    DomEvent.disableClickPropagation(buttonNext);
  }

  addEventListeners(map: Map) {
    this.options.layerAddEvents.forEach((event) => {
      map.on(event, this.onLayerAddEvent, this);
    });
  }

  onLayerAddEvent(event: LayerEvent) {
    this.enable();
    this.addClickEvent(event.layer);
    this.showEditor(event.layer);
  }

  onNext(event: Event) {
    this.hideEditor();
    this.showTooltip();
    event.stopPropagation();
  }

  removeIndicators() {
    const children = this.map.getPanes().markerPane.children;
    for (let index = 0; index < children.length; index++) {
      const element = children[index] as HTMLEmbedElement;
      DomUtil.removeClass(element, 'leaflet-styleeditor-marker-selected');
    }
  }

  addClickEvents() {
    // TODO add to newly added layers?!
    this.map.eachLayer(this.addClickEvent, this);
  }

  addClickEvent(layer: Layer) {
    if (this.layerIsIgnored(layer)) {
      return;
    }
    if (this.options.useGrouping && !(layer instanceof LayerGroup)) {
      return;
    }
    if (!this.options.useGrouping && layer instanceof LayerGroup) {
      return;
    }

    layer.on('click', this.onLayerClick, this);
  }

  removeClickEvents() {
    this.map.eachLayer(this.removeClickEvent, this);
  }

  removeClickEvent(layer: Layer) {
    layer.off('click', this.onLayerClick, this);
  }

  private layerIsIgnored(layer: Layer) {
    if (layer === undefined) {
      return false;
    }
    return this.options.ignoreLayerTypes.some(
      (layerType) =>
        layer.styleEditor &&
        layer.styleEditor.type.toUpperCase() === layerType.toUpperCase()
    );
  }

  hideEditor() {
    DomUtil.removeClass(this.editorUI, 'editor-enabled');
    this.removeIndicators();
    this.util.fireEvent('hidden');
  }

  onLayerClick(event: LeafletMouseEvent) {
    console.log(event);
    this.showEditor(event.target);
  }

  showEditor(layer?: Layer) {
    if (layer) {
      this.currentLayer = layer;
    }
    if (this.currentLayer) {
      DomUtil.addClass(this.editorUI, 'editor-enabled');
    }
    this.util.fireEvent('visible');
    this.styleForm.show();
  }

  showTooltip() {
    DomUtil.removeClass(this.tooltipUI, 'leaflet-styleeditor-hidden');
  }

  hideTooltip() {
    DomUtil.addClass(this.tooltipUI, 'leaflet-styleeditor-hidden');
  }

  enable() {
    if (!this.isEnabled) {
      this.isEnabled = true;
      this.controls.forEach((control) => control.enable());
      this.addClickEvents();
      this.showTooltip();
      this.showEditor();
    }
  }

  disable() {
    if (this.isEnabled) {
      this.controls.forEach((control) => control.disable());
      this.removeClickEvents();
      this.hideTooltip();
      this.hideEditor();
      this.isEnabled = false;
    }
  }

  // get current layers
  getCurrentLayers(): StyleableLayer[] {
    if (!this.currentLayer) {
      return [];
    } else if (
      this.options.useGrouping &&
      this.currentLayer instanceof LayerGroup
    ) {
      return this.currentLayer.getLayers();
    } else {
      return [this.currentLayer];
    }
  }

  addControl(control: StyleEditorControl): number {
    return this.controls.push(control);
  }
}

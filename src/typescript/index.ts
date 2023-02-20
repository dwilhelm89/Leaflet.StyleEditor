import * as SE from './StyleEditor';
import { StyleEditorControl } from './StyleEditorControl';
import { StyleEditorOptions } from './options';
import * as SEForm from './forms';
import * as SEFormElements from './formElements';
import * as SEMarker from './marker';

declare module 'leaflet' {
  type StyleEditor = SE.StyleEditor;
  var StyleEditor: typeof SE.StyleEditor;
  var styleEditor: (
    ...args: ConstructorParameters<typeof StyleEditor>
  ) => StyleEditor;

  var asdf: string;

  namespace StyleEditorClasses {
    namespace Forms {
      type Form = SEForm.Form;
      var Form: typeof SEForm.Form;

      type MarkerForm = SEForm.MarkerForm;
      var MarkerForm: typeof SEForm.MarkerForm;
      type PathForm = SEForm.PathForm;
      var PathForm: typeof SEForm.PathForm;

      type FillableForm = SEForm.FillableForm;
      var FillableForm: typeof SEForm.FillableForm;
    }

    module FormElements {
      type ColorElement = SEFormElements.ColorElement;
      var ColorElement: typeof SEFormElements.ColorElement;

      type DashElement = SEFormElements.DashElement;
      var DashElement: typeof SEFormElements.DashElement;

      type FormElement = SEFormElements.FormElement;
      var FormElement: typeof SEFormElements.FormElement;

      type IconElement = SEFormElements.IconElement;
      var IconElement: typeof SEFormElements.IconElement;

      type OpacityElement = SEFormElements.OpacityElement;
      var OpacityElement: typeof SEFormElements.OpacityElement;

      type PopupContentElement = SEFormElements.PopupContentElement;
      var PopupContentElement: typeof SEFormElements.PopupContentElement;

      type SizeElement = SEFormElements.SizeElement;
      var SizeElement: typeof SEFormElements.SizeElement;

      type WeightElement = SEFormElements.WeightElement;
      var WeightElement: typeof SEFormElements.WeightElement;
    }

    module Marker {
      type DefaultMarker = SEMarker.DefaultMarker;
      var DefaultMarker: typeof SEMarker.DefaultMarker;

      type Marker = SEMarker.Marker;
      var Marker: typeof SEMarker.Marker;
    }
  }

  module Control {
    type StyleEditor = StyleEditorControl;
    var StyleEditor: typeof StyleEditorControl;
  }

  module control {
    var styleEditor: (options: StyleEditorOptions) => StyleEditorControl;
  }

  module Marker {
    type DefaultMarker = SEMarker.DefaultMarker;
    var DefaultMarker: typeof SEMarker.DefaultMarker;

    type Marker = SEMarker.Marker;
    var Marker: typeof SEMarker.Marker;
  }
  interface StyleableLayer extends Layer {
    options?;
  }

  export namespace DomUtil {
    /**
     * Get Element by its ID or with the given HTML-Element
     */
    function get(element: string | HTMLElement): HTMLElement | null;
    function getStyle(el: HTMLElement, styleAttrib: string): string | null;
    /**
     * Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
     * @param tagName The name of the tag to create (for example: `div` or `canvas`).
     * @param className The class to set on the created element.
     * @param container The container to append the created element to.
     */
    function create<T extends keyof HTMLElementTagNameMap>(
      tagName: T,
      className?: string,
      container?: HTMLElement
    ): HTMLElementTagNameMap[T];
    function create(
      tagName: string,
      className?: string,
      container?: HTMLElement
    ): HTMLElement;
    function remove(el: HTMLElement): void;
    function empty(el: HTMLElement): void;
    function toFront(el: HTMLElement): void;
    function toBack(el: HTMLElement): void;
    function hasClass(el: HTMLElement, name: string): boolean;
    function addClass(el: HTMLElement, name: string): void;
    function removeClass(el: HTMLElement, name: string): void;
    function setClass(el: HTMLElement, name: string): void;
    function getClass(el: HTMLElement): string;
    function setOpacity(el: HTMLElement, opacity: number): void;
    function testProp(props: string[]): string | false;
    function setTransform(el: HTMLElement, offset: Point, scale?: number): void;
    function setPosition(el: HTMLElement, position: Point): void;
    function getPosition(el: HTMLElement): Point;
    function getScale(el: HTMLElement): {
      x: number;
      y: number;
      boundingClientRect: DOMRect;
    };
    function getSizedParentNode(el: HTMLElement): HTMLElement;
    function disableTextSelection(): void;
    function enableTextSelection(): void;
    function disableImageDrag(): void;
    function enableImageDrag(): void;
    function preventOutline(el: HTMLElement): void;
    function restoreOutline(): void;
  }

  export namespace DomEvent {
    type EventHandlerFn = (event: Event) => void;

    type PropagableEvent =
      | LeafletMouseEvent
      | LeafletKeyboardEvent
      | LeafletEvent
      | Event;

    function on(
      el: HTMLElement,
      types: string,
      fn: EventHandlerFn,
      context?: any
    ): typeof L.DomEvent;

    function on(
      el: HTMLElement,
      eventMap: { [eventName: string]: EventHandlerFn },
      context?: any
    ): typeof L.DomEvent;

    // tslint:disable:unified-signatures
    function off(el: HTMLElement): typeof L.DomEvent;

    function off(
      el: HTMLElement,
      types: string,
      fn: EventHandlerFn,
      context?: any
    ): typeof L.DomEvent;

    function off(
      el: HTMLElement,
      eventMap: { [eventName: string]: EventHandlerFn },
      context?: any
    ): typeof L.DomEvent;
    // tslint:enable:unified-signatures

    function stopPropagation(ev: PropagableEvent): typeof L.DomEvent;

    function disableScrollPropagation(el: HTMLElement): typeof L.DomEvent;

    function disableClickPropagation(el: HTMLElement): typeof L.DomEvent;

    function preventDefault(ev: Event): typeof L.DomEvent;

    function stop(ev: PropagableEvent): typeof L.DomEvent;

    function getMousePosition(ev: MouseEvent, container?: HTMLElement): Point;

    function getWheelDelta(ev: Event): number;

    function addListener(
      el: HTMLElement,
      types: string,
      fn: EventHandlerFn,
      context?: any
    ): typeof L.DomEvent;

    function addListener(
      el: HTMLElement,
      eventMap: { [eventName: string]: EventHandlerFn },
      context?: any
    ): typeof L.DomEvent;

    function removeListener(
      el: HTMLElement,
      types: string,
      fn: EventHandlerFn,
      context?: any
    ): typeof L.DomEvent;

    function removeListener(
      el: HTMLElement,
      eventMap: { [eventName: string]: EventHandlerFn },
      context?: any
    ): typeof L.DomEvent;

    function getPropagationPath(ev: Event): HTMLElement[];
  }
}

L.StyleEditor = SE.StyleEditor;
L.styleEditor = function (map: L.Map, options: StyleEditorOptions) {
  return new SE.StyleEditor(map, options);
};

L.Control.StyleEditor = StyleEditorControl;
L.control.styleEditor = function (options: StyleEditorOptions) {
  return new StyleEditorControl(options);
};

L.StyleEditorClasses = {
  Forms: {
    Form: SEForm.Form,
    MarkerForm: SEForm.MarkerForm,
    PathForm: SEForm.PathForm,
    FillableForm: SEForm.FillableForm,
  },
  FormElements: {
    ColorElement: SEFormElements.ColorElement,
    DashElement: SEFormElements.DashElement,
    FormElement: SEFormElements.FormElement,
    IconElement: SEFormElements.IconElement,
    OpacityElement: SEFormElements.OpacityElement,
    PopupContentElement: SEFormElements.PopupContentElement,
    SizeElement: SEFormElements.SizeElement,
    WeightElement: SEFormElements.WeightElement,
  },
  Marker: {
    Marker: SEMarker.Marker,
    DefaultMarker: SEMarker.DefaultMarker,
  },
};

L.asdf = 'qwer';

export default L;

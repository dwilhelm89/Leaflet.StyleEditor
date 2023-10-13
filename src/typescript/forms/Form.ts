import { FormElement, FormElementClass, } from '../formElements';
import { StyleEditorClass } from '../StyleEditorClass';
import { StyleEditor } from '../StyleEditor';
import { DomUtil, Layer, } from 'leaflet';
import { StyleEditorMarker } from '../marker/Icon';

/**
 * Forms consist of FormElements and are shown in the StyleForm
 * There exists a MarkerForm to modify Markers and a GeometryForm to modify Geometries (i.e. rectangles...)
 * Style options based on:
 *     - path: https://leafletjs.com/reference.html#path-options
 *     - icon: https://leafletjs.com/reference.html#icon
 */
export class Form extends StyleEditorClass {
  private parentUiElement: HTMLElement;

  constructor(styleEditor: StyleEditor, parentUiElement: HTMLElement) {
    super(styleEditor);
    this.parentUiElement = parentUiElement;
  }

  private uiElement: HTMLElement;
  protected initializedElements: Record<string, FormElement> = {};

  /** create every FormElement in the parentUiElement */
  create(): void {
    this.uiElement = DomUtil.create('div', '', this.parentUiElement);

    this.styleEditor.options.marker.forEach((marker: StyleEditorMarker) => {
      this.initializedElements['icon'] = new marker.iconFormElement(this, this.uiElement, 'icon')
    })

    this.styleEditor.options.formElements.forEach(
      ([styleOption, formElementClass, whenToShow] : [string, FormElementClass, (layer: Layer) => boolean]) => {
        this.initializedElements[styleOption] = new formElementClass(this.styleEditor, styleOption, whenToShow)
      }
    )
  }

  /** hide the Form */
  public hide(): void {
    this.util.hideElement(this.uiElement);
  }

  /** make FormElements and Form visible */
  public show(): void {
    this.showForm();
    this.style();
  }

  /** make the Form visible */
  protected showForm() {
    this.util.showElement(this.uiElement);
  }

  /** inform FormElements the selected style has changed, so they can adapt */
  // TODO hand over layeras as param 
  public style(layer?: Layer): void {
    this.uiElement.replaceChildren()
    for (const key in this.initializedElements) {
      const formElement: FormElement = this.initializedElements[key] 
      if(formElement.showForLayer(layer ?? this.styleEditor.currentLayer)) {
        this.uiElement.appendChild(formElement.getHTML(layer ?? this.styleEditor.currentLayer))
      }
    }
  }

  /** inform Form it lost it's focus */
  protected lostFocus(): void {
    for (const key in this.initializedElements) {
      this.initializedElements[key].lostFocus();
    }
  }

  /**
   * get Leaflet.StyleEditor standard FormElement class for given styleOption
   * @param {*} styleOption, the styleOption to get the standard class for
   */
  private getFormElementStandardClass(styleOption: string): FormElementClass {
    return this.formElements[styleOption];
  }

}

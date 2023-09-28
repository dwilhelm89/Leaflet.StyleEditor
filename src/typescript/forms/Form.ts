import { FormElement, FormElementClass } from '../formElements';
import { StyleEditorClass } from '../StyleEditorClass';
import { StyleEditor } from '../StyleEditor';
import { DomUtil, Layer } from 'leaflet';

export type FormClass = new (...args: any[]) => Form;

/**
 * Forms consist of FormElements and are shown in the StyleForm
 * There exists a MarkerForm to modify Markers and a GeometryForm to modify Geometries (i.e. rectangles...)
 * Style options based on:
 *     - path: https://leafletjs.com/reference.html#path-options
 *     - icon: https://leafletjs.com/reference.html#icon
 */
export abstract class Form extends StyleEditorClass {
  private parentUiElement: HTMLElement;

  constructor(styleEditor: StyleEditor, parentUiElement: HTMLElement) {
    super(styleEditor);
    this.parentUiElement = parentUiElement;
  }

  protected formElements: Record<string, FormElementClass>;

  private uiElement: HTMLElement;
  protected initializedElements: Record<string, FormElement> = {};

  /** create every FormElement in the parentUiElement */
  create(): void {
    this.uiElement = DomUtil.create('div', '', this.parentUiElement);
    for (const key in this.formElements) {
      const formElement = this.getFormElementClass(key);
      if (formElement) {
        this.initializedElements[key] = new formElement(
          this,
          this.uiElement,
          key
        );
      }
    }
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
  public style(): void {
    for (const key in this.initializedElements) {
      this.initializedElements[key].style();
    }
  }

  /** inform Form it lost it's focus */
  protected lostFocus(): void {
    for (const key in this.initializedElements) {
      this.initializedElements[key].lostFocus();
    }
  }

  /**
   * get the Class of the Formelement to instanciate
   * @param {*} styleOption, the styleOption to get the FormElement for
   */
  private getFormElementClass(
    styleOption: string
  ): FormElementClass | undefined {
    const formElementKeys = Object.keys(this.formElements);

    if (formElementKeys.includes(styleOption)) {
      const FormElement = this.formElements[styleOption];

      if (FormElement) {
        // may be a dictionary
        if (typeof FormElement === 'boolean') {
          return this.getFormElementStandardClass(styleOption);
        }
        /* TODO: presumably not necesarry
        if ('formElement' in FormElement && 'boolean' in FormElement) {
          FormElement = FormElement['formElement']
        }*/
      }
      // if nothing works return it
      return this.getFormElementStandardClass(styleOption);
    }

    return undefined;
  }

  /**
   * get Leaflet.StyleEditor standard FormElement class for given styleOption
   * @param {*} styleOption, the styleOption to get the standard class for
   */
  private getFormElementStandardClass(styleOption: string): FormElementClass {
    return this.formElements[styleOption];
  }

  abstract whenToShow(layers: Layer[]): Boolean;
}

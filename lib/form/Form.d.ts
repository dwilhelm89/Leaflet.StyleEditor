import Util from '../Util';
export declare class FormOptions {
    parentUiElement: any;
    initializedElements: any[];
    formOptionKey: string;
    formElements: any;
}
/**
 * Forms consist of FormElements and are shown in the StyleForm
 * There exists a MarkerForm to modify Markers and a GeometryForm to modify Geometries (i.e. rectangles...)
 * Style options based on:
 *     - path: https://leafletjs.com/reference.html#path-options
 *     - icon: https://leafletjs.com/reference.html#icon
 */
export default class Form {
    options: FormOptions;
    protected util: Util;
    /** create every FormElement in the parentUiElement */
    create(parentUiElement: any): void;
    /** hide the Form including its FormElements */
    hide(): void;
    /** hide the FormElements */
    hideFormElements(): void;
    /** hide the Form */
    hideForm(): void;
    /** make FormElements and Form visible */
    show(): void;
    /** hook which is called at the beginning of the show function */
    preShow(): void;
    /** make every FormElement visible */
    showFormElements(): void;
    /** make the Form visible */
    showForm(): void;
    /** inform FormElements the selected style has changed, so they can adapt */
    style(): void;
    /** inform Form it lost it's focus */
    lostFocus(): void;
    /**
     * @returns a Boolean indicating if the @param formElement should be shown
     */
    showFormElement(formElement: any): void;
    /**
     * get the currently used formElements
     * either standard or the ones provided while instanciation
     */
    getFormElements(): any;
    /**
     * get the Class of the Formelement to instanciate
     * @param {*} styleOption, the styleOption to get the FormElement for
     */
    getFormElementClass(styleOption: any): any;
    /**
     * check whether a FormElement should be shown
     * @param {*} styleOption, the styleOption to check
     */
    showFormElementForStyleOption(styleOption: any): any;
    /**
     * get Leaflet.StyleEditor standard FormElement class for given styleOption
     * @param {*} styleOption, the styleOption to get the standard class for
     */
    getFormElementStandardClass(styleOption: any): any;
}

import FormElement from './FormElement';
import FormElementOptions from './FormElementOptions';
interface OpacityElementOptions extends FormElementOptions {
    label: any;
    slider: HTMLInputElement;
}
/**
 * FormElement used to style opacity
 */
export default class OpacityFormElement extends FormElement {
    options: OpacityElementOptions;
    /** create number input box */
    createContent(): void;
    /** set correct value */
    style(): void;
    /** communicate opacity value */
    _setStyle(): void;
}
export {};

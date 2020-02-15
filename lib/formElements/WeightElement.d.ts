import FormElement from './FormElement';
import FormElementOptions from './FormElementOptions';
interface WeightElementOptions extends FormElementOptions {
    label: any;
    weight: HTMLInputElement;
}
/**
 * FormElement used to style weight
 */
export default class WeigthElement extends FormElement {
    options: WeightElementOptions;
    /** create number input box */
    createContent(): void;
    /** set correct value */
    style(): void;
    /** communicate weight value */
    _setStyle(): void;
}
export {};

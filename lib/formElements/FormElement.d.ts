import FormElementOptions from './FormElementOptions';
import Util from '../Util';
/** FormElements are part of a Form for a specific styling option (i.e. color) */
export default class FormElement {
    protected util: Util;
    options: FormElementOptions;
    /** create uiElement and content */
    create(parentUiElement: any): void;
    /** create title */
    createTitle(): void;
    /** create content (where the actual modification takes place) */
    createContent(): void;
    /** style the FormElement and show it */
    show(currentElement: any): void;
    /** show the FormElement */
    showForm(): void;
    /** hide the FormElement */
    hide(): void;
    /** style the FormElement */
    style(currentElement: any): void;
    /** what to do when lost focus */
    lostFocus(): void;
    /** set style - used when the FormElement wants to change the styling option */
    setStyle(value: any): void;
}

import FormElement from './FormElement';
import FormElementOptions from './FormElementOptions';
interface PoppContentElementOptions extends FormElementOptions {
    title: string;
    uiElement: any;
    descTextAreaField: any;
}
/**
 * FormElement used for adding a description to marker or geometry.
 */
export default class PopupContentElement extends FormElement {
    options: PoppContentElementOptions;
    createContent(): void;
    /** set correct value */
    style(): void;
    /** communicate popupContent value */
    _setStyle(): void;
}
export {};

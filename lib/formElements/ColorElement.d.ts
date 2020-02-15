import FormElement from './FormElement';
import FormElementOptions from './FormElementOptions';
interface ColorElementOptions extends FormElementOptions {
    uiElement: any;
    colorPickerDiv: any;
    colorRamp: any;
}
/**
 *  FormElement used to style the color
 */
export default class ColorElement extends FormElement {
    options: ColorElementOptions;
    createContent(): void;
    /** create of get already created colorRamp */
    _getColorRamp(): any;
    /** define what to do when color is changed */
    _setSelectCallback(color: any): void;
    /** set style for chosen color */
    _selectColor(e: any): void;
}
export {};

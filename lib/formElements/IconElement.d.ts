import FormElement from './FormElement';
import FormElementOptions from './FormElementOptions';
import { Marker } from '../marker/Marker';
interface IconElementOptions extends FormElementOptions {
    selectBoxImage: any;
    selectOptions: any;
    markerType: Marker;
}
/**
 * FormElement used for styling the icon
 */
export default class IconElement extends FormElement {
    options: IconElementOptions;
    _selectOptionWrapperClasses: string;
    _selectOptionClasses: string;
    /** create the icon selectBoxes */
    createContent(): void;
    /** show the correct icon in the correct color if the icon or color changed */
    style(currentElement: any): void;
    /** if lost focus hide potentially open SelectOption */
    lostFocus(): void;
    /** create image container that hides/shows the iconSelectBox */
    _createSelectInputImage(parentUiElement: any): HTMLElement;
    /** create appropriate image for color and icon */
    _styleSelectInputImage(currentElement: any, image: any, icon: any, color: any): void;
    /** create the selectBox with the icons in the correct color */
    _createColorSelect(color: any): void;
    /** show/hide iconSelectBox */
    _toggleSelectInput(e: any): void;
    /** called when user selects a marker */
    _selectMarker(e: any): void;
    /** helper function to return attribute value of target */
    _getValue(target: any): any;
    /** return correct selectBox depending on which color is currently chosen */
    _getCurrentColorElement(color: any): any;
    /** hide open SelectOption */
    _hideSelectOptions(): void;
}
export {};

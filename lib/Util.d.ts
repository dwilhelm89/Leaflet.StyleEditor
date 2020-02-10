import { StyleEditor } from './Leaflet.StyleEditor';
/**
 * Helper functions used throuhgout the project
 */
export default class Util {
    private static instance;
    private styleEditor;
    private constructor();
    static createInstance(styleEditor: StyleEditor): void;
    static getInstance(): Util;
    fireEvent(eventName: string, element: any): void;
    /** fire an event if Leaflet.StyleEditor changed something */
    fireChangeEvent(element: any): void;
    /** hide the given element */
    hideElement(element: HTMLElement): void;
    /** convert rgb to hex of a color
     * @param {string} rgb - rgb representation of the color
     * @param {boolean} noHash - define if return value should not include hash
     */
    rgbToHex(rgb: string, noHash?: Boolean): any;
    /** get element selected to be styled */
    getCurrentElement(): any;
    /** set which element is selected to be styled */
    setCurrentElement(currentElement: any): void;
    /** does current element have the fill option */
    fillCurrentElement(): any;
    /** get current style of current element */
    getStyle(option: any): any;
    /** set new style to current element */
    setStyle(option: any, value: any): void;
    /** show hidden element */
    showElement(element: any): void;
    /** helper function to convert color to hex */
    _componentToHex(color: any): any;
    /** get the markers for a specific color **/
    getMarkersForColor(color: any): string[];
    /** get default marker for specific color **/
    getDefaultMarkerForColor(color: any): any;
}

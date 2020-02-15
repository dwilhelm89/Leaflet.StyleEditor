import 'leaflet';
import Form, { FormOptions } from './Form';
import FormElement from '../formElements/FormElement';
declare class GeometryFormOptions extends FormOptions {
    formOptionKey: string;
    formElements: Record<string, FormElement>;
    constructor();
}
/** Form used to enable modification of a Geometry */
export default class GeometryForm extends Form {
    options: GeometryFormOptions;
    /** show the fillOptions (fillColor and fillOpacity) only if the Element can be filled */
    showFormElements(): void;
}
export {};

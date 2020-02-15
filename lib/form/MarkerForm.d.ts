import { Form } from '.';
import FormElement from '../formElements/FormElement';
/** Form used to enable modification of a Geometry */
export default class MarkerForm extends Form {
    formOptionKey: string;
    formElements: Record<string, FormElement>;
}

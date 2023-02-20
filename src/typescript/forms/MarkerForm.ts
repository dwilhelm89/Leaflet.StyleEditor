import { Form } from '.';
import {
  ColorElement,
  FormElementClass,
  SizeElement,
  PopupContentElement,
  IconElement,
} from '../formElements';
import { StyleableLayer, Marker as LMarker } from 'leaflet';

/** Form used to enable modification of a Geometry */
export class MarkerForm extends Form {

  protected formElements: Record<string, FormElementClass> = {
    icon: IconElement,
    color: ColorElement,
    size: SizeElement,
    popupContent: PopupContentElement,
  };

  public whenToShow(layers: StyleableLayer[]): Boolean {
    return layers.some((layer) => layer instanceof LMarker);
  }

}

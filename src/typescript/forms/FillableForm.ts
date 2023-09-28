import { Form } from '.';
import {
  ColorElement,
  OpacityElement,
  WeightElement,
  DashElement,
  PopupContentElement,
} from '../formElements';
import { Polygon, CircleMarker, Layer } from 'leaflet';

/** Form used to enable modification of a Geometry */
export class FillableForm extends Form {
  protected override formElements = {
    color: ColorElement,
    opacity: OpacityElement,
    weight: WeightElement,
    dashArray: DashElement,
    fillColor: ColorElement,
    fillOpacity: OpacityElement,
    popupContent: PopupContentElement,
  };

  public override whenToShow(layers: Layer[]): Boolean {
    return layers.some(
      (layer) => layer instanceof Polygon || layer instanceof CircleMarker
    );
  }
}

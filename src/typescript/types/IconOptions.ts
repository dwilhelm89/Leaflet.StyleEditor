import { Color, Size } from '.'
import { PointExpression, Icon } from 'leaflet'

export class IconOptions {
  constructor(
    public icon: Icon,
    public iconColor: Color,
    public iconSize: PointExpression
  ) { }
}

import { Color, Size } from '../types'
import { PointExpression, Icon } from 'leaflet'

export class IconOptions {
  constructor(
    public iconSize: Size, 
    public icon: Icon,
    public iconColor: Color
  ) { }
}

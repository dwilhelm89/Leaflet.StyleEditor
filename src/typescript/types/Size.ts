import { PointExpression } from "leaflet";

export class Size {
  constructor(
    public name: "small" | "medium" | "large",
    public dimen: PointExpression) {
  }

  public static Small = new Size('small', [20, 50])
    'medium': [30, 70],
    'large': [35, 90]
  }

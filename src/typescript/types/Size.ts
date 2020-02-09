import { PointExpression } from "leaflet";

export class Size {
  private constructor(
    public name: "small" | "medium" | "large",
    public dimen: PointExpression) {
  }

  public static Small = new Size('small', [20, 50])
  public static Medium = new Size('medium', [30, 70])
  public static Large = new Size('large', [35, 90])
}

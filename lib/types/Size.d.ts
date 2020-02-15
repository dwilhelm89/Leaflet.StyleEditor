import { PointExpression } from "leaflet";
export declare class Size {
    name: "small" | "medium" | "large";
    dimen: PointExpression;
    private constructor();
    static Small: Size;
    static Medium: Size;
    static Large: Size;
}

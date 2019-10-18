export interface NgStaticGridItemModel {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface NgStaticGridModel {
    rows: number;
    columns: number;
    width: string;
    height: string;
    items: Map<string, NgStaticGridItemModel>;
}

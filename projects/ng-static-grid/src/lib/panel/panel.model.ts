import { NgStaticGridItemModel } from '../item/item.model';
export interface NgStaticGridModel {
    rows: number;
    columns: number;
    width: string;
    height: string;
    items: Map<string, NgStaticGridItemModel>;
}

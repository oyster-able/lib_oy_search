import { FilterQuery, Model } from "mongoose";
import { DocumentPageModel } from "./document-page.repository";
import { Operator, Page, Search } from "../param/PageParameter";
export declare class DocumentSearchRepository<T, K extends keyof T> extends DocumentPageModel<T, K> {
    protected search(search: Search, model: Model<T>): Promise<Page<T>>;
    protected searchQueryBuild(search: Search): FilterQuery<T>;
    protected operatorSwitch(operator: Operator, property: K, value: T[K], filter: FilterQuery<T>): FilterQuery<T>;
}

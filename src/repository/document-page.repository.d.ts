import { QueryOptions } from "mongoose";
import { Search } from "../param/PageParameter";
export declare class DocumentPageModel<T, K extends keyof T> {
    protected sortQueryBuild(search: Search, queryOptions: QueryOptions<T>): QueryOptions<T>;
    protected pageQueryBuild(search: Search, queryOptions: QueryOptions<T>): QueryOptions<T>;
}

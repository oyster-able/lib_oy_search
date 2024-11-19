import { ClassConstuctor } from "../interceptors/serialize.interceptor";
declare class Pageable {
    constructor(page: number, size: number);
    page: number;
    size: number;
}
declare class Options {
    constructor(strict?: boolean);
    strict?: boolean;
}
declare class Page<T> {
    constructor(content: T[], pageable: Pageable, total: number);
    private content;
    private readonly pageable;
    private readonly total;
    setContent(data: T[]): Page<T>;
    getContent(): T[];
    serializeContent(dto: ClassConstuctor): Page<T>;
    getPage(): number;
    getSize(): number;
    getTotalElements(): number;
    getTotalPage(): number;
    hasNext(): boolean;
    isLast(): boolean;
    map(fun: (data: any) => any): Page<any>;
    mapAsycParallel(fun: (data: any) => any, options: PromiseType): Promise<Page<any>>;
}
export declare enum Sort {
    ASC = "ASC",
    DESC = "DESC"
}
declare enum Operator {
    EQ = "eq",
    NE = "ne",
    GT = "gt",
    GTE = "gte",
    LT = "lt",
    LTE = "lte",
    IN = "in",
    INS = "ins",
    NIN = "nin",
    LIKE = "like",
    BT = "bt",
    ANY = "any"
}
declare class Searchable {
    constructor(property: string, value: string | string[], operator: Operator);
    operator: Operator;
    value: string | string[];
    property: string;
}
declare class Sortable {
    constructor(property: string, direction: Sort);
    property: string;
    direction: Sort;
}
declare class Search {
    constructor(searchable: Searchable[], sortable: Sortable[], pageable: Pageable);
    readonly searchable: Searchable[];
    readonly sortable: Sortable[];
    readonly startDate?: Date;
    readonly endDate?: Date;
    readonly pageable: Pageable;
}
declare class DocumentSearch {
    constructor(searchable: Searchable[], sortable: Sortable[], pageable: Pageable, options?: Options);
    readonly searchable: Searchable[];
    readonly sortable: Sortable[];
    readonly startDate?: Date;
    readonly endDate?: Date;
    readonly pageable: Pageable;
}
export declare enum PromiseType {
    ALL = "all",
    ALL_SETTLED = "allSettled"
}
export declare enum DocumentPage {
    INIT_PAGE = 1,
    INIT_PAGE_SIZE = 10
}
export { Page, Pageable, Searchable, Sortable, Search, DocumentSearch, Operator, };

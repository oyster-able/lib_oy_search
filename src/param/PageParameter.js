"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operator = exports.DocumentSearch = exports.Search = exports.Sortable = exports.Searchable = exports.Pageable = exports.Page = exports.DocumentPage = exports.PromiseType = exports.Sort = void 0;
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
class Pageable {
    constructor(page, size) {
        this.page = page;
        this.size = size;
    }
    page;
    size;
}
exports.Pageable = Pageable;
class Page {
    constructor(content, pageable, total) {
        this.content = content;
        this.pageable = pageable;
        this.total = total;
    }
    content;
    pageable;
    total;
    setContent(data) {
        this.content = data;
        return this;
    }
    getContent() {
        return this.content;
    }
    serializeContent(dto) {
        this.content = (0, serialize_interceptor_1.serializeToDto)(this.content, dto);
        return this;
    }
    getPage() {
        return this.pageable.page;
    }
    getSize() {
        return this.pageable.size;
    }
    getTotalElements() {
        return this.total;
    }
    getTotalPage() {
        return this.pageable.size === 0
            ? 1
            : Math.ceil(this.total / this.pageable.size);
    }
    hasNext() {
        return this.getPage() + 1 < this.getTotalPage();
    }
    isLast() {
        return !this.hasNext();
    }
    map(fun) {
        return new Page(this.content.map(fun), this.pageable, this.total);
    }
    async mapAsycParallel(fun, options) {
        if (options === PromiseType.ALL) {
            return new Page(await Promise.all(this.content.map(fun)), this.pageable, this.total);
        }
        else if (options === PromiseType.ALL_SETTLED) {
            return new Page(await Promise.allSettled(this.content.map(fun)), this.pageable, this.total);
        }
    }
}
exports.Page = Page;
var Sort;
(function (Sort) {
    Sort["ASC"] = "ASC";
    Sort["DESC"] = "DESC";
})(Sort = exports.Sort || (exports.Sort = {}));
var Operator;
(function (Operator) {
    Operator["EQ"] = "eq";
    Operator["NE"] = "ne";
    Operator["GT"] = "gt";
    Operator["GTE"] = "gte";
    Operator["LT"] = "lt";
    Operator["LTE"] = "lte";
    Operator["IN"] = "in";
    Operator["INS"] = "ins";
    Operator["NIN"] = "nin";
    Operator["LIKE"] = "like";
    Operator["BTE"] = "bte";
})(Operator || (Operator = {}));
exports.Operator = Operator;
class Searchable {
    constructor(property, value, operator) {
        this.property = property;
        this.value = value;
        this.operator = operator;
    }
    operator;
    value;
    property;
}
exports.Searchable = Searchable;
class Sortable {
    constructor(property, direction) {
        this.property = property;
        this.direction = direction;
    }
    property;
    direction;
}
exports.Sortable = Sortable;
function jsonParser(data) {
    if (typeof data === "string") {
        return JSON.parse(data);
    }
    else {
        return data;
    }
}
function camelToSnakeCase(obj) {
    obj.property = obj.property.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    return obj;
}
class Search {
    constructor(searchable, sortable, pageable) {
        this.searchable = searchable
            .map(jsonParser)
            .map(camelToSnakeCase);
        this.sortable = sortable
            .map(jsonParser)
            .map((sortable) => sortable?.property?.includes(".")
            ? sortable
            : camelToSnakeCase(sortable));
        this.pageable = jsonParser(pageable);
    }
    searchable;
    sortable;
    startDate;
    endDate;
    pageable;
}
exports.Search = Search;
class DocumentSearch {
    constructor(searchable, sortable, pageable) {
        this.searchable = searchable
            .map(jsonParser)
            .map((sortable) => sortable?.property?.includes(".")
            ? sortable
            : camelToSnakeCase(sortable));
        this.sortable = sortable
            .map(jsonParser)
            .map((sortable) => sortable?.property?.includes(".")
            ? sortable
            : camelToSnakeCase(sortable));
        this.pageable = jsonParser(pageable);
    }
    searchable;
    sortable;
    startDate;
    endDate;
    pageable;
}
exports.DocumentSearch = DocumentSearch;
var PromiseType;
(function (PromiseType) {
    PromiseType["ALL"] = "all";
    PromiseType["ALL_SETTLED"] = "allSettled";
})(PromiseType = exports.PromiseType || (exports.PromiseType = {}));
var DocumentPage;
(function (DocumentPage) {
    DocumentPage[DocumentPage["INIT_PAGE"] = 1] = "INIT_PAGE";
    DocumentPage[DocumentPage["INIT_PAGE_SIZE"] = 10] = "INIT_PAGE_SIZE";
})(DocumentPage = exports.DocumentPage || (exports.DocumentPage = {}));
//# sourceMappingURL=PageParameter.js.map
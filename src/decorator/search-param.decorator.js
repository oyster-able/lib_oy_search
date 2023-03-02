"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchDocumentParam = exports.SearchParam = void 0;
const common_1 = require("@nestjs/common");
const PageParameter_1 = require("../param/PageParameter");
function jsonParser(data) {
    if (typeof data === "string") {
        return JSON.parse(data);
    }
    else {
        return data;
    }
}
exports.SearchParam = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const searchParams = req.query;
    if (searchParams.searchable !== undefined) {
        searchParams.searchable = searchParams.searchable.map(jsonParser);
    }
    if (searchParams.sortable !== undefined) {
        searchParams.sortable = searchParams.sortable.map(jsonParser);
    }
    if (searchParams.pageable !== undefined) {
        searchParams.pageable = jsonParser(searchParams.pageable);
    }
    return searchParams;
});
exports.SearchDocumentParam = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const searchParams = req.query;
    searchParams.param = searchParams.param
        ? jsonParser(searchParams.param)
        : {};
    if (!searchParams.pageable) {
        searchParams.pageable = { page: 1, size: 10 };
    }
    else {
        searchParams.pageable = jsonParser(searchParams.pageable);
    }
    if (searchParams.startDate && searchParams.endDate) {
        const startDate = new Date(searchParams.startDate);
        const endDate = new Date(searchParams.endDate);
        startDate.setHours(startDate.getHours() + 9);
        endDate.setHours(endDate.getHours() + 9);
        searchParams.startDate = startDate.toUTCString();
        searchParams.endDate = endDate.toUTCString();
    }
    if (!searchParams.sort) {
        searchParams.sort = PageParameter_1.Sort.DESC;
    }
    return searchParams;
});
//# sourceMappingURL=search-param.decorator.js.map
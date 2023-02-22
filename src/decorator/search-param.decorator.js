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
        `₩`;
    }
    return new PageParameter_1.Search(searchParams.searchable || [], searchParams.sortable || [], searchParams.pageable || new PageParameter_1.Pageable(1, 10));
});
exports.SearchDocumentParam = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const query = req.query;
    const searchParams = {
        param: {},
        pageable: { page: undefined, size: undefined },
        sort: query.sort,
    };
    if (query.machineId !== undefined) {
        searchParams.param = { ...searchParams.param, machine: query.machineId };
    }
    if (query.cmd !== undefined) {
        searchParams.param = {
            ...searchParams.param,
            cmd: { $in: query.cmd.split(",") },
        };
    }
    if (query.startDate && query.endDate) {
        const startDate = new Date(query.startDate);
        const endDate = new Date(query.endDate);
        startDate.setHours(startDate.getHours() + 9);
        endDate.setHours(endDate.getHours() + 9);
        searchParams.param = {
            ...searchParams.param,
            date: { $gte: startDate.toUTCString(), $lt: endDate.toUTCString() },
        };
    }
    if (query.pageable !== undefined) {
        searchParams.pageable = jsonParser(query.pageable);
    }
    return searchParams;
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRepository = void 0;
const typeorm_1 = require("typeorm");
class PageRepository extends typeorm_1.Repository {
    constructor(target, manager, queryRunner) {
        super(target, manager, queryRunner);
    }
    sortQueryBuild(search, query) {
        for (const sortable of search.sortable) {
            const { property, direction } = sortable;
            query.orderBy(property, direction);
        }
        return query;
    }
    pageQueryBuild(search, query) {
        const { page, size } = search.pageable;
        query.skip(size * (page - 1)).take(size);
        return query;
    }
}
exports.PageRepository = PageRepository;

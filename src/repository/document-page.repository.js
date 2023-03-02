"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentPageModel = void 0;
class DocumentPageModel {
    sortQueryBuild(search, queryOptions) {
        for (const sortable of search.sortable) {
            const { property, direction } = sortable;
            queryOptions.sort = { [property]: direction };
        }
        return queryOptions;
    }
    pageQueryBuild(search, queryOptions) {
        const { page, size } = search.pageable;
        queryOptions.skip = size * (page - 1);
        queryOptions.limit = size;
        return queryOptions;
    }
}
exports.DocumentPageModel = DocumentPageModel;
//# sourceMappingURL=document-page.repository.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultController = void 0;
const PageParameter_1 = require("../param/PageParameter");
const ResponseEntity_1 = require("../res/ResponseEntity");
class DefaultController {
    async returnData(result, toDtoFun) {
        return await result.then((data) => {
            return ResponseEntity_1.ResponseEntity.OK_WITH(toDtoFun(data));
        });
    }
    newSearch(searchParams) {
        return new PageParameter_1.Search(searchParams.searchable || [], searchParams.sortable || [], searchParams.pageable || new PageParameter_1.Pageable(1, 10));
    }
    newDocumentSearch(searchParams) {
        return new PageParameter_1.DocumentSearch(searchParams.searchable || [], searchParams.sortable || [], searchParams.pageable || new PageParameter_1.Pageable(1, 10));
    }
}
exports.DefaultController = DefaultController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentSearchRepository = void 0;
const document_page_repository_1 = require("./document-page.repository");
const PageParameter_1 = require("../param/PageParameter");
class DocumentSearchRepository extends document_page_repository_1.DocumentPageModel {
    async search(search, model) {
        const options = {};
        this.sortQueryBuild(search, options);
        this.pageQueryBuild(search, options);
        const data = await model
            .find(this.searchQueryBuild(search), null, options)
            .exec();
        const count = await model.countDocuments(this.searchQueryBuild(search));
        return new PageParameter_1.Page(data, new PageParameter_1.Pageable(search.pageable.page, search.pageable.size), count);
    }
    searchQueryBuild(search) {
        const filter = {};
        for (const searchable of search.searchable) {
            const { property, operator, value } = searchable;
            this.operatorSwitch(operator, property, value, filter);
        }
        return filter;
    }
    operatorSwitch(operator, property, value, filter) {
        switch (operator) {
            case PageParameter_1.Operator.EQ:
                filter[property] = value;
                break;
            case PageParameter_1.Operator.NE:
                filter[property] = { $ne: value };
                break;
            case PageParameter_1.Operator.LIKE:
                filter[property] = { $regex: `.*${value}.*` };
                break;
            case PageParameter_1.Operator.GT:
                filter[property] = { $gt: value };
                break;
            case PageParameter_1.Operator.GTE:
                filter[property] = { $gte: value };
                break;
            case PageParameter_1.Operator.LT:
                filter[property] = { $lt: value };
                break;
            case PageParameter_1.Operator.LTE:
                filter[property] = { $lte: value };
                break;
            case PageParameter_1.Operator.IN:
                filter[property] = { $in: value };
                break;
            case PageParameter_1.Operator.NIN:
                filter[property] = { $nin: value };
                break;
            case PageParameter_1.Operator.BTE:
                filter[property] = { $gte: value[0], $lte: value[1] };
                break;
            default:
                return filter;
        }
    }
}
exports.DocumentSearchRepository = DocumentSearchRepository;
//# sourceMappingURL=document-search.repository.js.map
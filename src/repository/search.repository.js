"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRepository = void 0;
const page_repository_1 = require("./page.repository");
const PageParameter_1 = require("../param/PageParameter");
const typeorm_1 = require("typeorm");
class SearchRepository extends page_repository_1.PageRepository {
    constructor(target, manager, queryRunner) {
        super(target, manager, queryRunner);
    }
    search(search, tableName, queryBuilder, customParameterFun) {
        let query;
        if (queryBuilder) {
            search.sortable.forEach((sort) => {
                if (!sort.property.includes('.')) {
                    sort.property =
                        `${tableName}.` +
                            sort.property
                                .toLowerCase()
                                .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
                }
            });
        }
        if (queryBuilder === null || queryBuilder === undefined) {
            query = this.createQueryBuilder(tableName);
        }
        else {
            query = queryBuilder;
        }
        if (customParameterFun) {
            query = customParameterFun(query);
        }
        query = this.searchQueryBuild(search, query, tableName);
        query = this.sortQueryBuild(search, query);
        query = this.pageQueryBuild(search, query);
        return query.getManyAndCount().then(([data, count]) => {
            return new PageParameter_1.Page(data, new PageParameter_1.Pageable(search.pageable.page, search.pageable.size), count);
        });
    }
    searchQueryBuild(search, query, tableName) {
        for (const searchable of search.searchable) {
            const { operator, value } = searchable;
            const { table, property } = this.getJoinTableNameAndProperty(searchable.property, tableName);
            this.operatorSwitch(operator, query, table, property, value);
        }
        return query;
    }
    getJoinTableNameAndProperty(property, table) {
        if (property.indexOf('.') > -1) {
            const [parent, child] = property.split('.');
            table = parent;
            property = child;
        }
        return { property, table };
    }
    operatorSwitch(operator, query, table, property, value) {
        switch (operator) {
            case PageParameter_1.Operator.EQ:
                query.andWhere(`${table}.${property} = :${table}${property}`, {
                    [`${table}${property}`]: value,
                });
                break;
            case PageParameter_1.Operator.NE:
                query.andWhere(`${table}.${property} != :${table}${property}`, {
                    [`${table}${property}`]: value,
                });
                break;
            case PageParameter_1.Operator.LIKE:
                query.andWhere(`${table}.${property} LIKE :${table}${property}`, {
                    [`${table}${property}`]: `%${value}%`,
                });
                break;
            case PageParameter_1.Operator.GT:
                query.andWhere(`${table}.${property} > :${table}${property}`, {
                    [`${table}${property}`]: value,
                });
                break;
            case PageParameter_1.Operator.LT:
                query.andWhere(`${table}.${property} < :${table}${property}`, {
                    [`${table}${property}`]: value,
                });
                break;
            case PageParameter_1.Operator.GTE:
                query.andWhere(`${table}.${property} >= :${table}${property}`, {
                    [`${table}${property}`]: value,
                });
                break;
            case PageParameter_1.Operator.LTE:
                query.andWhere(`${table}.${property} <= :${table}${property}`, {
                    [`${table}${property}`]: value,
                });
                break;
            case PageParameter_1.Operator.IN:
                query.andWhere(`${table}.${property} IN (:${table}${property})`, {
                    [`${table}${property}`]: value,
                });
                break;
            case PageParameter_1.Operator.INS:
                query.andWhere(new typeorm_1.Brackets((qb) => {
                    const values = value.split(',');
                    values.forEach((val) => {
                        qb.orWhere(`${table}.${property} IN ('${val}')`);
                    });
                }));
                break;
            case PageParameter_1.Operator.NIN:
                query.andWhere(`${table}.${property} NOT IN (:${table}${property})`, {
                    [`${table}${property}`]: value,
                });
                break;
            default:
                break;
        }
    }
}
exports.SearchRepository = SearchRepository;

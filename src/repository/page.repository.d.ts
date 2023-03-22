import { Repository, SelectQueryBuilder } from "typeorm";
import { EntityTarget } from "typeorm/common/EntityTarget";
import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { QueryRunner } from "typeorm/query-runner/QueryRunner";
import { Search } from "../param/PageParameter";
export declare class PageRepository<T> extends Repository<T> {
    constructor(target: EntityTarget<T>, manager: EntityManager, queryRunner?: QueryRunner);
    protected sortQueryBuild(search: Search, query: SelectQueryBuilder<T>): SelectQueryBuilder<T>;
    protected pageQueryBuild(search: Search, query: SelectQueryBuilder<T>): SelectQueryBuilder<T>;
}

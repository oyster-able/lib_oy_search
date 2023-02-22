import { EntityTarget } from 'typeorm/common/EntityTarget';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { PageRepository } from "./page.repository";
import { Page, Search } from "../param/PageParameter";
import { SelectQueryBuilder } from "typeorm";
export declare class SearchRepository<T> extends PageRepository<T> {
    constructor(target: EntityTarget<T>, manager: EntityManager, queryRunner?: QueryRunner);
    protected search(search: Search, tableName: string, queryBuilder?: SelectQueryBuilder<T>, customParameterFun?: any): Promise<Page<T>>;
    protected searchQueryBuild(search: Search, query: SelectQueryBuilder<T>, tableName: string): SelectQueryBuilder<T>;
    private getJoinTableNameAndProperty;
    private operatorSwitch;
}

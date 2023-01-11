import { Repository, SelectQueryBuilder } from 'typeorm';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import {Search} from "../param/PageParameter";

export class PageRepository<T> extends Repository<T> {
  constructor(
    target: EntityTarget<T>,
    manager: EntityManager,
    queryRunner?: QueryRunner,
  ) {
    super(target, manager, queryRunner);
  }

  protected sortQueryBuild(
    search: Search,
    query: SelectQueryBuilder<T>,
  ): SelectQueryBuilder<T> {
    for (const sortable of search.sortable) {
      const { property, direction } = sortable;
      query.orderBy(property, direction);
    }
    return query;
  }

  protected pageQueryBuild(
    search: Search,
    query: SelectQueryBuilder<T>,
  ): SelectQueryBuilder<T> {
    const { page, size } = search.pageable;
    query.skip(size * (page - 1)).take(size);

    return query;
  }
}
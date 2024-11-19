import { EntityTarget } from "typeorm/common/EntityTarget";
import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { QueryRunner } from "typeorm/query-runner/QueryRunner";
import { PageRepository } from "./page.repository";
import { Operator, Page, Pageable, Search } from "../param/PageParameter";
import { Brackets, SelectQueryBuilder } from "typeorm";

export class SearchRepository<T> extends PageRepository<T> {
  constructor(
    target: EntityTarget<T>,
    manager: EntityManager,
    queryRunner?: QueryRunner
  ) {
    super(target, manager, queryRunner);
  }

  protected search(
    search: Search,
    tableName: string,
    queryBuilder?: SelectQueryBuilder<T>,
    customParameterFun?: any
  ): Promise<Page<T>> {
    let query;

    if (queryBuilder) {
      search?.sortable?.forEach((sort) => {
        if (!sort.property.includes(".")) {
          sort.property =
            `${tableName}.` +
            sort.property
              .toLowerCase()
              .replace(/([-_][a-z])/g, (group) =>
                group.toUpperCase().replace("-", "").replace("_", "")
              );
        }
      });
    }

    if (queryBuilder === null || queryBuilder === undefined) {
      query = this.createQueryBuilder(tableName);
    } else {
      query = queryBuilder;
    }

    if (customParameterFun) {
      query = customParameterFun(query);
    }

    query = this.searchQueryBuild(search, query, tableName);
    query = this.sortQueryBuild(search, query);
    query = this.pageQueryBuild(search, query);

    return query.getManyAndCount().then(([data, count]) => {
      return new Page(
        data,
        new Pageable(search?.pageable?.page, search?.pageable?.size),
        count
      );
    });
  }

  protected searchQueryBuild(
    search: Search,
    query: SelectQueryBuilder<T>,
    tableName: string
  ): SelectQueryBuilder<T> {
    for (const searchable of search?.searchable) {
      const { operator, value } = searchable;
      const { table, property } = this.getJoinTableNameAndProperty(
        searchable.property,
        tableName
      );

      this.operatorSwitch(operator, query, table, property, value);
    }

    return query;
  }

  private getJoinTableNameAndProperty(property: string, table: string) {
    if (property.indexOf(".") > -1) {
      const [parent, child] = property.split(".");
      table = parent;
      property = child;
    }
    return { property, table };
  }

  private operatorSwitch(
    operator: Operator,
    query: SelectQueryBuilder<T>,
    table: string,
    property: string,
    value: string | string[]
  ) {
    switch (operator) {
      case Operator.EQ:
        query.andWhere(`${table}.${property} = :${table}${property}`, {
          [`${table}${property}`]: value,
        });
        break;
      case Operator.NE:
        query.andWhere(`${table}.${property} != :${table}${property}`, {
          [`${table}${property}`]: value,
        });
        break;
      case Operator.LIKE:
        query.andWhere(`${table}.${property} LIKE :${table}${property}`, {
          [`${table}${property}`]: `%${value}%`,
        });
        break;
      case Operator.GT:
        query.andWhere(`${table}.${property} > :${table}${property}`, {
          [`${table}${property}`]: value,
        });
        break;
      case Operator.LT:
        query.andWhere(`${table}.${property} < :${table}${property}`, {
          [`${table}${property}`]: value,
        });
        break;
      case Operator.GTE:
        query.andWhere(`${table}.${property} >= :${table}${property}`, {
          [`${table}${property}`]: value,
        });
        break;
      case Operator.LTE:
        query.andWhere(`${table}.${property} <= :${table}${property}`, {
          [`${table}${property}`]: value,
        });
        break;
      case Operator.IN:
        query.andWhere(`${table}.${property} IN (:${table}${property})`, {
          [`${table}${property}`]: value,
        });
        break;
      case Operator.INS:
        query.andWhere(
          new Brackets((qb) => {
            const values = (value as string).split(",");
            values.forEach((val) => {
              qb.orWhere(`${table}.${property} IN ('${val}')`);
            });
          })
        );
        break;
      case Operator.NIN:
        query.andWhere(`${table}.${property} NOT IN (:${table}${property})`, {
          [`${table}${property}`]: value,
        });
        break;
      case Operator.BT:
        const values = (value as string).split(",");
        query.andWhere(
          `${table}.${property} BETWEEN :${table}${property}1 AND :${table}${property}2`,
          {
            [`${table}${property}1`]: values[0],
            [`${table}${property}2`]: values[1],
          }
        );
        break;
      case Operator.ANY:
        query.andWhere(`:${table}${property} = any(${property})`, {
          [`${table}${property}`]: value,
        });
          break;
      default:
        break;
    }
  }
}

import { Condition, FilterQuery, Model, QueryOptions } from "mongoose";
import { DocumentPageModel } from "./document-page.repository";
import { Operator, Page, Pageable, Search } from "../param/PageParameter";

export class DocumentSearchRepository<
  T,
  K extends keyof T
> extends DocumentPageModel<T, K> {
  protected async search(search: Search, model: Model<T>): Promise<Page<T>> {
    const options = {} as QueryOptions<T>;

    this.sortQueryBuild(search, options);
    this.pageQueryBuild(search, options);

    const data = await model
      .find(this.searchQueryBuild(search), null, options)
      .exec();

    const count = await model.countDocuments(this.searchQueryBuild(search));

    return new Page(
      data,
      new Pageable(search.pageable.page, search.pageable.size),
      count
    );
  }

  protected searchQueryBuild(search: Search): FilterQuery<T> {
    const filter = {} as FilterQuery<T>;

    for (const searchable of search.searchable) {
      const { property, operator, value } = searchable;
      this.operatorSwitch(
        operator,
        property as K,
        value as unknown as T[K],
        filter
      );
    }

    return filter;
  }

  protected operatorSwitch(
    operator: Operator,
    property: K,
    value: T[K],
    filter: FilterQuery<T>
  ): FilterQuery<T> {
    switch (operator) {
      case Operator.EQ:
        filter[property] = value;
        break;
      case Operator.NE:
        filter[property] = { $ne: value } as Condition<T>;
        break;
      case Operator.LIKE:
        filter[property] = { $regex: `.*${value}.*` } as Condition<T>;
        break;
      case Operator.GT:
        filter[property] = { $gt: value } as Condition<T>;
        break;
      case Operator.GTE:
        filter[property] = { $gte: value } as Condition<T>;
        break;
      case Operator.LT:
        filter[property] = { $lt: value } as Condition<T>;
        break;
      case Operator.LTE:
        filter[property] = { $lte: value } as Condition<T>;
        break;
      case Operator.IN:
        filter[property] = { $in: value } as Condition<T>;
        break;
      case Operator.NIN:
        filter[property] = { $nin: value } as Condition<T>;
        break;
      case Operator.BT:
        const values = (value as string).split(",");
        filter[property] = { $gte: values[0], $lte: values[1] } as Condition<T>;
        break;
      default:
        return filter;
    }
  }
}

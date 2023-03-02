import { QueryOptions } from "mongoose";
import { Search } from "../param/PageParameter";
export class DocumentPageModel<T, K extends keyof T> {
  protected sortQueryBuild(
    search: Search,
    queryOptions: QueryOptions<T>
  ): QueryOptions<T> {
    for (const sortable of search.sortable) {
      const { property, direction } = sortable;
      queryOptions.sort = { [property]: direction };
    }
    return queryOptions;
  }

  protected pageQueryBuild(
    search: Search,
    queryOptions: QueryOptions<T>
  ): QueryOptions<T> {
    const { page, size } = search.pageable;
    queryOptions.skip = size * (page - 1);
    queryOptions.limit = size;
    return queryOptions;
  }
}

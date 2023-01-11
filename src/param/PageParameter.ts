import {
  ClassConstuctor,
  serializeToDto,
} from "../interceptors/serialize.interceptor";

class Pageable {
  constructor(page: number, size: number) {
    this.page = page;
    this.size = size;
  }
  page: number;
  size: number;
}

class Page<T> {
  constructor(content: T[], pageable: Pageable, total: number) {
    this.content = content;
    this.pageable = pageable;
    this.total = total;
  }
  private content: T[];
  private readonly pageable: Pageable;
  private readonly total: number;

  setContent(data: T[]): Page<T> {
    this.content = data;
    return this;
  }

  getContent(): T[] {
    return this.content;
  }

  serializeContent(dto: ClassConstuctor): Page<T> {
    this.content = serializeToDto(this.content, dto);
    return this;
  }

  getPage(): number {
    return this.pageable.page;
  }

  getSize(): number {
    return this.pageable.size;
  }

  getTotalElements(): number {
    return this.total;
  }

  getTotalPage(): number {
    return this.pageable.size === 0
      ? 1
      : Math.ceil(this.total / this.pageable.size);
  }

  hasNext(): boolean {
    return this.getPage() + 1 < this.getTotalPage();
  }

  isLast(): boolean {
    return !this.hasNext();
  }

  map(fun: (data: any) => any): Page<any> {
    return new Page(this.content.map(fun), this.pageable, this.total);
  }

  async mapAsycParallel(
    fun: (data: any) => any,
    options: PromiseType
  ): Promise<Page<any>> {
    if (options === PromiseType.ALL) {
      return new Page(
        await Promise.all(this.content.map(fun)),
        this.pageable,
        this.total
      );
    } else {
      return new Page(
        await Promise.allSettled(this.content.map(fun)),
        this.pageable,
        this.total
      );
    }
  }
}

export enum Sort {
  ASC = "ASC",
  DESC = "DESC",
}

enum Operator {
  EQ = "eq",
  NE = "ne",
  GT = "gt",
  GTE = "gte",
  LT = "lt",
  LTE = "lte",
  IN = "in",
  INS = "ins",
  NIN = "nin",
  LIKE = "like",
}

class Searchable {
  constructor(property: string, value: string, operator: Operator) {
    this.property = property;
    this.value = value;
    this.operator = operator;
  }
  operator: Operator;
  value: string;
  property: string;
}

class Sortable {
  constructor(property: string, direction: Sort) {
    this.property = property;
    this.direction = direction;
  }
  property: string;
  direction: Sort;
}

function jsonParser(data: string | Searchable | Sortable | Pageable) {
  if (typeof data === "string") {
    return JSON.parse(data);
  } else {
    return data;
  }
}

function camelToSnakeCase(obj: Searchable | Sortable): Searchable | Sortable {
  obj.property = obj.property.replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`
  );

  return obj;
}

class Search {
  constructor(
    searchable: Searchable[],
    sortable: Sortable[],
    pageable: Pageable
  ) {
    this.searchable = searchable
      .map(jsonParser)
      .map(camelToSnakeCase) as Searchable[];
    this.sortable = sortable
      .map(jsonParser)
      .map((sortable) =>
        sortable?.property?.includes(".")
          ? sortable
          : camelToSnakeCase(sortable)
      ) as Sortable[];
    this.pageable = jsonParser(pageable);
  }
  readonly searchable: Searchable[];
  readonly sortable: Sortable[];
  readonly startDate?: Date;
  readonly endDate?: Date;
  readonly pageable: Pageable;
}

export enum PromiseType {
  ALL = "all",
  ALL_SETTLED = "allSettled",
}

export enum DocumentPage {
  INIT_PAGE = 1,
  INIT_PAGE_SIZE = 10,
}

export { Page, Pageable, Searchable, Sortable, Search, Operator };

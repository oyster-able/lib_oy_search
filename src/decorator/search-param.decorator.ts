import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Pageable, Search } from "../param/PageParameter";

function jsonParser(data: any) {
  if (typeof data === "string") {
    return JSON.parse(data);
  } else {
    return data;
  }
}

export const SearchParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const searchParams = req.query;

    if (searchParams.searchable !== undefined) {
      searchParams.searchable = searchParams.searchable.map(jsonParser);
    }

    if (searchParams.sortable !== undefined) {
      searchParams.sortable = searchParams.sortable.map(jsonParser);
    }

    if (searchParams.pageable !== undefined) {
      searchParams.pageable = jsonParser(searchParams.pageable);
      `₩`;
    }

    return new Search(
      searchParams.searchable || [],
      searchParams.sortable || [],
      searchParams.pageable || new Pageable(1, 10)
    );
  }
);

export const SearchDocumentParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const query = req.query;
    const searchParams = {
      param: {},
      pageable: { page: undefined, size: undefined },
      sort: query.sort,
    };

    if (query.machineId !== undefined) {
      searchParams.param = { ...searchParams.param, machine: query.machineId };
    }

    if (query.cmd !== undefined) {
      searchParams.param = {
        ...searchParams.param,
        cmd: { $in: query.cmd.split(",") },
      };
    }

    if (query.startDate && query.endDate) {
      const startDate = new Date(query.startDate);
      const endDate = new Date(query.endDate);
      startDate.setHours(startDate.getHours() + 9);
      endDate.setHours(endDate.getHours() + 9);

      searchParams.param = {
        ...searchParams.param,
        date: { $gte: startDate.toUTCString(), $lt: endDate.toUTCString() },
      };
    }

    if (query.pageable !== undefined) {
      searchParams.pageable = jsonParser(query.pageable);
    }

    return searchParams;
  }
);

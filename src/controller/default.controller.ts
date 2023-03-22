import { DocumentSearch, Pageable, Search } from "../param/PageParameter";
import { SearchParameter } from "../param/SearchParameter";
import { ResponseEntity } from "../res/ResponseEntity";

export class DefaultController {
  async returnData(
    result: Promise<any>,
    toDtoFun
  ): Promise<ResponseEntity<any>> {
    return await result.then((data) => {
      return ResponseEntity.OK_WITH(toDtoFun(data));
    });
  }

  newSearch(searchParams: SearchParameter): Search {
    return new Search(
      searchParams.searchable || [],
      searchParams.sortable || [],
      searchParams.pageable || new Pageable(1, 10)
    );
  }

  newDocumentSearch(searchParams: SearchParameter): Search {
    return new DocumentSearch(
      searchParams.searchable || [],
      searchParams.sortable || [],
      searchParams.pageable || new Pageable(1, 10)
    );
  }
}

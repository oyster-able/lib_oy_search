import { Search } from "../param/PageParameter";
import { SearchParameter } from "../param/SearchParameter";
import { ResponseEntity } from "../res/ResponseEntity";
export declare class DefaultController {
    returnData(result: Promise<any>, toDtoFun: any): Promise<ResponseEntity<any>>;
    newSearch(searchParams: SearchParameter): Search;
    newDocumentSearch(searchParams: SearchParameter): Search;
}

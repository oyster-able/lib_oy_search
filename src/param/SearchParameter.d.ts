import { Searchable, Sortable, Pageable } from './PageParameter';
interface SearchParameter {
    searchable?: Searchable[];
    sortable?: Sortable[];
    pageable?: Pageable;
}
export { SearchParameter };

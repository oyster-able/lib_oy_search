# oy_search

검색 조회 라이브러리

## decorator

```typescript
@Get()
async getList(@SearchParam() param: Search): Promise<Page<Cuid>> {
    this.logger.debug(`cuid/ - param: ${JSON.stringify(param)}`);
    return this.cuidService.getList(param);
}
```

## repository

```typescript
@CustomRepository(Cuid)
export class CuidRepository extends SearchRepository<Cuid> {
    async searchCuid(search: Search): Promise<Page<Cuid>> {
        return this.search(search, 'cuid');
    }
}
```


## param ex

```json
{
    "searchable": [
        {
          "property": "name",
          "value": "백설 양조식초1.8L",
          "operator": "eq"
        }
    ],
    "sortable": [{"property": "id", "direction": "DESC"}],
    "pageable": {"page": 1, "size": 5 }
}
```
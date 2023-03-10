# oy_search

검색 조회 라이브러리

# 사용법

npm i @oysterable_public/oy_search@유효한버전 (CHANGELOG.md 참고)

# 수정방법

1. 코드수정
2. npm run build 실행
3. npm version patch 버전업
4. npm run publish:access 실행 (배포완료)

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
    return this.search(search, "cuid");
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
  "sortable": [{ "property": "id", "direction": "DESC" }],
  "pageable": { "page": 1, "size": 5 }
}
```

import { Exclude, Expose } from 'class-transformer';
import { ResponseStatus } from './enumable/response-status.enum';

export class HHRResponseEntity<T> {
  @Exclude() private readonly resultData: T;

  private constructor(data: T) {
    this.resultData = data;
  }

  static OK(): HHRResponseEntity<string> {
    return new HHRResponseEntity<string>('');
  }

  static OK_WITH<T>(data: T): HHRResponseEntity<T> {
    return new HHRResponseEntity<T>(data);
  }

  static ERROR(): HHRResponseEntity<string> {
    return new HHRResponseEntity<string>('서버 에러가 발생했습니다.');
  }

  @Expose()
  get data(): T {
    return this.resultData;
  }
}

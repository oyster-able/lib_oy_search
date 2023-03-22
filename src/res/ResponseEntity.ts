import { Exclude, Expose } from 'class-transformer';
import { ResponseStatus } from './enumable/response-status.enum';

export class ResponseEntity<T> {
  @Exclude() private readonly _statusCode: string;
  @Exclude() private readonly _status_code: number;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _data: T;

  private constructor(
    status: ResponseStatus,
    message: string,
    data: T,
    status_code?: number,
  ) {
    this._statusCode = ResponseStatus[status];
    this._message = message;
    this._data = data;
    this._status_code = status_code;
  }

  static OK(): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.OK, '', '');
  }

  static OK_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.OK, '', data);
  }

  static ERROR(): ResponseEntity<string> {
    return new ResponseEntity<string>(
      ResponseStatus.SERVER_ERROR,
      '서버 에러가 발생했습니다.',
      '',
    );
  }

  static ERROR_WITH(
    message: string,
    code: ResponseStatus | number = ResponseStatus.SERVER_ERROR,
    status?: number,
  ): ResponseEntity<string> {
    if (code === 400) {
      code = ResponseStatus.BAD_REQUEST;
    } else {
      code = ResponseStatus.SERVER_ERROR;
    }
    return new ResponseEntity<string>(code, message, '', status);
  }

  static ERROR_WITH_DATA<T>(
    message: string,
    code: ResponseStatus = ResponseStatus.SERVER_ERROR,
    data: T,
  ): ResponseEntity<T> {
    return new ResponseEntity<T>(code, message, data);
  }

  @Expose()
  get statusCode(): string {
    return this._statusCode;
  }

  @Expose()
  get message(): string {
    return this._message;
  }

  @Expose()
  get data(): T {
    return this._data;
  }
}

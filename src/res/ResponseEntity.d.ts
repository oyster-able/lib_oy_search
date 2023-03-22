import { ResponseStatus } from './enumable/response-status.enum';
export declare class ResponseEntity<T> {
    private readonly _statusCode;
    private readonly _status_code;
    private readonly _message;
    private readonly _data;
    private constructor();
    static OK(): ResponseEntity<string>;
    static OK_WITH<T>(data: T): ResponseEntity<T>;
    static ERROR(): ResponseEntity<string>;
    static ERROR_WITH(message: string, code?: ResponseStatus | number, status?: number): ResponseEntity<string>;
    static ERROR_WITH_DATA<T>(message: string, code: ResponseStatus | undefined, data: T): ResponseEntity<T>;
    get statusCode(): string;
    get message(): string;
    get data(): T;
}

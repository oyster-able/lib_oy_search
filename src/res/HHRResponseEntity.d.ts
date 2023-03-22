export declare class HHRResponseEntity<T> {
    private readonly resultData;
    private constructor();
    static OK(): HHRResponseEntity<string>;
    static OK_WITH<T>(data: T): HHRResponseEntity<T>;
    static ERROR(): HHRResponseEntity<string>;
    get data(): T;
}

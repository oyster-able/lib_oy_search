import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
export interface ClassConstuctor {
    new (...args: any[]): any;
}
export declare function Serialize(dto: ClassConstuctor): MethodDecorator & ClassDecorator;
export declare function serializeToDto(data: any, dto: ClassConstuctor): any;
export declare class SerializeInterceptor implements NestInterceptor {
    private dto;
    constructor(dto: ClassConstuctor);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}

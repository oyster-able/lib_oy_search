import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass, plainToInstance } from "class-transformer";
import { Page } from "../param/PageParameter";

export interface ClassConstuctor {
  new (...args: any[]): any;
}

export function Serialize(dto: ClassConstuctor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export function serializeToDto(data: any, dto: ClassConstuctor) {
  return plainToInstance(dto, data, {
    excludeExtraneousValues: true,
  });
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstuctor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        if (data instanceof Page) {
          return data.serializeContent(this.dto);
        }
        return serializeToDto(data, this.dto);
      })
    );
  }
}

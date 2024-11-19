"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializeInterceptor = void 0;
exports.Serialize = Serialize;
exports.serializeToDto = serializeToDto;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const class_transformer_1 = require("class-transformer");
const PageParameter_1 = require("../param/PageParameter");
function Serialize(dto) {
    return (0, common_1.UseInterceptors)(new SerializeInterceptor(dto));
}
function serializeToDto(data, dto) {
    return (0, class_transformer_1.plainToInstance)(dto, data, {
        excludeExtraneousValues: true,
    });
}
class SerializeInterceptor {
    dto;
    constructor(dto) {
        this.dto = dto;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (data instanceof PageParameter_1.Page) {
                return data.serializeContent(this.dto);
            }
            return serializeToDto(data, this.dto);
        }));
    }
}
exports.SerializeInterceptor = SerializeInterceptor;

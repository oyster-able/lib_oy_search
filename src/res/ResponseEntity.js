"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseEntity = void 0;
const class_transformer_1 = require("class-transformer");
const response_status_enum_1 = require("./enumable/response-status.enum");
class ResponseEntity {
    _statusCode;
    _status_code;
    _message;
    _data;
    constructor(status, message, data, status_code) {
        this._statusCode = response_status_enum_1.ResponseStatus[status];
        this._message = message;
        this._data = data;
        this._status_code = status_code;
    }
    static OK() {
        return new ResponseEntity(response_status_enum_1.ResponseStatus.OK, '', '');
    }
    static OK_WITH(data) {
        return new ResponseEntity(response_status_enum_1.ResponseStatus.OK, '', data);
    }
    static ERROR() {
        return new ResponseEntity(response_status_enum_1.ResponseStatus.SERVER_ERROR, '서버 에러가 발생했습니다.', '');
    }
    static ERROR_WITH(message, code = response_status_enum_1.ResponseStatus.SERVER_ERROR, status) {
        if (code === 400) {
            code = response_status_enum_1.ResponseStatus.BAD_REQUEST;
        }
        else {
            code = response_status_enum_1.ResponseStatus.SERVER_ERROR;
        }
        return new ResponseEntity(code, message, '', status);
    }
    static ERROR_WITH_DATA(message, code = response_status_enum_1.ResponseStatus.SERVER_ERROR, data) {
        return new ResponseEntity(code, message, data);
    }
    get statusCode() {
        return this._statusCode;
    }
    get message() {
        return this._message;
    }
    get data() {
        return this._data;
    }
}
exports.ResponseEntity = ResponseEntity;
__decorate([
    (0, class_transformer_1.Exclude)()
], ResponseEntity.prototype, "_statusCode", void 0);
__decorate([
    (0, class_transformer_1.Exclude)()
], ResponseEntity.prototype, "_status_code", void 0);
__decorate([
    (0, class_transformer_1.Exclude)()
], ResponseEntity.prototype, "_message", void 0);
__decorate([
    (0, class_transformer_1.Exclude)()
], ResponseEntity.prototype, "_data", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ResponseEntity.prototype, "statusCode", null);
__decorate([
    (0, class_transformer_1.Expose)()
], ResponseEntity.prototype, "message", null);
__decorate([
    (0, class_transformer_1.Expose)()
], ResponseEntity.prototype, "data", null);

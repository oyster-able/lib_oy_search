"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HHRResponseEntity = void 0;
const class_transformer_1 = require("class-transformer");
class HHRResponseEntity {
    resultData;
    constructor(data) {
        this.resultData = data;
    }
    static OK() {
        return new HHRResponseEntity('');
    }
    static OK_WITH(data) {
        return new HHRResponseEntity(data);
    }
    static ERROR() {
        return new HHRResponseEntity('서버 에러가 발생했습니다.');
    }
    get data() {
        return this.resultData;
    }
}
exports.HHRResponseEntity = HHRResponseEntity;
__decorate([
    (0, class_transformer_1.Exclude)()
], HHRResponseEntity.prototype, "resultData", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], HHRResponseEntity.prototype, "data", null);

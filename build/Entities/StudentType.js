var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "typeorm"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updateStudentType = exports.deleteStudentType = exports.getStudentTypeByType = exports.getStudentTypeById = exports.addStudentType = exports.getStudentTypes = exports.StudentType = void 0;
    const typeorm_1 = require("typeorm");
    let StudentType = class StudentType extends typeorm_1.BaseEntity {
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], StudentType.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], StudentType.prototype, "type", void 0);
    StudentType = __decorate([
        (0, typeorm_1.Entity)()
    ], StudentType);
    exports.StudentType = StudentType;
    const getStudentTypes = () => __awaiter(void 0, void 0, void 0, function* () {
        const studentTypes = yield StudentType.find({
            order: {
                id: "DESC",
            },
        });
        return studentTypes;
    });
    exports.getStudentTypes = getStudentTypes;
    const addStudentType = (type) => __awaiter(void 0, void 0, void 0, function* () {
        const studentTypeToAdd = yield StudentType.insert({
            type: type,
        });
        return studentTypeToAdd;
    });
    exports.addStudentType = addStudentType;
    const getStudentTypeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const studentTypeToFindById = yield StudentType.findOne({ where: { id: id } });
        return studentTypeToFindById;
    });
    exports.getStudentTypeById = getStudentTypeById;
    const getStudentTypeByType = (type) => __awaiter(void 0, void 0, void 0, function* () {
        const studentTypeToFindByType = yield StudentType.findOne({
            where: { type: type },
        });
        return studentTypeToFindByType;
    });
    exports.getStudentTypeByType = getStudentTypeByType;
    const deleteStudentType = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const studentTypeToDelete = yield StudentType.delete(id);
        if (studentTypeToDelete) {
            return "Staff Type Deleted";
        }
    });
    exports.deleteStudentType = deleteStudentType;
    const updateStudentType = (id, type) => __awaiter(void 0, void 0, void 0, function* () {
        const studentTypeToUpdate = yield StudentType.update(id, { type: type });
        return studentTypeToUpdate;
    });
    exports.updateStudentType = updateStudentType;
});

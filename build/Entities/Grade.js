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
    exports.getSingleGrade = exports.updateGrade = exports.deleteGrade = exports.createGrade = exports.getGrades = exports.Grade = void 0;
    const typeorm_1 = require("typeorm");
    let Grade = class Grade extends typeorm_1.BaseEntity {
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Grade.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Grade.prototype, "from", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Grade.prototype, "to", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Grade.prototype, "grade", void 0);
    Grade = __decorate([
        (0, typeorm_1.Entity)()
    ], Grade);
    exports.Grade = Grade;
    const getGrades = () => __awaiter(void 0, void 0, void 0, function* () {
        const grades = yield Grade.find({
            order: {
                id: "DESC",
            },
        });
        return grades;
    });
    exports.getGrades = getGrades;
    const createGrade = (from, to, grade) => __awaiter(void 0, void 0, void 0, function* () {
        const GradeToInsert = yield Grade.insert({ from: from, to: to, grade: grade });
        return GradeToInsert;
    });
    exports.createGrade = createGrade;
    const deleteGrade = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const grade = yield Grade.delete(id);
        if (grade) {
            return "Grade Deleted";
        }
    });
    exports.deleteGrade = deleteGrade;
    const updateGrade = (id, from, to, grade) => __awaiter(void 0, void 0, void 0, function* () {
        const GradeToUpdate = yield Grade.update(id, { from: from, to: to, grade: grade });
        return GradeToUpdate;
    });
    exports.updateGrade = updateGrade;
    const getSingleGrade = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const grade = yield Grade.findOne({ where: { id: id } });
        return grade;
    });
    exports.getSingleGrade = getSingleGrade;
});

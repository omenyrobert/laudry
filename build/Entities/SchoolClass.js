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
        define(["require", "exports", "typeorm", "./Stream"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updateClass = exports.deleteClassById = exports.getClassById = exports.createClass = exports.getClasses = exports.SchoolClass = void 0;
    const typeorm_1 = require("typeorm");
    const Stream_1 = require("./Stream");
    let SchoolClass = class SchoolClass extends typeorm_1.BaseEntity {
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], SchoolClass.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], SchoolClass.prototype, "class", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(() => Stream_1.Stream, (stream) => stream.stream, { cascade: true }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Array)
    ], SchoolClass.prototype, "stream", void 0);
    SchoolClass = __decorate([
        (0, typeorm_1.Entity)()
    ], SchoolClass);
    exports.SchoolClass = SchoolClass;
    const getClasses = () => __awaiter(void 0, void 0, void 0, function* () {
        const classes = yield SchoolClass.find({
            order: {
                id: "DESC",
            },
            relations: {
                stream: true,
            },
        });
        return classes;
    });
    exports.getClasses = getClasses;
    const createClass = (name, stream) => __awaiter(void 0, void 0, void 0, function* () {
        const classToCreate = yield SchoolClass.insert({
            class: name,
            stream: stream,
        });
        return classToCreate;
    });
    exports.createClass = createClass;
    const getClassById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const classToFind = yield SchoolClass.findOne({ where: { id: id } });
        return classToFind;
    });
    exports.getClassById = getClassById;
    const deleteClassById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const classToDelete = yield SchoolClass.delete(id);
        if (classToDelete) {
            return "Class deleted";
        }
    });
    exports.deleteClassById = deleteClassById;
    const updateClass = (id, name, stream) => __awaiter(void 0, void 0, void 0, function* () {
        const classToUpdate = yield SchoolClass.update(id, {
            class: name,
            stream: stream,
        });
        return classToUpdate;
    });
    exports.updateClass = updateClass;
});

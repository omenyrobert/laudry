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
    var Term_1;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updatePassword = exports.updateMember = exports.getMemberByEmail = exports.getMemberById = exports.deleteTermMember = exports.addTermMember = exports.getTermMembers = exports.Term = void 0;
    const typeorm_1 = require("typeorm");
    let Term = Term_1 = class Term extends typeorm_1.BaseEntity {
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Term.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Term.prototype, "start_date", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Term.prototype, "end_date", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Term.prototype, "last_name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Term.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(() => Term_1, () => {
            onDelete: "CASCADE";
            onUpdate: "CASCADE";
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Term)
    ], Term.prototype, "Term_type", void 0);
    __decorate([
        (0, typeorm_1.Column)({ select: false }),
        __metadata("design:type", String)
    ], Term.prototype, "password", void 0);
    Term = Term_1 = __decorate([
        (0, typeorm_1.Entity)()
    ], Term);
    exports.Term = Term;
    const getTermMembers = () => __awaiter(void 0, void 0, void 0, function* () {
        const TermMembers = yield Term.find({
            order: {
                id: "DESC",
            },
            relations: {
                Term_type: true,
            },
        });
        return TermMembers;
    });
    exports.getTermMembers = getTermMembers;
    const addTermMember = (email, last_name, start_date, end_date, password, Term) => __awaiter(void 0, void 0, void 0, function* () {
        const TermToAdd = yield Term.insert({
            email: email,
            last_name: last_name,
            start_date: start_date,
            end_date: end_date,
            password: password,
            Term_type: Term,
        });
        return TermToAdd;
    });
    exports.addTermMember = addTermMember;
    const deleteTermMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const TermToDelete = yield Term.delete(id);
        if (TermToDelete) {
            return "Term Deleted";
        }
    });
    exports.deleteTermMember = deleteTermMember;
    const getMemberById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const TermToFindById = yield Term.findOne({ where: { id: id } });
        return TermToFindById;
    });
    exports.getMemberById = getMemberById;
    const getMemberByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const TermToFindByEmail = yield Term.findOne({
            where: { email: email },
            select: [
                "id",
                "email",
                "password",
                "start_date",
                "last_name",
                "end_date",
            ],
        });
        return TermToFindByEmail;
    });
    exports.getMemberByEmail = getMemberByEmail;
    const updateMember = (id, email, last_name, start_date, end_date, Term) => __awaiter(void 0, void 0, void 0, function* () {
        const TermToUpdate = yield Term.update(id, {
            email: email,
            last_name: last_name,
            start_date: start_date,
            end_date: end_date,
            Term_type: Term,
        });
        return TermToUpdate;
    });
    exports.updateMember = updateMember;
    const updatePassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const updatePassword = yield Term.update({ email: email }, { password: password });
        return updatePassword;
    });
    exports.updatePassword = updatePassword;
});

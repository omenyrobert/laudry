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
    exports.getSingleTerm = exports.updateTerm = exports.deleteTerm = exports.createTerm = exports.getTerms = exports.Term = void 0;
    const typeorm_1 = require("typeorm");
    let Term = class Term extends typeorm_1.BaseEntity {
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Term.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Term.prototype, "from", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Term.prototype, "to", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Term.prototype, "term", void 0);
    Term = __decorate([
        (0, typeorm_1.Entity)()
    ], Term);
    exports.Term = Term;
    const getTerms = () => __awaiter(void 0, void 0, void 0, function* () {
        const terms = yield Term.find({
            order: {
                id: "DESC",
            },
        });
        return terms;
    });
    exports.getTerms = getTerms;
    const createTerm = (from, to, term) => __awaiter(void 0, void 0, void 0, function* () {
        const TermToInsert = yield Term.insert({ from: from, to: to, term: term });
        return TermToInsert;
    });
    exports.createTerm = createTerm;
    const deleteTerm = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const term = yield Term.delete(id);
        if (term) {
            return "Term Deleted";
        }
    });
    exports.deleteTerm = deleteTerm;
    const updateTerm = (id, from, to, term) => __awaiter(void 0, void 0, void 0, function* () {
        const TermToUpdate = yield Term.update(id, { from: from, to: to, term: term });
        return TermToUpdate;
    });
    exports.updateTerm = updateTerm;
    const getSingleTerm = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const term = yield Term.findOne({ where: { id: id } });
        return term;
    });
    exports.getSingleTerm = getSingleTerm;
});

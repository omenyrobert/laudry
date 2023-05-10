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
    exports.updateHouse = exports.deleteHouse = exports.getHouseByType = exports.getHouseById = exports.addHouse = exports.getHouses = exports.House = void 0;
    const typeorm_1 = require("typeorm");
    let House = class House extends typeorm_1.BaseEntity {
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], House.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], House.prototype, "house", void 0);
    House = __decorate([
        (0, typeorm_1.Entity)()
    ], House);
    exports.House = House;
    const getHouses = () => __awaiter(void 0, void 0, void 0, function* () {
        const Houses = yield House.find({
            order: {
                id: "DESC",
            },
        });
        return Houses;
    });
    exports.getHouses = getHouses;
    const addHouse = (house) => __awaiter(void 0, void 0, void 0, function* () {
        const HouseToAdd = yield House.insert({
            house: house,
        });
        return HouseToAdd;
    });
    exports.addHouse = addHouse;
    const getHouseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const HouseToFindById = yield House.findOne({ where: { id: id } });
        return HouseToFindById;
    });
    exports.getHouseById = getHouseById;
    const getHouseByType = (house) => __awaiter(void 0, void 0, void 0, function* () {
        const HouseToFindByType = yield House.findOne({
            where: { house: house },
        });
        return HouseToFindByType;
    });
    exports.getHouseByType = getHouseByType;
    const deleteHouse = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const HouseToDelete = yield House.delete(id);
        if (HouseToDelete) {
            return "Staff Type Deleted";
        }
    });
    exports.deleteHouse = deleteHouse;
    const updateHouse = (id, house) => __awaiter(void 0, void 0, void 0, function* () {
        const HouseToUpdate = yield House.update(id, { house: house });
        return HouseToUpdate;
    });
    exports.updateHouse = updateHouse;
});

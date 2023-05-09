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
        define(["require", "exports", "typeorm", "./StaffType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updatePassword = exports.updateMember = exports.getMemberByEmail = exports.getMemberById = exports.deleteStaffMember = exports.addStaffMember = exports.getStaffMembers = exports.Staff = void 0;
    const typeorm_1 = require("typeorm");
    const StaffType_1 = require("./StaffType");
    let Staff = class Staff extends typeorm_1.BaseEntity {
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Staff.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Staff.prototype, "first_name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Staff.prototype, "middle_name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Staff.prototype, "last_name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Staff.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(() => StaffType_1.StaffType, () => {
            onDelete: "CASCADE";
            onUpdate: "CASCADE";
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", StaffType_1.StaffType)
    ], Staff.prototype, "staff_type", void 0);
    __decorate([
        (0, typeorm_1.Column)({ select: false }),
        __metadata("design:type", String)
    ], Staff.prototype, "password", void 0);
    Staff = __decorate([
        (0, typeorm_1.Entity)()
    ], Staff);
    exports.Staff = Staff;
    const getStaffMembers = () => __awaiter(void 0, void 0, void 0, function* () {
        const staffMembers = yield Staff.find({
            order: {
                id: "DESC",
            },
            relations: {
                staff_type: true,
            },
        });
        return staffMembers;
    });
    exports.getStaffMembers = getStaffMembers;
    const addStaffMember = (email, last_name, first_name, middle_name, password, staffType) => __awaiter(void 0, void 0, void 0, function* () {
        const staffToAdd = yield Staff.insert({
            email: email,
            last_name: last_name,
            first_name: first_name,
            middle_name: middle_name,
            password: password,
            staff_type: staffType,
        });
        return staffToAdd;
    });
    exports.addStaffMember = addStaffMember;
    const deleteStaffMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const staffToDelete = yield Staff.delete(id);
        if (staffToDelete) {
            return "Staff Deleted";
        }
    });
    exports.deleteStaffMember = deleteStaffMember;
    const getMemberById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const staffToFindById = yield Staff.findOne({ where: { id: id } });
        return staffToFindById;
    });
    exports.getMemberById = getMemberById;
    const getMemberByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const staffToFindByEmail = yield Staff.findOne({
            where: { email: email },
            select: [
                "id",
                "email",
                "password",
                "first_name",
                "last_name",
                "middle_name",
            ],
        });
        return staffToFindByEmail;
    });
    exports.getMemberByEmail = getMemberByEmail;
    const updateMember = (id, email, last_name, first_name, middle_name, staffType) => __awaiter(void 0, void 0, void 0, function* () {
        const staffToUpdate = yield Staff.update(id, {
            email: email,
            last_name: last_name,
            first_name: first_name,
            middle_name: middle_name,
            staff_type: staffType,
        });
        return staffToUpdate;
    });
    exports.updateMember = updateMember;
    const updatePassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const updatePassword = yield Staff.update({ email: email }, { password: password });
        return updatePassword;
    });
    exports.updatePassword = updatePassword;
});

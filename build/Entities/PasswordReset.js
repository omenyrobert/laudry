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
        define(["require", "exports", "typeorm", "../Helpers/Helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.findByCode = exports.deleteToken = exports.findByEmail = exports.createNewToken = exports.PasswordReset = void 0;
    require("dotenv").config();
    const typeorm_1 = require("typeorm");
    const Helpers_1 = require("../Helpers/Helpers");
    let PasswordReset = class PasswordReset extends typeorm_1.BaseEntity {
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], PasswordReset.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PasswordReset.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PasswordReset.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PasswordReset.prototype, "token", void 0);
    PasswordReset = __decorate([
        (0, typeorm_1.Entity)()
    ], PasswordReset);
    exports.PasswordReset = PasswordReset;
    const createNewToken = (email, token, code) => __awaiter(void 0, void 0, void 0, function* () {
        const createToken = yield PasswordReset.insert({
            email: email,
            token: token,
            code: code,
        });
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "Password Reset Code",
            html: `Hello  your  password reset code is <p><b>${code}</b></p>`,
        };
        const mailTransport = (0, Helpers_1.mailTransporter)(process.env.MAIL_USER, process.env.MAIL_PASSWORD);
        mailTransport
            .sendMail(mailOptions)
            .then(() => { })
            .catch((error) => console.log(error));
        return createToken;
    });
    exports.createNewToken = createNewToken;
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const tokenToFind = yield PasswordReset.findOne({ where: { email: email } });
        return tokenToFind;
    });
    exports.findByEmail = findByEmail;
    const deleteToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const tokenToDelete = yield PasswordReset.delete(id);
        if (tokenToDelete) {
            return "Delete token";
        }
    });
    exports.deleteToken = deleteToken;
    const findByCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
        const tokenToFind = yield PasswordReset.findOne({ where: { code: code } });
        return tokenToFind;
    });
    exports.findByCode = findByCode;
});

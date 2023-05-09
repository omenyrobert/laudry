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
        define(["require", "exports", "bcrypt", "jsonwebtoken", "nodemailer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mailTransporter = exports.setTokenExpiryToZero = exports.decodeToken = exports.invalidateToken = exports.verifyAuthAccessToken = exports.getAuthRefreshToken = exports.getAuthAccessToken = exports.validatePassword = exports.hashPassword = exports.randomStringGenerator = exports.customPayloadResponse = void 0;
    const bcrypt_1 = require("bcrypt");
    const jsonwebtoken_1 = require("jsonwebtoken");
    const nodemailer_1 = require("nodemailer");
    const customPayloadResponse = (status, payload) => {
        return {
            status: status,
            payload: payload,
        };
    };
    exports.customPayloadResponse = customPayloadResponse;
    const randomStringGenerator = (length) => {
        let result = "";
        const characters = "A0B1C2D3E4F5G6H7I8J9K0LMNOPQRSTUVWXYZ";
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    };
    exports.randomStringGenerator = randomStringGenerator;
    const hashPassword = (password, rounds) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashedPassword = yield (0, bcrypt_1.hash)(password, rounds);
            return hashedPassword;
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.hashPassword = hashPassword;
    const validatePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield (0, bcrypt_1.compare)(password, hashedPassword);
            return result;
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.validatePassword = validatePassword;
    const getAuthAccessToken = (user, token) => {
        const accessToken = (0, jsonwebtoken_1.sign)(JSON.parse(JSON.stringify(user)), token, {
            expiresIn: "1d",
        });
        return accessToken;
    };
    exports.getAuthAccessToken = getAuthAccessToken;
    const getAuthRefreshToken = (user, token) => {
        const refreshToken = (0, jsonwebtoken_1.sign)(JSON.parse(JSON.stringify(user)), token, {
            expiresIn: "2d",
        });
        return refreshToken;
    };
    exports.getAuthRefreshToken = getAuthRefreshToken;
    const verifyAuthAccessToken = (token, secret) => {
        const verifiedToken = (0, jsonwebtoken_1.verify)(token, secret);
        return verifiedToken;
    };
    exports.verifyAuthAccessToken = verifyAuthAccessToken;
    const invalidateToken = (modifiedLoad, secret) => {
        const newToken = (0, jsonwebtoken_1.sign)(modifiedLoad, secret);
        return newToken;
    };
    exports.invalidateToken = invalidateToken;
    const decodeToken = (token) => {
        const decodeToken = (0, jsonwebtoken_1.decode)(token);
        return decodeToken;
    };
    exports.decodeToken = decodeToken;
    const setTokenExpiryToZero = (decodedToken) => {
        const modifiedPayload = Object.assign(Object.assign({}, decodedToken), { exp: 0 });
        return modifiedPayload;
    };
    exports.setTokenExpiryToZero = setTokenExpiryToZero;
    const mailTransporter = (email, password) => {
        const transporter = (0, nodemailer_1.createTransport)({
            host: "smtp.gmail.com",
            port: 465,
            secure: false,
            service: "gmail",
            auth: {
                user: email,
                pass: password,
            },
        });
        return transporter;
    };
    exports.mailTransporter = mailTransporter;
});

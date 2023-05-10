var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "crypto", "../Entities/Staff", "../Entities/PasswordReset", "../Helpers/Helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCodeForReset = exports.passwordResetRequest = exports.getAuthenticatedUser = exports.handleLogout = exports.handleLogin = void 0;
    require("dotenv").config();
    const crypto_1 = __importDefault(require("crypto"));
    const Staff_1 = require("../Entities/Staff");
    const PasswordReset_1 = require("../Entities/PasswordReset");
    const Helpers_1 = require("../Helpers/Helpers");
    const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Email Required"))
                    .status(200)
                    .end();
            }
            if (!password) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Password Required"))
                    .status(200)
                    .end();
            }
            const user = yield (0, Staff_1.getMemberByEmail)(email);
            if (!user) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Incorrect Email or Password"))
                    .status(200)
                    .end();
            }
            else {
                const validatedPassword = yield (0, Helpers_1.validatePassword)(password, user.password);
                const findUserById = yield (0, Staff_1.getMemberById)(user.id);
                if (!validatedPassword) {
                    return res
                        .json((0, Helpers_1.customPayloadResponse)(false, "Incorrect Email or Password"))
                        .status(200)
                        .end();
                }
                if (findUserById) {
                    const accessToken = (0, Helpers_1.getAuthAccessToken)(findUserById, process.env.ACCESS_TOKEN_SECRET);
                    const response = {
                        token: accessToken,
                        user: findUserById,
                    };
                    return res
                        .json((0, Helpers_1.customPayloadResponse)(true, response))
                        .status(200)
                        .end();
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.handleLogin = handleLogin;
    const handleLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const decoded = (0, Helpers_1.decodeToken)(token);
            const modifiedJWTLoad = (0, Helpers_1.setTokenExpiryToZero)(decoded);
            const newToken = (0, Helpers_1.invalidateToken)(modifiedJWTLoad, process.env.ACCESS_TOKEN_SECRET);
            return res.json((0, Helpers_1.customPayloadResponse)(true, { logoutToken: newToken }));
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.handleLogout = handleLogout;
    const getAuthenticatedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authenticatedUser = yield (0, Staff_1.getMemberById)(req.user.id);
            return res.json((0, Helpers_1.customPayloadResponse)(true, authenticatedUser));
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.getAuthenticatedUser = getAuthenticatedUser;
    const passwordResetRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            const resetToken = crypto_1.default.randomBytes(64).toString("hex");
            const code = (0, Helpers_1.randomStringGenerator)(6);
            if (!email) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Email Required"))
                    .status(200)
                    .end();
            }
            const user = yield (0, Staff_1.getMemberByEmail)(email);
            if (!user) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Email Does Not Exist"))
                    .status(200)
                    .end();
            }
            const findToken = yield (0, PasswordReset_1.findByEmail)(email);
            if (findToken) {
                yield (0, PasswordReset_1.deleteToken)(findToken.id);
                yield (0, PasswordReset_1.createNewToken)(email, resetToken, code);
                return res
                    .json((0, Helpers_1.customPayloadResponse)(true, { email: email, token: resetToken }))
                    .status(200)
                    .end();
            }
            else {
                yield (0, PasswordReset_1.createNewToken)(email, resetToken, code);
                return res
                    .json((0, Helpers_1.customPayloadResponse)(true, { email: email, token: resetToken }))
                    .status(200)
                    .end();
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.passwordResetRequest = passwordResetRequest;
    const getCodeForReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { code } = req.body;
            if (!code) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Code Required"))
                    .status(200)
                    .end();
            }
            const tokenCode = yield (0, PasswordReset_1.findByCode)(code);
            if (tokenCode) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(true, { email: tokenCode.email }))
                    .status(200)
                    .end();
            }
            else {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Wrong Code"))
                    .status(200)
                    .end();
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.getCodeForReset = getCodeForReset;
});

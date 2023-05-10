(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Helpers/Helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JWTAuthMiddleWare = void 0;
    require("dotenv").config();
    const Helpers_1 = require("../Helpers/Helpers");
    const JWTAuthMiddleWare = (req, res, next) => {
        var _a, _b;
        try {
            const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
            if (!token) {
                return res
                    .status(401)
                    .json((0, Helpers_1.customPayloadResponse)(false, "Token Expired"));
            }
            const decoded = (0, Helpers_1.verifyAuthAccessToken)(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded;
            next();
        }
        catch (error) {
            return res.status(401).json((0, Helpers_1.customPayloadResponse)(false, "Invalid Token"));
        }
    };
    exports.JWTAuthMiddleWare = JWTAuthMiddleWare;
});

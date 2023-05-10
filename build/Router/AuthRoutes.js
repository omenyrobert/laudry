(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Controllers/AuthenticationController", "../Middlewares/AuthMiddleware"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const AuthenticationController_1 = require("../Controllers/AuthenticationController");
    const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
    exports.default = (router) => {
        const authPrefix = "/auth";
        router.post(`${authPrefix}/login`, AuthenticationController_1.handleLogin);
        router.get(`${authPrefix}/user`, AuthMiddleware_1.JWTAuthMiddleWare, AuthenticationController_1.getAuthenticatedUser);
        router.get(`${authPrefix}/logout`, AuthMiddleware_1.JWTAuthMiddleWare, AuthenticationController_1.handleLogout);
        router.post(`${authPrefix}/reset-password-request`, AuthenticationController_1.passwordResetRequest);
        router.post(`${authPrefix}/submit-code`, AuthenticationController_1.getCodeForReset);
    };
});

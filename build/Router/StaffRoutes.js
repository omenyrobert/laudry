(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Controllers/StaffController", "../Middlewares/AuthMiddleware"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const StaffController_1 = require("../Controllers/StaffController");
    const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
    exports.default = (router) => {
        const staffPrefix = "/staff";
        router.get(`${staffPrefix}`, AuthMiddleware_1.JWTAuthMiddleWare, StaffController_1.fetchMembers);
        router.post(`${staffPrefix}`, AuthMiddleware_1.JWTAuthMiddleWare, StaffController_1.createStaffMember);
        router.put(`${staffPrefix}`, AuthMiddleware_1.JWTAuthMiddleWare, StaffController_1.modifyStaffMember);
        router.delete(`${staffPrefix}/:id`, AuthMiddleware_1.JWTAuthMiddleWare, StaffController_1.removeStaffMember);
        router.post(`${staffPrefix}/reset-password`, StaffController_1.passwordUpdate);
    };
});

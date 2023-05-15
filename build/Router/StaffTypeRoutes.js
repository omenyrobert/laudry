(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Controllers/StaffTypesController", "../Middlewares/AuthMiddleware"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const StaffTypesController_1 = require("../Controllers/StaffTypesController");
    const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
    exports.default = (router) => {
        const staffTypePrefix = "/staffTypes";
        router.get(`${staffTypePrefix}`, AuthMiddleware_1.JWTAuthMiddleWare, StaffTypesController_1.fetchStaffTypes);
        router.post(`${staffTypePrefix}`, AuthMiddleware_1.JWTAuthMiddleWare, StaffTypesController_1.createStaffType);
        router.put(`${staffTypePrefix}`, AuthMiddleware_1.JWTAuthMiddleWare, StaffTypesController_1.modifyStaffType);
        router.delete(`${staffTypePrefix}/:id`, AuthMiddleware_1.JWTAuthMiddleWare, StaffTypesController_1.removeStaffType);
    };
});

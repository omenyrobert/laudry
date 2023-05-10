(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Controllers/ClassController", "../Middlewares/AuthMiddleware"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ClassController_1 = require("../Controllers/ClassController");
    const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
    exports.default = (router) => {
        const classPrefix = "/class";
        router.get(`${classPrefix}`, AuthMiddleware_1.JWTAuthMiddleWare, ClassController_1.fetchClasses);
        router.post(`${classPrefix}`, AuthMiddleware_1.JWTAuthMiddleWare, ClassController_1.addClass);
        router.put(`${classPrefix}`, AuthMiddleware_1.JWTAuthMiddleWare, ClassController_1.modifyClass);
        router.delete(`${classPrefix}/:id`, AuthMiddleware_1.JWTAuthMiddleWare, ClassController_1.removeClass);
    };
});

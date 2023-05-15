(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Controllers/SectionsController", "../Middlewares/AuthMiddleware"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SectionsController_1 = require("../Controllers/SectionsController");
    const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
    exports.default = (router) => {
        const sectionPrefix = "/sections";
        router.get(`${sectionPrefix}`, AuthMiddleware_1.JWTAuthMiddleWare, SectionsController_1.fetchSections);
        router.post(`${sectionPrefix}`, AuthMiddleware_1.JWTAuthMiddleWare, SectionsController_1.addSection);
        router.put(`${sectionPrefix}`, AuthMiddleware_1.JWTAuthMiddleWare, SectionsController_1.modifySection);
        router.delete(`${sectionPrefix}/:id`, AuthMiddleware_1.JWTAuthMiddleWare, SectionsController_1.removeSection);
    };
});

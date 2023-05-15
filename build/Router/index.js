var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "./StreamRoutes", "./StaffTypeRoutes", "./StaffRoutes", "./AuthRoutes", "./SectionRoutes", "./ClassRoutes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const express_1 = require("express");
    const StreamRoutes_1 = __importDefault(require("./StreamRoutes"));
    const StaffTypeRoutes_1 = __importDefault(require("./StaffTypeRoutes"));
    const StaffRoutes_1 = __importDefault(require("./StaffRoutes"));
    const AuthRoutes_1 = __importDefault(require("./AuthRoutes"));
    const SectionRoutes_1 = __importDefault(require("./SectionRoutes"));
    const ClassRoutes_1 = __importDefault(require("./ClassRoutes"));
    const router = (0, express_1.Router)();
    exports.default = () => {
        (0, StreamRoutes_1.default)(router);
        (0, StaffTypeRoutes_1.default)(router);
        (0, StaffRoutes_1.default)(router);
        (0, AuthRoutes_1.default)(router);
        (0, SectionRoutes_1.default)(router);
        (0, ClassRoutes_1.default)(router);
        return router;
    };
});

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
        define(["require", "exports", "../Entities/SchoolClass", "../Helpers/Helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.removeClass = exports.modifyClass = exports.addClass = exports.fetchClasses = void 0;
    const SchoolClass_1 = require("../Entities/SchoolClass");
    const Helpers_1 = require("../Helpers/Helpers");
    const fetchClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const classes = yield (0, SchoolClass_1.getClasses)();
            return res.json((0, Helpers_1.customPayloadResponse)(true, classes)).status(200).end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.fetchClasses = fetchClasses;
    const addClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, stream } = req.body;
            if (!name) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Class name Required"))
                    .status(200)
                    .end();
            }
            yield (0, SchoolClass_1.createClass)(name, stream);
            return res
                .json((0, Helpers_1.customPayloadResponse)(true, "Class Added"))
                .status(200)
                .end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.addClass = addClass;
    const modifyClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, classId, stream } = req.body;
            if (!name) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Class name Required"))
                    .status(200)
                    .end();
            }
            if (!classId) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Class Id Required"))
                    .status(200)
                    .end();
            }
            const classToModify = yield (0, SchoolClass_1.getClassById)(classId);
            if (classToModify) {
                yield (0, SchoolClass_1.updateClass)(classId, name, stream);
                return res
                    .json((0, Helpers_1.customPayloadResponse)(true, "Class Updated"))
                    .status(200)
                    .end();
            }
            return res
                .json((0, Helpers_1.customPayloadResponse)(false, "Class not Updated"))
                .status(200)
                .end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.modifyClass = modifyClass;
    const removeClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const classId = parseInt(req.params.id);
            const classToDelete = yield (0, SchoolClass_1.getClassById)(classId);
            if (classToDelete) {
                yield (0, SchoolClass_1.deleteClassById)(classId);
                return res
                    .json((0, Helpers_1.customPayloadResponse)(true, "Class Deleted"))
                    .status(200)
                    .end();
            }
            return res
                .json((0, Helpers_1.customPayloadResponse)(false, "Class not Found"))
                .status(200)
                .end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.removeClass = removeClass;
});

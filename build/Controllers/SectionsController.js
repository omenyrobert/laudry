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
        define(["require", "exports", "../Entities/Section", "../Helpers/Helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.removeSection = exports.modifySection = exports.addSection = exports.fetchSections = void 0;
    const Section_1 = require("../Entities/Section");
    const Helpers_1 = require("../Helpers/Helpers");
    const fetchSections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const sections = yield (0, Section_1.getSections)();
            return res.json((0, Helpers_1.customPayloadResponse)(true, sections)).status(200).end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.fetchSections = fetchSections;
    const addSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { section } = req.body;
            if (!section) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Section Required"))
                    .status(200)
                    .end();
            }
            yield (0, Section_1.createSections)(section);
            return res
                .json((0, Helpers_1.customPayloadResponse)(true, "Section Added"))
                .status(200)
                .end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.addSection = addSection;
    const modifySection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { sectionId, section } = req.body;
            if (!section) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Section Required"))
                    .status(200)
                    .end();
            }
            if (!sectionId) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Section Id Required"))
                    .status(200)
                    .end();
            }
            const sectionToUpdate = yield (0, Section_1.getSingleSections)(sectionId);
            if (sectionToUpdate) {
                yield (0, Section_1.updateSections)(sectionId, section);
                return res
                    .json((0, Helpers_1.customPayloadResponse)(true, "Section Updated"))
                    .status(200)
                    .end();
            }
            return res
                .json((0, Helpers_1.customPayloadResponse)(false, "Section not Updated"))
                .status(200)
                .end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.modifySection = modifySection;
    const removeSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const sectionId = parseInt(req.params.id);
            const sectionToDelete = yield (0, Section_1.getSingleSections)(sectionId);
            if (sectionToDelete) {
                yield (0, Section_1.deleteSections)(sectionId);
                return res
                    .json((0, Helpers_1.customPayloadResponse)(true, "Section Deleted"))
                    .status(200)
                    .end();
            }
            return res
                .json((0, Helpers_1.customPayloadResponse)(false, "Section not Found"))
                .status(200)
                .end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.removeSection = removeSection;
});

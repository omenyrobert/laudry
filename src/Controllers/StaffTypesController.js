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
        define(["require", "exports", "../Entities/StaffType", "../Helpers/Helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.removeStaffType = exports.modifyStaffType = exports.createStaffType = exports.fetchStaffTypes = void 0;
    const StaffType_1 = require("../Entities/StaffType");
    const Helpers_1 = require("../Helpers/Helpers");
    const fetchStaffTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const staffTypes = yield (0, StaffType_1.getStaffTypes)();
            return res.json((0, Helpers_1.customPayloadResponse)(true, staffTypes)).status(200).end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.fetchStaffTypes = fetchStaffTypes;
    const createStaffType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { staffType } = req.body;
            const findType = yield (0, StaffType_1.getStaffTypeByType)(staffType);
            if (findType) {
                return res.json((0, Helpers_1.customPayloadResponse)(false, "Type Exists"));
            }
            const insertType = yield (0, StaffType_1.addStaffType)(staffType);
            if (insertType) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(true, "Type Added"))
                    .status(200)
                    .end();
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.createStaffType = createStaffType;
    const modifyStaffType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { staffType, typeId } = req.body;
            if (!staffType) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Staff Type Required"))
                    .status(200)
                    .end();
            }
            if (!typeId) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Staff Type Id Required"))
                    .status(200)
                    .end();
            }
            const typeUpdate = yield (0, StaffType_1.getStaffTypeById)(typeId);
            if (typeUpdate) {
                yield (0, StaffType_1.updateStaffType)(typeId, staffType);
                return res
                    .json((0, Helpers_1.customPayloadResponse)(true, "Staff Type Updated"))
                    .status(200)
                    .end();
            }
            return res
                .json((0, Helpers_1.customPayloadResponse)(false, "Staff Type not Found"))
                .status(200)
                .end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.modifyStaffType = modifyStaffType;
    const removeStaffType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const staffTypeId = parseInt(req.params.id);
            const staffType = yield (0, StaffType_1.getStaffTypeById)(staffTypeId);
            if (staffType) {
                yield (0, StaffType_1.deleteStaffType)(staffTypeId);
                return res
                    .json((0, Helpers_1.customPayloadResponse)(true, "Staff Type Deleted"))
                    .status(200)
                    .end();
            }
            return res
                .json((0, Helpers_1.customPayloadResponse)(false, "Staff Type not Found"))
                .status(200)
                .end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.removeStaffType = removeStaffType;
});

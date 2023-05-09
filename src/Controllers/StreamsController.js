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
        define(["require", "exports", "../Entities/Stream", "../Helpers/Helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.removeStream = exports.modifyStream = exports.addStream = exports.fetchStreams = void 0;
    const Stream_1 = require("../Entities/Stream");
    const Helpers_1 = require("../Helpers/Helpers");
    const fetchStreams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const streams = yield (0, Stream_1.getStreams)();
            return res.json((0, Helpers_1.customPayloadResponse)(true, streams)).status(200).end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.fetchStreams = fetchStreams;
    const addStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { stream } = req.body;
            if (!stream) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Stream Required"))
                    .status(200)
                    .end();
            }
            yield (0, Stream_1.createStream)(stream);
            return res
                .json((0, Helpers_1.customPayloadResponse)(true, "Stream Added"))
                .status(200)
                .end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.addStream = addStream;
    const modifyStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { streamId, stream } = req.body;
            if (!stream) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Stream Required"))
                    .status(200)
                    .end();
            }
            if (!streamId) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Stream Id Required"))
                    .status(200)
                    .end();
            }
            const streamToUpdate = yield (0, Stream_1.getSingleStream)(streamId);
            if (streamToUpdate) {
                yield (0, Stream_1.updateStream)(streamId, stream);
                return res
                    .json((0, Helpers_1.customPayloadResponse)(true, "Stream Updated"))
                    .status(200)
                    .end();
            }
            return res
                .json((0, Helpers_1.customPayloadResponse)(false, "Stream not Updated"))
                .status(200)
                .end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.modifyStream = modifyStream;
    const removeStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const streamId = parseInt(req.params.id);
            const streamToDelete = yield (0, Stream_1.getSingleStream)(streamId);
            if (streamToDelete) {
                yield (0, Stream_1.deleteStream)(streamId);
                return res
                    .json((0, Helpers_1.customPayloadResponse)(true, "Stream Deleted"))
                    .status(200)
                    .end();
            }
            return res
                .json((0, Helpers_1.customPayloadResponse)(false, "Stream not Found"))
                .status(200)
                .end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.removeStream = removeStream;
});

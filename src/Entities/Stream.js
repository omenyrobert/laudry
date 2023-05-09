var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
        define(["require", "exports", "typeorm"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSingleStream = exports.updateStream = exports.deleteStream = exports.createStream = exports.getStreams = exports.Stream = void 0;
    const typeorm_1 = require("typeorm");
    let Stream = class Stream extends typeorm_1.BaseEntity {
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Stream.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Stream.prototype, "stream", void 0);
    Stream = __decorate([
        (0, typeorm_1.Entity)()
    ], Stream);
    exports.Stream = Stream;
    const getStreams = () => __awaiter(void 0, void 0, void 0, function* () {
        const streams = yield Stream.find({
            order: {
                id: "DESC",
            },
        });
        return streams;
    });
    exports.getStreams = getStreams;
    const createStream = (stream) => __awaiter(void 0, void 0, void 0, function* () {
        const streamToInsert = yield Stream.insert({ stream: stream });
        return streamToInsert;
    });
    exports.createStream = createStream;
    const deleteStream = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const stream = yield Stream.delete(id);
        if (stream) {
            return "Stream Deleted";
        }
    });
    exports.deleteStream = deleteStream;
    const updateStream = (id, stream) => __awaiter(void 0, void 0, void 0, function* () {
        const streamToUpdate = yield Stream.update(id, { stream: stream });
        return streamToUpdate;
    });
    exports.updateStream = updateStream;
    const getSingleStream = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const stream = yield Stream.findOne({ where: { id: id } });
        return stream;
    });
    exports.getSingleStream = getSingleStream;
});

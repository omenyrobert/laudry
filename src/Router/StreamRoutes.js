(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Controllers/StreamsController", "../Middlewares/AuthMiddleware"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const StreamsController_1 = require("../Controllers/StreamsController");
    const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
    exports.default = (router) => {
        const streamPrefix = "/streams";
        router.get(`${streamPrefix}`, AuthMiddleware_1.JWTAuthMiddleWare, StreamsController_1.fetchStreams);
        router.post(`${streamPrefix}`, AuthMiddleware_1.JWTAuthMiddleWare, StreamsController_1.addStream);
        router.put(`${streamPrefix}`, AuthMiddleware_1.JWTAuthMiddleWare, StreamsController_1.modifyStream);
        router.delete(`${streamPrefix}/:id`, AuthMiddleware_1.JWTAuthMiddleWare, StreamsController_1.removeStream);
    };
});

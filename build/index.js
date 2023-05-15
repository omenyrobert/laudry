var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "./Router", "./Database/database", "cors", "path", "cookie-parser"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const express_1 = __importDefault(require("express"));
    const Router_1 = __importDefault(require("./Router"));
    const database_1 = require("./Database/database");
    const cors_1 = __importDefault(require("cors"));
    const path_1 = __importDefault(require("path"));
    const cookie_parser_1 = __importDefault(require("cookie-parser"));
    const app = (0, express_1.default)();
    const PORT = process.env.PORT || 3001;
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use("/api", (0, Router_1.default)());
    app.use(express_1.default.static(path_1.default.join(__dirname, "SchoolSheet/build")));
    // Catch-all route for handling SchoolSheet-side routing
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "SchoolSheet/build", "index.html"));
    });
    database_1.DatabaseConnection.initialize()
        .then(() => {
        console.log("Database Connection Successful");
    })
        .catch((error) => {
        console.log(error);
    });
    app.listen(PORT, () => {
        console.log(`Server Running on http://localhost:${PORT}`);
    });
});

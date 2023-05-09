(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "typeorm", "../Entities/Staff", "../Entities/Stream", "../Entities/StaffType", "../Entities/SchoolClass", "../Entities/PasswordReset", "../Entities/Section", "../Entities/Term", "../Entities/Subject", "../Entities/Grade", "../Entities/StudentType", "../Entities/House"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DatabaseConnection = void 0;
    const typeorm_1 = require("typeorm");
    const Staff_1 = require("../Entities/Staff");
    const Stream_1 = require("../Entities/Stream");
    const StaffType_1 = require("../Entities/StaffType");
    const SchoolClass_1 = require("../Entities/SchoolClass");
    const PasswordReset_1 = require("../Entities/PasswordReset");
    const Section_1 = require("../Entities/Section");
    const Term_1 = require("../Entities/Term");
    const Subject_1 = require("../Entities/Subject");
    const Grade_1 = require("../Entities/Grade");
    const StudentType_1 = require("../Entities/StudentType");
    const House_1 = require("../Entities/House");
    exports.DatabaseConnection = new typeorm_1.DataSource({
        // host: "sql865.main-hosting.eu",
        // type: "mysql",
        // username: "u848751863_school",
        // password: "@Jollyjoe123",
        // database: "u848751863_school",
        host: "sql865.main-hosting.eu",
        type: "mysql",
        username: "u848751863_school",
        password: "@Jollyjoe123",
        database: "u848751863_school",
        logging: false,
        synchronize: true,
        entities: [Stream_1.Stream, StudentType_1.StudentType, House_1.House, SchoolClass_1.SchoolClass, Grade_1.Grade, Subject_1.Subject, StaffType_1.StaffType, Staff_1.Staff, PasswordReset_1.PasswordReset, Section_1.Section, Term_1.Term],
    });
});

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
        define(["require", "exports", "../Helpers/Helpers", "../Entities/Staff"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.passwordUpdate = exports.modifyStaffMember = exports.removeStaffMember = exports.createStaffMember = exports.fetchMembers = void 0;
    require("dotenv").config();
    const Helpers_1 = require("../Helpers/Helpers");
    const Staff_1 = require("../Entities/Staff");
    const fetchMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const members = yield (0, Staff_1.getStaffMembers)();
            return res.json((0, Helpers_1.customPayloadResponse)(true, members)).status(200).end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.fetchMembers = fetchMembers;
    const createStaffMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { firstName, lastName, email, middleName, staffType } = req.body;
            if (!firstName) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "First Name Required"))
                    .status(200)
                    .end();
            }
            if (!lastName) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Last Name Required"))
                    .status(200)
                    .end();
            }
            if (!email) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Email Required"))
                    .status(200)
                    .end();
            }
            const staffMemberByEmail = yield (0, Staff_1.getMemberByEmail)(email);
            if (staffMemberByEmail) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Email Taken!!"))
                    .status(200)
                    .end();
            }
            const password = (0, Helpers_1.randomStringGenerator)(10);
            const hashPwd = yield (0, Helpers_1.hashPassword)(password, 10);
            const insertMember = yield (0, Staff_1.addStaffMember)(email, lastName, firstName, middleName, hashPwd, staffType);
            if (insertMember) {
                const mailOptions = {
                    from: process.env.MAIL_USER,
                    to: email,
                    subject: "Temporary Password",
                    html: `Hello ${firstName} your temporary password is <p><b>${password}</b></p>`,
                };
                const mailTransport = (0, Helpers_1.mailTransporter)(process.env.MAIL_USER, process.env.MAIL_PASSWORD);
                mailTransport
                    .sendMail(mailOptions)
                    .then(() => { })
                    .catch((error) => console.log(error));
                return res
                    .json((0, Helpers_1.customPayloadResponse)(true, "Member Added"))
                    .status(200)
                    .end();
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.createStaffMember = createStaffMember;
    const removeStaffMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const staffId = parseInt(req.params.id);
            const staff = yield (0, Staff_1.getMemberById)(staffId);
            if (staff) {
                yield (0, Staff_1.deleteStaffMember)(staffId);
                return res
                    .json((0, Helpers_1.customPayloadResponse)(true, "Staff Deleted"))
                    .status(200)
                    .end();
            }
            return res
                .json((0, Helpers_1.customPayloadResponse)(false, "Staff not Found"))
                .status(200)
                .end();
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.removeStaffMember = removeStaffMember;
    const modifyStaffMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { firstName, lastName, email, middleName, staffType, staffId } = req.body;
            if (!firstName) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "First Name Required"))
                    .status(200)
                    .end();
            }
            if (!lastName) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Last Name Required"))
                    .status(200)
                    .end();
            }
            if (!email) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Email Required"))
                    .status(200)
                    .end();
            }
            if (!staffId) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Staff Id Required"))
                    .status(200)
                    .end();
            }
            const staff = yield (0, Staff_1.getMemberById)(staffId);
            if (staff) {
                const staffMember = yield (0, Staff_1.updateMember)(staffId, email, lastName, firstName, middleName, staffType);
                if (staffMember) {
                    return res
                        .json((0, Helpers_1.customPayloadResponse)(true, "Staff Updated"))
                        .status(200)
                        .end();
                }
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Staff not Found"))
                    .status(200)
                    .end();
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.modifyStaffMember = modifyStaffMember;
    const passwordUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { password, confirm_password, email } = req.body;
            if (!password) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Password is required"))
                    .status(200)
                    .end();
            }
            if (!confirm_password) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Confirm Password is required"))
                    .status(200)
                    .end();
            }
            if (!email) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Email is required"))
                    .status(200)
                    .end();
            }
            if (password !== confirm_password) {
                return res
                    .json((0, Helpers_1.customPayloadResponse)(false, "Password Mismatch"))
                    .status(200)
                    .end();
            }
            if (password === confirm_password) {
                const user = yield (0, Staff_1.getMemberByEmail)(email);
                if (user) {
                    const hashPwd = yield (0, Helpers_1.hashPassword)(password, 10);
                    const passwordUpdate = yield (0, Staff_1.updatePassword)(email, hashPwd);
                    if (passwordUpdate) {
                        return res
                            .json((0, Helpers_1.customPayloadResponse)(true, "Password Updated"))
                            .status(200)
                            .end();
                    }
                }
                else {
                    return res
                        .json((0, Helpers_1.customPayloadResponse)(false, "Password Cannot Be Changed"))
                        .status(200)
                        .end();
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    exports.passwordUpdate = passwordUpdate;
});

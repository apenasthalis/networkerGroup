"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = createAdmin;
exports.getAdmins = getAdmins;
exports.getAdminById = getAdminById;
exports.updateAdmin = updateAdmin;
exports.deleteAdmin = deleteAdmin;
const PrismaClient_1 = __importDefault(require("../database/PrismaClient"));
async function createAdmin(data) {
    return PrismaClient_1.default.admin.create({ data });
}
async function getAdmins() {
    return PrismaClient_1.default.admin.findMany();
}
async function getAdminById(public_id) {
    return PrismaClient_1.default.admin.findUnique({ where: { public_id } });
}
async function updateAdmin(public_id, data) {
    return PrismaClient_1.default.admin.update({
        where: { public_id },
        data,
    });
}
async function deleteAdmin(public_id) {
    return PrismaClient_1.default.admin.delete({ where: { public_id } });
}
//# sourceMappingURL=adminService.js.map
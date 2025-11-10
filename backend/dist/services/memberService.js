"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMember = createMember;
exports.getMembers = getMembers;
exports.getMemberById = getMemberById;
exports.updateMember = updateMember;
exports.deleteMember = deleteMember;
const PrismaClient_1 = __importDefault(require("../database/PrismaClient"));
async function createMember(data) {
    return PrismaClient_1.default.member.create({ data });
}
async function getMembers() {
    return PrismaClient_1.default.member.findMany();
}
async function getMemberById(public_id) {
    return PrismaClient_1.default.member.findUnique({ where: { public_id } });
}
async function updateMember(public_id, data) {
    return PrismaClient_1.default.member.update({
        where: { public_id },
        data,
    });
}
async function deleteMember(public_id) {
    return PrismaClient_1.default.member.delete({ where: { public_id } });
}
//# sourceMappingURL=memberService.js.map
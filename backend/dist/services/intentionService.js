"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIntention = createIntention;
exports.getIntentions = getIntentions;
exports.getIntentionById = getIntentionById;
exports.updateIntention = updateIntention;
exports.deleteIntention = deleteIntention;
const PrismaClient_1 = __importDefault(require("../database/PrismaClient"));
async function createIntention(data) {
    return PrismaClient_1.default.intention.create({ data });
}
async function getIntentions() {
    return PrismaClient_1.default.intention.findMany();
}
async function getIntentionById(public_id) {
    return PrismaClient_1.default.intention.findUnique({ where: { public_id } });
}
async function updateIntention(public_id, data) {
    return PrismaClient_1.default.intention.update({
        where: { public_id },
        data,
    });
}
async function deleteIntention(public_id) {
    return PrismaClient_1.default.intention.delete({ where: { public_id } });
}
//# sourceMappingURL=intentionService.js.map
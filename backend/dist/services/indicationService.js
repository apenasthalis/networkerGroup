"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIndication = createIndication;
exports.getIndications = getIndications;
exports.getIndicationById = getIndicationById;
exports.updateIndication = updateIndication;
exports.deleteIndication = deleteIndication;
const PrismaClient_1 = __importDefault(require("../database/PrismaClient"));
async function createIndication(data) {
    return PrismaClient_1.default.indication.create({ data });
}
async function getIndications() {
    return PrismaClient_1.default.indication.findMany();
}
async function getIndicationById(public_id) {
    return PrismaClient_1.default.indication.findUnique({ where: { public_id } });
}
async function updateIndication(public_id, data) {
    return PrismaClient_1.default.indication.update({
        where: { public_id },
        data,
    });
}
async function deleteIndication(public_id) {
    return PrismaClient_1.default.indication.delete({ where: { public_id } });
}
//# sourceMappingURL=indicationService.js.map
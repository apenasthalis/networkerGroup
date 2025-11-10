"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.getAll = getAll;
exports.getById = getById;
exports.update = update;
exports.remove = remove;
const adminService = __importStar(require("../services/adminService"));
async function create(req, res) {
    try {
        const admin = await adminService.createAdmin(req.body);
        res.status(201).json(admin);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function getAll(req, res) {
    const admins = await adminService.getAdmins();
    res.json(admins);
}
async function getById(req, res) {
    const publicId = String(req.params.publicId);
    const admin = await adminService.getAdminById(publicId);
    if (!admin)
        return res.status(404).json({ error: 'Admin não encontrado' });
    res.json(admin);
}
async function update(req, res) {
    const publicId = String(req.params.publicId);
    try {
        const admin = await adminService.updateAdmin(publicId, req.body);
        res.json(admin);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function remove(req, res) {
    const publicId = String(req.params.publicId);
    try {
        await adminService.deleteAdmin(publicId);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//# sourceMappingURL=adminController.js.map
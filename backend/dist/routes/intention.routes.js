"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const intentionController_1 = __importDefault(require("../controllers/intentionController"));
const router = (0, express_1.Router)();
router.get("/", intentionController_1.default.list);
router.get("/:id", intentionController_1.default.getById);
router.post("/", intentionController_1.default.create);
exports.default = router;
//# sourceMappingURL=intention.routes.js.map
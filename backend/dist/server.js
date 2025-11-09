"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const PORT_EXPRESS = process.env.PORT_EXPRESS || 3004;
index_1.default.listen(PORT_EXPRESS, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT_EXPRESS}`);
});
//# sourceMappingURL=server.js.map
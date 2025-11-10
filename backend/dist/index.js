"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const intention_routes_1 = __importDefault(require("./routes/intention.routes"));
const member_routes_1 = __importDefault(require("./routes/member.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const indication_routes_1 = __importDefault(require("./routes/indication.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/intention", intention_routes_1.default);
app.use("/member", member_routes_1.default);
app.use("/admin", admin_routes_1.default);
app.use("/indication", indication_routes_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map
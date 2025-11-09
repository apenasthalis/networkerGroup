"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class intentionController {
    async list(req, res) {
        const users = [
            { id: 1, name: "João" },
            { id: 2, name: "Maria" },
        ];
        return res.json(users);
    }
    async getById(req, res) {
        const { id } = req.params;
        const user = { id, name: "Usuário de exemplo" };
        return res.json(user);
    }
    async create(req, res) {
        const { name } = req.body;
        return res.status(201).json({ message: `Usuário '${name}' criado com sucesso!` });
    }
}
exports.default = new intentionController();
//# sourceMappingURL=intentionController.js.map
import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
class intentionController {

  async list(req: Request, res: Response) {
    const intentions = await prisma.admin.findMany();

    return res.json(intentions);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = { id, name: "Usuário de exemplo" };
    return res.json(user);
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;
    return res.status(201).json({ message: `Usuário '${name}' criado com sucesso!` });
  }
}

export default new intentionController();

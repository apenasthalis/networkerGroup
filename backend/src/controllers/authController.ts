import { Request, Response } from 'express';
import * as authService from '../services/authService';

export async function validateToken(req: Request, res: Response) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token é obrigatório." });
  }

  try {
    const memberInfo = await authService.validateMemberToken(token);
    res.status(200).json({ message: "Token validado com sucesso.", member: memberInfo });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}

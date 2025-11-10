import { Request, Response } from 'express';
import * as memberService from '../services/memberService';

export async function create(req: Request, res: Response) {
  try {
    const member = await memberService.createMember(req.body);
    res.status(201).json(member);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAll(req: Request, res: Response) {
  const members = await memberService.getMembers();
  res.json(members);
}

export async function getById(req: Request, res: Response) {
  const publicId = String(req.params.publicId);
  const member = await memberService.getMemberById(publicId);
  if (!member) return res.status(404).json({ error: 'Membro não encontrado' });
  res.json(member);
}

export async function update(req: Request, res: Response) {
  const publicId = String(req.params.publicId);
  try {
    const member = await memberService.updateMember(publicId, req.body);
    res.json(member);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function remove(req: Request, res: Response) {
  const publicId = String(req.params.publicId);
  try {
    await memberService.deleteMember(publicId);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

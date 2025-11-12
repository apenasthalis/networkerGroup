import { Request, Response } from 'express';
import * as intentionService from '../services/intentionService';

export async function create(req: Request, res: Response) {
  try {
    const intention = await intentionService.createIntention(req.body);
    res.status(201).json(intention);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAll(req: Request, res: Response) {
  const intentions = await intentionService.getIntentions();
  res.json(intentions);
}

export async function getById(req: Request, res: Response) {
  const publicId = String(req.params.publicId);
  const intention = await intentionService.getIntentionById(publicId);
  if (!intention) return res.status(404).json({ error: 'Intenção não encontrada' });
  res.json(intention);
}

export async function update(req: Request, res: Response) {
  const publicId = String(req.params.publicId);
  try {
    const intention = await intentionService.updateIntention(publicId, req.body);
    res.json(intention);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function approve(req: Request, res: Response) {
  const publicId = String(req.params.publicId);
  try {
    const result = await intentionService.approveIntention(publicId);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function refuse(req: Request, res: Response) {
  const publicId = String(req.params.publicId);
  try {
    const result = await intentionService.refuseIntention(publicId);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function remove(req: Request, res: Response) {
  const publicId = String(req.params.publicId);
  try {
    await intentionService.deleteIntention(publicId);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

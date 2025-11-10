import { Request, Response } from 'express';
import * as indicationService from '../services/indicationService';

export async function create(req: Request, res: Response) {
  try {
    const indication = await indicationService.createIndication(req.body);
    res.status(201).json(indication);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAll(req: Request, res: Response) {
  const indications = await indicationService.getIndications();
  res.json(indications);
}

export async function getById(req: Request, res: Response) {
  const publicId = String(req.params.publicId);
  const indication = await indicationService.getIndicationById(publicId);
  if (!indication) return res.status(404).json({ error: 'Indicação não encontrada' });
  res.json(indication);
}

export async function update(req: Request, res: Response) {
  const publicId = String(req.params.publicId);
  try {
    const indication = await indicationService.updateIndication(publicId, req.body);
    res.json(indication);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function remove(req: Request, res: Response) {
  const publicId = String(req.params.publicId);
  try {
    await indicationService.deleteIndication(publicId);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

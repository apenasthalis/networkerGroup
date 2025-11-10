import { Request, Response } from 'express';
import * as adminService from '../services/adminService';

export async function create(req: Request, res: Response) {
  try {
    const admin = await adminService.createAdmin(req.body);
    res.status(201).json(admin);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAll(req: Request, res: Response) {
  const admins = await adminService.getAdmins();
  res.json(admins);
}

export async function getById(req: Request, res: Response) {
  const publicId = String(req.params.publicId);
  const admin = await adminService.getAdminById(publicId);
  if (!admin) return res.status(404).json({ error: 'Admin não encontrado' });
  res.json(admin);
}

export async function update(req: Request, res: Response) {
  const publicId = String(req.params.publicId);
  try {
    const admin = await adminService.updateAdmin(publicId, req.body);
    res.json(admin);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function remove(req: Request, res: Response) {
  const publicId = String(req.params.publicId);
  try {
    await adminService.deleteAdmin(publicId);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

import prisma from '../database/PrismaClient';
import { Admin } from '@prisma/client';

export async function createAdmin(
  data: Omit<Admin, 'id' | 'public_id' | 'created_at' | 'updated_at'>
) {
  return prisma.admin.create({ data });
}

export async function getAdmins() {
  return prisma.admin.findMany();
}

export async function getAdminById(public_id: string) {
  return prisma.admin.findUnique({ where: { public_id } });
}

export async function updateAdmin(public_id: string, data: Partial<Admin>) {
  return prisma.admin.update({
    where: { public_id },
    data,
  });
}

export async function deleteAdmin(public_id: string) {
  return prisma.admin.delete({ where: { public_id } });
}

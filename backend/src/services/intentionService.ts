import prisma from '../database/PrismaClient';
import { intention } from '@prisma/client';

export async function createIntention(
  data: Omit<intention, 'id' | 'public_id' |  'created_at'>
) {
  return prisma.intention.create({ data });
}

export async function getIntentions() {
  return prisma.intention.findMany();
}

export async function getIntentionById(public_id: string) {
  return prisma.intention.findUnique({ where: { public_id } });
}

export async function updateIntention(public_id: string, data: Partial<intention>) {
  return prisma.intention.update({
    where: { public_id },
    data,
  });
}

export async function deleteIntention(public_id: string) {
  return prisma.intention.delete({ where: { public_id } });
}

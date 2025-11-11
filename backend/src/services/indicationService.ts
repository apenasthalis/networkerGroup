import prisma from '../database/PrismaClient';
import { Indication } from '@prisma/client';

export async function createIndication(
  data: Omit<Indication, 'id' | 'public_id' | 'business_name' | 'email' | 'reason_participation'>
) {
  return prisma.indication.create({ data });
}

export async function getIndications() {
  return prisma.indication.findMany();
}

export async function getIndicationById(public_id: string) {
  return prisma.indication.findUnique({ where: { public_id } });
}

export async function updateIndication(public_id: string, data: Partial<Indication>) {
  return prisma.indication.update({
    where: { public_id },
    data,
  });
}

export async function deleteIndication(public_id: string) {
  return prisma.indication.delete({ where: { public_id } });
}
